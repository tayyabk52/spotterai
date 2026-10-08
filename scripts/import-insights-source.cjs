// Reads literal source content without evaluating any downloaded JavaScript.
const fs = require("node:fs");
const acorn = require("acorn");
const { chromium } = require("@playwright/test");
const sourceDirectory = "docs/source";
const bundle = fs.readFileSync(
  `${sourceDirectory}/insights-source-bundle.js.txt`,
  "utf8",
);
const dataSource = fs.readFileSync(
  `${sourceDirectory}/insights-chunk-1776.0caeb1b0.chunk.js.txt`,
  "utf8",
);
const listingSource = fs.readFileSync(
  `${sourceDirectory}/insights-chunk-2201.58860730.chunk.js.txt`,
  "utf8",
);
const modules = {};
let articles;

function walk(node, visit) {
  if (!node || !node.type) return;
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit));
    else if (value?.type) walk(value, visit);
  }
}

for (const code of [bundle, dataSource]) {
  walk(acorn.parse(code, { ecmaVersion: "latest" }), (node) => {
    if (
      node.type === "Property" &&
      node.key.type === "Literal" &&
      typeof node.key.value === "number"
    )
      modules[node.key.value] = node.value;
    if (
      node.type === "ArrayExpression" &&
      node.elements[0]?.type === "ObjectExpression" &&
      node.elements[0].properties.some(
        (field) => field.key.name === "publishDate",
      )
    )
      articles = node;
  });
}
const variables = {};
walk(modules[44691], (node) => {
  if (
    node.type === "VariableDeclarator" &&
    node.id.type === "Identifier" &&
    ((node.init?.type === "BinaryExpression" &&
      typeof node.init.right.value === "string") ||
      (node.init?.type === "CallExpression" &&
        node.init.callee.type === "Identifier" &&
        typeof node.init.arguments[0]?.value === "number"))
  )
    variables[node.id.name] = node.init;
});

function readLiteral(node) {
  if (node.type === "Literal") return node.value;
  if (node.type === "TemplateLiteral")
    return node.quasis
      .map(
        (part, index) =>
          part.value.cooked +
          (node.expressions[index] ? readLiteral(node.expressions[index]) : ""),
      )
      .join("");
  if (node.type === "ArrayExpression") return node.elements.map(readLiteral);
  if (node.type === "ObjectExpression")
    return Object.fromEntries(
      node.properties.map((property) => [
        property.key.name,
        readLiteral(property.value),
      ]),
    );
  if (node.type === "BinaryExpression" && node.right.type === "Literal")
    return `https://spotter.ai/${node.right.value}`;
  if (node.type === "Identifier") return readLiteral(variables[node.name]);
  if (node.type === "CallExpression" && node.arguments[0]?.type === "Literal") {
    let path;
    walk(modules[node.arguments[0].value], (child) => {
      if (
        child.type === "Literal" &&
        typeof child.value === "string" &&
        /\.(webp|png|jpe?g)$/.test(child.value)
      )
        path = child.value;
    });
    if (path) return new URL(path, "https://spotter.ai/").href;
  }
  throw new Error(`Unsupported content expression: ${JSON.stringify(node)}`);
}

async function run() {
  const posts = articles.elements.map(readLiteral);
  const configurations = JSON.parse(
    fs.readFileSync(`${sourceDirectory}/insights-article-configs.json`, "utf8"),
  );
  const renderedPages = JSON.parse(
    fs.readFileSync(
      `${sourceDirectory}/insights-all-article-pages.json`,
      "utf8",
    ),
  );
  const categoryMap = JSON.parse(
    listingSource.match(/Mt=(\{[^}]+\}),Ot=/)[1].replace(/(\d+):/g, '"$1":'),
  );
  const overrides = {};
  const listingAst = acorn.parse(listingSource, { ecmaVersion: "latest" });
  const listingModule =
    listingAst.body[1]?.expression?.arguments?.[0]?.elements?.[1]
      ?.properties?.[0]?.value;
  walk(listingModule || listingAst, (node) => {
    if (
      node.type === "VariableDeclarator" &&
      node.id.type === "Identifier" &&
      (node.id.name === "Lt" ||
        (node.init?.type === "BinaryExpression" &&
          typeof node.init.right.value === "string") ||
        (node.init?.type === "CallExpression" &&
          node.init.callee.type === "Identifier" &&
          typeof node.init.arguments[0]?.value === "number"))
    )
      variables[node.id.name] = node.init;
  });
  // The listing overrides some older article thumbnails; use the displayed assets.
  for (const property of variables.Lt.properties) {
    overrides[property.key.value] = readLiteral(property.value);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageCache = new Map();
  fs.mkdirSync("public/images/insights", { recursive: true });
  async function downloadImage(sourceUrl, name) {
    if (imageCache.has(sourceUrl)) return imageCache.get(sourceUrl);
    const response = await fetch(sourceUrl);
    if (
      !response.ok ||
      !response.headers.get("content-type")?.startsWith("image/")
    )
      throw new Error(`Unavailable image ${sourceUrl}`);
    const extension = new URL(sourceUrl).pathname.split(".").pop();
    const src = `/images/insights/${name}.${extension}`;
    fs.writeFileSync(`public${src}`, Buffer.from(await response.arrayBuffer()));
    const size = await page.evaluate(async (url) => {
      const image = new Image();
      image.src = url;
      await image.decode();
      return { width: image.naturalWidth, height: image.naturalHeight };
    }, sourceUrl);
    const metadata = {
      src,
      sourceUrl,
      ...size,
      status: "source asset",
      license:
        "Original website asset, reused at the owner's request; no separate stock license supplied.",
    };
    imageCache.set(sourceUrl, metadata);
    return metadata;
  }
  for (const post of posts) {
    const observed = renderedPages.find((page) => page.slug === post.slug);
    post.seo = {
      title:
        observed.meta.find((meta) => meta.name === "og:title")?.content ||
        post.title,
      description:
        observed.meta.find((meta) => meta.name === "description")?.content ||
        post.excerpt,
    };
    post.cta = configurations[post.id]?.cta;
    const imageUrl = overrides[post.id] || post.image;
    post.image = imageUrl
      ? {
          ...(await downloadImage(
            new URL(imageUrl, "https://spotter.ai/").href,
            `article-${post.id}`,
          )),
          alt: post.title,
        }
      : null;
    post.category = categoryMap[post.id] || "Industry Trends";
    post.sourceUrl = `https://spotter.ai/insights/${post.slug}`;
    post.copyStatus = "reuse";
    post.inlineImages = [];
    const imagePattern = /<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi;
    for (const match of post.content.matchAll(imagePattern)) {
      const sourceUrl = new URL(match[1], "https://spotter.ai/").href;
      const metadata = await downloadImage(
        sourceUrl,
        `article-${post.id}-inline-${post.inlineImages.length}`,
      );
      post.inlineImages.push({
        ...metadata,
        alt: match[0].match(/alt=["']([^"']*)["']/i)?.[1] || post.title,
      });
      post.content = post.content.replace(match[1], metadata.src);
    }
  }
  await browser.close();
  fs.mkdirSync("content/insights", { recursive: true });
  fs.writeFileSync(
    "content/insights/source-articles.json",
    JSON.stringify(posts, null, 2) + "\n",
  );
  console.log(
    `Imported ${posts.length} original articles and ${imageCache.size} images.`,
  );
}
run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
