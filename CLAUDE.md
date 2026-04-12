# CLAUDE.md

## 🎯 Purpose

This document guides Claude (AI assistant) on how to collaborate effectively while building a **high-end interactive developer portfolio**.

---

## 🧠 Core Instruction (VERY IMPORTANT)

Before generating any solution, code, or suggestion:

👉 **Claude MUST ask follow-up questions until confidence ≥ 85%**

### Rules:

* Do NOT jump to solutions immediately
* Ask **clarifying questions about:**

  * Design intent
  * Technical preferences
  * Level of complexity
  * Performance expectations
  * Visual style references
* Continue asking until:

  * Requirements are clear
  * Edge cases are understood
  * User intent is precise

Only then proceed with implementation.

---

## 🚀 What We Are Building

We are building a **premium, product-level developer portfolio**, not a basic website.

### Think of it as:

> A **Portfolio OS** — an interactive, cinematic experience

---

## 🧱 Tech Stack

* **Next.js (App Router)** → Core framework
* **Framer Motion** → Animations & interactions
* **shadcn/ui** → Component system
* **Tailwind CSS** → Styling

---

## 🔥 Core Features

### 1. Scroll Storytelling

* Sticky sections
* Text reveals on scroll
* Parallax motion
* Cinematic experience (Apple-style)

---

### 2. Project Showcase (Advanced UX)

* Cards expand into fullscreen
* Layout animations (shared layout)
* Case-study style presentation

---

### 3. Custom Cursor System

* Smooth cursor tracking
* Enlarges on hover
* Reacts to interactive elements

---

### 4. Magnetic Interactions

* Buttons attract cursor
* Subtle physics-based motion

---

### 5. Glassmorphism UI

* Blur backgrounds
* Transparent layers
* Soft borders + depth

---

### 6. Page Transitions

* Smooth route changes
* Fade + slide + blur transitions

---

## 🎯 Quality Standard

Claude must aim for:

* **Top 1% portfolio quality**
* Not generic UI
* Not tutorial-level output

Instead:

* Polished
* Thoughtful UX
* Smooth animations
* Clean architecture

---

## 🧩 Development Principles

1. **Component-first architecture**
2. Reusable, clean code
3. Motion should feel natural (not overdone)
4. Performance-aware animations
5. Minimal but impactful UI

---

## ❗ What to Avoid

* Generic portfolio layouts
* Overuse of animations
* Copy-paste tutorial code
* Unnecessary libraries
* Poor UX decisions

---

## 🧠 Interaction Style

Claude should:

* Be concise but thoughtful
* Suggest improvements proactively
* Challenge weak ideas if needed
* Think like a **senior frontend engineer + product designer**

---

## 📈 Implementation Log — April 2026

### ✅ Completed Features

#### 1. Wireframe Design Language System
**Files Modified:** `app/globals.css`

Added reusable wireframe utilities:
- `.wireframe-grid` — Dot-grid background pattern (24px spacing)
- `.wireframe-corner` — Crop mark corners on cards (top-left & bottom-right)
- `.wireframe-cross` — Cross-hair node markers for timeline elements
- `.wireframe-border` — Dashed border utility (1px dashed)
- `.wireframe-label` — Monospace annotation labels (SF Mono, 9px, 0.2em tracking)

**Design Intent:** Blueprint/schematic aesthetic while maintaining dark cinematic theme. All new sections use this language for visual consistency.

---

#### 2. Skills Section — Card Stack Animation
**File Created:** `components/SkillsSection.tsx`

**Features:**
- 5 skill category cards (Frontend, Animation, Backend, Design, DevOps)
- **Scroll-linked card fan-out:** Cards unstack, rotate, and translate horizontally as user scrolls
- Uses `useScroll` + `useTransform` for scroll-driven animations
- Each card shows:
  - Index (01/05 format)
  - Category title
  - 4 tech items per category
  - Dashed divider lines
  - Corner crop marks
  - Coordinate labels (x position, y offset)
- Wireframe dot-grid inside each card

**Animation Details:**
- Cards stacked initially (staggered z-index)
- Fan spread: each card rotates ±6° based on position
- Horizontal translate: ±80px spread
- Scale: slight perspective decrease for rear cards
- Smooth easing: `[0.25, 0.46, 0.45, 0.94]`

---

#### 3. Experience Section — Gesture Animations
**File Created:** `components/ExperienceSection.tsx`

**Features:**
- 4 experience timeline entries with vertical dashed timeline line
- **Fully interactive cards:** Drag, Hover, Tap gestures
- **Drag:** Elastic constraint snap-back, drag state indicator shows "dragging"
- **Hover:** Scale 1.02, border color brightens, `whileHover` animation
- **Tap:** Scale 0.98 feedback
- Timeline node markers with pulsing "ping" animation (on scroll-in-view)
- Each card displays:
  - Entry index (01/04)
  - Period with dashed divider
  - Role + Company
  - Description text
  - Tech tags with individual hover states
  - Bottom label: `gesture: drag | hover | tap` + `node[index]`

**Animation Details:**
- Timeline node animates with `scale: [1, 1.4, 1]` when in-view
- Drag uses `dragElastic={0.08}` for natural physics
- Border transitions on state changes
- Tag hover: brightens border + text color

---

#### 4. Testimonials Section — Auto-rotating Carousel
**File Created:** `components/TestimonialsSection.tsx`

**Features:**
- 4 testimonials with main display + sidebar selector
- **Auto-rotation:** Cycles every 5 seconds when section in-view
- Main quote display with:
  - Large opening quote mark (decorative, 60px, low opacity)
  - Testimonial text (20px, light weight)
  - Author name + role + company
  - Dashed divider
  - Node label + rotation timer
- Sidebar selector with:
  - Active indicator (left border, animated)
  - Progress bar (5s duration, resets per rotation)
  - Company name subtitle
  - Click-to-jump to any testimonial

**Animation Details:**
- Quote transitions: `opacity 0 → 1`, `y: 20 → 0`, blur fade
- `AnimatePresence mode="wait"` for smooth sequential animations
- Shared layout ID for progress bar animation
- Auto-pause when scrolled out of view

---

#### 5. Contact Section — Wireframe Form
**File Created:** `components/ContactSection.tsx`

**Features:**
- Wireframe-styled contact form with sidebar info
- **Form fields (4 inputs):**
  - Name, Email, Subject (text inputs)
  - Message (textarea)
  - Each shows HTML tag annotation (`<input type="..." />`)
  - Dashed borders by default
  - **Focus state:** Solid border + corner marks appear (top-left & bottom-right)
- **Submit button:** Magnetic attraction on hover, whileTap feedback
- **Sidebar info:**
  - Contact details (Email, Location, Availability)
  - Social links (4 items) with Magnetic effect
  - Each link shows hover state + arrow indicator
- All elements use dashed borders + dot grid background

**Animation Details:**
- Input focus: border `dashed → solid`, corner marks fade in
- Button: Magnetic component (0.28 strength)
- Link hover: background brightens, color increases
- Form validation: ready for API integration

---

#### 6. Page Integration
**File Modified:** `app/page.tsx`

**Changes:**
- Added imports for all 4 new sections
- Inserted sections in logical order:
  1. ScrollZoomHero (existing)
  2. ProjectsSection (existing)
  3. **SkillsSection** (new)
  4. ImageStrip (existing)
  5. **ExperienceSection** (new)
  6. **TestimonialsSection** (new)
  7. FAQSection (existing)
  8. **ContactSection** (new)
  9. Footer (existing)

---

### 🔧 Technical Decisions

1. **Scroll-Driven Animations:** Used Framer Motion's `useScroll` + `useTransform` for performant, scroll-linked motion
2. **Gesture Handling:** Combined Framer Motion's `whileHover`, `whileTap`, and `drag` props for rich interactivity
3. **Auto-rotation:** `useInView` hook pauses/resumes carousel based on viewport visibility
4. **Wireframe Aesthetics:** Dashed borders, crop marks, and dot grids applied consistently across all sections
5. **Component Reuse:** Used existing `RevealOnScroll`, `Magnetic` components to maintain consistency

### 📊 Build Status
- ✅ Zero TypeScript errors
- ✅ Zero compilation errors
- ✅ All 4 components properly typed with React
- ✅ Ready for dev server startup

---

## 📈 Optional Future Enhancements

(Only suggest if relevant)

* AI Playground (LLM integration)
* Command Palette (Ctrl + K)
* Sound-based feedback
* Theme switching
* CMS integration
* Testimonials pagination/infinite carousel
* Experience section filtering by date range
* Skills section search/filter
* Form submission backend integration

---

## ✅ Final Reminder

Before ANY implementation:

👉 Ask questions
👉 Clarify intent
👉 Reach ≥ 85% confidence

Only then proceed.

---
