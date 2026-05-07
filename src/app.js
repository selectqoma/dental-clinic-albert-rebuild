import { clinic } from "../data/dental-clinic-albert.js";

const $ = (selector) => document.querySelector(selector);

function setText(selector, value) {
  const node = $(selector);
  if (node) node.textContent = value;
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function renderServices() {
  const list = $("#services-list");
  clinic.services.forEach((service, index) => {
    const article = createEl("article", "service-card");
    article.style.setProperty("--accent-delay", `${index * 80}ms`);
    article.append(createEl("p", "eyebrow", `0${index + 1}`));
    article.append(createEl("h3", "", service.title));
    article.append(createEl("p", "", service.text));

    const points = createEl("ul", "service-points");
    service.points.forEach((point) => points.append(createEl("li", "", point)));
    article.append(points);
    list.append(article);
  });
}

function renderHours() {
  const list = $("#hours-list");
  clinic.hours.forEach(([day, time]) => {
    const row = createEl("li", "hours-row");
    row.append(createEl("span", "", day));
    row.append(createEl("strong", "", time));
    list.append(row);
  });
}

function renderCommitments() {
  const list = $("#commitments-list");
  clinic.commitments.forEach((item) => {
    const article = createEl("article", "commitment");
    article.append(createEl("h3", "", item.title));
    article.append(createEl("p", "", item.text));
    list.append(article);
  });
}

function renderFaqs() {
  const list = $("#faq-list");
  clinic.faqs.forEach((faq) => {
    const details = createEl("details", "faq-item");
    details.append(createEl("summary", "", faq.question));
    details.append(createEl("p", "", faq.answer));
    list.append(details);
  });
}

function renderSchema() {
  const sameAs = ["https://dentalclinicalbert.be/en/homepage/"];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    description: clinic.description,
    telephone: clinic.phoneDisplay,
    url: window.location.href,
    image: new URL(clinic.assets.hero, window.location.href).href,
    sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      postalCode: clinic.address.postalCode,
      addressLocality: clinic.address.city,
      addressCountry: clinic.address.country,
    },
    openingHoursSpecification: clinic.hours.map(([day, time]) => {
      const [opens, closes] = time.split(" - ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens,
        closes,
      };
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dental services",
      itemListElement: clinic.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clinic.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const script = createEl("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify([schema, faqSchema]);
  document.head.append(script);
}

function hydrateLinks() {
  document.querySelectorAll("[data-booking]").forEach((link) => {
    link.setAttribute("href", clinic.bookingUrl);
  });
  document.querySelectorAll("[data-phone]").forEach((link) => {
    link.setAttribute("href", clinic.phoneHref);
  });
  document.querySelectorAll("[data-map]").forEach((link) => {
    link.setAttribute("href", clinic.address.mapUrl);
  });
}

function renderClinic() {
  document.documentElement.lang = clinic.locale;
  document.title = `${clinic.name} | Dentist in Forest near Uccle`;
  $("meta[name='description']").setAttribute("content", clinic.description);

  $("#brand-logo").src = clinic.assets.logo;
  $("#brand-logo").alt = `${clinic.name} logo`;
  $("#hero-image").src = clinic.assets.hero;
  $("#hero-image").alt = "Treatment room at Dental Clinic Albert";
  $("#room-image").src = clinic.assets.room;
  $("#room-image").alt = "Bright clinical space at Dental Clinic Albert";
  $("#chair-image").src = clinic.assets.chair;
  $("#chair-image").alt = "Dental chair and equipment at Dental Clinic Albert";

  setText("[data-clinic-name]", clinic.name);
  setText("[data-tagline]", clinic.tagline);
  setText("[data-description]", clinic.description);
  setText("[data-phone-label]", clinic.phoneDisplay);
  setText("[data-address]", `${clinic.address.street}, ${clinic.address.postalCode} ${clinic.address.city}`);

  hydrateLinks();
  renderServices();
  renderHours();
  renderCommitments();
  renderFaqs();
  renderSchema();
}

renderClinic();
