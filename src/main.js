import "./style.css";

const BOOKING_URL = "https://aicrm.geteasysoftware.com/shaad_unisexsalon/webapp/";
const MAP_URL = "https://share.google/ZmUFkZwmDAVp3thyx";
const PHONE_DISPLAY = "+91 97402 20816";
const PHONE_LINK = "+919740220816";
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = (pathname) => `${BASE_PATH}${pathname === "/" ? "/" : pathname}`;
const A = (name) => route(`/assets/${name}`);

const services = [
  {
    no: "01",
    slug: "hair-patch-service",
    title: "Hair Patch (Men)",
    category: "Hair Patch",
    price: "₹10,000–₹20,000",
    image: "hair-patch-fitting-shaad-v2.png",
    steps: ["Consultation", "Custom Fit", "Final Finish"],
    copy: "Natural-looking hair patch fitting, colour matching and styling tailored to your hairline, face shape and everyday routine."
  },
  {
    no: "02",
    slug: "wig-studio",
    title: "Women Wig",
    category: "Women Wig",
    price: "₹15,000–₹30,000",
    image: "u8DhJUVVof2cDZ7Fwv8ApyeKM.png",
    steps: ["Consultation", "Custom Selection", "Fit & Style"],
    copy: "Custom wig selection, fitting and styling with natural movement, comfortable wear and a finish made for you."
  },
  {
    no: "03",
    slug: "hair-cut-beard-styling",
    title: "Hair Cut | Beard | Styling (package)",
    category: "Cut & Style",
    price: "₹350–₹1,000",
    image: "haircut-by-shaad-v2.png",
    steps: ["Consultation", "Cut & Style", "Final Touch"],
    copy: "Precision haircuts, beard shaping and personalised styling designed around your face shape, hair type and everyday routine."
  },
  {
    no: "04",
    slug: "balayage-colour",
    title: "Balayage & Colour",
    category: "Colour Service",
    price: "₹2,500–₹10,000",
    image: "mlV8al09zPk66TU8RIxeoZo1frY.png",
    steps: ["Consultation", "Colour Apply", "Toning"],
    copy: "Hand-painted colour blended to your skin tone for a natural, dimensional, sun-kissed finish."
  },
  {
    no: "05",
    slug: "manicure-pedicure",
    title: "Manicure | Pedicure",
    category: "Nail & Foot Care",
    price: "₹450–₹2,000",
    image: "e4IJbesQHoQJaLQJihEPYSLBkL4.png",
    steps: ["Consultation", "Care Ritual", "Shine"],
    copy: "Professional manicure and pedicure care for healthy nails, soft skin and beautifully groomed hands and feet."
  },
  {
    no: "06",
    slug: "keratin-botox-nano-plastia-treatment",
    title: "Hair Treatment",
    category: "Smoothing Treatment",
    price: "₹4,000–₹12,000",
    image: "8KbEeB46GCwtGk07eW7qODXnsl8.png",
    steps: ["Consultation", "Treatment", "Blow Dry"],
    copy: "Keratin, botox and nanoplastia treatments that repair damage, reduce frizz and restore healthy shine."
  },
  {
    no: "07",
    slug: "waxing",
    title: "Waxing",
    category: "Skin & Body Care",
    price: "₹100–₹3,500",
    image: "hqSdeyircBMGC2y1hYU92XXlnI.png",
    steps: ["Consultation", "Gentle Waxing", "Soothe"],
    copy: "Gentle, hygienic face and body waxing performed with premium wax and calming post-care."
  },
  {
    no: "08",
    slug: "bridal-makeup-services",
    title: "Bridal | Makeup Services",
    category: "Special Occasion",
    price: "₹2,500–₹20,000",
    image: "QK5AKIktgXoTG04F4jbCisKUA.jpg",
    steps: ["Trial Session", "Day-of Makeup", "Shine All Day"],
    copy: "HD and airbrush bridal makeup, hairstyling and long-lasting wedding looks for every celebration."
  }
];

const categoryImages = [
  ["Hair Patch", "hair-patch-fitting-shaad-v2.png"],
  ["Women Wig", "u8DhJUVVof2cDZ7Fwv8ApyeKM.png"],
  ["Balayage & Colour", "81ZKndk2HddfOlpVEwnxRwrc.png"],
  ["Hair Treatment", "Ixc0t5m0qcEUpWpV6WKOiOaVh2s.png"],
  ["Styling", "haircut-by-shaad-v2.png"],
  ["Beauty Services", "OvAIZ6VLtdhXs5BiZtDjogliq4.png"],
  ["Waxing & Threading", "M5whEahwJcZcPBdYajxmd1EDWug.png"]
];

const testimonials = [
  ["Layla Hassan", "Entrepreneur", "My stylist remembered exactly what I wanted from my previous visit.", "MTzvy2YMbJHtGfyWm1SGkwf0Y4.png"],
  ["Laxmi Shenoy", "Graphic Designer", "Every stylist here is incredibly skilled and makes you feel comfortable.", "AzMGwjH66B2dKRrDvhqdCqUmWQ.png"],
  ["Sagar Deshpande", "Civil Engineer", "Professional, warm, and genuinely talented—Shaad is in a different league.", "15N8fgmUNrB3VRAzed4FbL7skA.png"],
  ["Christabel D'souza", "Yoga Instructor", "Walked out feeling like a completely different and confident woman.", "G8ze2wc9A6tpBrEBPJTYKazT5G8.png"],
  ["Nawaz Amir", "Marketing Manager", "Shaad completely transformed my hair and my confidence too.", "r8YZt4705esoK0I3qcn5f40PD8.png"]
];

const button = (label, href, kind = "primary") => `<a class="button button--${kind}" href="${href.startsWith("/") ? route(href) : href}">${label}<span aria-hidden="true">→</span></a>`;
const eyebrow = (text) => `<p class="eyebrow">[ ${text} ]</p>`;

function siteHeader() {
  const links = [["Home", "/"], ["Services", "/services"], ["Visit us", "/contact"]];
  return `<header class="site-header" data-header>
    <a class="wordmark" href="${route("/")}" aria-label="Shaad Unisex Salon home">
      <span class="wordmark__mark">S</span><span class="wordmark__text"><b>SHAAD</b><small>UNISEX SALON</small></span>
    </a>
    <nav id="site-navigation" aria-label="Main navigation">
      ${links.map(([label, href]) => `<a href="${route(href)}"${path === href ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      <a class="nav-book" href="${BOOKING_URL}">Book now <span aria-hidden="true">↗</span></a>
    </nav>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Open navigation"><span></span><span></span></button>
  </header>`;
}

function siteFooter() {
  return `<footer class="site-footer" id="footer">
    <div class="footer-cta shell">
      <div>${eyebrow("YOUR NEXT LOOK")}<h2>YOUR CHAIR<br>IS WAITING.</h2></div>
      <div class="footer-cta__action"><p>Choose your service and preferred time. We’ll take care of everything after that.</p>${button("Book an appointment", BOOKING_URL, "light")}</div>
    </div>
    <div class="footer-directory shell">
      <div class="footer-brand">
        <a class="footer-wordmark" href="${route("/")}"><span>S</span><strong>SHAAD<small>UNISEX SALON</small></strong></a>
        <p>Hair patch fitting, wig studio services and considered beauty artistry in the heart of BTM Layout.</p>
      </div>
      <div class="footer-column"><p class="footer-label">Visit</p><address>5th C Cross, No. 10<br>16th Main Road, BTM 2nd Stage<br>Bengaluru, Karnataka 560076</address><a class="text-link" href="${MAP_URL}" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div>
      <div class="footer-column"><p class="footer-label">Hours</p><p>Monday–Sunday<br><strong>10:00 AM–10:00 PM</strong></p><span class="open-note"><i></i> Open all seven days</span></div>
      <div class="footer-column"><p class="footer-label">Contact</p><a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a><a href="mailto:shaadunisexsalon1@gmail.com">shaadunisexsalon1@gmail.com</a><a href="https://www.instagram.com/shaad_unisex_salon_/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div>
    </div>
    <a class="footer-map shell" href="${MAP_URL}" target="_blank" rel="noopener noreferrer" aria-label="Open Shaad Unisex Salon location in Google Maps">
      <span class="map-pin" aria-hidden="true"><i></i></span><span><b>BTM LAYOUT 2ND STAGE</b><small>Get directions to Shaad</small></span><strong>OPEN DAILY<br>10 AM–10 PM</strong><em>↗</em>
    </a>
    <div class="footer-bottom shell"><span>© ${new Date().getFullYear()} Shaad Unisex Salon</span><span>BTM Layout · Bengaluru</span><a class="footer-credit" href="https://odessis.in/" target="_blank" rel="noopener noreferrer" aria-label="Designed and built by Odessis. Visit odessis.in."><svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M32 7C18.19 7 7 18.19 7 32s11.19 25 25 25 25-11.19 25-25c0-10.87-6.94-20.12-16.63-23.56"/><path d="M32 7v15M32 57V31M25 38l7-7 7 7"/></svg><span>Designed &amp; built by <b>ODESSIS</b> <i>↗</i></span></a></div>
  </footer>`;
}

function pageHero({label, title, copy, primary = ["Explore services", "/services"], secondary = ["Contact us", "/contact"]}) {
  return `<section class="page-hero shell">
    <div>${eyebrow(label)}<h1>${title}</h1><p>${copy}</p><div class="button-row">${button(...primary)}${button(...secondary, "light")}</div></div>
    <span class="scroll-hint">SCROLL DOWN ↓</span>
  </section>`;
}

function serviceCard(s, compact = false) {
  return `<article class="service-card ${compact ? "service-card--compact" : ""}">
    <div class="service-card__head"><span class="service-no">[ ${s.no} ]</span><h3>${s.title}</h3><div class="step-chips">${s.steps.map(x => `<span>${x}</span>`).join("")}</div></div>
    <div class="service-card__body"><a class="service-image" href="${route(`/services/${s.slug}`)}"><img src="${A(s.image)}" alt="${s.title} at Shaad Unisex Salon" loading="lazy"></a>
      <div class="service-copy">${eyebrow(s.category)}<h4>${s.title}</h4><p>${s.copy}</p><p class="price"><span>Price range</span><b>${s.price}</b></p>${button("Book Service", BOOKING_URL)}</div>
    </div>
  </article>`;
}

function homePage() {
  return `${siteHeader()}<main>
    <section class="home-hero">
      <div class="hero-gallery" aria-hidden="true">
        <figure class="hero-slide hero-slide--one"><img src="${A("agmc4ejViJdDVQUMzNkiJWBw.png")}" alt="" fetchpriority="high"></figure>
        <figure class="hero-slide hero-slide--two"><img src="${A("8IPKU3CSOTLRqXlFCbzN4z4ceDU.png")}" alt=""></figure>
        <figure class="hero-slide hero-slide--three"><img src="${A("OvAIZ6VLtdhXs5BiZtDjogliq4.png")}" alt=""></figure>
      </div>
      <div class="home-hero__shade"></div>
      <div class="home-hero__copy"><p class="hero-label"><b>#01</b> BTM LAYOUT · BENGALURU</p><h1>SHAAD</h1><h2>UNISEX SALON</h2><p class="hero-sub">HAIR PATCH | WIG STUDIO</p><p class="hero-intro">Specialists in natural-looking hair patch fitting, wig styling and complete hair care.</p><div class="button-row">${button("Explore services", "#services", "light")}${button("Book now", BOOKING_URL, "glass")}</div></div>
      <div class="hero-progress" aria-hidden="true"><span></span><span></span><span></span></div>
      <a class="hero-location" href="${MAP_URL}" target="_blank" rel="noopener noreferrer">BTM 2nd Stage <span>↗</span></a>
    </section>
    <section class="intro shell">
      <div class="rating">★★★★★<small>4.9/5 (986+ Reviews)</small></div>
      <h2>PRECISION YOU CAN SEE.<br> CARE YOU CAN FEEL.</h2>
      ${button("Book Appointment", BOOKING_URL)}
      <div class="category-grid" data-category-rail>${categoryImages.map(([name,img], index) => `<a class="${index === 0 ? "is-active" : ""}" data-category-card href="${route("/services")}" style="--bg:url('${A(img)}')"><span>${name}</span></a>`).join("")}</div>
    </section>
    <section class="services-home shell" id="services">
      <div class="services-home__lead"><div>${eyebrow("SERVICES AT SHAAD")}<h2>Specialist first.<br>Complete care.</h2></div><p>Start with the service you came for, then explore the rest of Shaad’s salon craft.</p>${button("Book now", BOOKING_URL)}</div>
      <div class="service-list">${services.map(s => serviceCard(s, true)).join("")}</div>
      <div class="center-action">${button("View all services", "/services", "light")}</div>
    </section>
    <section class="benefits shell">
      <div class="section-heading">${eyebrow("BENEFITS")}<h2>WHY US?</h2><p>Elevate your hair with bespoke styling, premium products and unmatched salon care.</p>${button("Book now", BOOKING_URL)}</div>
      <div class="benefit-grid">
        <article class="benefit-photo" style="--bg:url('${A("gDJMv9iYSRwNhzhbXFBaNLeJHTA.png")}')"><span class="benefit-kicker">The Shaad standard</span><h3>CRAFTED WITH PASSION</h3><p>Precision, patience and genuine expertise in every appointment.</p></article>
        <article class="benefit-product"><div><span class="benefit-kicker">What touches your hair matters</span><h3>PURE PRODUCTS</h3><p>Professional-grade formulas chosen for performance, finish and hair health.</p><div class="step-chips"><span>Hydrating</span><span>Salon grade</span><span>Nourishing</span></div></div><img src="${A("KpBJycQ9fSvHUKpGVFzBcMyfcnI.png")}" alt="Professional hair care products used at Shaad" loading="lazy"></article>
        <article class="stat benefit-proof"><div class="proof-stack" aria-hidden="true"><img src="${A("N1i6uemufQo1zAbIu5aTL3029HA.png")}" alt=""><img src="${A("ZY6VgawMfIG8qkGmrrc1iz3aIS0.png")}" alt=""><img src="${A("u8DhJUVVof2cDZ7Fwv8ApyeKM.png")}" alt=""></div><strong>550+</strong><p>Signature looks completed by our team each month.</p></article>
        <article class="benefit-finish"><img src="${A("Uyo8sm84HOtQRSTmyrEzbB0mIM.png")}" alt="Polished hair finish at Shaad" loading="lazy"><span>THE FINISH IS<br>THE DIFFERENCE</span></article>
        <article class="benefit-care"><div><span class="benefit-kicker">Beyond the chair</span><h3>CARE CONTINUES</h3><p>Your hair journey continues at home with clear recommendations from your stylist.</p><div class="step-chips"><span>Maintain</span><span>Nourish</span><span>Elevate</span></div></div><img src="${A("7E2QVcFqNFwp6HX08zYvWZgkyuE.png")}" alt="Professional styling product recommended at Shaad" loading="lazy"></article>
        <article class="stat benefit-satisfaction"><span class="benefit-kicker">Client confidence</span><strong>99%</strong><p>Clients leave satisfied with the care they receive.</p></article>
      </div>
    </section>
    <section class="salon-film reveal"><video autoplay muted loop playsinline preload="metadata" poster="${A("8IPKU3CSOTLRqXlFCbzN4z4ceDU.png")}"><source src="${A("salon-film.mp4")}" type="video/mp4"></video><div class="film-caption"><span>INSIDE SHAAD</span><p>Real craft. Real clients. Every day.</p></div></section>
    <section class="reviews shell">
      <div class="review-lead"><div class="rating">★★★★★<small>5.0 (300+ Reviews)</small></div><h2>THE ATTENTION TO DETAIL AT SHAAD UNISEX SALON IS UNLIKE ANYTHING I HAVE EXPERIENCED AT A SALON.</h2><p>Ruchika Sharma · Software Engineer</p></div>
      <div class="review-orbit" aria-label="Client reviews"><div class="orbit-core"><span>5.0</span><small>CLIENT LOVE</small></div>${testimonials.map(([name,role,quote,img], index) => `<article class="orbit-card" style="--i:${index}"><div class="orbit-card__inner"><img src="${A(img)}" alt="${name}" loading="lazy"><div><p>★★★★★</p><blockquote>${quote}</blockquote><h3>${name}</h3><span>${role}</span></div></div></article>`).join("")}</div>
    </section>
    <section class="process shell">
      <div class="section-heading">${eyebrow("HOW IT WORKS")}<h2>PROCESS</h2><p>A simple three-step appointment designed entirely around you and your hair.</p>${button("Book now", BOOKING_URL)}</div>
      <div class="process-experience">
        <div class="process-visual"><img data-process-image src="${A("agmc4ejViJdDVQUMzNkiJWBw.png")}" alt="Consultation at Shaad"><span data-process-count>01 / 03</span></div>
        <div class="process-tabs" role="tablist" aria-label="Appointment process">
          <button class="process-tab is-active" type="button" role="tab" aria-selected="true" data-image="agmc4ejViJdDVQUMzNkiJWBw.png" data-alt="Consultation at Shaad"><b>01</b><span><strong>BOOK &amp; CONSULT</strong><small>Book online, then meet your stylist for a focused one-on-one consultation.</small></span></button>
          <button class="process-tab" type="button" role="tab" aria-selected="false" data-image="8IPKU3CSOTLRqXlFCbzN4z4ceDU.png" data-alt="Hair treatment in progress at Shaad"><b>02</b><span><strong>CUSTOM TREATMENT</strong><small>Precision, care and full attention—chosen for your texture and goal.</small></span></button>
          <button class="process-tab" type="button" role="tab" aria-selected="false" data-image="mlV8al09zPk66TU8RIxeoZo1frY.png" data-alt="Finished salon styling"><b>03</b><span><strong>FINAL TOUCH</strong><small>We finish, style and send you out looking and feeling your best.</small></span></button>
        </div>
      </div>
    </section>
  </main>${siteFooter()}`;
}

function servicesPage() {
  return `${siteHeader()}<main>${pageHero({label:"WHAT WE OFFER",title:"HAIR PATCH & WIG STUDIO",copy:"Natural-looking hair patch fitting and custom wig services in BTM Layout, alongside the cuts, colour, treatments and beauty care Shaad is known for."})}<section class="service-page-list shell">${services.map(s => serviceCard(s)).join("")}</section></main>${siteFooter()}`;
}

function contactPage() {
  return `${siteHeader()}<main>${pageHero({label:"GET IN TOUCH",title:"CONTACT",copy:"From bookings to general enquiries, our friendly team is available every day across all of our channels.",primary:["Book appointment",BOOKING_URL],secondary:["Explore services","/services"]})}
    <section class="contact-grid shell"><img src="${A("HP6FFojOSOXx6e7xHUG8MpYxkw.png")}" alt="Elegant salon hairstyle"><div class="contact-panel"><h2>OPENING HOURS</h2><dl><div><dt>Monday–Sunday</dt><dd>10:00 AM–10:00 PM</dd></div></dl><h2>FIND US</h2><p><a href="${MAP_URL}" target="_blank" rel="noopener noreferrer">5th C Cross, No. 10, 16th Main Road<br>BTM Layout 2nd Stage<br>Bengaluru, Karnataka 560076</a></p><h2>CONTACT</h2><a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a><a href="mailto:shaadunisexsalon1@gmail.com">shaadunisexsalon1@gmail.com</a><a href="${BOOKING_URL}">Book online →</a><h2>SOCIALS</h2><a href="https://www.instagram.com/shaad_unisex_salon_/" aria-label="Shaad Unisex Salon on Instagram">Instagram</a></div></section>
  </main>${siteFooter()}`;
}

const detailCopy = {
  "hair-cut-beard-styling": ["What Is Precision Styling?", "Every haircut and beard service begins with face-shape analysis and a conversation about the way you actually style at home."],
  "balayage-colour": ["Balayage & Hair Colour in Bengaluru", "Our colour specialists customise every formula to your complexion, base colour and desired maintenance level."],
  "manicure-pedicure": ["Professional Hand & Foot Care", "A hygienic, restorative ritual covering nail shaping, cuticle care, exfoliation, massage and optional polish."],
  "hair-patch-service": ["Natural Hair Patch Fitting", "Every patch is colour-matched, shaped and fitted for comfort, confidence and a natural finish."],
  "wig-studio": ["A Women’s Wig Service Built Around You", "Choose a natural-looking wig, then make it yours with careful fitting, shaping and styling."],
  "keratin-botox-nano-plastia-treatment": ["Advanced Hair Repair", "Keratin, hair botox and nanoplastia are selected after a full hair analysis to smooth, strengthen and restore shine."],
  "waxing": ["Gentle, Hygienic Waxing", "Premium wax, careful preparation and calming aftercare deliver smooth skin with minimal irritation."],
  "bridal-makeup-services": ["Bridal Makeup in Bengaluru", "HD and airbrush makeup, bridal hairstyling and draping are composed around your features, outfit and celebration." ]
};

function serviceDetailPage(s) {
  const [heading, copy] = detailCopy[s.slug];
  return `${siteHeader()}<main class="detail-page"><section class="detail-hero"><img src="${A(s.image)}" alt="${s.title}"><div><a href="${route("/services")}">← GO BACK</a>${eyebrow(s.category)}<h1>${s.title}</h1><p>${s.copy}</p>${button("Book now",BOOKING_URL)}</div></section>
    <section class="detail-meta shell"><div><span>Duration</span><b>45–180 minutes</b></div><div><span>Includes</span><b>${s.steps.join(" · ")}</b></div><div><span>Availability</span><b>Monday–Sunday</b></div><div><span>Price range</span><b>${s.price}</b></div></section>
    <section class="detail-about shell">${eyebrow("ABOUT THIS SERVICE")}<h2>${heading}</h2><p>${copy}</p><p>${s.copy} Our specialists use professional products, hygienic tools and deliberate technique so the result looks considered, lasts well and feels completely yours.</p></section>
    <section class="included shell">${eyebrow("WHAT'S INCLUDED")}<h2>EVERYTHING IN<br>ONE VISIT</h2><div>${s.steps.concat(["Personalised aftercare", "Final quality check"]).map((x,i)=>`<article><b>0${i+1}</b><h3>${x}</h3><p>Handled with precision, care and recommendations tailored to you.</p></article>`).join("")}</div></section>
  </main>${siteFooter()}`;
}

function notFoundPage() {
  return `${siteHeader()}<main class="not-found shell">${eyebrow("404")}<h1>WRONG TURN.<br>GOOD HAIR AHEAD.</h1><p>The page moved, but your appointment does not have to.</p>${button("Back home","/")}</main>${siteFooter()}`;
}

const browserPath = BASE_PATH && location.pathname.startsWith(BASE_PATH)
  ? location.pathname.slice(BASE_PATH.length)
  : location.pathname;
const path = browserPath.replace(/\/$/, "") || "/";
document.body.classList.toggle("home-route", path === "/");
let html;
if (path === "/") html = homePage();
else if (path === "/services") html = servicesPage();
else if (path === "/contact") html = contactPage();
else if (path.startsWith("/services/")) {
  const requestedSlug = path.slice("/services/".length);
  const legacySlug = requestedSlug === "hair-patch-wig-service" ? "hair-patch-service" : requestedSlug;
  html = serviceDetailPage(services.find(s => s.slug === legacySlug) || services[0]);
}
else html = notFoundPage();

document.querySelector("#app").innerHTML = html;

const menu = document.querySelector(".menu-button");
menu?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", scrollY > 24);
updateHeader();
addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll(".process-tab").forEach((tab, index) => tab.addEventListener("click", () => {
  document.querySelectorAll(".process-tab").forEach(item => {
    item.classList.toggle("is-active", item === tab);
    item.setAttribute("aria-selected", String(item === tab));
  });
  const image = document.querySelector("[data-process-image]");
  if (image) {
    image.classList.add("is-changing");
    setTimeout(() => {
      image.src = A(tab.dataset.image);
      image.alt = tab.dataset.alt;
      image.classList.remove("is-changing");
    }, 180);
  }
  const count = document.querySelector("[data-process-count]");
  if (count) count.textContent = `0${index + 1} / 03`;
}));

const categoryRail = document.querySelector("[data-category-rail]");
const categoryCards = [...document.querySelectorAll("[data-category-card]")];
if (categoryRail && categoryCards.length) {
  let activeCategory = 0;
  let categoryTimer;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const desktopRail = matchMedia("(min-width: 901px)");
  const activateCategory = (index) => {
    activeCategory = index;
    categoryCards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
  };
  const stopCategoryRail = () => clearInterval(categoryTimer);
  const startCategoryRail = () => {
    stopCategoryRail();
    if (reduceMotion.matches || !desktopRail.matches) return;
    categoryTimer = setInterval(() => activateCategory((activeCategory + 1) % categoryCards.length), 3400);
  };
  categoryCards.forEach((card, index) => {
    card.addEventListener("pointerenter", () => { stopCategoryRail(); activateCategory(index); });
    card.addEventListener("focus", () => { stopCategoryRail(); activateCategory(index); });
  });
  categoryRail.addEventListener("pointerleave", startCategoryRail);
  categoryRail.addEventListener("focusout", event => !categoryRail.contains(event.relatedTarget) && startCategoryRail());
  startCategoryRail();
}

const revealObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible"));
}, { threshold: .12 }) : null;
document.querySelectorAll(".reveal, .service-card, .benefit-grid article, .team-grid article").forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const target = document.querySelector(a.getAttribute("href"));
  if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
}));

const routeTitles = {
  "/": "Shaad Unisex Salon | Hair Patch & Wig Studio in Bengaluru",
  "/services": "Hair Patch & Wig Studio Services | Shaad Bengaluru",
  "/contact": "Contact Shaad Unisex Salon | BTM Layout, Bengaluru",
  "/services/hair-cut-beard-styling": "Haircut & Beard Styling in BTM | Shaad Unisex Salon",
  "/services/balayage-colour": "Balayage & Hair Colour in BTM | Shaad Unisex Salon",
  "/services/manicure-pedicure": "Manicure & Pedicure in BTM | Shaad Unisex Salon",
  "/services/hair-patch-service": "Hair Patch for Men in Bengaluru | Shaad Unisex Salon",
  "/services/wig-studio": "Women Wig in Bengaluru | Shaad Unisex Salon",
  "/services/hair-patch-wig-service": "Hair Patch for Men in Bengaluru | Shaad Unisex Salon",
  "/services/keratin-botox-nano-plastia-treatment": "Keratin, Botox & Nanoplastia in BTM | Shaad Salon",
  "/services/waxing": "Waxing Services in BTM Layout | Shaad Unisex Salon",
  "/services/bridal-makeup-services": "Bridal Makeup in BTM Layout | Shaad Unisex Salon",
};
const routeDescriptions = {
  "/": "Shaad is a specialist hair patch and wig studio in BTM Layout, Bengaluru, offering natural-looking fitting, styling and complete salon care.",
  "/services": "Explore specialist hair patch fitting and wig studio services in BTM Layout, followed by haircuts, colour, treatments and beauty care at Shaad.",
  "/contact": "Visit Shaad Unisex Salon at 16th Main Road, BTM 2nd Stage, Bengaluru. Open daily 10 AM–10 PM. Call +91 97402 20816 or book online.",
  "/services/hair-cut-beard-styling": "Book precision haircuts, beard shaping and personalised styling at Shaad Unisex Salon in BTM Layout, Bengaluru.",
  "/services/balayage-colour": "Get personalised balayage and professional hair colour at Shaad in BTM Layout, Bengaluru, blended for your complexion and lifestyle.",
  "/services/manicure-pedicure": "Book hygienic manicure and pedicure care in BTM Layout, Bengaluru, with nail shaping, cuticle care, exfoliation and a restorative finish at Shaad.",
  "/services/hair-patch-service": "Get natural-looking hair patch fitting, colour matching and styling at Shaad Unisex Salon in BTM Layout, Bengaluru.",
  "/services/wig-studio": "Find a custom wig studio in BTM Layout, Bengaluru for natural-looking wig selection, fitting and styling at Shaad.",
  "/services/keratin-botox-nano-plastia-treatment": "Book keratin, hair botox and nanoplastia treatments in BTM Layout, Bengaluru, for smoother, stronger and frizz-controlled hair at Shaad.",
  "/services/waxing": "Book gentle, hygienic face and body waxing in BTM Layout, Bengaluru, with premium wax and calming aftercare at Shaad Unisex Salon.",
  "/services/bridal-makeup-services": "Book HD and airbrush bridal makeup, hairstyling and draping in Bengaluru, tailored to your features, outfit and celebration at Shaad.",
};
const seoTitle = routeTitles[path] || "Page Not Found | Shaad Unisex Salon";
const seoDescription = routeDescriptions[path] || "Return to Shaad Unisex Salon for specialist hair patch, wig studio and complete salon services in BTM Layout, Bengaluru.";
document.title = seoTitle;
document.querySelector('meta[name="description"]')?.setAttribute("content", seoDescription);
document.querySelector('meta[property="og:title"]')?.setAttribute("content", seoTitle);
document.querySelector('meta[property="og:description"]')?.setAttribute("content", seoDescription);
document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", seoTitle);
document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", seoDescription);
