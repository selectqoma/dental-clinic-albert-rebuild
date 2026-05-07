# Dental clinic template

This repo uses a reusable static template for clinic outreach builds. The page is driven by `data/dental-clinic-albert.js`; copy that file for the next clinic and update:

- Clinic name, local positioning, phone, booking URL and address.
- Service cards and patient commitments.
- Opening hours and FAQ entries.
- Asset paths for logo, hero, room and supporting images.

The layout is designed around current dental-site conversion patterns:

- Mobile-first hero with location, service fit and appointment CTA visible immediately.
- Sticky booking and phone actions.
- Service cards that can become dedicated SEO landing pages later.
- Visit information and map near the middle of the page, not buried in the footer.
- LocalBusiness/Dentist and FAQ JSON-LD generated from the data object.

For future clinic builds, keep the same file structure and swap only data plus assets unless the clinic needs a different positioning strategy.
