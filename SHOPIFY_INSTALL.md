# Lensy Shopify landing page setup

This repo now includes Shopify Online Store 2.0 page templates for the two uploaded Lensy landing pages.

## Added files

- `sections/lensy-shopify-landing.liquid`
- `templates/page.lensy-product.json`
- `templates/page.lensy-prelander.json`

## What each template does

### Product landing page
Use this for the full Lensy product landing page:

- Shopify template name: `page.lensy-product`
- Source page loaded: `index.html`
- Product form replaces/attaches to the `#shop` area

### Prelander
Use this for the article/prelander page:

- Shopify template name: `page.lensy-prelander`
- Source page loaded: `prelander.html`
- Product form can replace/attach to the `#shop` area if the prelander has one, otherwise it appends the offer section

## Important Shopify asset rule

Shopify serves theme assets from the theme `assets` folder using `{{ 'filename.ext' | asset_url }}`.

That means your image/CSS/JS files must be available in Shopify theme assets with the same flat filenames, for example:

- `lensy-logo.svg`
- `hero-petri-split.png`
- `hero-hand-lensy.png`
- `product-1.jpg`
- `site.css`
- `vivi.css`
- `site.js`
- `vivi.js`

The adapter rewrites paths like:

```html
assets/lensy-logo.svg
css/site.css
assets/site.js
```

into Shopify theme asset URLs.

## Install steps

1. Copy `sections/lensy-shopify-landing.liquid` into your Shopify theme `sections` folder.
2. Copy both JSON templates into your Shopify theme `templates` folder:
   - `page.lensy-product.json`
   - `page.lensy-prelander.json`
3. Upload all Lensy image, CSS, and JS files into the Shopify theme `assets` folder.
4. In Shopify Admin, create two pages:
   - Lensy product landing page
   - Lensy prelander page
5. Assign the templates:
   - Product page → `page.lensy-product`
   - Prelander page → `page.lensy-prelander`
6. Open **Customize theme**.
7. Open each page template.
8. Click the `Lensy landing adapter` section.
9. Select the Shopify product in the **Product for checkout section** setting.
10. Save.

## Product section behavior

The product offer section is a real Shopify product form:

- Uses the product selected in the theme editor
- Supports product variants
- Shows sold-out variants as disabled
- Updates price when the variant dropdown changes
- Uses Shopify `{% form 'product' %}` so add-to-cart works with Shopify checkout

## Notes

The current adapter loads the existing static HTML pages from the public GitHub raw URLs, then converts local asset paths into Shopify asset URLs in the browser. This avoids manually rebuilding thousands of lines of static landing-page HTML while still making the checkout/product section fully Shopify-native.

For the most bulletproof production setup later, the next upgrade would be embedding the static page HTML directly inside Liquid sections instead of loading from GitHub at runtime.
