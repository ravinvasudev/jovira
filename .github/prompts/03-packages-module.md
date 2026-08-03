# Context

This prompt extends Jovira’s landing page after bootstrap and services implementation.
Follow `.github/copilot-instructions.md` for brand tone, UX quality, and content standards.
Follow `.github/instructions/ux-instructions.md` for fluid UX direction. If there is any conflict, `ux-instructions.md` takes precedence for layout and interaction style.

# Goal

Build or refine the **Packages** feature using a modular, maintainable architecture that mirrors the Services module.

# Current Implementation Baseline

Packages already ship in the same organic language as Services: irregular morphing shapes with parallax artwork, a visible "from" price, and a detail dialog. Extend this baseline; do not regress it to a rectangular pricing grid.

| File                                          | Responsibility                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `src/components/sections/PackagesSection.tsx` | Section orchestration, copy, choreography hooks, responsive row layout.    |
| `src/components/packages/PackageCard.tsx`     | Client component: blob shape, artwork, price, highlight, dialog state.     |
| `src/components/packages/PackageModal.tsx`    | Client component: inclusions and recommended use inside `FluidDialog`.     |
| `src/data/package-tiers.ts`                   | Content only — the single place to add, edit, or reorder tiers.            |
| `src/types/package-tier.ts`                   | `PackageTier` type shared by data and UI.                                  |
| `public/packages/*.svg`                       | One brand-palette illustration per tier.                                   |
| `src/components/ux/blob-shapes.ts`            | Shared `getBlobShape(index)` silhouettes, drift, and stagger.              |
| `src/components/ux/FluidDialog.tsx`           | Shared native `<dialog>` shell reused by every detail modal.               |
| `src/app/globals.css`                         | Shared `.fluid-blob` / `.blob-*` and `.jov-dialog` styles plus safeguards. |

# Task Requirements

1. **Modular Structure (Required):**
   - Keep package data in a dedicated file (e.g., `src/data/package-tiers.ts`).
   - Keep shared typing in a type file (e.g., `src/types/package-tier.ts`).
   - Keep reusable package card UI in its own component (e.g., `src/components/packages/PackageCard.tsx`).
   - Keep the detail dialog in its own component composed over `FluidDialog`.
   - Keep section orchestration in a dedicated section component (e.g., `src/components/sections/PackagesSection.tsx`).
   - Keep `src/app/page.tsx` clean by rendering the section component only, and keep the `"use client"` boundary limited to the card and dialog.

2. **Package Card Content:**
   - Data shape: `id`, `name`, `priceFrom`, `description`, `includes`, `recommendedFor`, `image`, `imageAlt`, optional `highlighted`.
   - On the shape: optional "Most Popular" badge, tier name, a clearly visible **From $X** price, a clamped description, and a **View inclusions** pill.
   - In the dialog: price, full description, "Includes" list, "Recommended for" line, a note that quotes are tailored through consultation, and the REQUEST FREE Consultation CTA to `#consultation`.
   - Use realistic Jovira-specific copy in Canadian spelling.
   - Do not imply venue rentals; packages must clearly apply to customer-provided venues.

3. **Fluid Visual Language (see `ux-instructions.md`):**
   - Use `getBlobShape(index)` for irregular, morphing silhouettes and vertical stagger — never a uniform multi-column pricing grid.
   - Styled SVG artwork per tier via `next/image` with `fill`, covered by the ink veil so copy keeps contrast.
   - Scroll-driven parallax on the artwork and per-card drift using `animation-timeline: view()` only.
   - Horizontal `.fluid-scroll-row` below `md`; staggered non-scrolling layout at `md` and up so the view timelines resolve against the page.
   - Pricing must stay scannable without interaction: never hide the "from" price behind the dialog.

4. **Visual Hierarchy:**
   - Support an optional highlighted package (e.g., "Most Popular") using a Sunshine ring plus kicker badge, not a different shape or a rigid border.
   - Keep spacing, radius, and shadow language aligned with the shared blob and dialog styles; no raw hex values in components.

5. **Accessibility & Semantics:**
   - Use semantic markup (`section`, `article`, proper headings, lists); tier names stay `h3`.
   - The dialog must be a native `<dialog>` opened with `showModal()`, labelled via `aria-labelledby`, closable by button, backdrop, and Escape.
   - The trigger carries `aria-haspopup="dialog"` and `aria-expanded`; hover-only reveals stay permanently visible below `md`.
   - Keep artwork alt text descriptive and sourced from the data file, and keep visible focus rings on every control.

6. **Maintainability:**
   - Keep card API typed and simple (`tier` plus `index`).
   - Adding a package must only require a new entry in `src/data/package-tiers.ts` plus its SVG in `public/packages/`; shape variation and stagger derive from the index automatically.

# Output Instructions

- Keep code modular and reusable across files.
- Run `npm run lint` and `npm run build` after implementation and report the result.
- Verify the interaction in the browser when possible: hover reveal, dialog open/close, highlighted tier, and the mobile fallback at 390px.
- Summarize:
  - created/updated files
  - why this structure improves long-term maintenance
  - suggested next step (e.g., inspiration module, consultation form module, CMS integration)
