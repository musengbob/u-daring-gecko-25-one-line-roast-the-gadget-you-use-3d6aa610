// One-Line Roast: The Gadget You Use Every Day.
// Writes a single original roast line (1-200 code points, one line, no
// trailing newline) to $MAKEFUN_OUTPUT_DIR/entry.txt, then reads it back
// and verifies it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My earbuds cost more than my first car payment and still pop out every time I sneeze — expensive confetti with Bluetooth and commitment issues.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

function codePoints(s: string): number {
  return [...s].length;
}

function validate(line: string): void {
  const n = codePoints(line);
  if (n < 1 || n > 200) {
    throw new Error(`line is ${n} code points, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("line is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("line must not have leading/trailing whitespace");
  }
}

validate(LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read back and verify byte-identical output.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
validate(back);
console.log(
  `wrote ${outPath}: ${codePoints(back)} code points, ${Buffer.byteLength(back, "utf8")} bytes`,
);
console.log(back);
