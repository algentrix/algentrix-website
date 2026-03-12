# Algentrix

A modern one-page website built with React, TypeScript, and Locomotive Scroll for smooth scrolling navigation.

## Features

- **Smooth Scrolling** - Locomotive Scroll v4 for buttery-smooth scroll experience
- **Dark Theme** - Sleek dark design with green, orange, and purple accents
- **Responsive** - Mobile-friendly layout with hamburger menu
- **Sections**:
  - Hero with animated globe graphic
  - Partners
  - Why Choose Us
  - Stats/Metrics
  - Featured Services (9 service cards)
  - Industry Expertise
  - Portfolio with filters
  - Client Testimonials
  - Contact Form
  - Footer with links

## Tech Stack

- React 19
- TypeScript
- Vite
- Locomotive Scroll v4
- React Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to algentrix.com

### Netlify (recommended)

1. Go to [netlify.com](https://netlify.com) and sign in
2. **Add new site** → **Import an existing project**
3. Connect **GitHub** and select `algentrix/algentrix-website`
4. Build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**
6. To use **algentrix.com**: Site settings → Domain management → Add custom domain → `algentrix.com`

### Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. **Add New** → **Project** → Import `algentrix/algentrix-website`
3. Deploy (settings auto-detected from `vercel.json`)
4. Add custom domain `algentrix.com` in Project Settings → Domains

## Project Structure

```
src/
├── components/     # Section components (Header, Hero, Services, etc.)
├── hooks/         # useLocomotiveScroll for smooth scroll
├── App.tsx        # Main app with Locomotive container
├── App.css        # Section styles
└── index.css      # Global styles & CSS variables
```
