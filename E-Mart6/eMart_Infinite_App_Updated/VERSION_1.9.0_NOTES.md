# eMart Infinite App — v1.9.0

## Production UI refinement

This release focuses on a real production ecommerce direction rather than a concept/mockup style.

### Search
- Selecting a suggestion now immediately closes the suggestion panel and clears the search field before navigating to the selected product.
- Submitting a search also clears the stale suggestion layer before opening the results route.

### Homepage hero
- Reworked the main hero into a restrained 3D product stage using the project's existing real photographic product imagery.
- Smartphone, headphones and biryani imagery are layered with CSS 3D perspective, depth, subtle motion and glass information panels.
- Motion is deliberately slow and subtle so the banner feels like a professional commerce site rather than a gaming/fantasy UI.

### Product rails
- Native white scrollbars are hidden.
- Horizontal rails now use smooth scrolling and contain overscroll.
- Added a compact Rail/Grid toggle. Grid view is responsive and preserves the same product cards/data.

### Visual direction
- Existing real Unsplash photography remains the source for products, food, travel and service imagery.
- No generated screenshot is used as website content.
- Existing routes, catalog data, cart flow and service structure remain intact.

## Important
The project uses external image URLs already present in `src/data/catalog.js`, so the site needs network access for those photographs to load. No fabricated UI screenshot has been inserted into the application.
