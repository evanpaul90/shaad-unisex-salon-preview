import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceImage = join(projectRoot, "assets-source", "og-background-v1.png");
const publicRoot = join(projectRoot, "public");
const iconRoot = join(publicRoot, "icons");
const ogRoot = join(publicRoot, "og");
await mkdir(iconRoot, { recursive: true });
await mkdir(ogRoot, { recursive: true });

const background = (await readFile(sourceImage)).toString("base64");
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.setContent(`<!doctype html><html><head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Red+Rose:wght@700&family=Rethink+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#171313}
    #card{position:relative;width:1200px;height:630px;overflow:hidden;background:#171313;color:#f4ecdf}
    #card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(23,19,19,.98) 0%,rgba(36,13,12,.94) 34%,rgba(23,19,19,.3) 67%,rgba(23,19,19,.08) 100%)}
    .frame{position:absolute;inset:26px;border:1px solid rgba(244,236,223,.26)}
    .copy{position:absolute;left:72px;top:62px;width:575px}
    .kicker{display:inline-flex;align-items:center;gap:12px;font:700 17px/1 'Rethink Sans',sans-serif;letter-spacing:.16em}
    .kicker b{padding:10px 12px;background:#f4ecdf;color:#48120e;letter-spacing:0}
    .accent{width:34px;height:5px;margin:49px 0 21px;border-radius:9px;background:#c52b31;box-shadow:20px -14px 0 -1px #d9a49a}
    h1{margin:0;font:700 105px/.82 'Red Rose',serif;letter-spacing:-.07em}
    h2{margin:19px 0 0;font:800 39px/.95 'Rethink Sans',sans-serif;letter-spacing:-.035em}
    .services{margin:30px 0 0;font:700 17px/1.2 'Rethink Sans',sans-serif;letter-spacing:.08em;color:#ead8cf}
    .bottom{position:absolute;left:72px;right:72px;bottom:62px;display:flex;align-items:flex-end;justify-content:space-between;font-family:'Rethink Sans',sans-serif}
    .location{font-size:18px;font-weight:700;letter-spacing:.08em}.location small{display:block;margin-top:7px;font-size:13px;font-weight:500;letter-spacing:.03em;color:#d9a49a}
    .book{padding:14px 18px;background:#f4ecdf;color:#48120e;font-size:15px;font-weight:800;letter-spacing:.08em}
  </style></head><body><div id="card">
    <img src="data:image/png;base64,${background}" alt="">
    <div class="shade"></div><div class="frame"></div>
    <div class="copy"><div class="kicker"><b>#01</b><span>PREMIUM UNISEX SALON</span></div><div class="accent"></div><h1>SHAAD</h1><h2>UNISEX SALON</h2><p class="services">HAIR · BEAUTY · PATCH · WIG · BRIDAL</p></div>
    <div class="bottom"><div class="location">BTM LAYOUT · BENGALURU<small>Open daily · 10 AM–10 PM</small></div><div class="book">BOOK ONLINE →</div></div>
  </div></body></html>`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.locator("#card").screenshot({ path: join(ogRoot, "shaad-unisex-salon.jpg"), type: "jpeg", quality: 88 });

const iconMarkup = (size, maskable = false) => `<!doctype html><html><head><style>
  *{box-sizing:border-box}html,body{margin:0;width:${size}px;height:${size}px;overflow:hidden;background:${maskable ? "#48120e" : "transparent"}}
  .icon{position:absolute;inset:${maskable ? Math.round(size * .11) : 0}px;border-radius:${Math.round(size * .235)}px;background:#48120e;display:grid;place-items:center;box-shadow:inset 0 0 0 ${Math.max(1,Math.round(size*.018))}px rgba(244,236,223,.13)}
  .icon:after{content:"";position:absolute;right:${Math.round(size*(maskable ? .03 : .16))}px;top:${Math.round(size*(maskable ? .06 : .16))}px;width:${Math.max(2,Math.round(size*.14))}px;height:${Math.max(1,Math.round(size*.045))}px;border-radius:999px;background:#c52b31}
  span{transform:translateY(-${Math.round(size*.015)}px);font-family:Georgia,serif;font-size:${Math.round(size*.72)}px;font-weight:700;line-height:1;color:#f4ecdf}
</style></head><body><div class="icon"><span>S</span></div></body></html>`;

for (const [name, size, maskable] of [
  ["favicon-16.png", 16, false], ["favicon-32.png", 32, false], ["apple-touch-icon.png", 180, false],
  ["mstile-150.png", 150, false], ["icon-192.png", 192, false], ["icon-512.png", 512, false],
  ["icon-maskable-512.png", 512, true],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(iconMarkup(size, maskable));
  await page.screenshot({ path: join(iconRoot, name), omitBackground: !maskable, type: "png" });
}

await browser.close();
