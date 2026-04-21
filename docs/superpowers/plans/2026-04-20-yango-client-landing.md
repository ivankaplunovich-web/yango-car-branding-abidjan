# Yango Client Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client-facing landing page for Yango car branding in Abidjan with a clear value proposition, media comparison sections, and an interactive planning calculator.

**Architecture:** Use a single static landing page so the project can run from an empty workspace with no build step. Structure the page into focused sections in semantic HTML, drive the visual system from CSS custom properties, and keep the calculator logic isolated in a small vanilla JavaScript module.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript

---

### Task 1: Scaffold The Static Landing

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Test: manual browser verification via local static server

- [ ] **Step 1: Create the semantic HTML shell**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yango Car Branding Abidjan</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <section class="hero"></section>
      <section class="proof"></section>
      <section class="calculator"></section>
      <section class="cta"></section>
    </main>
    <script src="./script.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Start a local static server**

Run: `python3 -m http.server 4173`
Expected: `Serving HTTP on 0.0.0.0 port 4173`

- [ ] **Step 3: Open the landing in a browser and confirm the sections render in order**

Run: `open http://127.0.0.1:4173`
Expected: a plain page loads with hero, proof, calculator, and CTA sections.

- [ ] **Step 4: Commit the scaffold**

```bash
git add index.html styles.css script.js docs/superpowers/plans/2026-04-20-yango-client-landing.md
git commit -m "feat: scaffold yango client landing"
```

### Task 2: Build The Advertiser-Facing Narrative

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Test: manual responsive check in browser

- [ ] **Step 1: Add the hero, comparison, and process content**

```html
<section class="hero">
  <div class="hero-copy">
    <p class="eyebrow">Abidjan moving media</p>
    <h1>Put your brand on the streets, not just on a billboard.</h1>
    <p class="lede">
      Turn Yango cars into a mobile advertising network for launches, promotions,
      and city-wide brand visibility.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Add layout and visual tokens from the playbook**

```css
:root {
  --brand-red: #ff0000;
  --ink: #000000;
  --paper: #ffffff;
  --mist: #eaecec;
  --steel: #646464;
}
```

- [ ] **Step 3: Verify the message is clearly for advertiser-side clients**

Run: `python3 -m http.server 4173`
Expected: the copy speaks to brands, media teams, and campaign buyers instead of drivers.

- [ ] **Step 4: Commit the narrative layer**

```bash
git add index.html styles.css
git commit -m "feat: add advertiser-facing landing narrative"
```

### Task 3: Implement The Media Planning Calculator

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Test: manual calculator verification in browser

- [ ] **Step 1: Add calculator form controls and output placeholders**

```html
<form class="planner-form" id="planner-form">
  <select id="package">
    <option value="door">Door panel package</option>
    <option value="side">Full side package</option>
    <option value="takeover">Fleet takeover</option>
  </select>
  <input id="cars" type="range" min="5" max="120" value="30" />
  <input id="weeks" type="range" min="2" max="12" value="4" />
</form>
```

- [ ] **Step 2: Add the calculation model in JavaScript**

```js
const packages = {
  door: { weeklyRate: 24000, impact: 0.82 },
  side: { weeklyRate: 42000, impact: 1 },
  takeover: { weeklyRate: 58000, impact: 1.2 },
};
```

- [ ] **Step 3: Verify interactive updates**

Run: `python3 -m http.server 4173`
Expected: changing package, fleet size, or duration updates budget, reach, and estimated CPM immediately.

- [ ] **Step 4: Commit the calculator**

```bash
git add index.html styles.css script.js
git commit -m "feat: add campaign planning calculator"
```

### Task 4: Polish For Mobile, Motion, And Conversion

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Test: manual desktop and mobile viewport verification

- [ ] **Step 1: Add final conversion blocks and responsive adjustments**

```css
@media (max-width: 860px) {
  .hero-grid,
  .proof-grid,
  .calculator-grid,
  .cta-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add subtle entrance motion and section anchors**

```css
.reveal {
  animation: rise 700ms ease both;
}
```

- [ ] **Step 3: Verify the final page**

Run: `python3 -m http.server 4173`
Expected: the landing reads well on desktop and mobile, CTAs remain visible, and the calculator stays usable without horizontal scroll.

- [ ] **Step 4: Commit the final landing**

```bash
git add index.html styles.css script.js
git commit -m "feat: finish yango client landing"
```
