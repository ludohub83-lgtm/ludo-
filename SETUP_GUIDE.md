# 🚀 Admin Panel Setup Guide

## Quick Start

### 1. Navigate to Admin Panel Directory

```bash
cd admin-panel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a file named `.env.local` in the `admin-panel` directory:

```env
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

**For Production:**
```env
NEXT_PUBLIC_API_BASE=https://your-backend-url.railway.app
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
admin-panel/
├── app/
│   ├── layout.js          # Root layout with Toaster
│   ├── page.js            # Main dashboard page
│   └── globals.css        # Tailwind CSS styles
├── components/
│   ├── AdminDashboard.jsx # Main dashboard
│   ├── AdminButton.jsx    # Gradient buttons
│   ├── StatsCard.jsx      # Stats cards
│   └── modals/            # Modal components
├── lib/
│   └── api.js             # API client
└── package.json
```

## 🔌 Backend Connection

The admin panel connects to your Ludo app backend at:
- **Development**: `http://localhost:4000`
- **Production**: Your deployed backend URL

Make sure your backend is running and CORS is enabled.

## 🎨 Features

✅ 12 Admin control buttons
✅ Gradient animations
✅ Glassmorphism effects
✅ Real-time stats
✅ Badge notifications
✅ Modal dialogs for each feature
✅ Fully responsive

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variable: `NEXT_PUBLIC_API_BASE`
5. Deploy!

### Deploy to Other Platforms

- **Netlify**: Connect GitHub, build command: `npm run build`
- **Railway**: Auto-detects Next.js
- **Render**: Set build command: `npm run build`

## 📝 Notes

- This is a **separate website** from your Ludo app
- It only connects via APIs
- Regular users cannot access it
- Keep the URL private for admin use only

## ✅ Ready!

Your admin panel is ready to use! 🎉

