# Article Code

This folder contains the example article microfrontend code.

Contents

- `serve.js` — small local server to serve the example pieces
- `app-shell/` — app shell static files
- `content/` — article content static files
- `header/` — header static files

Run locally

1. Change into this directory:

```bash
cd microfrontend/article-code
```

2. Start the small server:

```bash
node serve.js
```

The server serves the files in this folder (usually on the port printed by `serve.js`). Open the URL shown in the terminal to view the demo.

Notes

- This is intentionally minimal; customize `serve.js` or replace with your preferred static server if needed.
