# Design System: Click Cafe Shillong v1

## 1. Visual Theme & Atmosphere
**Cozy Specialty Coffee with Frosted Luxury.** The aesthetic is warm and intimate — dark espresso grounds contrasted by mellow amber and warm parchment cream. Glassmorphism surfaces float above the darkness like mountain mist over coffee. Every surface breathes: grain overlays on deep backgrounds, soft glows on golden accents, and blur-driven depth on text overlays.

**Dark mode** uses deep charcoal (#1C1C1E) and zinc (#27272A) with amber accents (#D4A843) for a sleek, premium evening experience.

## 2. Color Palette & Roles

| Token         | Hex         | Role                                          |
|---------------|-------------|-----------------------------------------------|
| `espresso`    | `#2C1B18`   | Primary hero/section background               |
| `forest`      | `#1E3D33`   | Accent color, CTAs, TheVibe section bg        |
| `parchment`   | `#F9F4EE`   | Light text, card backgrounds                  |
| `gold`        | `#C9A96E`   | Stars, highlights, "Cafe" italic, prices      |
| `bark`        | `#5C3D2E`   | Secondary text on light sections              |
| `sage`        | `#7BA68C`   | Subtle green accents, section labels          |
| `smoke`       | `#1A1210`   | Footer — deepest background                   |
| `cream`       | `#FDF8F0`   | Light-mode content wrapper background         |
| `warm-stone`  | `#E8DDD0`   | Cards, tab backgrounds, subtle surfaces       |
| `latte`       | `#D4C5B0`   | Borders, secondary card surfaces              |
| `mocha`       | `#A38B73`   | Muted text, decorative elements               |
| `charcoal`    | `#1C1C1E`   | Dark-mode body background                     |
| `zinc-deep`   | `#27272A`   | Dark-mode card surfaces                       |
| `zinc-mid`    | `#3F3F46`   | Dark-mode borders                             |
| `amber-accent`| `#D4A843`   | Dark-mode primary accent (replaces gold)      |

## 3. Typography Rules
- **Display / Headings**: `Playfair Display` — large, dramatic serif. Bold for `h1`/`h2`, italic normal-weight for emphasis
- **Body / UI**: `Inter` — clean, airy, 400–500 weight. No decorative elements.
- **Overlines**: Inter, weight 500, tracking `0.3em`, uppercase, 11–13px, sage or gold
- **Prices**: Playfair Display, semibold, gold color with ₹ prefix
- Letter-spacing for headings: `tracking-tight` to `leading-[0.9]` for dramatic compression

## 4. Component Stylings
- **Buttons/CTAs**: Pill-shaped (`rounded-full`), gold border, parchment text, `hover:bg-gold` transition
- **Cards**: Generously rounded (`rounded-2xl`), frosted glass (`.glass-card` utility: `bg-parchment/6 backdrop-blur-16 border-parchment/10`)
- **Menu Tabs**: Pill-shaped, horizontal scrollable row. Active = gold bg + espresso text + gold shadow. Inactive = warm-stone/40 bg
- **Menu Item Cards**: 3D tilt on hover (rotateX/Y up to 8°), cream bg (light) / zinc-deep bg (dark), gold price, steam lines on hover
- **BusyMeter**: Translucent (`bg-espresso/60 backdrop-blur-sm`), thin border `border-parchment/20`
- **FAB**: Circular (`rounded-full`), gold background, espresso text, `shadow-2xl`

## 5. Layout Principles
- **Generous whitespace**: sections `py-24 md:py-36` (menu), `py-32 md:py-44` (vibe/reviews)
- **Max width container**: `max-w-6xl mx-auto px-6`
- **Menu grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for items within subcategories
- **Tab navigation**: Flexbox wrap, centered, gap-2/3
- **Cup**: `position: fixed`, z-50, pointer-events-none — floats above all content

## 6. Animations
- **Steam**: CSS `@keyframes steam` — 2s ease-in infinite, 3 staggered lines
- **Float**: 4s ease-in-out infinite translateY bounce
- **Shimmer**: 3s ease-in-out infinite translateX sweep for badge highlights
- **Tab transitions**: Framer Motion AnimatePresence fade+slide (0.35s easeOut)
- **Card elevation**: `card-elevate` class — translateY(-4px) + shadow on hover
- **Divider grow**: Width animation from 0→100% for gold hero divider
- **Scroll indicator**: Mouse icon with bouncing dot + chevron

## 7. Menu Structure (6 Tabs)
1. **Manual Brews** — Make Your Own Coffee (Espresso Machine, Moka Pot, V-60, Aero Press, French Press, Pour Over)
2. **Coffee & Specialty** — Strong Coffee (Ristretto, Espresso, Doppio, Lungo) + Cafe Specialty (Americano, Cappuccino, Latte, Mocha, Affogato, Shakerato, Macchiato, Flat White, Irish Coffee)
3. **Cold Beverages** — Iced Coffee (Cold Brew, Iced Americano, Iced Frappé, Iced Mocha) + Refreshers & Iced Tea
4. **Food** — Pasta (Fettuccine, Penne), Sandwiches (Veg & Non-Veg), Tacos & Wraps, Burgers, Belgian Waffles
5. **Hot & Cold Drinks** — Hot Chocolate (7 variants), Tea (8 types with kettle option), Milkshakes (6), Smoothies (5)
6. **Mocktails & Specials** — Mocktails (Mojito, Blue Lagoon, Fruit Punch) + Click Cafe Specials (The Artic Sun)

## 8. Cafe Details
- **Name**: Click Cafe Shillong
- **Rating**: 4.6 (247 Google Reviews)
- **Price Range**: ₹200–400
- **Location**: St. Peter's Building, 1st Floor, Dhankheti, Shillong, Meghalaya 793003
- **Hours**: Open till 9 PM
- **USP**: Specialty coffee, manual brew methods (try it yourself), resident cats (Cattechino & kittens), best hot chocolate in Shillong, cozy book corner, dim-lit ambience
- **Services**: Dine-in, Takeaway, Delivery
- **Atmosphere**: Casual, Cozy, Romantic, Trendy

## 9. Design System Notes for Stitch Generation
Generate screens using this palette: Deep espresso brown (#2C1B18) hero backgrounds, Forest green (#1E3D33) accent sections, Cream (#FDF8F0) content wrappers. Typography uses Playfair Display serif for headings and Inter sans-serif for body. Cards use frosted glass effects (`.glass-card` utility). Gold (#C9A96E) is used for ratings, prices, tab highlights, and italicised heading accents. Menu uses pill tabs with animated transitions. Dark mode uses Charcoal (#1C1C1E) body with Zinc (#27272A) surfaces and Amber (#D4A843) accents. The atmosphere is "cozy specialty coffee bar" — think manual brew artisan café meets mountain town hideaway with resident cats.
