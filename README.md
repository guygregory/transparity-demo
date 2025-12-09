# Catch the Snowflake ❄️

A delightful, browser-based holiday mini-game where players guide a cozy mitten across the snow to catch falling snowflakes before they melt. Built with vanilla HTML, CSS, and JavaScript, and designed to be lightweight, accessible, and child-friendly.

[![Azure Static Web Apps CI/CD](https://github.com/guygregory/transparity-demo/actions/workflows/azure-static-web-apps-victorious-river-069020b10.yml/badge.svg)](https://github.com/guygregory/transparity-demo/actions/workflows/azure-static-web-apps-victorious-river-069020b10.yml)

## 🎮 Game Features

- **Simple, Engaging Gameplay**: Move a mitten left and right to catch falling snowflakes
- **Progressive Difficulty**: The spawn rate increases as your score grows
- **Time-Limited Challenge**: Collect as many snowflakes as you can in 60 seconds
- **Mistake Tolerance**: You're allowed up to 5 missed snowflakes before the game ends
- **Multiple Input Methods**: 
  - Mouse/trackpad control
  - Touch screen support (mobile-friendly)
  - Keyboard controls (Arrow keys or A/D keys)
- **Pause & Resume**: Take a break anytime during gameplay
- **Accessible Design**: Built with screen readers and keyboard navigation in mind

## 🎯 How to Play

1. Click the **Start** button to begin
2. Move the red mitten horizontally to catch falling snowflakes:
   - **Mouse/Touch**: Simply move your pointer or touch across the game area
   - **Keyboard**: Use Arrow Left/Right or A/D keys
3. Each caught snowflake increases your score
4. Avoid missing more than 5 snowflakes
5. Try to score as high as possible before the 60-second timer runs out!

## 🛠 Technology Stack

This project uses a minimal, modern web stack with no frameworks or build tools required:

- **HTML5**: Semantic structure with accessibility features (ARIA labels, live regions)
- **CSS3**: Responsive layout, modern styling, and smooth animations
- **JavaScript (ES6+)**: Modular code with ES6 imports, canvas-based rendering
- **GitHub Actions**: Automated CI/CD pipeline
- **Azure Static Web Apps**: Cloud hosting and deployment

## 📁 Project Structure

```
/
├── index.html              # Main HTML entry point
├── src/
│   ├── main.js            # Application bootstrap and game loop
│   ├── game.js            # Core game logic and state management
│   ├── ui.js              # DOM manipulation and UI updates
│   ├── input.js           # Input handling (mouse, touch, keyboard)
│   └── utils.js           # Utility functions (math helpers)
├── styles/
│   └── style.css          # Complete styling and responsive design
├── .github/
│   └── workflows/
│       └── azure-static-web-apps-victorious-river-069020b10.yml  # GitHub Actions workflow
├── AGENTS.md              # AI agent collaboration guidelines
├── ACCESSIBILITY-REPORT.md # Comprehensive WCAG 2.2 accessibility audit
└── LICENSE                # MIT License
```

## 🚀 Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional but recommended)

### Running Locally

**Option 1: Direct File Opening** (Simplest)
```bash
# Clone the repository
git clone https://github.com/guygregory/transparity-demo.git
cd transparity-demo

# Open index.html directly in your browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Option 2: Using a Local Web Server** (Recommended)

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

Using PHP:
```bash
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

### Making Changes

The application uses ES6 modules, so changes to JavaScript files will require a page refresh. No build step or compilation is needed.

1. Edit files in the `src/` directory or `styles/style.css`
2. Refresh your browser to see changes
3. Use browser DevTools for debugging

## ☁️ Deployment to Azure Static Web Apps

This project is configured for automatic deployment to [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/) using GitHub Actions.

### Automatic Deployment

The repository includes a pre-configured GitHub Actions workflow (`.github/workflows/azure-static-web-apps-victorious-river-069020b10.yml`) that automatically:

- **Builds and deploys** on every push to the `main` branch
- **Creates preview environments** for pull requests
- **Comments preview URLs** directly on pull requests

### Manual Deployment Setup

To deploy your own instance:

1. **Create an Azure Static Web Apps resource**:
   - Go to the [Azure Portal](https://portal.azure.com)
   - Select **Create a Resource** → **Static Web App**
   - Choose your subscription and resource group
   - Connect to your GitHub repository
   - Configure build settings:
     - **App location**: `/`
     - **Api location**: `` (leave empty)
     - **Output location**: `/`

2. **Azure automatically configures**:
   - A GitHub Actions workflow file
   - Required secrets in your GitHub repository
   - SSL certificate and custom domain support

3. **Monitor deployment**:
   - Check the **Actions** tab in your GitHub repository
   - View deployment status in the Azure Portal

For detailed instructions, see the [Azure Static Web Apps quickstart guide](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal).

### Using Azure Static Web Apps CLI

For advanced local testing with the production environment:

```bash
# Install the SWA CLI
npm install -g @azure/static-web-apps-cli

# Run the app locally with SWA emulation
swa start . --port 8000

# Deploy manually (after configuring swa-cli.config.json)
swa deploy --env production
```

Learn more about the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/).

## ♿ Accessibility Features

This game is built with accessibility in mind:

- **Semantic HTML**: Proper use of heading hierarchy and landmark regions
- **Keyboard Navigation**: Full keyboard support for all game controls
- **Screen Reader Support**: 
  - ARIA labels on interactive elements
  - Live region announcements for score updates and game events
  - Descriptive text alternatives
- **No Rapid Flashing**: Safe for users with photosensitive conditions
- **Responsive Design**: Works on various screen sizes and orientations
- **Multiple Input Methods**: Accommodates different user preferences and abilities

### Accessibility Audit

This project has undergone a comprehensive accessibility audit. See [ACCESSIBILITY-REPORT.md](ACCESSIBILITY-REPORT.md) for the full report.

**Summary:**
- ✅ WCAG 2.2 Level AA Compliant
- ✅ 100% Lighthouse Accessibility Score
- ✅ 0 Issues in pa11y audit
- ✅ Full keyboard accessibility
- ✅ Screen reader compatible

## 🎨 Customization

### Adjusting Game Difficulty

Edit `src/game.js` to modify gameplay parameters:

```javascript
// In the Game class constructor
this.maxMisses = 5;           // Number of allowed misses
this.duration = 60;           // Game duration in seconds
this.spawnInterval = 0.8;     // Initial spawn rate in seconds
```

### Styling Changes

All visual styling is in `styles/style.css`. The game uses CSS custom properties for easy theme adjustments:

```css
/* Example: Change the color scheme */
:root {
  --mitten-color: #d62839;    /* Red mitten */
  --accent-color: #f08c42;    /* Orange accent */
  --snow-color: #f7fbff;      /* White snowflakes */
}
```

### Canvas Rendering

The game rendering logic is in `src/game.js`. Modify the `draw*` methods to change visual appearance:

- `drawBackdrop()`: Background gradient and snow hills
- `drawSnowflakes()`: Snowflake appearance and animation
- `drawPlayer()`: Mitten design and decorations

## 🔧 Configuration

### GitHub Actions Workflow

The workflow file `.github/workflows/azure-static-web-apps-*.yml` is automatically generated by Azure Static Web Apps. Key configuration:

```yaml
app_location: "/"          # Root of the app
api_location: ""           # No backend API
output_location: "/"       # No build output directory
```

To modify the workflow (e.g., add environment variables or change trigger branches), edit this file directly. See the [build configuration documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration) for details.

### Browser Compatibility

Minimum browser versions required:
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

The game uses modern JavaScript features (ES6 modules, canvas API) and CSS features (CSS Grid, custom properties).

## 🤝 Contributing

Contributions are welcome! This project is designed to be simple and maintainable.

### Guidelines

1. **No framework dependencies**: Keep the project dependency-free
2. **No build step**: The game should run by opening `index.html`
3. **Maintain accessibility**: Test with keyboard and screen readers
4. **Follow existing patterns**: Keep the modular structure consistent

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly (multiple browsers, keyboard navigation, etc.)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### AI Agent Guidelines

This repository includes special instructions for AI coding agents in `AGENTS.md`. If you're using GitHub Copilot or similar tools, please review those guidelines for consistent collaboration patterns.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as a demonstration of modern, accessible web game development
- Designed for deployment on Azure Static Web Apps
- Inspired by classic catch-the-falling-objects games
- Created with accessibility and inclusivity as core principles

## 📚 Additional Resources

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Enjoy catching snowflakes!** ❄️ If you have questions or suggestions, please open an issue or reach out via GitHub.
