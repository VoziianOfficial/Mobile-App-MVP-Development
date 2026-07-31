# Kovexa Studio Website

## Project overview

This is a complete, responsive multi-page website for Kovexa Studio, a mobile app and MVP development studio. It uses semantic HTML, modern CSS, vanilla JavaScript, local lightweight AOS/Swiper/Lucide-compatible modules, and a PHP contact handler. There is no build process, package manager, framework, database, or external image dependency.

## File structure

- Main pages: `index.html`, `about.html`, `services.html`, `contact.html`
- Service pages: eight root-level `*.html` files
- Legal and utility pages: `privacy-policy.html`, `terms-of-service.html`, `cookie-policy.html`, `404.html`
- Shared configuration: `config/config.js`
- Shared styles and scripts: `assets/css/global.css`, `assets/js/app.js`, `assets/js/config-render.js`, `assets/js/page-transition.js`
- Page styles/scripts: in `assets/css/` and `assets/js/`
- Brand assets: `assets/images/`
- Local libraries: `assets/vendor/`
- Form endpoint: `contact.php`

## How to edit brand data

Edit `config/config.js`. The object deliberately uses strict JSON-compatible syntax: double quotes, no comments inside the object, no functions, no trailing commas, and no template strings. Keep that format because PHP reads the same object.

Brand name, legal name, tagline, navigation, repeated CTA labels, contact details, form options/messages, Advertise & Collaborate copy, footer content, and legal links are controlled there.

## How to edit email

Change both `contact.email` and `contact.recipientEmail` in `config/config.js`. They normally have the same value:

- `contact.email` controls visible email addresses and `mailto:` links.
- `contact.recipientEmail` controls the recipient used by `contact.php`.

The recipient is not duplicated in PHP.

## How config.js controls contact.php

`contact.php` reads `config/config.js`, extracts the `window.SITE_CONFIG` JSON object, decodes it, validates `contact.recipientEmail`, and uses `forms.successMessage` for the JSON success response. If parsing or validation fails, the handler returns a server configuration error and does not send mail.

## How to replace the logo

Replace `assets/images/logo-dark.svg`, `logo-light.svg`, and `favicon.svg`, or update the corresponding paths in `config/config.js`. Keep sensible SVG view boxes and accessible logo text. The dark logo is used on light surfaces; the light logo is used on dark surfaces.

## How to replace images

The current visual system is built with HTML, CSS, and SVG and does not depend on raster photography. Any new image should be placed directly in `assets/images/` (no page-specific image directories). Use optimised JPG for photography, PNG only for transparency when SVG is unsuitable, set `width` and `height`, add appropriate `alt`, and use `loading="lazy"` and `decoding="async"` below the fold.

## How to add a service

1. Create a root-level HTML page using the service page shell.
2. Add a modifier class to `<body>` and a unique `data-service` key.
3. Add its content data and link to `assets/js/service-detail.js`.
4. Add the service to the shared `services` list in `assets/js/app.js`.
5. Add the form option in `config/config.js` if required.
6. Add links from Services, Home, related-service logic, and relevant navigation.
7. Give the page unique title, description, canonical URL, Open Graph metadata, H1, and hero copy.

## How to run locally

From the project directory, run:

```bash
php -S 127.0.0.1:8008
```

Open `http://127.0.0.1:8008/index.html`. Opening HTML files directly can display the pages, but the PHP form requires a PHP server.

## PHP server requirements

- PHP 7.3+ (PHP 8.x recommended)
- Sessions enabled for short same-session spam protection
- `mail()` configured and permitted
- Read access to `config/config.js`
- HTTPS in production

## Why mail may not work locally

PHP's `mail()` requires a configured mail transport. The built-in local PHP server usually has no outgoing mail server, so a valid form can return a real server error. This is intentional: the handler never returns a fake success when `mail()` fails. Configure the host mail transport or adapt the handler to an approved SMTP/mail provider before production.

## Form testing

Test required-field errors, invalid email, missing consent, invalid select values, honeypot input, oversized requests, repeated submissions, config parse failure, successful mail, `mail()` failure, network errors, invalid JSON, double submission prevention, and the exact success message. Confirm that entered content remains after server or network errors.

## Production checklist

- Replace the temporary email and physical address.
- Replace `example.com` canonical and Open Graph URLs with the live domain.
- Confirm the legal company name and jurisdiction.
- Have every legal page reviewed by a qualified legal professional.
- Configure HTTPS, PHP sessions, outgoing mail, SPF/DKIM/DMARC, and server logging.
- Test form delivery and Reply-To behaviour on the production host.
- Confirm data retention, processors, analytics, cookies, and consent requirements.
- Add real production privacy/cookie tools if analytics or embedded third-party content is introduced.
- Validate all pages in current Chrome, Safari, Firefox, and Edge.
- Run HTML, accessibility, responsive, and performance checks.
- Configure the server to serve `404.html` for missing routes.
- Remove or replace any newly introduced placeholder image.

## Legal content review warning

The privacy, cookie, and terms pages are practical drafts, not legal advice. They must be reviewed and adapted by a qualified professional before production use.

## Image compression instructions

Keep a hero JPG below roughly 220 KB and normal JPG assets around 80–160 KB where visually acceptable. Strip metadata, use appropriate dimensions, avoid GIF/video, and keep the complete deployable project comfortably below 3 MB when possible.

## Final temporary data to replace

- `hello@kovexastudio.com`
- `24 Northbridge Avenue, Manchester, M1 4AX, United Kingdom`
- All `https://example.com/...` canonical URLs
- Legal wording and last-updated dates
- Production domain and server configuration
- Outgoing mail settings
- Any placeholder image added later
