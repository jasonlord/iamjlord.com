# Webflow Embeddable Components

This project creates embeddable components with Tailwind CSS that can be easily dropped into Webflow (or any website) via CDN.

## Project Structure

```
test-tailwind-01/
├── src/
│   ├── components/
│   │   └── card/
│   │       ├── card.html      # HTML snippet
│   │       ├── card.js        # Component logic
│   │       └── card.css       # Component styles
│   └── shared/
│       └── tailwind.css       # Global Tailwind styles
├── index.html                 # Dev preview page
├── vite.config.js             # Build configuration
└── package.json
```

## Development

```bash
# Start development server
npm run dev

# Preview at http://localhost:5173
```

## Building

```bash
# Build all components
npm run build

# Output will be in /dist:
# - card.js
# - card.css
```

## Deployment

### First Time Setup

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize project
netlify init
```

During init, use these settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Deploy

```bash
# Deploy to production
npm run deploy

# Or just push to GitHub (if auto-deploy is configured)
git push
```

## Using in Webflow

After deploying to Netlify, you'll get a URL like `https://your-site.netlify.app`

### Embed Code (Just 2 Lines!)

Paste this into a Webflow **Embed** element:

```html
<div id="tailwind-card"></div>
<script src="https://your-site.netlify.app/card.js"></script>
```

That's it! The script automatically loads the CSS and initializes the component.

## Adding New Components

1. Create a new folder: `src/components/button/`
2. Add `button.html`, `button.js`, `button.css`
3. Update `vite.config.js`:
   ```javascript
   input: {
     card: resolve(__dirname, 'src/components/card/card.js'),
     button: resolve(__dirname, 'src/components/button/button.js'), // Add this
   }
   ```
4. Build and deploy!

## Workflow

1. **Edit** component files in VSCode/Cursor
2. **Commit** and push to GitHub
3. **Auto-deploy** via Netlify (takes ~30 seconds)
4. **Updates** appear in Webflow automatically

## Tips

- Keep component IDs unique (`#tailwind-card`, `#tailwind-button`, etc.)
- Use Tailwind classes for styling when possible
- Test locally with `npm run dev` before deploying
- Check the browser console for any errors

