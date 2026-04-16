# KeenKeeper

KeenKeeper is a modern Next.js web app for managing friendship check-ins, viewing interaction history, and tracking relationship health over time.

It includes a dashboard, timeline, analytics view, legal pages, and a custom 404 experience, with a responsive UI designed for desktop and mobile.

## Features

- Friend dashboard with quick overview cards and status-based filtering
- Timeline view for recording and reviewing check-ins
- Stats page for interaction analytics and visual insights
- Dynamic friend detail pages (`/friends/[id]`)
- Local timeline persistence using browser storage
- Toast notifications for interactive actions
- Legal pages (`/privacy-policy`, `/terms-of-service`, `/cookies`)
- Custom global `not-found` page

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 + daisyUI
- Font Awesome
- Recharts
- ESLint

## Project Structure

```text
src/
  app/
    (pages)/
      page.jsx
      timeline/page.jsx
      stats/page.jsx
      friends/[id]/page.jsx
      privacy-policy/page.jsx
      terms-of-service/page.jsx
      cookies/page.jsx
    api/friends/route.js
    layout.js
    not-found.jsx
  components/
    HomeDashboard.jsx
    Navbar.jsx
    Footer.jsx
    FriendCard.jsx
    CheckInActions.jsx
  context/
    TimelineContext.jsx
    ToastContext.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint checks

## Deployment

KeenKeeper is ready for deployment on Vercel.

When deploying from Windows to Linux-based environments (like Vercel), ensure path casing is consistent. This project uses `src/components` (lowercase), and imports should match that exact casing.

## License

This project is provided for educational/assignment purposes.