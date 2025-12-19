# Quick Webflow Embed Guide

## After deploying to Netlify, use this code:

### Single-Line Embed Code ✨

```html
<div id="tailwind-card"></div>
<script src="https://YOUR-SITE.netlify.app/card.js"></script>
```

**That's it!** The CSS is automatically loaded by the JavaScript.

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

- `card.css`: 9.50 kB (2.72 kB gzipped)
- `card.js`: 1.13 kB (0.66 kB gzipped)

Total: ~3.4 kB over the network - very lightweight!

## How It Works

The JavaScript automatically:
1. Detects its own URL
2. Loads the corresponding CSS file
3. Injects the HTML into `#tailwind-card`
4. Initializes any interactivity

## Testing Locally

Before deploying, you can test with:

```bash
npm run dev
```

Then open http://localhost:5173 to see your component preview.

