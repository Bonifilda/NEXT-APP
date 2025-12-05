# Next.js Assignment - Rendering Techniques Demo

This project demonstrates various Next.js rendering techniques including CSR, SSR, SSG, and ISR using the App Router.

## 🚀 Deployed Link
[Live Demo](https://your-deployed-link-here.vercel.app)

## 📁 Project Structure

```
app/
├── layout.tsx          # Main layout with header/footer
├── page.tsx           # Home page with CSR component
├── about/
│   └── page.tsx       # About page (SSR)
├── blog/
│   ├── layout.tsx     # Blog layout with sidebar
│   ├── page.tsx       # Blog list (SSG)
│   └── [id]/
│       └── page.tsx   # Blog detail (ISR)
└── components/
    └── CurrentTime.tsx # Client-side time component
```

## 🎯 Rendering Techniques Used

### 1. **Client-Side Rendering (CSR)**
- **Location**: Home page (`/`)
- **Component**: `CurrentTime.tsx`
- **Description**: Real-time clock that updates every second using React hooks

### 2. **Server-Side Rendering (SSR)**
- **Location**: About page (`/about`)
- **API**: `https://jsonplaceholder.typicode.com/users/1`
- **Description**: Fetches author information on each request using `cache: 'no-store'`

### 3. **Static Site Generation (SSG)**
- **Location**: Blog page (`/blog`)
- **API**: `https://jsonplaceholder.typicode.com/posts`
- **Description**: Pre-renders blog posts list at build time

### 4. **Incremental Static Regeneration (ISR)**
- **Location**: Blog detail pages (`/blog/[id]`)
- **API**: `https://jsonplaceholder.typicode.com/posts/[id]`
- **Description**: Static pages that revalidate every 60 seconds

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NEXT-APP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Features

- **Responsive Design**: Built with Tailwind CSS
- **Navigation**: Header with links to all pages
- **Nested Layouts**: Blog section has its own layout with sidebar
- **API Integration**: Uses JSONPlaceholder for demo data
- **TypeScript**: Fully typed components and API responses

## 📱 Pages Overview

- **Home (`/`)**: Welcome message + live clock (CSR)
- **About (`/about`)**: Author information fetched server-side (SSR)
- **Blog (`/blog`)**: List of blog posts (SSG)
- **Blog Detail (`/blog/[id]`)**: Individual post with author info (ISR)

## 🔧 Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- JSONPlaceholder API

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```
