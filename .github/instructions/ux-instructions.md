# Role and Core Objective

You are an expert front-end developer building the Jovira Celebrations website. The design language is modern, fluid, and highly optimized for performance.

## Priority Rules (Required)

- Treat this file as the primary source for UI/UX behaviour and visual direction.
- Keep business and copy constraints from `.github/copilot-instructions.md` fully intact.
- In this repository, **Inspiration** is the canonical name for showcasing past work (do not use Gallery).
- Prefer fluid layouts and organic motion over rigid container/grid-first page composition.
- Use lightweight CSS and native browser APIs only; avoid heavy animation libraries.

## Scope Clarification

- Mandatory now: fluid typography (`clamp()`), fluid spacing, organic image masking, mobile-first responsiveness, and conversational consultation flow.
- Implemented and expected: scroll-driven parallax (hero image, service shapes) built with native `animation-timeline: view()`, and scroll choreography via `IntersectionObserver`.
- Optional/phase-based: magnetic cursor interactions and liquid page-to-page transitions (defer if they risk performance or accessibility).
- Mobile safeguard: under 768px, minimise motion and disable complex hover/parallax behaviours. Hover-only affordances must become permanently visible instead of unreachable.

**Strict Technical Constraints:**

- Use semantic HTML5 and modern CSS features.
- Implement fluid animations using lightweight CSS transitions, keyframes, and `clip-path` rather than heavy JavaScript libraries.
- Ensure full mobile responsiveness. Disable complex hover states and parallax effects on viewports under 768px to ensure instant load times.
- Avoid rigid grid layouts as a visual default; use organic shapes and fluid typography scaling using `clamp()`. A grid is acceptable only as an invisible scaffold when the cards themselves are irregular and vertically staggered.
- Use svg for image format, brand logos.

# Concept

Designing a digital space for Jovira Celebrations requires a delicate balance between visual richness and intuitive navigation. A fluidic user experience is an exceptional choice for an event styling brand because it mirrors the natural, seamless flow of a beautifully orchestrated event.

To make this concept work authentically, we need to move away from rigid grids and boxy containers. Instead, the design should rely on organic shapes, continuous scroll-triggered transitions, and a color palette that feels luxurious but inviting.

Here is a comprehensive concept for your modern, fluidic web experience.

## The Rich & Elegant Color Palette

For an event styling business, the colours must evoke emotion without overpowering photographs of your actual work. The live palette is sampled from `public/jovira-brochure.pdf` and `public/jovira-services.pdf`, and it supersedes the earlier Midnight Sapphire / Champagne Gold concept: `--ink` now plays the immersive-dark role and `--sun` plays the accent-metallic role.

Always use the tokens below (or their Tailwind equivalents such as `bg-ink`, `text-sun`, `border-border`). Never hard-code hex values in components.

| **Element**              | **Colour Name**           | **Token**                           | **Hex Code**                            | **Purpose in UI**                                                            |
| ------------------------ | ------------------------- | ----------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| **Immersive Dark**       | Deep Sapphire Ink         | `--ink` / `--ink-soft`              | `#10233F` `#1B3A63`                     | Hero and footer depth, dialog backdrops, gradient veils over artwork.        |
| **Primary Background**   | Warm Alabaster            | `--background`                      | `#F9F6EB`                               | Content sections; keeps long-form reading calm and clean.                    |
| **Card Surface**         | Soft Ivory                | `--surface` `--surface-soft`        | `#FFFDF7` `#F1F0E9`                     | Light cards, dialogs, panels.                                                |
| **Brand**                | Jovira Blue               | `--brand` / `--brand-deep`          | `#4B80B4` `#2F5F91`                     | Kickers, links, list markers, focus rings on light surfaces.                 |
| **Accent & Interactive** | Sunshine                  | `--sun` / `--sun-deep`              | `#FFDC5C` `#F3C63C`                     | Primary CTAs, hover reveals, scroll arrow, delicate line work on dark areas. |
| **Celebration Support**  | Sky · Aqua · Blush · Rose | `--sky` `--aqua` `--blush` `--rose` | `#95C8FA` `#C7EBF2` `#F2B7BB` `#F47292` | Illustration gradients, seasonal accents, palette swatches.                  |
| **Typography**           | Soft Charcoal             | `--foreground`                      | `#2C2C2C`                               | High readability for body text on light backgrounds.                         |

## Core Fluidic UX Principles

To achieve that contemporary fluid feel, the interface should respond organically to the user's movements.

- **Liquid Transitions:** Navigating between sections should not feel like a hard cut. Instead, use a subtle "wipe" effect where a wave of Deep Sapphire Ink (`--ink`) washes over the screen, revealing the next view smoothly.

- **Organic Asset Masking:** Rather than displaying your event photographs in sharp squares, frame them inside soft, asymmetrical droplet or arch shapes. These frames can slowly morph and breathe slightly as the user hovers over them.

- **Parallax Scrollytelling:** As a user scrolls down, background elements should move at a slightly slower pace than foreground text. This creates a 3D depth effect that feels highly modern.

- **Magnetic Call-to-Actions:** When a cursor approaches a "REQUEST FREE Consultation" button, the button subtly gravitates toward the mouse pointer. This micro-interaction makes the site feel alive and highly responsive.

## Current Jovira brochure and services templates

- Use `public/jovira-brochure.pdf` and `public/jovira-services.pdf` as the source of truth for current offerings.
- The colour theme in those PDFs has already been reviewed and adopted as the live palette above; keep new work aligned to those tokens.

## The User Journey

We want to guide potential clients through an emotional narrative, taking them from initial inspiration to booking an inquiry.

**1. The Immersive Hook:**

_Hero Section._

The site loads with a full-screen, parallax styled Jovira event image. There is no rigid header. The logo and navigation links float softly over hero image. A gentle, pulsing Sunshine (`--sun`) arrow invites them to scroll.

**2. The Unfolding Story:**

_Introduction._

As the user scrolls, the dark background organically morphs into Warm Alabaster. Text fades in slightly upward, introducing your styling philosophy. Images of floral arrangements and table settings slide in from alternating sides at different speeds.

**3. Fluid Exploration:**

_Services & Inspiration._

Services are presented not as a list or a rectangular grid, but as irregular, slowly morphing shapes that each carry their own styled artwork and drift at their own pace as the page scrolls. Hovering a shape reveals a Sunshine **Learn more** pill; choosing it opens a detail dialog with the full deliverables. Inspiration uses the same shapes inside an arrow-navigated carousel where each shape shows only its event type, inviting the visitor to open the concept for the full story.

**4. The Seamless Connection:**

_Contact & Footer._

The bottom of the page transitions back into Deep Sapphire Ink. Instead of a traditional, boring form, the contact section is a conversational interface. It asks one question at a time, fading smoothly to the next, making the inquiry process feel like a premium consultation.

## Core CSS Variables (The Palette)

The `:root` block in `src/app/globals.css` is the single source of truth for colour, motion easing (`--ease-fluid`), and typography variables, and it is bridged to Tailwind through `@theme inline`. Extend that block rather than redefining tokens locally, and keep header sizing fluid with `clamp()` (`.jov-heading`, `.jov-subcopy`).

## Typography & Shape Language

- **Display (`--font-display`):** Cormorant Garamond — a high-contrast serif used for headings, the logo wordmark, and dialog titles. Set it at weight 400–500 with near-neutral tracking; its small x-height means headings need a larger `clamp()` range than a workhorse serif.
- **Brand lockup:** `JoviraLogo` pairs the traced circular monogram (`src/components/brand/jovira-mark.ts`, filled with `currentColor` so it inverts with the surface) and the wordmark set in display serif, **uppercase** with `0.22em` tracking. Never recolour the mark with a fixed hex — set `text-*` on an ancestor instead.
- **Body (`--font-body`):** Jost — a geometric sans for copy, navigation, and controls. Long-form copy sits at weight 300 for an airy, editorial feel.
- **Labels and buttons:** uppercase with wide tracking (`0.08em`–`0.2em`) and semibold weight. Never bold-heavy — the premium feel comes from spacing, not weight.
- **Corners:** interactive elements are squared. Use `--radius-button` (4px) for every button, pill trigger, arrow control, and badge; never `rounded-full` on a control. Organic curvature belongs to blobs, dialogs, and section edges — not to buttons.

## Implemented Fluid System (Reuse Before Inventing)

`src/app/globals.css` already carries the shared fluid system. Reuse these building blocks instead of writing one-off CSS or new utility variants.

| Class / hook                                                 | Purpose                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `.fluid-section`                                             | Fluid section padding via `clamp()` plus the ultrawide centring gutter.        |
| `.jov-gutter`                                                | The same centred gutter for bars that are not sections (header, footer, hero). |
| `.jov-kicker` · `.jov-heading` · `.jov-subcopy`              | Eyebrow label and fluid type scale.                                            |
| `.jov-cta` · `.jov-cta-primary` · `.jov-cta-ghost`           | Squared, uppercase call-to-action treatments (`--radius-button`).              |
| `.fluid-band` · `.fluid-card`                                | Soft asymmetric panels and lift-on-hover light cards.                          |
| `.fluid-scroll-row`                                          | Hidden-scrollbar horizontal row with proximity snap.                           |
| `.fluid-mask`                                                | Breathing droplet mask for imagery.                                            |
| `.section-edge` · `.section-edge__shape--{wave,drape}`       | Masked section transitions rendered by `SectionDivider`.                       |
| `.fluid-blob` (+ `--blob-from` / `--blob-to`)                | Irregular shape that morphs between two `border-radius` pairs.                 |
| `.fluid-blob__media` · `.fluid-blob__veil`                   | Artwork layer and ink gradient veil that protects text contrast.               |
| `.blob-parallax` · `.blob-drift` (+ `--blob-drift`)          | Scroll-driven artwork parallax and per-card drift (page scroll).               |
| `.blob-parallax-x`                                           | Carousel variant: artwork parallax driven by the track's own scrolling.        |
| `.blob-reveal`                                               | Hover/focus-revealed pill whose `::after` stretches over the whole shape.      |
| `.jov-dialog`                                                | Native `<dialog>` shell with organic radius and blurred ink backdrop.          |
| `.parallax-layer`                                            | Hero background drift.                                                         |
| `[data-choreo]` · `[data-choreo-item]` · `data-choreo-delay` | Scroll choreography handled by `src/components/ux/SectionChoreography.tsx`.    |

Shared React primitives live in `src/components/ux/`:

- `blob-shapes.ts` — `getBlobShape(index)` returns the `border-radius` pair, drift distance, and vertical stagger for a card. Never redeclare shape constants inside a feature component.
- `FluidDialog.tsx` — the native `<dialog>` shell (open/close syncing, backdrop dismissal, close button). Feature modals supply content only.
- `SectionDivider.tsx` — the shaped edge between two bands (`variant`, `from`, `to`, `flip`).
- `SectionChoreography.tsx` — the single `IntersectionObserver` for entrance motion.
- `inspiration/InspirationCarousel.tsx` — the reference arrow-navigated carousel (scroll snapping, bound-aware arrows, labelled scroll region).

### Motion rules (non-negotiable)

- Parallax must use native scroll-driven animations (`animation-timeline: view()`) wrapped in `@supports (animation-timeline: view())` plus `@media (min-width: 768px) and (prefers-reduced-motion: no-preference)`. No scroll listeners, no animation libraries.
- A `view()` timeline resolves against the **nearest ancestor scroll container**, and `overflow: hidden` silently makes an element one. Organic shapes therefore clip with `overflow: clip` (`.fluid-blob`); switching that back to `hidden` freezes every parallax inside the card.
- Scroll-driven timelines also break when the surrounding row scrolls: `overflow-x: auto` computes `overflow-y` to `auto`, making the row a block-axis scroller. Pick one of two layouts per section:
  - **Section rows** (services, packages): scrollable below `md`, then a staggered non-scrolling layout at `md` and up (for example `md:grid md:grid-cols-3 md:overflow-x-visible`) so `view()` resolves against the page.
  - **Carousels** (inspiration): keep the track scrollable at every breakpoint and drive artwork with `.blob-parallax-x` (`animation-timeline: view(inline)`), so the parallax is powered by the carousel itself.
- Under 768px and under `prefers-reduced-motion: reduce`, disable morphing, parallax, drift, and dialog animation; keep the organic static shape so the visual language survives without the motion.

### Organic card + detail dialog pattern

This is the canonical pattern for feature cards (services and packages today, inspiration next):

- **Shape:** irregular `border-radius` pairs from `getBlobShape(index)` so neighbouring cards never match. Rectangular card grids are not an acceptable default.
- **Artwork:** brand-palette SVG stored under `public/<feature>/`, rendered with `next/image` and `fill` (Next skips optimisation automatically for `.svg`), sitting behind an ink gradient veil so overlaid copy stays WCAG AA legible.
- **Progressive disclosure:** decide how much copy the shape carries — services and packages show a title plus a clamped summary, while Inspiration shows only the event type as its primary indicator and moves every other detail into the dialog. Keep decision-critical facts (for example a package’s “from” price) visible; a reveal pill appears on hover/`group-focus-within` at `md` and up and stays permanently visible below `md`.
- **Carousel navigation:** when a section stays a carousel, provide explicit left/right arrow buttons that scroll by one card, disable them at each end, and expose the track as a labelled, focusable scroll region (`role="region"`, `aria-label`, `tabIndex={0}`) with `snap-x`.
- **Dialog:** compose `FluidDialog` — native `<dialog>` opened with `showModal()` so focus trapping, top-layer stacking, and Escape come from the platform, with React state synced from the native `close` event and backdrop dismissal on `mousedown`. Label it with `aria-labelledby`; the trigger carries `aria-haspopup="dialog"` and `aria-expanded`.
- **Emphasis:** highlight a featured card with a Sunshine ring and kicker badge, never with a different card shape or a rigid border treatment.
- **Conversion:** every detail dialog closes with the REQUEST FREE Consultation CTA pointing at `#consultation`.

### Section edges and bands

- Sections never meet on a straight cut line. The hero keeps its `wave`; **every other transition uses the `drape` edge** — a single fabric-like sweep falling gently across the full width.
- Alternate the sweep direction with the `flip` prop: left-to-right, then right-to-left, and so on, so no two consecutive edges fall the same way.
- Colour contract: `from` paints the band above (the divider's own background) and `to` paints the masked shape (the band below), so the edge always reads as the next section spilling upward.
- **Bands must be flat.** A gradient behind or inside a band cannot line up with the divider's flat fill, so it draws a visible seam along the edge. Keep `body`, section, and footer backgrounds as single token colours and get depth from the band rhythm instead.
- Boundaries must also avoid stray compositing layers: reveal states end on `transform: none` / `filter: none` (not `translateY(0)` / `blur(0)`), `.section-edge` overlaps the next band by 1px, and the masked shape bleeds 1px past both edges, so sub-pixel rounding cannot rasterise a hairline.
- Alternate bands so the sweep is legible: page alabaster (`--background`) → sky (`--muted`) → alabaster → sky → ink (`--ink`) in the footer. Two adjacent bands must never be near-identical tones, otherwise the edge disappears.
- Dividers are decorative: `aria-hidden`, no text, pure CSS masks (no imagery, no JavaScript), and they stay crisp at any width because the mask scales to the element.

### Ultrawide layout

- Content is capped at `--content-max` (96rem) and centred through `--gutter-inline`, which resolves to `max(clamp(1.1rem, 4vw, 4.5rem), (100% - var(--content-max)) / 2)`.
- Backgrounds, gradients, and the hero image stay full-bleed; only the content inside a band is constrained. Apply `.fluid-section` or `.jov-gutter` instead of hand-rolled horizontal padding.
- Cap card widths at `md` and up (`md:max-w-[24rem]`) so organic shapes keep their portrait proportion instead of stretching into flat ellipses on very wide monitors.

### Accessibility guardrails

- Preserve heading order: section `h2`, card titles `h3`, dialog title `h2` with its own `id`.
- Text inside an organic shape must clear the curve (percentage-based `px-[clamp(...)]` padding, centred alignment) so `overflow: hidden` never clips a word.
- Decorative artwork keeps descriptive alt text sourced from the data file; pure overlays use `aria-hidden`.
- Every interactive element keeps a visible `focus-visible:outline-2 focus-visible:outline-offset-2` ring in a token colour.

## Component-Specific Instructions

Generate the website piece by piece. Use these specific, targeted prompts for individual sections to maintain the fluidic feel.

### 1. The Immersive Hero Section

Create a hero section component. It must fill the viewport (`min-h-svh`) and feature a background image with parallax (`.parallax-layer`). Do not use a solid background colour here. Overlay a transparent, floating navigation bar at the top. At the bottom centre, place a subtly pulsing SVG arrow in Sunshine (`--sun`) to indicate scrolling.

### 2. Scroll-Triggered Page Transitions

Use the shared `IntersectionObserver` choreography in `src/components/ux/SectionChoreography.tsx` rather than writing new observers. Mark a section with `data-choreo` and its children with `data-choreo-item` (optionally `data-choreo-delay`); the deep hero (`--ink`) then hands off to Warm Alabaster (`--background`) while text fades in and translates upward. Never snap between backgrounds.

### 3. Organic Image Masking

Generate a CSS class for framing portfolio images organically. Do not use standard border radii. Use `border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%` to create a fluid droplet shape. Add a CSS `@keyframes` animation to slowly morph these border-radius values infinitely over 8 seconds so the image frame appears to breathe.

### 4. Fluid Exploration Rows and Carousels

Build exploration rows with `.fluid-scroll-row`: flexbox, hidden scrollbar, smooth horizontal scrolling on small screens. For section rows, switch to a staggered non-scrolling layout from `md` up so page-driven parallax keeps working. For carousels, keep the track scrollable at every breakpoint, add bound-aware arrow buttons, and use the inline-axis parallax variant. Shift surrounding tone with CSS variables rather than new hard-coded colours.

### 5. Conversational Contact Interface

Build a contact form component that acts like a multi-step conversational interface. It should only display one question at a time. Provide the HTML structure and the JavaScript logic to handle state management. When the user clicks "Next", fade out the current input field and fade in the next one using CSS opacity and transform transitions. Do not reload the page.

### 6. Organic Cards with Detail Dialogs

Render each feature card as an irregular morphing shape (`.fluid-blob`) carrying its own styled SVG artwork, an ink veil, a clamped summary, and a reveal pill (“Learn more”, “View inclusions”, …) that opens a native `<dialog>` with the full detail copy. Follow the “Organic card + detail dialog pattern” above exactly — shape variation, artwork, progressive disclosure, dialog behaviour, and the closing consultation CTA. `src/components/services/ServiceCard.tsx` and `src/components/packages/PackageCard.tsx` (with `ServiceModal.tsx` / `PackageModal.tsx` over `FluidDialog`) are the reference implementations.

## A Realistic Consideration

While fluidic design is visually stunning, I want to offer a grounded perspective on its execution. Heavy animations and scroll-hijacking can frustrate users if they just want to quickly find pricing or contact information. Furthermore, complex visual effects can drastically slow down page load times, which harms search engine rankings.

To mitigate this, the fluid animations must be built using lightweight CSS transitions rather than heavy JavaScript libraries. We also need to ensure there is a simplified, highly accessible version of the site that loads instantly on mobile devices, where fluid effects often feel clunky.
