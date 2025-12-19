# Quick Webflow Embed Guide

## After deploying to Netlify, use this code:

### Single-Line Embed Code ✨

```html
<div id="fintech-dashboard"></div>
<script src="https://iamjlordcom.netlify.app/fintech-dashboard.js"></script>
```

**That's it!** The CSS is automatically loaded by the JavaScript.

### What You Get

This is a **scrollytelling fintech dashboard** component with:
- 🖥️ Desktop → Tablet → Mobile device transitions
- 🎨 Smooth 3D mouse-tracking effects  
- 📱 Responsive design mockups
- ✨ Animated scroll-based reveals

**Height**: 350vh (tall section for scroll storytelling)

## Steps in Webflow:

1. Open your Webflow project
2. Drag an **Embed** element onto your page
3. Paste the code above (replace `YOUR-SITE` with your actual Netlify URL)
4. Publish your site

## That's it! ✨

The component will automatically:
- Load the Tailwind styles
- Inject the HTML
- Initialize any JavaScript

## File Sizes

- `fintech-dashboard.css`: 16.74 kB (4.05 kB gzipped)
- `fintech-dashboard.js`: 11.87 kB (2.53 kB gzipped)

Total: ~6.6 kB over the network - still very lightweight!

## How It Works

The JavaScript automatically:
1. Detects its own URL
2. Loads the corresponding CSS file
3. Injects the HTML into `#fintech-dashboard`
4. Initializes scroll-based animations
5. Enables 3D mouse tracking

## Testing Locally

Before deploying, you can test with:

```bash
npm run dev
```

Then open http://localhost:5173 to see your component preview.

