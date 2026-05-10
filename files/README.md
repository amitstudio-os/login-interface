# ⚡ NexusKit — SaaS Starter Kit

> A premium, production-ready React + Firebase SaaS dashboard template. Ship your SaaS faster.

![Version](https://img.shields.io/badge/version-1.0.0-emerald) ![React](https://img.shields.io/badge/React-18-blue) ![Firebase](https://img.shields.io/badge/Firebase-10+-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-3.x-cyan) ![License](https://img.shields.io/badge/license-Commercial-purple)

---

## ✨ Features

- 🔐 **Firebase Auth** — Email/password + Google OAuth, with full AuthContext
- 🗄️ **Firestore Ready** — Database integration pattern included
- 🌙 **Dark / Light Mode** — Toggle with one click, preference persisted
- 📱 **Fully Responsive** — Desktop sidebar + mobile bottom navigation
- 📊 **Dashboard** — Stat cards, real-time activity table, trend indicators
- ⚙️ **Settings Page** — Profile editor, notification toggles, subscription info
- 🎨 **Premium Design** — Slate + Emerald palette, glassmorphism, micro-animations
- 🧩 **Modular Architecture** — Every file is clean, commented, and replaceable

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npx create-react-app nexuskit --template cra-template
cd nexuskit
npm install firebase lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind (`tailwind.config.js`)

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### 3. Add Tailwind to `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password + Google)
4. Enable **Firestore Database**
5. Copy your config into `src/config/firebaseConfig.js`

### 5. Place the files

Copy the files from this kit into your `src/` folder following the structure below.

### 6. Run

```bash
npm start
```

---

## 📁 File Structure

```
src/
├── config/
│   └── firebaseConfig.js        # Firebase credentials & initialization
├── context/
│   └── AuthContext.jsx          # Auth state, login, signup, logout, Google
├── hooks/
│   └── useTheme.js              # Dark/light mode toggle hook
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Desktop sidebar navigation
│   │   └── MobileNav.jsx        # Mobile bottom tab bar
│   └── ui/
│       ├── StatCard.jsx         # Dashboard metric card
│       ├── ActivityTable.jsx    # Recent activity table
│       └── Avatar.jsx           # User avatar with initials
├── pages/
│   ├── LoginPage.jsx            # Login + Signup with social auth UI
│   ├── DashboardPage.jsx        # Main dashboard with stats
│   └── SettingsPage.jsx         # Profile, notifications, appearance
└── App.jsx                      # Root shell, routing, layout
```

---

## 🔑 Firebase AuthContext API

```jsx
import { useAuth } from './context/AuthContext';

const { currentUser, login, signup, logout, loginWithGoogle } = useAuth();

// Login
await login(email, password);

// Sign up
await signup(email, password, displayName);

// Google OAuth
await loginWithGoogle();

// Logout
logout();

// Current user object (Firebase User)
currentUser.email;
currentUser.displayName;
currentUser.uid;
```

---

## 🗄️ Firestore Usage Example

```js
import { db } from './config/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Write data
await addDoc(collection(db, "users"), {
  uid: currentUser.uid,
  email: currentUser.email,
  plan: "pro",
  createdAt: new Date(),
});

// Read user data
const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
const snapshot = await getDocs(q);
const data = snapshot.docs.map(doc => doc.data());
```

---

## 🎨 Customization

| What | Where |
|------|-------|
| Brand name & logo | `Sidebar.jsx`, `LoginPage.jsx`, `App.jsx` |
| Color palette | Replace `emerald` with any Tailwind color (e.g. `violet`, `blue`) |
| Nav items | `navItems` array in `Sidebar.jsx` and `MobileNav.jsx` |
| Stat cards | `stats` array in `DashboardPage.jsx` |
| Activity data | `activityData` array in `ActivityTable.jsx` |
| Pricing | `SettingsPage.jsx` subscription section |

---

## 🛡️ Security Notes

- **Never** commit `firebaseConfig.js` with real credentials to public repos
- Use `.env` variables: `REACT_APP_FIREBASE_API_KEY=...`
- Set up **Firestore Security Rules** before going to production
- Enable **App Check** for additional API abuse protection

---

## 📦 Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.x | UI framework |
| Firebase | 10.x | Auth + Database |
| Tailwind CSS | 3.x | Styling |
| Lucide React | Latest | Icons |

---

## 📄 License

**Commercial License** — You may use this in unlimited client projects and sell products built on top of it. You may not resell the source code itself as a standalone template.

---

*Built with ⚡ by NexusKit*
