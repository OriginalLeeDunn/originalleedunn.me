const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const sharp = require("sharp");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath).toFormat("webp").toFile(outputPath);
    console.log(`Created WebP: ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath} to WebP:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const files = await readdir(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const fileStat = await stat(filePath);

      if (fileStat.isDirectory()) {
        await processDirectory(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext) && !filePath.endsWith(".webp")) {
          const webpPath = `${filePath.substring(0, filePath.lastIndexOf("."))}.webp`;

          // Only convert if WebP version doesn't exist or is older than original
          try {
            const webpStat = await stat(webpPath).catch(() => null);
            if (!webpStat || webpStat.mtimeMs < fileStat.mtimeMs) {
              await convertToWebP(filePath, webpPath);
            }
          } catch (error) {
            console.error(`Error processing ${filePath}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
  }
}

// Start processing from the public directory
processDirectory(path.join(__dirname, "../public"))
  .then(() => console.log("WebP conversion complete!"))
  .catch(console.error);
