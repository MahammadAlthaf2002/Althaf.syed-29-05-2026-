## v1.7.0 update
Homepage upgraded with animated 3D hero, dark/light theme toggle, hidden scrollbars, image fallbacks, and improved search-result clearing behavior.

# eMart Infinite App — Professional External Image UI v5

This revision is a visual/product-data refresh of the eMart super-app concept.

## What changed
- Professional editorial-style dark UI with more spacing and less dashboard clutter.
- External high-resolution photography loaded from `images.unsplash.com`.
- Separate visual/data catalogs for Shopping, Food, Medicine, Travel, Hotels and Payments.
- Added phones, tablets, laptops, sneakers, boots, fashion, watches, cameras, bags, jewelry and gaming products.
- Added food photography for burgers, pizza, biryani, dosa, pasta, chicken, salads and desserts.
- Added dedicated recharge/payment, banking, flight, hotel, bus and service imagery.
- Homepage uses a large editorial hero, image mosaic, service tiles and horizontal product rails.
- Service pages retain separate catalogs and actions instead of routing everything to Home.

## Run
```bash
npm install
npm run dev
```

The app uses external image URLs intentionally. A network connection is required for the photographs to appear.

Image source reference: Unsplash (`https://unsplash.com/`). Review the current Unsplash License before commercial launch, especially the restrictions around compiling images to replicate a similar service.


## Daily UI/Product Update — 2026-09-09

- Replaced the old sidebar brand letter mark with a custom eMart Infinite graphical identity.
- Replaced the Guest `G` avatar with a custom graphical guest profile icon.
- Upgraded Support with a dedicated Help Center route, searchable FAQ content, and direct assistant chat.
- Upgraded eMart Infinite Assistant so product/food searches show matching catalog product cards directly inside the chat.
- Added related food recommendations so searches such as pizza can show multiple food choices.
- Added richer assistant product cards with image, category, rating and price plus direct product navigation.
- Added a new Help Center visual layout with quick topics and service guides.
- Added a dedicated Help icon to the shared icon set.
- Improved the assistant/support visual hierarchy and responsive styling.
- Version bumped to 1.6.0.

### Verification
The source was reviewed after the update. A local production build could not be completed in this environment because the dependency installation did not finish within the available execution window, so run `npm install` and `npm run build` locally before deployment.
