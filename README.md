# Catch the Snowflake ❄️

A cozy, child-friendly Christmas mini-game built with vanilla HTML, CSS, and JavaScript. Slide your mittens across the snow globe to catch falling snowflakes and keep the holiday cheer meter full!

[![Azure Static Web Apps CI/CD](https://github.com/guygregory/transparity-demo/actions/workflows/azure-static-web-apps-victorious-river-069020b10.yml/badge.svg)](https://github.com/guygregory/transparity-demo/actions/workflows/azure-static-web-apps-victorious-river-069020b10.yml)

## ✨ Features

- **Simple & Accessible**: Built with semantic HTML and ARIA labels for screen reader support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **No Dependencies**: Pure vanilla JavaScript (ES6+), no frameworks required
- **Offline-Ready**: No external CDN dependencies, all assets stored locally
- **Progressive Difficulty**: Game speed increases as you catch more snowflakes
- **Local Storage**: Automatically saves your best score
- **Multiple Control Options**: 
  - Keyboard (Arrow keys or A/D)
  - Mouse (click and drag)
  - Touch (tap and swipe on mobile)

## 🎮 How to Play

1. Click **"Start the snowfall"** or tap anywhere in the snow globe
2. Move your mittens to catch falling snowflakes
3. Each caught snowflake earns you points
4. Missing a snowflake costs you a life
5. The game ends when you run out of lives
6. Try to beat your high score!

**Pro Tip**: Keep your mittens near the center to react faster to falling flakes.

## 🛠 Technology Stack

- **HTML5** - Semantic markup and accessible structure
- **CSS3** - Responsive layout, animations, and Christmas theme
- **JavaScript (ES6+)** - Game logic and DOM interactions
- **Azure Static Web Apps** - Cloud hosting and CI/CD

## 📋 Prerequisites

To run this project locally, you only need:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- *Optional*: [Node.js](https://nodejs.org/) (v18+) if using the Azure Static Web Apps CLI

## 🚀 Local Development

### Option 1: Direct Browser Access (Quickest)

Simply open `index.html` in your web browser:

```bash
# Clone the repository
git clone https://github.com/guygregory/transparity-demo.git
cd transparity-demo

# Open in your default browser (Linux/macOS)
open index.html

# Or on Windows
start index.html
```

### Option 2: Using Azure Static Web Apps CLI (Recommended)

The [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/) provides a local development server that mimics the Azure hosting environment.

1. **Install the SWA CLI**:

```bash
npm install -g @azure/static-web-apps-cli
```

2. **Start the local server**:

```bash
swa start . --port 4280
```

3. **Open your browser** to `http://localhost:4280`

### Option 3: Using Python's HTTP Server

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

## 📦 Project Structure

```
transparity-demo/
├── index.html              # Main HTML entry point
├── src/
│   ├── main.js            # Application bootstrap
│   ├── game.js            # Core game loop and state management
│   ├── ui.js              # DOM manipulation and UI updates
│   ├── input.js           # Input handling (keyboard, mouse, touch)
│   └── utils.js           # Utility functions (clamp, random, etc.)
├── styles/
│   └── style.css          # Styling and animations
├── .github/
│   └── workflows/
│       └── azure-static-web-apps-*.yml  # CI/CD pipeline
├── AGENTS.md              # AI agent collaboration guidelines
├── LICENSE                # MIT License
└── README.md              # This file
```

## ☁️ Deployment to Azure

This project is configured for automatic deployment to [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) via GitHub Actions.

### Automatic Deployment (GitHub Actions)

Every push to the `main` branch and every pull request automatically triggers a build and deployment:

1. **Production**: Deploys to the main Static Web App instance
2. **Preview Environments**: Each pull request gets its own preview URL for testing

The deployment workflow is defined in `.github/workflows/azure-static-web-apps-victorious-river-069020b10.yml`.

### Manual Deployment with SWA CLI

You can also deploy manually using the [Azure Static Web Apps CLI](https://learn.microsoft.com/en-us/azure/static-web-apps/static-web-apps-cli-deploy):

```bash
# Install the SWA CLI
npm install -g @azure/static-web-apps-cli

# Deploy to Azure (requires login)
swa deploy . --env production
```

### Deployment Configuration

The app is configured for static hosting only:

- **App Location**: `/` (root of the repository)
- **API Location**: (none - no backend API)
- **Output Location**: `/` (no build step required)

For more information about Azure Static Web Apps deployment, see the [official Microsoft documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-web-framework).

## 🎨 Customization

### Adjusting Game Difficulty

Edit `src/game.js` to modify difficulty parameters:

```javascript
// Initial spawn delay between snowflakes (seconds)
this.spawnDelay = 1.1;

// How much difficulty increases over time
this.difficulty += dt * 0.02;

// Player movement speed
const keyboardSpeed = 420;
```

### Styling and Theme

All visual styling is in `styles/style.css`. The game uses CSS custom properties for easy theme customization:

```css
:root {
  --color-primary: #4a90e2;
  --color-bg: #f8fafc;
  /* ... more variables */
}
```

## 🧪 Browser Compatibility

This game is tested and works on:

- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

The game uses modern JavaScript features (ES6 modules, `crypto.randomUUID`) with fallbacks for older browsers.

## 🤝 Contributing

Contributions are welcome! This is a simple project, but improvements can always be made.

### Development Guidelines

- Maintain the **no-framework** constraint
- Ensure changes work **without a build step**
- Test on both desktop and mobile devices
- Follow existing code style and conventions
- Update documentation for significant changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Preview environments are automatically created for all pull requests!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Guy Gregory

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 🙏 Acknowledgments

- Built as a demonstration of vanilla JavaScript game development
- Designed for deployment on [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/)
- Inspired by classic catch-the-falling-objects games

## 📚 Additional Resources

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)
- [GitHub Actions for Azure](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration)
- [Modern JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

**Happy snowflake catching! ❄️**
