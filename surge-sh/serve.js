#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Check if builds exist
const vueDist = path.join(__dirname, "header-vue", "dist");
const reactDist = path.join(__dirname, "content-react", "dist");

if (!fs.existsSync(vueDist) || !fs.existsSync(reactDist)) {
  console.log(" Builds not found. Running build first...");
  const build = spawn("npm", ["run", "build"], {
    stdio: "inherit",
    shell: true,
  });

  build.on("close", (code) => {
    if (code === 0) {
      startServers();
    } else {
      console.error("Build failed");
      process.exit(1);
    }
  });
} else {
  startServers();
}

function startServers() {
  console.log("Starting servers...");
  console.log("Serving header-vue on http://localhost:3101");
  console.log("Serving content-react on http://localhost:3102");
  console.log("Serving app-shell on http://localhost:31000");
  console.log("Open http://localhost:3100/app-shell/index.html\n");

  // Start header-vue on port 3101
  const headerServer = spawn(
    "npx",
    ["serve", "-l", "3101", path.join(__dirname, "header-vue", "dist")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start content-react on port 3102
  const contentServer = spawn(
    "npx",
    ["serve", "-l", "3102", path.join(__dirname, "content-react", "dist")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start app-shell on port 3000
  const appShellServer = spawn("npx", ["serve", "-l", "3100", __dirname], {
    stdio: "inherit",
    shell: true,
  });

  process.on("SIGINT", () => {
    headerServer.kill();
    contentServer.kill();
    appShellServer.kill();
    process.exit(0);
  });
}
