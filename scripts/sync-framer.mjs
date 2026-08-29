import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const mirrorRoot = join(projectRoot, "mirror");
const sourceOrigin = "https://familiar-learning-264552.framer.app";
const bookingUrl = "https://aicrm.geteasysoftware.com/shaad_unisexsalon/webapp/";
const siteName = "Shaad Unisex Salon";
const siteDescription = "Shaad Unisex Salon in BTM Layout, Bengaluru — premium unisex hair, beauty, wig, hair patch, colour, treatment and bridal services.";

const routes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/404",
  "/services/hair-cut-beard-styling",
  "/services/balayage-colour",
  "/services/manicure-pedicure",
  "/services/hair-patch-wig-service",
  "/services/keratin-botox-nano-plastia-treatment",
  "/services/waxing",
  "/services/bridal-makeup-services",
];

function titleForRoute(route) {
  if (route === "/") return siteName;
  if (route === "/about") return `About | ${siteName}`;
  if (route === "/services") return `Services | ${siteName}`;
  if (route === "/contact") return `Contact | ${siteName}`;
  if (route === "/404") return `Page Not Found | ${siteName}`;
  return null;
}

const brandingShield = String.raw`
<style data-shaad-branding-shield>
  #__framer-badge-container,
  .__framer-badge,
  [data-framer-name="Framer Badge"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  #shaad-builder-credit {
    position: absolute;
    right: 22px;
    bottom: 18px;
    z-index: 20;
    font-family: "Rethink Sans", "Rethink Sans Placeholder", sans-serif;
    font-size: 12px;
    line-height: 1;
    letter-spacing: 0.02em;
  }
  #shaad-builder-credit a {
    display: inline-flex;
    align-items: center;
    min-height: 30px;
    padding: 8px 12px;
    border: 1px solid rgba(72, 18, 14, 0.14);
    border-radius: 999px;
    color: #48120e;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    text-decoration: none;
  }
  #shaad-builder-credit a:hover {
    background: #ffffff;
  }
  body > #shaad-builder-credit {
    position: relative;
    right: auto;
    bottom: auto;
    display: flex;
    justify-content: flex-end;
    padding: 0 22px 18px;
    margin-top: -48px;
  }
  @media (max-width: 809.98px) {
    #shaad-builder-credit {
      right: 14px;
      bottom: 14px;
      font-size: 11px;
    }
    body > #shaad-builder-credit {
      right: auto;
      bottom: auto;
      padding: 0 14px 14px;
    }
  }
</style>`;

const builderCredit = String.raw`<div id="shaad-builder-credit"><a href="https://odessis.in/" target="_blank" rel="noopener noreferrer">Website by Odessis.in</a></div>`;

function runtimeBridge(pageTitle) {
  return String.raw`
<script data-shaad-runtime-bridge>
(() => {
  const bookingUrl = ${JSON.stringify(bookingUrl)};
  const pageTitle = ${JSON.stringify(pageTitle)};
  const siteDescription = ${JSON.stringify(siteDescription)};
  let domPatchesEnabled = false;
  const isBookingAction = (anchor) => {
    if (!anchor) return false;
    const label = (anchor.innerText || anchor.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    return label === "book now" || label === "book appointment" || label === "book service";
  };

  const patchBookingLinks = (root = document) => {
    root.querySelectorAll?.("a").forEach((anchor) => {
      if (!isBookingAction(anchor)) return;
      anchor.href = bookingUrl;
      anchor.setAttribute("data-shaad-booking", "true");
    });
  };

  const removeVisiblePlatformBranding = () => {
    document.getElementById("__framer-badge-container")?.remove();
    document.querySelectorAll(".__framer-badge, [data-framer-name='Framer Badge']")
      .forEach((element) => element.remove());
  };

  const patchMetadata = () => {
    if (document.title !== pageTitle) document.title = pageTitle;
    const values = {
      "meta[name='description']": siteDescription,
      "meta[property='og:title']": pageTitle,
      "meta[property='og:description']": siteDescription,
      "meta[name='twitter:title']": pageTitle,
      "meta[name='twitter:description']": siteDescription,
    };
    for (const [selector, value] of Object.entries(values)) {
      const element = document.querySelector(selector);
      if (element && element.content !== value) element.content = value;
    }
  };

  const ensureBuilderCredit = () => {
    const root = document.querySelector("[data-framer-root]");
    if (!root) return;
    const contentSections = [...root.children].filter((element) => element.offsetHeight > 100);
    const host = contentSections.at(-1) || root;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";

    const credit = document.getElementById("shaad-builder-credit");
    if (credit && credit.parentElement !== host) host.appendChild(credit);
  };

  const replaceVisibleTemplateCopy = () => {
    const root = document.querySelector("[data-framer-root]");
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue?.includes("Salonix")) textNodes.push(node);
    }
    textNodes.forEach((node) => {
      node.nodeValue = node.nodeValue.replaceAll("Salonix", "Shaad Unisex Salon");
    });
  };

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest?.("a");
    if (!isBookingAction(anchor)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(bookingUrl);
  }, true);

  const patchRuntime = () => {
    patchMetadata();
    if (!domPatchesEnabled) return;
    patchBookingLinks();
    removeVisiblePlatformBranding();
    replaceVisibleTemplateCopy();
    ensureBuilderCredit();
  };

  patchRuntime();
  const enableDomPatches = () => {
    if (domPatchesEnabled) return;
    domPatchesEnabled = true;
    patchRuntime();
    new MutationObserver(patchRuntime).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };
  const hydrationPoll = setInterval(() => {
    const root = document.querySelector("[data-framer-root]");
    const hydrated = root && Object.keys(root).some((key) => key.startsWith("__reactFiber$"));
    if (!hydrated) return;
    clearInterval(hydrationPoll);
    requestAnimationFrame(() => requestAnimationFrame(enableDomPatches));
  }, 100);
})();
</script>`;
}

function inject(html, route) {
  const upstreamTitle = html.match(/<title>(.*?)<\/title>/i)?.[1] || siteName;
  const serviceTitle = upstreamTitle
    .replace(/\s+-\s+Salonix Hair &amp; Beauty Salon Framer Template/i, "")
    .replace(/\s+-\s+Salonix Hair & Beauty Salon Framer Template/i, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"');
  const pageTitle = titleForRoute(route) || `${serviceTitle} | ${siteName}`;

  let normalized = html
    .replace(/<!--\s*Made in Framer[\s\S]*?-->/gi, "")
    .replace(/<script>try\{if\(localStorage\.getItem\("__framer_force_showing_editorbar_since"\)\)[\s\S]*?<\/script>/gi, "")
    .replace(/<meta\s+name=["']generator["'][^>]*>/gi, "")
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageTitle}</title>`)
    .replace(
      /(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'])/i,
      `$1${siteDescription}$2`,
    )
    .replace(
      /(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(["'])/i,
      `$1${pageTitle}$2`,
    )
    .replace(
      /(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'])/i,
      `$1${siteDescription}$2`,
    )
    .replace(
      /(<meta\s+name=["']twitter:title["']\s+content=["'])[^"']*(["'])/i,
      `$1${pageTitle}$2`,
    )
    .replace(
      /(<meta\s+name=["']twitter:description["']\s+content=["'])[^"']*(["'])/i,
      `$1${siteDescription}$2`,
    )
    .replace("</head>", `${brandingShield}\n</head>`);

  return normalized.includes("</body>")
    ? normalized.replace("</body>", `${builderCredit}\n${runtimeBridge(pageTitle)}\n</body>`)
    : `${normalized}\n${builderCredit}\n${runtimeBridge(pageTitle)}`;
}

function outputPath(route) {
  if (route === "/") return join(mirrorRoot, "index.html");
  return join(mirrorRoot, route.slice(1), "index.html");
}

async function syncRoute(route) {
  const response = await fetch(`${sourceOrigin}${route}`, {
    headers: { "user-agent": "ShaadLocalMirror/1.0" },
  });
  if (!response.ok && route !== "/404") {
    throw new Error(`${route}: upstream returned ${response.status}`);
  }

  const destination = outputPath(route);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, inject(await response.text(), route), "utf8");
  console.log(`synced ${route}`);
}

await mkdir(mirrorRoot, { recursive: true });
await Promise.all(routes.map(syncRoute));
