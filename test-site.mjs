import { chromium } from "playwright";

const base = process.env.SHAAD_BASE_URL || "http://127.0.0.1:5181";
const booking = "https://aicrm.geteasysoftware.com/shaad_unisexsalon/webapp/";
const mapUrl = "https://share.google/ZmUFkZwmDAVp3thyx";
const previewRoot = process.env.SHAAD_EXPECTED_ROOT || "https://evanpaul90.github.io/shaad-unisex-salon-preview";
const previewOgImage = process.env.SHAAD_EXPECTED_OG || `${previewRoot}/og/shaad-hair-patch-wig-banner-v2.jpg`;
const expectNoIndex = process.env.SHAAD_EXPECT_NOINDEX === "true";
const allRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/services/hair-cut-beard-styling",
  "/services/balayage-colour",
  "/services/manicure-pedicure",
  "/services/hair-patch-service",
  "/services/wig-studio",
  "/services/hair-patch-wig-service",
  "/services/keratin-botox-nano-plastia-treatment",
  "/services/waxing",
  "/services/bridal-makeup-services",
];
const routes = process.env.SHAAD_ROUTE ? [process.env.SHAAD_ROUTE] : allRoutes;
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const selectedViewports = process.env.SHAAD_VIEW
  ? viewports.filter(({ name }) => name === process.env.SHAAD_VIEW)
  : viewports;

const browser = await chromium.launch({ headless: true });
const failures = [];

async function inspect(route, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.message));

  try {
    const requestRoute = expectNoIndex && route !== "/" ? `${route}/` : route;
    const response = await page.goto(`${base}${requestRoute}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForFunction(() => document.querySelector(".site-footer"), null, { timeout: 5_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);

    const expectedCanonical = `${previewRoot}${route === "/" ? "/" : `${route}/`}`;
    const result = await page.evaluate(({ booking, mapUrl, expectedCanonical, previewOgImage, expectNoIndex, route }) => {
      const text = document.body.innerText;
      const bookingLinks = [...document.querySelectorAll("a")]
        .filter((anchor) => /^book\b/i.test(anchor.textContent.trim()))
        .map((anchor) => anchor.href);
      const footer = document.querySelector(".site-footer");
      const meta = (selector) => document.querySelector(selector)?.content || "";
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((script) => { try { return JSON.parse(script.textContent); } catch { return null; } })
        .filter(Boolean);
      const schemaText = JSON.stringify(schemas);
      const description = meta('meta[name="description"]');
      const robots = meta('meta[name="robots"]');
      const ogImage = meta('meta[property="og:image"]');
      const processTabs = [...document.querySelectorAll(".process-tab")];
      const tabsOverlap = processTabs.some((tab, index) => processTabs.slice(index + 1).some((other) => {
        const a = tab.getBoundingClientRect();
        const b = other.getBoundingClientRect();
        return Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
          * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) > 1;
      }));

      return {
        title: document.title,
        app: Boolean(document.querySelector("#app > .site-header")),
        footer: Boolean(footer),
        footerHeight: footer?.getBoundingClientRect().height || 0,
        credit: document.querySelector(".footer-bottom a")?.textContent.trim(),
        creditHref: document.querySelector(".footer-bottom a")?.href,
        mapHref: document.querySelector(".footer-map")?.href,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        bookingCount: bookingLinks.length,
        badBookingLinks: bookingLinks.filter((href) => href !== booking),
        staleBranding: /salonix|made in framer|create a free website with framer/i.test(text),
        hasAddress: /5th C Cross, No\. 10/i.test(text),
        hasHours: /10:00 AM[–-]10:00 PM/i.test(text),
        hasPhone: /\+91 97402 20816/.test(text),
        heroSlides: document.querySelectorAll(".hero-slide").length,
        serviceCards: document.querySelectorAll(".service-card").length,
        reviewCards: document.querySelectorAll(".orbit-card").length,
        processTabs: processTabs.length,
        tabsOverlap,
        videoCount: document.querySelectorAll("video").length,
        mapCorrect: document.querySelector(".footer-map")?.href === mapUrl,
        seo: {
          titleLength: document.title.length,
          descriptionLength: description.length,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          robots,
          ogTitle: meta('meta[property="og:title"]'),
          ogDescription: meta('meta[property="og:description"]'),
          ogUrl: meta('meta[property="og:url"]'),
          ogImage,
          ogWidth: meta('meta[property="og:image:width"]'),
          ogHeight: meta('meta[property="og:image:height"]'),
          twitterCard: meta('meta[name="twitter:card"]'),
          twitterImage: meta('meta[name="twitter:image"]'),
          iconCount: document.querySelectorAll('link[rel="icon"]').length,
          manifest: document.querySelector('link[rel="manifest"]')?.href,
          hasSalonSchema: schemaText.includes('BeautySalon'),
          hasWebsiteSchema: schemaText.includes('WebSite'),
          hasBreadcrumbSchema: route === "/" || schemaText.includes('BreadcrumbList'),
          hasServiceSchema: !route.startsWith("/services/") || schemaText.includes('"Service"'),
          pass: document.title.length >= 30
            && document.title.length <= 65
            && description.length >= 110
            && description.length <= 165
            && document.querySelector('link[rel="canonical"]')?.href === expectedCanonical
            && meta('meta[property="og:title"]') === document.title
            && meta('meta[property="og:description"]') === description
            && meta('meta[property="og:url"]') === expectedCanonical
            && ogImage === previewOgImage
            && meta('meta[property="og:image:width"]') === "1200"
            && meta('meta[property="og:image:height"]') === "630"
            && meta('meta[name="twitter:card"]') === "summary_large_image"
            && meta('meta[name="twitter:image"]') === previewOgImage
            && document.querySelectorAll('link[rel="icon"]').length >= 4
            && document.querySelector('link[rel="manifest"]')?.href.endsWith('/site.webmanifest')
            && schemaText.includes('BeautySalon')
            && schemaText.includes('WebSite')
            && (route === "/" || schemaText.includes('BreadcrumbList'))
            && (!route.startsWith("/services/") || schemaText.includes('"Service"'))
            && (!expectNoIndex || robots.includes("noindex")),
        },
      };
    }, { booking, mapUrl, expectedCanonical, previewOgImage, expectNoIndex, route });

    if (viewport.name === "mobile") {
      const menu = page.locator(".menu-button");
      await menu.click();
      result.mobileMenuOpens = await page.evaluate(() => (
        document.body.classList.contains("nav-open")
        && document.querySelector(".menu-button")?.getAttribute("aria-expanded") === "true"
      ));
    }

    if (route === "/") {
      const video = page.locator("video");
      await video.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const element = document.querySelector("video");
        return element && !element.paused && element.currentTime > 0 && element.muted && element.loop;
      }, null, { timeout: 5_000 }).catch(() => {});
      result.videoPlays = await video.evaluate((element) => (
        !element.paused && element.currentTime > 0 && element.muted && element.loop
      ));

      const firstOrbit = page.locator(".orbit-card").first();
      const before = await firstOrbit.evaluate((element) => getComputedStyle(element).transform);
      await page.waitForTimeout(450);
      const after = await firstOrbit.evaluate((element) => getComputedStyle(element).transform);
      result.orbitModeCorrect = viewport.name === "desktop" ? before !== after : before === after;

      const secondTab = page.locator(".process-tab").nth(1);
      await secondTab.click();
      await page.waitForTimeout(250);
      result.processChanges = await page.evaluate(() => (
        document.querySelectorAll(".process-tab.is-active").length === 1
        && document.querySelector(".process-tab.is-active")?.textContent.includes("CUSTOM TREATMENT")
        && document.querySelector("[data-process-count]")?.textContent === "02 / 03"
      ));
    }

    const filteredErrors = errors.filter((message) => !/favicon|Failed to load resource.*fonts/i.test(message));
    const homePass = route !== "/" || (
      result.heroSlides === 3
      && result.serviceCards === 8
      && result.reviewCards === 5
      && result.processTabs === 3
      && !result.tabsOverlap
      && result.videoCount === 1
      && result.videoPlays
      && result.orbitModeCorrect
      && result.processChanges
    );
    const passed = Boolean(response?.ok())
      && result.title.includes("Shaad")
      && result.app
      && result.footer
      && result.footerHeight > 700
      && result.credit === "Designed & built by ODESSIS ↗"
      && result.creditHref === "https://odessis.in/"
      && result.mapCorrect
      && !result.overflow
      && result.bookingCount > 0
      && result.badBookingLinks.length === 0
      && !result.staleBranding
      && result.hasAddress
      && result.hasHours
      && result.hasPhone
      && filteredErrors.length === 0
      && result.seo.pass
      && (viewport.name !== "mobile" || result.mobileMenuOpens)
      && homePass;

    const report = { route, viewport: viewport.name, status: response?.status(), ...result, errors: filteredErrors, pass: passed };
    console.log(JSON.stringify(report));
    if (!passed) failures.push(report);
  } catch (error) {
    const report = { route, viewport: viewport.name, error: error.message, pass: false };
    console.log(JSON.stringify(report));
    failures.push(report);
  } finally {
    await page.close();
  }
}

for (const viewport of selectedViewports) {
  for (let index = 0; index < routes.length; index += 3) {
    await Promise.all(routes.slice(index, index + 3).map((route) => inspect(route, viewport)));
  }
}

await browser.close();
const total = routes.length * selectedViewports.length;
console.log(`\n${total - failures.length}/${total} checks passed`);
if (failures.length) process.exit(1);
