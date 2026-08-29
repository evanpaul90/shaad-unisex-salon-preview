import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const entry = join(distRoot, "index.html");
const routes = [
  "about",
  "services",
  "contact",
  "services/hair-cut-beard-styling",
  "services/balayage-colour",
  "services/manicure-pedicure",
  "services/hair-patch-wig-service",
  "services/keratin-botox-nano-plastia-treatment",
  "services/waxing",
  "services/bridal-makeup-services",
];

await copyFile(entry, join(distRoot, "404.html"));

for (const route of routes) {
  const routeDirectory = join(distRoot, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(entry, join(routeDirectory, "index.html"));
}
