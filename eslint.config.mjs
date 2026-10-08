import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: ["scripts/**/*.cjs"],
    // Node CommonJS utilities intentionally use require().
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  globalIgnores([
    ".next/**",
    "reports/**",
    "test-results/**",
    "playwright-report/**",
    "next-env.d.ts",
  ]),
]);
