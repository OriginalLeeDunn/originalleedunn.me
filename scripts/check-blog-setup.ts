#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Check if required directories exist
const requiredDirs = ["src/app/blog/posts", "public/images/posts", "scripts"];

// Check if required files exist
const requiredFiles = [
  "scripts/new-post.ts",
  "scripts/validate-posts.ts",
  "scripts/generate-placeholder-images.ts",
  "tsconfig.scripts.json",
];

console.log("📋 Checking blog setup...\n");

// Check directories
console.log("🔍 Checking required directories:");
let allDirsExist = true;
for (const dir of requiredDirs) {
  const dirPath = path.join(process.cwd(), dir);
  const exists = fs.existsSync(dirPath);
  console.log(
    `  ${exists ? "✅" : "❌"} ${dir} ${exists ? "(exists)" : "(missing)"}`,
  );
  allDirsExist = allDirsExist && exists;
}

// Check files
console.log("\n📄 Checking required files:");
let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(process.cwd(), file);
  const exists = fs.existsSync(filePath);
  console.log(
    `  ${exists ? "✅" : "❌"} ${file} ${exists ? "(exists)" : "(missing)"}`,
  );
  allFilesExist = allFilesExist && exists;
}

// Check npm scripts
console.log("\n⚙️  Checking npm scripts:");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  const requiredScripts = [
    "new-post",
    "blog:validate",
    "blog:generate-images",
    "blog:setup",
  ];

  let allScriptsExist = true;
  for (const script of requiredScripts) {
    const exists = script in (packageJson.scripts || {});
    console.log(
      `  ${exists ? "✅" : "❌"} ${script} ${exists ? "(exists)" : "(missing)"}`,
    );
    allScriptsExist = allScriptsExist && exists;
  }

  // Check dependencies
  console.log("\n📦 Checking dependencies:");
  const checkDeps = (deps: Record<string, string>, type: string) => {
    const requiredDeps = ["ts-node", "commander", "gray-matter"];
    let allDepsExist = true;

    for (const dep of requiredDeps) {
      const exists = dep in deps;
      console.log(
        `  ${exists ? "✅" : "❌"} ${dep} ${exists ? "(installed)" : "(missing)"} (${type})`,
      );
      allDepsExist = allDepsExist && exists;
    }
    return allDepsExist;
  };

  const deps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};
  const allDepsExist = checkDeps({ ...deps, ...devDeps }, "any");

  // Final status
  console.log("\n🏁 Setup Status:");
  if (allDirsExist && allFilesExist && allScriptsExist && allDepsExist) {
    console.log("✅ Blog setup is complete and ready to use!");
    console.log(
      '\nTry creating a new post with: npm run new-post "My New Blog Post"',
    );
  } else {
    console.log("❌ Some setup steps are incomplete.");
    console.log("\nRun the following command to fix missing dependencies:");
    console.log("  npm install --save-dev ts-node commander @types/node");
    console.log("  npm install gray-matter");

    if (!allDirsExist) {
      console.log("\nRun these commands to create missing directories:");
      console.log("  mkdir -p src/app/blog/posts public/images/posts scripts");
    }

    process.exit(1);
  }
} catch (error) {
  console.error("❌ Error checking setup:", error);
  process.exit(1);
}
