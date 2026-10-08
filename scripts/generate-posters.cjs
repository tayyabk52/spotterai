const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'claims-os');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function createPoster(filename, title, subtitle) {
  const svg = `
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#102A2B" />
        <stop offset="60%" stop-color="#08191A" />
        <stop offset="100%" stop-color="#040D0E" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#008080" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#008080" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <circle cx="960" cy="540" r="480" fill="url(#glow)" />
    <path d="M 0 540 L 1920 540 M 960 0 L 960 1080" stroke="#1B3D3E" stroke-width="1" stroke-dasharray="4 8" />
    <circle cx="960" cy="540" r="240" fill="none" stroke="#1B3D3E" stroke-width="1" />
    <circle cx="920" cy="420" r="12" fill="#F8485F" />
    <circle cx="960" cy="420" r="12" fill="#008080" />
    <circle cx="1000" cy="420" r="12" fill="#BBDDDE" />
    <text x="960" y="540" font-family="system-ui, sans-serif" font-size="36" font-weight="600" fill="#BBDDDE" text-anchor="middle">
      ${title}
    </text>
    <text x="960" y="590" font-family="system-ui, sans-serif" font-size="20" fill="#6A8585" text-anchor="middle">
      ${subtitle}
    </text>
  </svg>
  `;
  const dest = path.join(dir, filename);
  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(dest);
  console.log('Created ' + dest + ' (' + fs.statSync(dest).size + ' bytes)');
}

async function main() {
  await createPoster('claims-triage-poster.webp', 'ASSET NEEDED: claims-triage', 'Video generation pending · Incident to Resolution Velocity');
  await createPoster('liability-resolution-poster.webp', 'ASSET NEEDED: liability-resolution', 'Video generation pending · Financial Equilibrium &amp; Liability Resolution');
  console.log('Posters generated successfully.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
