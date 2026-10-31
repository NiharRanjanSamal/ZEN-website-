/**
 * One-off: deep-clone English content object and translate string leaves via MyMemory API.
 * Run: node scripts/generate-hi-content.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const require = createRequire(import.meta.url);
const ts = require("typescript");

function loadEnModule() {
  const enPath = path.join(root, "src/lib/content/en.ts");
  const source = fs.readFileSync(enPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function("exports", "module", transpiled);
  fn(mod.exports, mod);
  return mod.exports;
}

function shouldSkip(value) {
  if (typeof value !== "string") return true;
  if (value.length < 2) return true;
  if (value.includes("@") && value.includes(".")) return true;
  if (/^\+?\d[\d\s\-()]+$/.test(value)) return true;
  if (/^https?:\/\//.test(value)) return true;
  if (value.startsWith("/")) return true;
  return false;
}

const cache = new Map();

async function translateEnToHi(text) {
  if (cache.has(text)) return cache.get(text);
  if (shouldSkip(text)) {
    cache.set(text, text);
    return text;
  }
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text.slice(0, 500));
  url.searchParams.set("langpair", "en|hi");
  const res = await fetch(url);
  const data = await res.json();
  const translated =
    data?.responseData?.translatedText?.trim() ||
    data?.matches?.[0]?.translation?.trim() ||
    text;
  cache.set(text, translated);
  await new Promise((r) => setTimeout(r, 350));
  return translated;
}

async function deepTranslate(value) {
  if (typeof value === "string") return translateEnToHi(value);
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) out.push(await deepTranslate(item));
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "href" || k === "id" || k === "email" || k === "phone" || k === "name") {
        out[k] = v;
        continue;
      }
      if (k === "value" && typeof v === "string" && v.length < 8) {
        out[k] = v;
        continue;
      }
      out[k] = await deepTranslate(v);
    }
    return out;
  }
  return value;
}

function serializeModule(obj) {
  return `// Auto-generated Hindi site content — edit for quality as needed.\nexport const ${Object.keys(obj)
    .map((key) => `${key} = ${JSON.stringify(obj[key], null, 2).replace(/"([^"]+)":/g, "$1:")}`)
    .join("\n\nexport const ")}\n`;
}

// Fix serialize - we need proper export per const in en
function serializeExports(exports) {
  const lines = ["// Auto-generated Hindi site content — review and refine translations as needed.\n"];
  for (const [key, value] of Object.entries(exports)) {
    lines.push(`export const ${key} = ${JSON.stringify(value, null, 2)};\n`);
  }
  return lines.join("\n");
}

const en = loadEnModule();
const keys = Object.keys(en).filter((k) => k !== "default");

async function main() {
  const hi = {};
  for (const key of keys) {
    console.log(`Translating ${key}...`);
    hi[key] = await deepTranslate(en[key]);
  }
  const outPath = path.join(root, "src/lib/content/hi.ts");
  fs.writeFileSync(outPath, serializeExports(hi), "utf8");
  console.log(`Wrote ${outPath} (${cache.size} strings cached)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
