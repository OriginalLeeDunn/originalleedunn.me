import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import matter from "gray-matter";

// Configuration
const WIDTH = 1200;
const HEIGHT = 630;
const FONT_SIZE = 48;
const PADDING = 60;
const COLORS = {
  background: "#0F172A",
  primary: "#B7410E", // Rust orange
  secondary: "#39FF14", // Terminal green
  accent: "#00F5FF", // Neon blue
  text: "#F8FAFC",
};

async function generatePlaceholderImage(title: string, outputPath: string) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw primary lines
  ctx.strokeStyle = COLORS.primary;
  ctx.lineWidth = 4;
  ctx.setLineDash([20, 10]);

  // Diagonal lines from top-left to bottom-right
  for (let i = -HEIGHT; i < WIDTH + HEIGHT; i += 60) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + HEIGHT, HEIGHT);
    ctx.stroke();
  }

  // Add gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, `${COLORS.primary}40`);
  gradient.addColorStop(1, `${COLORS.secondary}40`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add logo
  try {
    const logoPath = path.join(process.cwd(), 'public/images/logo-Transparent.webp');
    const logo = await loadImage(logoPath);
    
    // Calculate logo dimensions (maintain aspect ratio)
    const logoMaxSize = 80; // Max height of the logo
    const ratio = logo.height / logoMaxSize;
    const logoWidth = logo.width / ratio;
    const logoHeight = logoMaxSize;
    
    // Draw logo with padding
    const logoPadding = PADDING / 2;
    ctx.drawImage(logo, logoPadding, logoPadding, logoWidth, logoHeight);
  } catch (error) {
    console.error('Error loading logo:', error);
  }

  // Draw title
  ctx.font = `bold ${FONT_SIZE}px 'Orbitron', sans-serif`;
  ctx.fillStyle = COLORS.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Wrap text
  const words = title.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < WIDTH - PADDING * 2) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Draw each line
  const lineHeight = FONT_SIZE * 1.4;
  const startY = (HEIGHT - lines.length * lineHeight) / 2;

  lines.forEach((line, i) => {
    const y = startY + i * lineHeight;

    // Text shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillText(line, WIDTH / 2 + 2, y + 2);

    // Main text
    ctx.fillStyle = COLORS.text;
    ctx.fillText(line, WIDTH / 2, y);
  });

  // Add logo/branding
  ctx.font = "bold 24px Orbitron, sans-serif";
  ctx.fillStyle = COLORS.secondary;
  ctx.textAlign = "right";
  ctx.fillText("originalleedunn.me", WIDTH - PADDING, HEIGHT - PADDING / 2);

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg", { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

async function generateAllPlaceholders() {
  const postsDir = path.join(process.cwd(), "src/app/blog/posts");
  const imagesDir = path.join(process.cwd(), "public/images/posts");

  // Create images directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"));

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    if (!data.title) continue;

    const slug = path.basename(file, ".mdx");
    const outputPath = path.join(imagesDir, `${slug}-featured.jpg`);

    // Skip if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping (exists): ${outputPath}`);
      continue;
    }

    await generatePlaceholderImage(data.title, outputPath);

    // Update the post's frontmatter
    const updatedContent = fileContent.replace(
      /^coverImage:.*$/m,
      `coverImage: "/images/posts/${slug}-featured.jpg"`,
    );

    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated frontmatter in: ${file}`);
  }
}

// Run the generator
generateAllPlaceholders().catch(console.error);
