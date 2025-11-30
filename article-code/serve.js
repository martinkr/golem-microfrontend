#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

function startServers() {
  console.log("Starting servers...");
  console.log("Serving header-vue on http://localhost:3001");
  console.log("Serving content-react on http://localhost:3002");
  console.log("Serving app-shell on http://localhost:3000");
  console.log("Open http://localhost:3000/app-shell/index.html\n");

  // Start header-vue on port 3001
  const headerServer = spawn(
    "npx",
    ["serve", "-l", "3001", path.join(__dirname, "header")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start content-react on port 3002
  const contentServer = spawn(
    "npx",
    ["serve", "-l", "3002", path.join(__dirname, "content")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start app-shell on port 3000
  const appShellServer = spawn(
    "npx",
    ["serve", "-l", "3000", path.join(__dirname, "app-shell")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  process.on("SIGINT", () => {
    headerServer.kill();
    contentServer.kill();
    appShellServer.kill();
    process.exit(0);
  });
}
startServers();
