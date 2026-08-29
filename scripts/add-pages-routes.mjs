import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const entryPath = join(distRoot, "index.html");
const origin = "https://evanpaul90.github.io";
const basePath = "/shaad-unisex-salon-preview";
const ogImage = `${origin}${basePath}/og/shaad-unisex-salon.jpg`;

const pages = {
  "": {
    title: "Shaad Unisex Salon | Hair Patch & Wig Studio in Bengaluru",
    description: "Hair patch fitting and wig studio services in BTM Layout, Bengaluru, alongside expert haircuts, colour, treatments, bridal and beauty care at Shaad Unisex Salon.",
  },
  about: {
    title: "About Shaad | Unisex Salon in BTM Layout, Bengaluru",
    description: "Meet Shaad Unisex Salon in BTM Layout, Bengaluru: a focused hair patch and wig studio alongside personalised hair, beauty and bridal services.",
  },
  services: {
    title: "Hair Patch & Wig Studio Services | Shaad Bengaluru",
    description: "Explore hair patch fitting and wig studio services in BTM Layout, followed by haircuts, colour, treatments, bridal makeup and beauty care at Shaad.",
  },
  contact: {
    title: "Contact Shaad Unisex Salon | BTM Layout, Bengaluru",
    description: "Visit Shaad Unisex Salon at 16th Main Road, BTM 2nd Stage, Bengaluru. Open daily 10 AM–10 PM. Call +91 97402 20816 or book online.",
  },
  "services/hair-cut-beard-styling": {
    title: "Haircut & Beard Styling in BTM | Shaad Unisex Salon",
    description: "Book precision haircuts, beard shaping and personalised styling for men and women at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Hair Cut, Beard and Styling",
  },
  "services/balayage-colour": {
    title: "Balayage & Hair Colour in BTM | Shaad Unisex Salon",
    description: "Get personalised balayage and professional hair colour blended for your complexion, base colour and lifestyle at Shaad in BTM Layout, Bengaluru.",
    service: "Balayage and Hair Colour",
  },
  "services/manicure-pedicure": {
    title: "Manicure & Pedicure in BTM | Shaad Unisex Salon",
    description: "Book hygienic manicure and pedicure care with nail shaping, cuticle care, exfoliation and massage at Shaad Unisex Salon in BTM Layout.",
    service: "Manicure and Pedicure",
  },
  "services/hair-patch-service": {
    title: "Hair Patch Service in Bengaluru | Shaad Unisex Salon",
    description: "Get natural-looking hair patch fitting, colour matching and styling at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Hair Patch Service",
  },
  "services/wig-studio": {
    title: "Wig Studio in Bengaluru | Shaad Unisex Salon",
    description: "Find a custom wig studio in BTM Layout, Bengaluru for natural-looking wig selection, fitting and styling at Shaad.",
    service: "Wig Studio",
  },
  "services/hair-patch-wig-service": {
    title: "Hair Patch Service in Bengaluru | Shaad Unisex Salon",
    description: "Get natural-looking hair patch fitting, colour matching and styling at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Hair Patch Service",
  },
  "services/keratin-botox-nano-plastia-treatment": {
    title: "Keratin, Botox & Nanoplastia in BTM | Shaad Salon",
    description: "Book keratin, hair botox and nanoplastia treatments for smoother, stronger, frizz-controlled hair at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Keratin, Hair Botox and Nanoplastia Treatment",
  },
  "services/waxing": {
    title: "Waxing Services in BTM Layout | Shaad Unisex Salon",
    description: "Book gentle, hygienic face and body waxing with premium wax and calming aftercare at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Waxing",
  },
  "services/bridal-makeup-services": {
    title: "Bridal Makeup in BTM Layout | Shaad Unisex Salon",
    description: "Book HD and airbrush bridal makeup, hairstyling and draping tailored to your features and celebration at Shaad Unisex Salon in Bengaluru.",
    service: "Bridal and Makeup Services",
  },
};

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

function setMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["']\\s+content=["'][^"']*["']\\s*\\/?\\s*>`, "i");
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
}

function setLink(html, rel, value) {
  const pattern = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, "i");
  const extra = rel === "alternate" ? ' hreflang="en-IN"' : "";
  return html.replace(pattern, `<link rel="${rel}"${extra} href="${value}" />`);
}

function structuredData(route, page, url) {
  if (!route) return "";
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${origin}${basePath}/` },
  ];
  if (route.startsWith("services/")) {
    crumbs.push({ "@type": "ListItem", position: 2, name: "Services", item: `${origin}${basePath}/services/` });
    crumbs.push({ "@type": "ListItem", position: 3, name: page.service, item: url });
  } else {
    crumbs.push({ "@type": "ListItem", position: 2, name: page.title.split("|")[0].trim(), item: url });
  }
  const graph = [{ "@type": "BreadcrumbList", itemListElement: crumbs }];
  if (page.service) {
    graph.push({
      "@type": "Service",
      name: page.service,
      description: page.description,
      url,
      areaServed: { "@type": "City", name: "Bengaluru" },
      provider: { "@id": `${origin}${basePath}/#salon` },
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function render(entry, route, page) {
  const url = `${origin}${basePath}/${route ? `${route}/` : ""}`;
  let html = entry.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "name", "robots", "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = setMeta(html, "name", "googlebot", "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", ogImage);
  html = setMeta(html, "property", "og:image:secure_url", ogImage);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "name", "twitter:image", ogImage);
  html = setLink(html, "canonical", url);
  html = setLink(html, "alternate", url);
  const schema = structuredData(route, page, url);
  return schema ? html.replace("</head>", `  ${schema}\n  </head>`) : html;
}

const entry = await readFile(entryPath, "utf8");
await writeFile(entryPath, render(entry, "", pages[""]));

const notFound = render(entry, "", {
  ...pages[""],
  title: "Page Not Found | Shaad Unisex Salon",
  description: "Return to Shaad Unisex Salon for premium hair, beauty, wig, patch and bridal services in BTM Layout, Bengaluru.",
});
await writeFile(join(distRoot, "404.html"), notFound);

for (const [route, page] of Object.entries(pages)) {
  if (!route) continue;
  const routeDirectory = join(distRoot, route);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(join(routeDirectory, "index.html"), render(entry, route, page));
}
