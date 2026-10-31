import fs from "node:fs";
import path from "node:path";

/** @returns {string} */
export function getNextDistDir(cwd = process.cwd()) {
  const rel = process.env.NEXT_DIST_DIR ?? "node_modules/.cache/zenuino-next";
  return path.join(cwd, rel);
}

const cwd = process.cwd();
const targets = [path.join(cwd, ".next"), getNextDistDir(cwd)];

for (const dir of targets) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    process.stdout.write(`Removed ${dir}\n`);
  } catch {
    /* ignore */
  }
}
