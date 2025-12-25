# FARAS - Fitness & Muscle Building Supplements

A modern, premium e-commerce platform for fitness and muscle building supplements.

## 🚀 Features

- **Modern UI/UX**: Dark mode dominant design with smooth animations
- **Full E-commerce**: Product catalog, cart, checkout with Stripe
- **User Authentication**: JWT-based auth with user accounts
- **Admin Dashboard**: Product and order management
- **Blog**: Educational fitness content
- **SEO Optimized**: Meta tags and clean URLs
- **Responsive**: Mobile-first design

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Framer Motion
- Stripe.js

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe API

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI, JWT secret, and Stripe keys.

3. **Start development servers:**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
faras-building/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── lib/              # Utilities & API client
│   └── public/           # Static assets
├── server/                # Express backend
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & validation
│   └── server.js         # Entry point
└── .env                  # Environment variables
```

## 🔐 Default Admin Account

After seeding:
- Email: admin@faras.com
- Password: admin123

## 📝 Legal & Safety

All product pages include disclaimers:
> "These products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before use."

## 🎨 Design System

- **Colors**: Black, dark gray, white, accent green (#10B981)
- **Font**: Inter
- **Theme**: Dark mode dominant

## 📄 License

ISC

