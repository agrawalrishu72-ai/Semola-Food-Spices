# Semola Food & Spices — Premium Next.js React Application

An ultra-premium, modern, and highly responsive website for **Semola Food & Spices** (a Government of India MSME/Udyam registered enterprise). 

Inspired by high-end dark luxury themes (Apple, Tesla, Stripe, Linear style) using React, Tailwind CSS, TypeScript, and Framer Motion.

## 🚀 Tech Stack
* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion & CSS keyframe animation meshes
* **Icons**: Lucide React

## 📦 Project Structure
```text
semola-next/
├── package.json          # Dependencies & build scripts
├── tailwind.config.ts    # Custom colors (Velvet Red, Royal Gold) & luxury fonts
├── tsconfig.json         # TypeScript compiler configurations
├── postcss.config.js     # CSS compilation config
├── src/
│   ├── app/
│   │   ├── layout.tsx    # App root, viewport configurations, SEO Meta tags
│   │   ├── page.tsx      # Homepage stitch containing all sub-sections
│   │   ├── globals.css   # Main stylesheet containing glassmorphic styling
│   │   ├── not-found.tsx # Premium 404 error page fallback
│   │   ├── about/        # About page sub-route
│   │   ├── products/     # Products catalog listing and dynamic details page
│   │   ├── recipes/      # Interactive Recipe Hub and dynamic instructions page
│   │   ├── manufacturing/# Timeline company heritage sub-route
│   │   ├── quality/      # Features standards sub-route
│   │   ├── distributor/  # Partnership lead form sub-route
│   │   └── contact/      # Contact details and direct desk link route
│   ├── types/
│   │   └── recipe.ts     # TypeScript type interfaces for Recipe Hub
│   ├── data/
│   │   ├── recipes.ts    # Rich recipe database containing culinary assets
│   │   └── products.ts   # Detailed product profiles, prices, benefits & pairings
│   ├── utils/
│   │   └── recipeSearch.ts # Fuzzy search, misspelling corrections and synonyms engine
│   └── components/
│       ├── Loader.tsx             # Elegant logo fade loading splash screen
│       ├── CursorGlow.tsx         # Responsive magnetic pointer blur light
│       ├── BackgroundBlobs.tsx     # Blurred floating ambient background spheres
│       ├── FloatingParticles.tsx   # Canvas-drawn floating spice particles
│       ├── Navbar.tsx             # Sticky responsive navigation links
│       ├── HeroSection.tsx        # Dynamic title & call to actions
│       ├── AboutSection.tsx       # Company heritage, stats, and MSME data
│       ├── FeaturesSection.tsx    # Bento Grid of trust standards
│       ├── ProductShowcase.tsx    # Spice products grid & detail modal popups
│       ├── RecipeHub.tsx          # AI Interactive Recipe Hub & voice tools
│       ├── CookingAnimation.tsx   # Interactive loop cartoon cooking states
│       ├── TimelineSection.tsx    # Timeline trace of company growth path
│       ├── TestimonialsSection.tsx# Auto-sliding testimonials slider
│       ├── PricingSection.tsx     # Trial / corporate pricing cards
│       ├── FaqSection.tsx         # Collapsible accordion FAQ list
│       ├── ContactFormSection.tsx # Distributor & bulk order filing forms
│       ├── SpiceMap.tsx           # Interactive Sourcing SVG Trail Map
│       ├── SpicePairing.tsx       # Culinary Ingredient Pairing Science Guide
│       ├── CookingTimer.tsx       # Dynamic Digital Cooking Step Timer
│       ├── CulinaryTools.tsx      # Measurement Converter & Macro Calculator
│       └── Footer.tsx             # Corporate corporate columns & contacts
```

## 🛠️ Local Installation & Development

### 1. Prerequisite
Ensure you have **Node.js** (v18.0 or newer) installed.

### 2. Setup Project
Unzip the `semola-next-project.zip` folder and enter the project directory:
```bash
cd semola-next
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser to check the premium page preview.

### 5. Build for Production
To generate an optimized production bundle:
```bash
npm run build
npm run start
```

## 🌐 Deployment
This project is fully ready to deploy instantly to Vercel, Netlify, or AWS Amplify with a single click. Simply push this codebase to a GitHub repository, link it to Vercel, and it will deploy with optimal global caching automatically.
