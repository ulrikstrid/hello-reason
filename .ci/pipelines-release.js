const fs = require("fs");
const path = require("path");

console.log("Creating package.json");
const mainPackageJson = require("../package.json");
const packageJson = JSON.stringify(
  {
    name: mainPackageJson.name,
    version: mainPackageJson.version,
    license: mainPackageJson.license,
    description: mainPackageJson.description,
    repository: mainPackageJson.repository,
    scripts: {
      postinstall: "node ./postinstall.js"
    },
    bin: {
      "Hello.exe": "bin/Hello.exe"
    },
    files: [
      "_export/",
      "bin/",
      "postinstall.js",
      "esyInstallRelease.js",
      "platform-linux/",
      "platform-darwin/",
      "platform-windows-x64/"
    ]
  },
  null,
  2
);

fs.writeFileSync(
  path.join(__dirname, "..", "_release", "package.json"),
  packageJson,
  {
    encoding: "utf8"
  }
);

/*
console.log("Copying LICENSE");
fs.copyFileSync(
  path.join(__dirname, "..", "LICENSE"),
  path.join(__dirname, "..", "_release", "LICENSE")
);
*/

console.log("Copying README.md");
fs.copyFileSync(
  path.join(__dirname, "..", "README.md"),
  path.join(__dirname, "..", "_release", "README.md")
);

console.log("Copying postinstall.js");
fs.copyFileSync(
  path.join(__dirname, "release-postinstall.js"),
  path.join(__dirname, "..", "_release", "postinstall.js")
);

console.log("Creating placeholder files");
const placeholderFile = `#!/usr/bin/env node

console.log("You need to have postinstall enabled")`;
fs.mkdirSync(path.join(__dirname, "..", "_release", "bin"));
const binPath = path.join(__dirname, "..", "_release", "bin", "Hello.exe");

fs.writeFileSync(binPath, placeholderFile);
fs.chmodSync(binPath, 0755);
