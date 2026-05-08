<div align="center">
  <h1>✨ RumanTech Storefront</h1>
  <p><strong>A Premium, High-Performance eCommerce Frontend built with Next.js</strong></p>

  <p>
    <a href="https://rumantech-backend.onrender.com/api/v1">Backend API</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
    ·
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

<br />

## 🌟 Overview

RumanTech Storefront is the modern, consumer-facing application for the RumanTech eCommerce platform. Engineered with **Next.js 15, Tailwind CSS, and TypeScript**, it delivers a lightning-fast, fully responsive, and SEO-optimized shopping experience.

---

## 🎨 Features

- **🚀 Server-Side Rendering (SSR) & Static Generation (SSG):** Optimal performance and SEO out of the box.
- **🔐 Secure Authentication:** Seamless login, registration, and password recovery integrated with Zustand.
- **🛒 Dynamic Cart & Checkout:** Real-time cart updates and fluid order management.
- **📱 Responsive UI/UX:** Perfectly styled across all devices using Tailwind CSS and Radix Primitives.
- **🎛️ Admin & User Dashboards:** Dedicated routed layouts for standard customers and administrators.
- **⚡ Optimistic UI Updates:** Fluid transitions and instant feedback via React Query.

---

## 🛠 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching:** [Axios](https://axios-http.com/) & [TanStack Query](https://tanstack.com/query)
- **Deployment:** Ready for [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MostafijurRuman/RumanTech-Client.git
   cd RumanTech-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.local.example` to `.env.local` and set out the backend API URL:
   ```bash
   cp .env.local.example .env.local
   # Ensure NEXT_PUBLIC_API_BASE_URL points to the backend
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

---

## 👨‍💻 Developer Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the server in development mode |
| `npm run build` | Creates an optimized production build |
| `npm start` | Runs the compiled application |
| `npm run lint` | Lints the codebase |

---

<div align="center">
  <i>Crafted with ❤️ for the ultimate shopping experience.</i>
</div>

