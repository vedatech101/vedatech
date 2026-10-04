import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const copies = [
  ["public", join(".next", "standalone", "public")],
  [join(".next", "static"), join(".next", "standalone", ".next", "static")],
];

for (const [source, destination] of copies) {
  if (!existsSync(source)) continue;

  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}
