# Nous NLP

**Nurturing Our Unique Speech** — A personal research hub and portfolio built with Next.js, MongoDB, and Cloudinary.

## Features

- **Public Site**: Clean, animated portfolio with articles, projects, and about page
- **Admin Dashboard**: Separate CMS with GitHub OAuth authentication
- **Rich Text Editor**: TipTap-based editor with code blocks, images, videos, and links
- **Media Management**: Cloudinary-powered image and video uploads
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- NextAuth.js (GitHub OAuth)
- TipTap Editor
- Cloudinary
- Framer Motion

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo>
cd nous-nlp
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel

```bash
vercel --prod
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXTAUTH_URL` | Your app URL |
| `NEXTAUTH_SECRET` | Random secret for JWT |
| `GITHUB_ID` | GitHub OAuth App Client ID |
| `GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/          # API routes
│   ├── admin/        # Admin dashboard
│   ├── articles/     # Public article pages
│   ├── projects/     # Public project pages
│   ├── about/        # About page
│   └── page.tsx      # Homepage
├── components/       # React components
│   ├── admin/        # Admin-specific components
│   ├── animations/   # Framer Motion animations
│   ├── editor/       # TipTap editor components
│   └── ui/           # Reusable UI components
├── lib/              # Utilities and config
├── models/           # Mongoose models
└── types/            # TypeScript types
```

## License

MIT
