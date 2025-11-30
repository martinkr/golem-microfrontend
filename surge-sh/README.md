# Surge-Sh Microfrontend

A microfrontend architecture demonstration project featuring a Vue.js header component and a React product page, composed together in a parent app shell using iframes and postMessage communication.

## Introduction

This project demonstrates a microfrontend architecture where independent frontend applications (microfrontends) are composed together in a parent application (app shell). Each microfrontend is built with its own framework and can be developed, deployed, and scaled independently.

The project consists of three main parts:

- **Header Microfrontend** (Vue.js): Displays a header with logo and shopping cart counter
- **Content Microfrontend** (React): Displays a product page with add/remove functionality
- **App Shell**: Parent page that composes both microfrontends using iframes and handles cross-frame communication

## Project Structure

```
surge-sh/
├── header-vue/          # Vue.js header microfrontend
│   ├── src/
│   │   ├── App.vue     # Header component with cart counter
│   │   ├── main.js     # Vue app entry point
│   │   └── style.css   # Global styles
│   ├── package.json
│   └── vite.config.js
├── content-react/       # React product page microfrontend
│   ├── src/
│   │   ├── App.jsx     # Product page component
│   │   ├── main.jsx    # React app entry point
│   │   ├── App.css     # Component styles
│   │   ├── index.css   # Global styles
│   │   └── assets/     # Product images
│   ├── package.json
│   └── vite.config.js
├── app-shell/          # Parent application
│   └── index.html      # Main page with iframes
├── package.json        # Root package.json with build scripts
└── serve.js            # Multi-port server script
```

## Setup/Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository** (if applicable):

   ```bash
   git clone <repository-url>
   cd surge-sh
   ```

2. **Install dependencies for all projects**:

   ```bash
   npm install
   npm run install:all
   ```

3. **Build both microfrontends**:

   ```bash
   npm run build
   ```

   This will:

   - Install dependencies for both projects
   - Build the Vue header to `header-vue/dist/`
   - Build the React content to `content-react/dist/`

4. **Start the development servers**:

   ```bash
   npm run serve
   ```

   This starts three servers:

   - Header microfrontend on `http://localhost:3001`
   - Content microfrontend on `http://localhost:3002`
   - App shell on `http://localhost:3000`

5. **Open in browser**:
   Navigate to `http://localhost:3000/app-shell/index.html`

## Detailed Project Explanation

### Architecture Overview

This project implements a microfrontend architecture using the **iframe composition pattern**:

1. **Independent Applications**: Each microfrontend (header and content) is a standalone application that can be built and deployed independently.

2. **App Shell Composition**: The app shell acts as a container that loads both microfrontends in separate iframes.

3. **Cross-Frame Communication**: Communication between microfrontends happens through the app shell using the `postMessage` API with origin validation.

### Message Passing Pattern

The project uses a structured message passing system:

#### Message Types

- `cart:update`: Sent from content microfrontend to update the cart count
- `cart:request`: Can be used to request cart information (implemented for future use)

#### Communication Flow

1. **User clicks Add/Remove** in the React content microfrontend
2. **Content sends message** to parent (app shell):
   ```javascript
   parent.postMessage({ type: "cart:update", count: newCount }, "*");
   ```
3. **App shell validates origin** and forwards message to header iframe:
   ```javascript
   if (msg.type === "cart:update") {
     headerFrame.contentWindow.postMessage(msg, "http://localhost:3001");
   }
   ```
4. **Header receives message** and updates the counter:
   ```javascript
   if (event.data.type === "cart:update") {
     document.getElementById("count").textContent = event.data.count;
   }
   ```

### Security: Origin Validation

The app shell implements origin validation to ensure messages only come from trusted sources:

```javascript
if (
  !["http://localhost:3001", "http://localhost:3002"].includes(event.origin)
) {
  return;
}
```

In production, this should be configured with actual production URLs.

## Examples

### Running Individual Microfrontends

Each microfrontend can be run independently for development:

**Vue Header:**

```bash
cd header-vue
npm install
npm run dev
```

**React Content:**

```bash
cd content-react
npm install
npm run dev
```

### Building for Production

Build both microfrontends:

```bash
npm run build
```

This creates static builds in:

- `header-vue/dist/`
- `content-react/dist/`

### Custom Build Scripts

- `npm run build` - Builds both projects
- `npm run build:vue` - Builds only the Vue header
- `npm run build:react` - Builds only the React content
- `npm run install:all` - Installs dependencies for both projects
- `npm run serve` - Starts all three servers

## Technology Stack

### Frontend Frameworks

- **Vue.js 3.4.21**: Progressive JavaScript framework for the header component

  - [Vue.js Documentation](https://vuejs.org/)
  - Uses Composition API with `<script setup>` syntax

- **React 18.2.0**: JavaScript library for building user interfaces
  - [React Documentation](https://react.dev/)
  - Uses functional components with hooks

### Build Tools

- **Vite 5.1.6**: Next-generation frontend build tool
  - [Vite Documentation](https://vitejs.dev/)
  - Fast HMR and optimized production builds
  - `@vitejs/plugin-vue` for Vue support
  - `@vitejs/plugin-react` for React support

### Development Tools

- **serve 14.2.1**: Static file serving and directory listing
  - Used for serving built static files
  - [serve npm package](https://www.npmjs.com/package/serve)

### Styling

- **CSS3**: Custom styles with modern CSS features
- Responsive design with CSS Grid and Flexbox
- Mobile-first approach

## Features

- ✅ Independent microfrontend applications
- ✅ Cross-frame communication via postMessage
- ✅ Origin validation for security
- ✅ Responsive design
- ✅ Modern build tooling with Vite
- ✅ Hot module replacement for development
- ✅ Static builds for production deployment

## Development Workflow

1. **Development**: Run each microfrontend independently with `npm run dev`
2. **Testing**: Test cross-frame communication by running `npm run serve`
3. **Building**: Create production builds with `npm run build`
4. **Deployment**: Deploy the `dist/` folders and `app-shell/` to your hosting platform

## Browser Compatibility

- Modern browsers with ES6+ support
- postMessage API support (all modern browsers)
- iframe support

## License

[Add your license information here]

## Repository

[Add your GitHub repository URL here]

## Homepage

[Add your project homepage URL here]

## Credits

- Product image: [Condensed Tomato Soup Can by Anastasiya Badun](https://www.pexels.com/photo/condensed-tomato-soup-can-18148489/) on Pexels
- Product description references Andy Warhol's "Campbell's Soup Cans" (1962)
