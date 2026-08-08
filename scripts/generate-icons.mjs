// One-off script: converts public/jovira-mark.svg → src/app icon files
// Run with: node scripts/generate-icons.mjs
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import pngToIco from "png-to-ico";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const svgBuffer = readFileSync(resolve(root, "public/jovira-mark.svg"));

function rasterize(size) {
  const resvg = new Resvg(svgBuffer, {
    fitTo: { mode: "width", value: size },
    background: "rgba(0,0,0,0)", // transparent
  });
  return resvg.render().asPng();
}

// icon.png — 96×96 (what Google indexes)
writeFileSync(resolve(root, "src/app/icon.png"), rasterize(96));
console.log("✓ src/app/icon.png (96×96)");

// apple-icon.png — 180×180
writeFileSync(resolve(root, "src/app/apple-icon.png"), rasterize(180));
console.log("✓ src/app/apple-icon.png (180×180)");

// favicon.ico — 32×32 wrapped in ICO
const ico = await pngToIco([rasterize(32)]);
writeFileSync(resolve(root, "src/app/favicon.ico"), ico);
console.log("✓ src/app/favicon.ico (32×32)");

// icon-512.png — 512×512 for PWA manifest
writeFileSync(resolve(root, "public/icon-512.png"), rasterize(512));
console.log("✓ public/icon-512.png (512×512)");
