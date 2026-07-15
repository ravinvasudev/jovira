# Context

This prompt extends Jovira’s landing page after bootstrap and services implementation.
Follow `.github/copilot-instructions.md` for brand tone, UX quality, and content standards.
Follow `.github/instructions/ux-instructions.md` for fluid UX direction. If there is any conflict, `ux-instructions.md` takes precedence for layout and interaction style.

# Goal

Build or refine the **Packages** feature using a modular, maintainable architecture.

# Task Requirements

1. **Modular Structure (Required):**
   - Keep package data in a dedicated file (e.g., `src/data/package-tiers.ts`).
   - Keep shared typing in a type file (e.g., `src/types/package-tier.ts`).
   - Keep reusable package card UI in its own component (e.g., `src/components/packages/PackageCard.tsx`).
   - Keep section orchestration in a dedicated section component (e.g., `src/components/sections/PackagesSection.tsx`).
   - Keep `src/app/page.tsx` clean by rendering the section component only.

2. **Package Card Content:**
   - Include package name, “from” pricing, short description, key inclusions, and recommended use case.
   - Use realistic Jovira-specific copy in Canadian spelling.
   - Do not imply venue rentals; packages must clearly apply to customer-provided venues.

3. **Visual Hierarchy:**
   - Support an optional highlighted package (e.g., “Most Popular”).
   - Keep spacing, borders, radius, and shadows aligned with existing Jovira design tokens.
   - Prefer fluid browsing patterns over rigid multi-column card grids when presenting package options.

4. **Accessibility & Semantics:**
   - Use semantic markup (`section`, `article`, proper headings, lists).
   - Ensure text readability and keyboard-friendly interactions for any controls.

5. **Maintainability:**
   - Keep card API typed and simple.
   - New packages should be addable by editing only the data file.

# Output Instructions

- Keep code modular and reusable across files.
- Run lint after implementation and report the result.
- Summarize:
  - created/updated files
  - why this structure improves long-term maintenance
  - suggested next step (e.g., gallery module, consultation form module, CMS integration)
