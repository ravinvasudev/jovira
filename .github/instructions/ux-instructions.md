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
- Optional/phase-based: advanced parallax and magnetic cursor interactions (defer if they risk performance or accessibility).
- Mobile safeguard: under 768px, minimise motion and disable complex hover/parallax behaviours.

**Strict Technical Constraints:**

- Use semantic HTML5 and modern CSS features.
- Implement fluid animations using lightweight CSS transitions, keyframes, and `clip-path` rather than heavy JavaScript libraries.
- Ensure full mobile responsiveness. Disable complex hover states and parallax effects on viewports under 768px to ensure instant load times.
- Avoid rigid grid layouts; use organic shapes and fluid typography scaling using `clamp()`.

# Concept

Designing a digital space for Jovira Celebrations requires a delicate balance between visual richness and intuitive navigation. A fluidic user experience is an exceptional choice for an event styling brand because it mirrors the natural, seamless flow of a beautifully orchestrated event.

To make this concept work authentically, we need to move away from rigid grids and boxy containers. Instead, the design should rely on organic shapes, continuous scroll-triggered transitions, and a color palette that feels luxurious but inviting.

Here is a comprehensive concept for your modern, fluidic web experience.

## The Rich & Elegant Color Palette

For an event styling business, the colors must evoke emotion without overpowering photographs of your actual work. A high-contrast palette pairing deep, immersive darks with warm metallics provides a highly premium feel.

| **Element**              | **Color Name**    | **Hex Code** | **Purpose in UI**                                                         |
| ------------------------ | ----------------- | ------------ | ------------------------------------------------------------------------- |
| **Primary Background**   | Midnight Sapphire | `#0B162C`    | Used for the hero section and footer to create instant depth and luxury.  |
| **Secondary Background** | Warm Alabaster    | `#F9F6F0`    | Used for portfolio and content areas to keep reading easy and clean.      |
| **Accent & Interactive** | Champagne Gold    | `#D4AF37`    | Reserved for primary buttons, active link states, and delicate line work. |
| **Typography**           | Soft Charcoal     | `#2C2C2C`    | High readability for body text on light backgrounds.                      |

## Core Fluidic UX Principles

To achieve that contemporary fluid feel, the interface should respond organically to the user's movements.

- **Liquid Transitions:** Navigating between the "About" and "Portfolio" pages should not feel like a hard cut. Instead, use a subtle "wipe" effect where a wave of Midnight Sapphire washes over the screen, revealing the next page smoothly.

- **Organic Asset Masking:** Rather than displaying your event photographs in sharp squares, frame them inside soft, asymmetrical droplet or arch shapes. These frames can slowly morph and breathe slightly as the user hovers over them.

- **Parallax Scrollytelling:** As a user scrolls down, background elements should move at a slightly slower pace than foreground text. This creates a 3D depth effect that feels highly modern.

- **Magnetic Call-to-Actions:** When a cursor approaches a "Book a Consultation" button, the button subtly gravitates toward the mouse pointer. This micro-interaction makes the site feel alive and highly responsive.

## The User Journey

We want to guide potential clients through an emotional narrative, taking them from initial inspiration to booking an inquiry.

**1. The Immersive Hook:**

_Hero Section._

The site loads with a full-screen, slow-motion video loop of a beautifully styled Jovira event. There is no rigid header. The logo and navigation links float softly over the video. A gentle, pulsing Champagne Gold arrow invites them to scroll.

**2. The Unfolding Story:**

_Introduction._

As the user scrolls, the dark background organically morphs into Warm Alabaster. Text fades in slightly upward, introducing your styling philosophy. Images of floral arrangements and table settings slide in from alternating sides at different speeds.

**3. Fluid Exploration:**

_Services & Portfolio._

Services are presented not as a list, but as a horizontal, infinite-scroll carousel. When a user hovers over a category like "Weddings" or "Corporate Events", the surrounding colors shift dynamically to match the dominant mood of that gallery.

**4. The Seamless Connection:**

_Contact & Footer._

The bottom of the page transitions back into Midnight Sapphire. Instead of a traditional, boring form, the contact section is a conversational interface. It asks one question at a time, fading smoothly to the next, making the inquiry process feel like a premium consultation.

## Core CSS Variables (The Palette)

Generate a `:root` CSS block containing the following color palette and typography variables. Set up fluid typography for headers using `clamp()`.

- Primary Background: `#0B162C` (Midnight Sapphire)
- Secondary Background: `#F9F6F0` (Warm Alabaster)
- Accent: `#D4AF37` (Champagne Gold)
- Text: `#2C2C2C` (Soft Charcoal)

## Component-Specific Instructions

Generate the website piece by piece. Use these specific, targeted prompts for individual sections to maintain the fluidic feel.

### 1. The Immersive Hero Section

Create a hero section component. It must take up `100vh` and feature a background `<video>` element set to autoplay, loop, and muted. Do not use a solid background color here. Overlay a transparent, floating navigation bar at the top. At the bottom center, create a subtly pulsing SVG arrow in Champagne Gold (`#D4AF37`) to indicate scrolling.

### 2. Scroll-Triggered Page Transitions

Write a CSS and lightweight Vanilla JavaScript script using the Intersection Observer API. When a user scrolls from the dark hero section (`#0B162C`) to the introduction section, the background should not snap. Instead, animate a smooth color transition to Warm Alabaster (`#F9F6F0`). Text elements within the introduction should fade in and translate upward by 20px when they enter the viewport.

### 3. Organic Image Masking

Generate a CSS class for framing portfolio images organically. Do not use standard border radii. Use `border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%` to create a fluid droplet shape. Add a CSS `@keyframes` animation to slowly morph these border-radius values infinitely over 8 seconds so the image frame appears to breathe.

### 4. Fluid Infinite Scroll Portfolio

Build a horizontal portfolio carousel. Use CSS flexbox or grid. Hide the default scrollbar. The container should allow for smooth, continuous horizontal scrolling. When the user hovers over an individual project card, apply a subtle scale transformation (`1.05`) and shift the surrounding container's background color dynamically using CSS variables.

### 5. Conversational Contact Interface

Build a contact form component that acts like a multi-step conversational interface. It should only display one question at a time. Provide the HTML structure and the JavaScript logic to handle state management. When the user clicks "Next", fade out the current input field and fade in the next one using CSS opacity and transform transitions. Do not reload the page.

## A Realistic Consideration

While fluidic design is visually stunning, I want to offer a grounded perspective on its execution. Heavy animations and scroll-hijacking can frustrate users if they just want to quickly find pricing or contact information. Furthermore, complex visual effects can drastically slow down page load times, which harms search engine rankings.

To mitigate this, the fluid animations must be built using lightweight CSS transitions rather than heavy JavaScript libraries. We also need to ensure there is a simplified, highly accessible version of the site that loads instantly on mobile devices, where fluid effects often feel clunky.
