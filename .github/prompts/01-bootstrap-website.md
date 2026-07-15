# Context

We are starting the development of the Jovira business website from scratch.
Refer to the `.github/copilot-instructions.md` file for our brand identity, core offerings, visual style guidelines, and tone of voice rules.
Also follow `.github/instructions/ux-instructions.md` for fluid UI/UX direction. If there is any mismatch, the UX instruction file has precedence for layout and interaction style.

# Goal

Bootstrap the initial project structure and design the layout for the primary landing page.

# Task Requirements

1. **Tech Stack Initialization:**
   Determine the best file structure based on our current workspace stack. If this is a new project, help me set up a clean, modern folder structure (e.g., standardizing components, styles, assets, and pages).

2. **Global Styling & Theming:**
   Define a modern, warm, and elegant color palette (e.g., soft neutrals, warm gold/rose accents, and clean whites) that reflects a premium event styling brand. Provide the global CSS variables or configuration (like Tailwind configuration if applicable).

3. **Core Shell & Navigation Component:**
   Build a responsive navigation header and footer component.
   - _Header:_ Logo placeholder (Jovira), clear links (Services, Packages, Inspiration, Book Consultation), and a prominent "Book Consultation" call-to-action button.
   - _Footer:_ Copyright, quick links, contact area, and a subtle disclaimer that we decorate customer-provided venues (no venue rentals).

4. **Hero Section Draft:**
   Generate the HTML/component code for a high-impact, visual Hero Section.
   - Include an elegant, warm headline capturing our mission (e.g., "We transform your space, you make the memories").
   - Include a subheadline emphasizing stress-free consultation and theme customization in Canada.
   - Add placeholders for high-quality visual background imagery.

# Instructions for Output

- Provide clean, semantic, and accessible code.
- Write realistic, Jovira-specific copywriting for the hero text and navigation. Do not use generic "Lorem Ipsum".
- Use Canadian spelling conventions throughout the copy.
- Avoid rigid grid/container-first UI patterns when composing page sections; prefer fluid spacing, organic shapes, and responsive typography scaling with `clamp()`.
- Ask me to confirm the stack details (e.g., React, Next.js, HTML/Tailwind, or plain CSS) before generating final file-specific code if they are not already detected in the workspace.
