# Context

This prompt extends the Jovira website after initial bootstrap.
Follow the brand and implementation rules in `.github/copilot-instructions.md`.
Follow `.github/instructions/ux-instructions.md` for fluid UX behaviour and visual language. If there is any conflict, `ux-instructions.md` takes precedence for layout and interaction style.

# Goal

Build or update the **Services** feature as a production-ready, modular section for the landing page.

# Current Implementation Baseline

The section already ships as organic, morphing shapes with parallax artwork and detail dialogs. Extend this baseline; do not regress it to a rectangular card grid.

| File                                          | Responsibility                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `src/components/sections/ServicesSection.tsx` | Section orchestration, copy, choreography hooks, responsive row layout.    |
| `src/components/services/ServiceCard.tsx`     | Client component: blob shape, artwork, hover reveal, dialog state.         |
| `src/components/services/ServiceModal.tsx`    | Client component: native `<dialog>` detail view.                           |
| `src/data/services.ts`                        | Content only — the single place to add, edit, or reorder services.         |
| `src/types/service.ts`                        | `Service` type shared by data and UI.                                      |
| `public/services/*.svg`                       | One brand-palette illustration per service.                                |
| `src/components/ux/blob-shapes.ts`            | Shared `getBlobShape(index)` silhouettes, drift, and stagger.              |
| `src/components/ux/FluidDialog.tsx`           | Shared native `<dialog>` shell reused by every detail modal.               |
| `src/app/globals.css`                         | Shared `.fluid-blob` / `.blob-*` and `.jov-dialog` styles plus safeguards. |

# Task Requirements

1. **Use Modular Architecture (No monolithic file):**
   - Keep section orchestration in a dedicated section component (for example `src/components/sections/ServicesSection.tsx`).
   - Keep each reusable card UI in its own component (for example `src/components/services/ServiceCard.tsx`).
   - Keep content/data separate from UI (for example `src/data/services.ts`).
   - Keep shared typing in a type file (for example `src/types/service.ts`).
   - Keep the `"use client"` boundary as low as possible: the section stays a server component, only the card and dialog are client components.

2. **Service Card Content & Structure:**
   - Data shape: `id`, `title`, `summary`, `deliverables`, `idealFor`, `image`, `imageAlt`.
   - On the shape: title, clamped summary, and a **Learn more** pill.
   - In the dialog: summary, “What’s Included” deliverables list, “Ideal for” line, and a REQUEST FREE Consultation CTA to `#consultation`.
   - Use realistic Jovira-specific copy and Canadian spelling.
   - Do not imply venue rentals; always reflect customer-provided venue transformation.

3. **Fluid Visual Language (see `ux-instructions.md`):**
   - Irregular, index-varied `border-radius` shapes that morph slowly — never a uniform rectangle grid.
   - Styled SVG artwork behind each shape via `next/image` with `fill`, covered by the ink veil so copy keeps contrast.
   - Scroll-driven parallax on the artwork and per-card drift using `animation-timeline: view()` only.
   - Horizontal `.fluid-scroll-row` below `md`; staggered non-scrolling layout at `md` and up so the view timelines resolve against the page.

4. **Accessibility & Semantic Quality:**
   - Use semantic tags (`section`, `article`, heading hierarchy, list semantics); card titles stay `h3`.
   - The dialog must be a native `<dialog>` opened with `showModal()`, labelled via `aria-labelledby`, closable by button, backdrop, and Escape, with React state synced from the native `close` event.
   - The trigger carries `aria-haspopup="dialog"` and `aria-expanded`; hover-only reveals stay permanently visible below `md`.
   - Ensure readable contrast, keyboard-friendly interactions, visible focus rings, and meaningful alt text sourced from the data file.

5. **Styling Consistency:**
   - Match existing Jovira theme tokens and typography; no raw hex values in components.
   - Reuse the shared `.jov-*`, `.fluid-*`, and `.blob-*` classes, `getBlobShape`, and `FluidDialog` before adding new CSS or new dialog logic.
   - Respect the motion safeguards: no morph, parallax, or drift under 768px or with `prefers-reduced-motion: reduce`.

6. **Homepage Integration:**
   - Import and render the services section from `src/app/page.tsx`.
   - Avoid inline card markup in `page.tsx`; use the reusable section component.

7. **Maintainability Expectations:**
   - Keep component APIs simple and typed.
   - Adding a service must only require a new entry in `src/data/services.ts` plus its SVG in `public/services/`; shape variation and stagger derive from the index automatically.

# Output Instructions

- Provide clean, semantic, and accessible code.
- Keep code split into dedicated files for reuse and long-term maintenance.
- Run `npm run lint` and `npm run build` after changes and report results.
- Verify the interaction in the browser when possible: hover reveal, dialog open/close, and the mobile fallback at 390px.
- At the end, summarize:
  - Which files were created/updated
  - Why this structure supports maintainability
  - Suggested next step (e.g., package/pricing cards, CMS-ready content source)
