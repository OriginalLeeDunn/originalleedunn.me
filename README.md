# OriginalLeeDunn - Portfolio

A modern, interactive portfolio website showcasing my work as an AI & Game Developer, Full-Stack Engineer, and Creative Technologist. Built with Next.js, TypeScript, and Tailwind CSS.

## 🏗 Project Structure

```
originalleedunn.me/
├── e2e/                  # End-to-end tests with Playwright
├── public/              # Static files
│   └── images/          # Optimized images and assets
├── scripts/             # Build and utility scripts
│   ├── optimize-images.js     # Image optimization
│   ├── create-webp-fallbacks.js # WebP conversion
│   ├── new-post.ts            # Blog post generator
│   ├── validate-posts.ts      # Validates blog post frontmatter
│   └── generate-placeholder-images.ts # Placeholder images for blog
├── src/
│   ├── app/             # App Router pages and layouts
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog section
│   │   └── ...
│   ├── components/      # Reusable UI components
│   ├── styles/           # Global styles and Tailwind config
│   └── types/            # TypeScript type definitions
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── next.config.mjs      # Next.js configuration
├── package.json         # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OriginalLeeDunn/originalleedunn.me.git
   cd originalleedunn.me
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🚀 Features

### Core Features
- **Modern UI/UX** with Framer Motion animations
- **Fully Responsive** design for all screen sizes
- **Dark/Light Mode** with system preference detection
- **Voice Navigation** with speech recognition
- **Interactive 3D Elements** with Three.js integration
- **Performance Optimized** with code splitting and lazy loading
- **Type-Safe** with TypeScript
- **Accessibility First** following WCAG 2.1 AA

### Blog System
- **MDX** for rich content
- **Code Syntax Highlighting** with highlighted code blocks
- **Tag System** for organizing posts
- **Responsive Images** with automatic optimization
- **Table of Contents** generation
- **Reading Time** calculation
- **Related Posts** suggestions

### Developer Experience
- **Hot Module Replacement** for fast development
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Husky** Git hooks
- **Playwright** for end-to-end testing
- **Automated Image Optimization** with WebP conversion

## 🎨 Design System

- **Color Scheme**:

  - Primary: Rust Orange (#B7410E)
  - Secondary: Terminal Green (#39FF14)
  - Accent: Neon Blue (#00F5FF)
  - Dark/Light mode support

- **Typography**:
  - Headings: Orbitron (Bold, 700)
  - Body: Rajdhani (Medium 500, SemiBold 600)
  - Code: Fira Code (Regular 400, with ligatures)

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 14** (App Router)
- **TypeScript 5.6**
- **React 18** with Server Components
- **Tailwind CSS** with JIT compiler
- **Framer Motion** for animations
- **MDX** for content
- **Zod** for runtime type validation

### Performance
- **Image Optimization** with Next.js Image
- **Font Optimization** with next/font
- **Code Splitting** and lazy loading
- **Bundle Analysis** with @next/bundle-analyzer
- **Web Vitals** monitoring

### Developer Tooling
- **TypeScript** for type safety
- **ESLint** with TypeScript support
- **Prettier** for code formatting
- **Husky** for Git hooks
- **Playwright** for E2E testing
- **Jest** for unit testing

### Build & Deploy
- **Vercel** for hosting
- **GitHub Actions** for CI/CD
- **Webpack** for module bundling
- **PostCSS** for CSS processing
- **Autoprefixer** for CSS compatibility

## 📊 Analytics & Monitoring

The website includes:

- **Google Analytics 4** for tracking page views and user behavior
- **Web Vitals** monitoring for performance metrics (CLS, FID, FCP, LCP, TTFB)
- **Error Tracking** (optional integration with Sentry)

## 🔒 Security

- **Content Security Policy (CSP)**
- **Security Headers**
- **Rate Limiting** on API routes
- **CSRF Protection**
- **XSS Protection**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 Pages

- **Home** (`/`) - Main landing page with hero, projects, and contact sections
- **About** (`/about`) - Detailed information about me and my skills
- **Privacy** (`/privacy`) - Privacy policy page
- **404** - Custom not found page

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production with image optimization
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types
- `npm run analyze` - Analyze bundle size
- `npm run optimize` - Optimize all images and generate WebP versions
- `npm run new-post` - Create a new blog post
- `npm run blog:validate` - Validate blog post frontmatter
- `npm run blog:generate-images` - Generate placeholder images for blog posts

### Image Optimization

The project includes automatic image optimization:
- Converts images to WebP format
- Generates responsive image sizes
- Optimizes images during build

### Blog Management

- Create a new blog post:
  ```bash
  npm run new-post "My New Post"
  ```
- Validate all blog posts:
  ```bash
  npm run blog:validate
  ```
- Generate placeholder images:
  ```bash
  npm run blog:generate-images
  ```

## 🚀 Deployment

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:

   ```bash
   npm start
   # or
   yarn start
   ```

3. Deploy to Vercel, Netlify, or your preferred hosting provider.

## 🔍 SEO

The website includes:

- Sitemap generation
- robots.txt
- OpenGraph and Twitter card meta tags
- JSON-LD structured data
- Canonical URLs

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- ARIA labels and roles
- Color contrast checking

## 📈 Performance

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Font optimization
- Critical CSS inlining
- Preloading of critical resources

## 🛠 Development Tools

- VS Code
- Git & GitHub
- ESLint
- Prettier
- Husky (Git Hooks)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OriginalLeeDunn/originalleedunn.me.git
   cd originalleedunn.me
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and copy the contents from `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

### Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── (main)/             # Main layout and pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── api/                # API routes
├── components/             # Reusable components
│   ├── ui/                 # UI components
│   ├── sections/           # Page sections
│   └── shared/             # Shared components
├── lib/                    # Utility functions
├── styles/                 # Global styles
├── types/                  # TypeScript types
└── public/                 # Static files
```

## 🔄 Deployment

The site is deployed to Vercel and automatically deploys on push to the `main` branch.

### Branch Structure

- `main` - Production branch (auto-deploys to production)
- `develop` - Development branch (auto-deploys to preview)
- `feature/*` - Feature branches (created from `develop`)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SITE_URL=https://originalleedunn.me
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=hello@originalleedunn.me
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 📬 Contact

- Email: [hello@originalleedunn.me](mailto:hello@originalleedunn.me)
- Website: [https://originalleedunn.me](https://originalleedunn.me)
- GitHub: [@OriginalLeeDunn](https://github.com/OriginalLeeDunn)
- Twitter: [@OriginalLeeDunn](https://twitter.com/OriginalLeeDunn)

1. Create feature branch from `dev`
2. Make changes
3. Push and test preview deployment
4. Merge to `dev` via pull request
5. Merge `dev` to `prod` for production

## 🌐 Live Site

Visit the live site at: [originalleedunn.vercel.app](https://originalleedunn.vercel.app/)

## 📝 License

MIT License

## 👤 Author

Lee Dunn

- Email: OriginalLeeDunn@proton.me
- GitHub: [@OriginalLeeDunn](https://github.com/originalLeedunn)
- Portfolio Repo: [Repo](https://github.com/OriginalLeeDunn/originalleedunn.me)
- Website: [OriginalLeeDunn.Vercel](https://originalleedunn.vercel.app/)
