import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const entryPath = join(distRoot, "index.html");
const isPreview = process.env.GITHUB_PAGES === "true";
const origin = process.env.SITE_ORIGIN || process.env.URL || (isPreview ? "https://evanpaul90.github.io" : "https://shaad-unisex-salon.netlify.app");
const basePath = process.env.SITE_BASE_PATH || (isPreview ? "/shaad-unisex-salon-preview" : "");
const ogImage = `${origin}${basePath}/og/shaad-hair-patch-wig-banner-v2.jpg`;

const pages = {
  "": {
    title: "Shaad Unisex Salon | Hair Patch & Wig Studio in Bengaluru",
    description: "Shaad is a specialist hair patch and wig studio in BTM Layout, Bengaluru, offering natural-looking fitting, styling and complete salon care.",
  },
  services: {
    title: "Hair Patch & Wig Studio Services | Shaad Bengaluru",
    description: "Explore specialist hair patch fitting and wig studio services in BTM Layout, followed by haircuts, colour, treatments and beauty care at Shaad.",
  },
  contact: {
    title: "Contact Shaad Unisex Salon | BTM Layout, Bengaluru",
    description: "Visit Shaad Unisex Salon at 16th Main Road, BTM 2nd Stage, Bengaluru. Open daily 10 AM–10 PM. Call +91 97402 20816 or book online.",
  },
  "services/hair-cut-beard-styling": {
    title: "Haircut & Beard Styling in BTM | Shaad Unisex Salon",
    description: "Book precision haircuts, beard shaping and personalised styling for men and women at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Hair Cut, Beard and Styling (package)",
  },
  "services/balayage-colour": {
    title: "Balayage & Hair Colour in BTM | Shaad Unisex Salon",
    description: "Get personalised balayage and professional hair colour blended for your complexion, base colour and lifestyle at Shaad in BTM Layout, Bengaluru.",
    service: "Balayage and Hair Colour",
  },
  "services/manicure-pedicure": {
    title: "Manicure & Pedicure in BTM | Shaad Unisex Salon",
    description: "Book hygienic manicure and pedicure care in BTM Layout, Bengaluru, with nail shaping, cuticle care, exfoliation and a restorative finish at Shaad.",
    service: "Manicure and Pedicure",
  },
  "services/hair-patch-service": {
    title: "Hair Patch for Men in Bengaluru | Shaad Unisex Salon",
    description: "Get natural-looking hair patch fitting, colour matching and styling at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Hair Patch (Men)",
  },
  "services/wig-studio": {
    title: "Women Wig in Bengaluru | Shaad Unisex Salon",
    description: "Find a custom wig studio in BTM Layout, Bengaluru for natural-looking wig selection, fitting and styling at Shaad.",
    service: "Women Wig",
  },
  "services/hair-patch-wig-service": {
    title: "Hair Patch for Men in Bengaluru | Shaad Unisex Salon",
    description: "Get natural-looking hair patch fitting, colour matching and styling at Shaad Unisex Salon in BTM Layout, Bengaluru.",
    service: "Hair Patch (Men)",
  },
  "services/keratin-botox-nano-plastia-treatment": {
    title: "Keratin, Botox & Nanoplastia in BTM | Shaad Salon",
    description: "Book keratin, hair botox and nanoplastia treatments in BTM Layout, Bengaluru, for smoother, stronger and frizz-controlled hair at Shaad.",
    service: "Keratin, Hair Botox and Nanoplastia Treatment",
  },
  "services/waxing": {
    title: "Waxing Services in BTM Layout | Shaad Unisex Salon",
    description: "Book gentle, hygienic face and body waxing in BTM Layout, Bengaluru, with premium wax and calming aftercare at Shaad Unisex Salon.",
    service: "Waxing",
  },
  "services/bridal-makeup-services": {
    title: "Bridal Makeup in BTM Layout | Shaad Unisex Salon",
    description: "Book HD and airbrush bridal makeup, hairstyling and draping in Bengaluru, tailored to your features, outfit and celebration at Shaad.",
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
  const robots = isPreview ? "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  html = setMeta(html, "name", "robots", robots);
  html = setMeta(html, "name", "googlebot", robots);
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

const sitemapRoutes = Object.keys(pages).map(route => `${origin}${basePath}/${route ? `${route}/` : ""}`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((url, index) => `  <url><loc>${url}</loc><changefreq>${index === 0 ? "weekly" : "monthly"}</changefreq><priority>${index === 0 ? "1.0" : index < 4 ? "0.8" : "0.7"}</priority></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(distRoot, "sitemap.xml"), sitemap);
await writeFile(join(distRoot, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}${basePath}/sitemap.xml\n`);
