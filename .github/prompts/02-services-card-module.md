# Context

This prompt extends the Jovira website after initial bootstrap.
Follow the brand and implementation rules in `.github/copilot-instructions.md`.
Follow `.github/instructions/ux-instructions.md` for fluid UX behaviour and visual language. If there is any conflict, `ux-instructions.md` takes precedence for layout and interaction style.

# Goal

Build or update the **Services** feature as a production-ready, modular section for the landing page.

# Task Requirements

1. **Use Modular Architecture (No monolithic file):**
   - Keep section orchestration in a dedicated section component (for example `src/components/sections/ServicesSection.tsx`).
   - Keep each reusable card UI in its own component (for example `src/components/services/ServiceCard.tsx`).
   - Keep content/data separate from UI (for example `src/data/services.ts`).
   - Keep shared typing in a type file (for example `src/types/service.ts`).

2. **Service Card Content & Structure:**
   - Include service title, summary, key deliverables, and “ideal for” text.
   - Use realistic Jovira-specific copy and Canadian spelling.
   - Do not imply venue rentals; always reflect customer-provided venue transformation.

3. **Accessibility & Semantic Quality:**
   - Use semantic tags (`section`, `article`, heading hierarchy, list semantics).
   - Ensure readable contrast and keyboard-friendly interactions.
   - Keep alt text and aria labels meaningful when visual placeholders are used.

4. **Styling Consistency:**
   - Match existing Jovira theme tokens and typography.
   - Keep spacing, borders, radius, and shadows consistent with the existing design system.
   - Avoid rigid card grids as the default pattern; support fluid horizontal exploration and organic shape language where appropriate.

5. **Homepage Integration:**
   - Import and render the services section from `src/app/page.tsx`.
   - Avoid inline card markup in `page.tsx`; use the reusable section component.

6. **Maintainability Expectations:**
   - Keep component APIs simple and typed.
   - Make it easy to add, remove, or reorder services through the data file only.

# Output Instructions

- Provide clean, semantic, and accessible code.
- Keep code split into dedicated files for reuse and long-term maintenance.
- Run lint after changes and report results.
- At the end, summarize:
  - Which files were created/updated
  - Why this structure supports maintainability
  - Suggested next step (e.g., package/pricing cards, CMS-ready content source)
