// ============================================================
// NEXUSKIT — SaaS Starter Kit v1.0
// © 2025 Your Brand. All Rights Reserved.
// Built with React 18, Firebase 10+, Tailwind CSS, Lucide React
// ============================================================
//
// FILE STRUCTURE:
// ├── src/
// │   ├── config/
// │   │   └── firebaseConfig.js
// │   ├── context/
// │   │   └── AuthContext.jsx
// │   ├── hooks/
// │   │   └── useTheme.js
// │   ├── components/
// │   │   ├── layout/
// │   │   │   ├── Sidebar.jsx
// │   │   │   └── MobileNav.jsx
// │   │   ├── ui/
// │   │   │   ├── StatCard.jsx
// │   │   │   ├── ActivityTable.jsx
// │   │   │   └── Avatar.jsx
// │   ├── pages/
// │   │   ├── LoginPage.jsx
// │   │   ├── DashboardPage.jsx
// │   │   └── SettingsPage.jsx
// │   └── App.jsx
// ============================================================

import { useState, useEffect, useContext, createContext, useCallback } from "react";
import {
  LayoutDashboard, Settings, Users, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, Zap, Shield, TrendingUp,
  ArrowUpRight, ArrowDownRight, Activity, Package,
  CreditCard, Home, ChevronRight, Eye, EyeOff, Github,
  Mail, Lock, User, Sparkles, Globe, Database,
  Check, AlertCircle, Clock, Star, HelpCircle
} from "lucide-react";

// ============================================================
// FILE: src/config/firebaseConfig.js
// ============================================================
// IMPORTANT: Replace with your own Firebase project credentials.
// Get them from: https://console.firebase.google.com
// ============================================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
// NOTE: In a real project, install Firebase:
//   npm install firebase
// Then import and initialize like this:
//   import { initializeApp } from 'firebase/app';
//   import { getAuth } from 'firebase/auth';
//   import { getFirestore } from 'firebase/firestore';
//   const app = initializeApp(firebaseConfig);
//   export const auth = getAuth(app);
//   export const db = getFirestore(app);

// ============================================================
// FILE: src/context/AuthContext.jsx
// ============================================================
// Firebase Auth integration with React Context.
// Provides: currentUser, login, signup, logout, loginWithGoogle
// ============================================================
//
// REAL FIREBASE IMPLEMENTATION (paste this into AuthContext.jsx):
//
// import { createContext, useContext, useEffect, useState } from 'react';
// import {
//   signInWithEmailAndPassword, createUserWithEmailAndPassword,
//   signOut, onAuthStateChanged, GoogleAuthProvider,
//   signInWithPopup, updateProfile
// } from 'firebase/auth';
// import { auth } from '../config/firebaseConfig';
//
// export const AuthContext = createContext({});
// export const useAuth = () => useContext(AuthContext);
//
// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   const login = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);
//
//   const signup = (email, password, displayName) =>
//     createUserWithEmailAndPassword(auth, email, password).then(r =>
//       updateProfile(r.user, { displayName })
//     );
//
//   const logout = () => signOut(auth);
//
//   const loginWithGoogle = () =>
//     signInWithPopup(auth, new GoogleAuthProvider());
//
//   useEffect(() => {
//     return onAuthStateChanged(auth, user => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//   }, []);
//
//   return (
//     <AuthContext.Provider value={{ currentUser, login, signup, logout, loginWithGoogle, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// ---- DEMO AuthContext (used in this preview) ----
const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 1000));
    setCurrentUser({ email, displayName: email.split("@")[0], uid: "demo-uid-123" });
  };
  const signup = async (email, password, displayName) => {
    await new Promise(r => setTimeout(r, 1000));
    setCurrentUser({ email, displayName, uid: "demo-uid-456" });
  };
  const logout = () => setCurrentUser(null);
  const loginWithGoogle = async () => {
    await new Promise(r => setTimeout(r, 800));
    setCurrentUser({ email: "demo@nexuskit.io", displayName: "Demo User", uid: "google-uid-789" });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, loginWithGoogle, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// FILE: src/hooks/useTheme.js
// ============================================================
function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const toggle = useCallback(() => setIsDark(p => !p), []);
  return { isDark, toggle };
}

// ============================================================
// FILE: src/components/ui/Avatar.jsx
// ============================================================
function Avatar({ name = "U", size = "md", src }) {
  const colors = [
    "from-emerald-500 to-teal-600",
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  const sz = size === "sm" ? "w-7 h-7 text-xs" : size === "lg" ? "w-11 h-11 text-base" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${colors[idx]} flex items-center justify-center font-semibold text-white shrink-0 ring-2 ring-white/10`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ============================================================
// FILE: src/components/ui/StatCard.jsx
// ============================================================
function StatCard({ label, value, change, icon: Icon, color = "emerald", isDark }) {
  const positive = change >= 0;
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    violet: "bg-violet-500/10 text-violet-400 ring-violet-500/20",
    blue: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    rose: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
  };
  return (
    <div className={`rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] group cursor-default ${
      isDark ? "bg-slate-800/60 border-slate-700/50 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ring-1 ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          positive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        }`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className={`text-2xl font-bold tracking-tight mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{value}</p>
      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
    </div>
  );
}

// ============================================================
// FILE: src/components/ui/ActivityTable.jsx
// ============================================================
const activityData = [
  { user: "Sarah Chen", action: "Upgraded to Pro", time: "2m ago", status: "success", amount: "$49/mo" },
  { user: "Marcus Webb", action: "New signup", time: "14m ago", status: "info", amount: "—" },
  { user: "Priya Kapoor", action: "Payment failed", time: "1h ago", status: "error", amount: "$99/mo" },
  { user: "Tom Laurent", action: "Cancelled plan", time: "3h ago", status: "warning", amount: "—" },
  { user: "Aisha Okonkwo", action: "API key generated", time: "5h ago", status: "info", amount: "—" },
  { user: "Luis Mendez", action: "Upgraded to Enterprise", time: "1d ago", status: "success", amount: "$299/mo" },
];

const statusConfig = {
  success: { label: "Success", cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" },
  info: { label: "Info", cls: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20" },
  error: { label: "Failed", cls: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20" },
  warning: { label: "Warning", cls: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20" },
};

function ActivityTable({ isDark }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-slate-200"}`}>
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-700/50">
        <div>
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Recent Activity</h3>
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Live updates every 30s</p>
        </div>
        <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-xs uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <th className="text-left px-6 py-3 font-medium">User</th>
              <th className="text-left px-6 py-3 font-medium">Action</th>
              <th className="text-left px-6 py-3 font-medium">Time</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {activityData.map((row, i) => (
              <tr key={i} className={`transition-colors ${isDark ? "hover:bg-slate-700/30" : "hover:bg-slate-50"}`}>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.user} size="sm" />
                    <span className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>{row.user}</span>
                  </div>
                </td>
                <td className={`px-6 py-3.5 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{row.action}</td>
                <td className={`px-6 py-3.5 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {row.time}
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[row.status].cls}`}>
                    {statusConfig[row.status].label}
                  </span>
                </td>
                <td className={`px-6 py-3.5 text-sm font-mono text-right ${isDark ? "text-slate-300" : "text-slate-700"}`}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// FILE: src/components/layout/Sidebar.jsx
// ============================================================
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ page, setPage, isDark, onLogout, user }) {
  return (
    <aside className={`hidden md:flex flex-col w-64 shrink-0 border-r h-screen sticky top-0 ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <span className={`font-bold text-base tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>NexusKit</span>
            <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md font-medium ring-1 ring-emerald-500/20">Pro</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className={`text-xs font-semibold uppercase tracking-widest px-3 mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Menu</p>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                  : isDark
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon size={17} className={active ? "" : "group-hover:scale-110 transition-transform"} />
              {label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className={`p-3 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${isDark ? "bg-slate-800/60" : "bg-slate-50"}`}>
          <Avatar name={user?.displayName || user?.email || "U"} />
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${isDark ? "text-white" : "text-slate-900"}`}>
              {user?.displayName || "User"}
            </p>
            <p className={`text-xs truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>{user?.email}</p>
          </div>
          <button onClick={onLogout} className="text-slate-500 hover:text-rose-400 transition-colors" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ============================================================
// FILE: src/components/layout/MobileNav.jsx
// ============================================================
const mobileNavItems = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

function MobileNav({ page, setPage, isDark }) {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t flex items-center justify-around px-2 py-2 safe-bottom ${
      isDark ? "bg-slate-900/95 border-slate-800 backdrop-blur-xl" : "bg-white/95 border-slate-200 backdrop-blur-xl"
    }`}>
      {mobileNavItems.map(({ id, label, icon: Icon }) => {
        const active = page === id;
        return (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
              active
                ? "text-emerald-400"
                : isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ============================================================
// FILE: src/pages/LoginPage.jsx
// ============================================================
function LoginPage({ isDark }) {
  const { login, signup, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) return setError("Please fill in all fields.");
    setError(""); setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await signup(email, password, name || email.split("@")[0]);
    } catch (e) {
      setError(e.message || "Authentication failed.");
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try { await loginWithGoogle(); }
    catch (e) { setError(e.message || "Google sign-in failed."); }
    finally { setLoading(false); }
  };

  const inp = `w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:ring-2 focus:ring-emerald-500/40 ${
    isDark
      ? "bg-slate-800/60 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500/60"
      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-400"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-sm ${
          isDark ? "bg-slate-900/80 border-slate-700/60 shadow-black/40" : "bg-white border-slate-200 shadow-slate-200/80"
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <Zap size={22} className="text-white" />
            </div>
            <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {mode === "login" ? "Welcome back" : "Get started"}
            </h1>
            <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {mode === "login" ? "Sign in to your NexusKit account" : "Create your NexusKit account"}
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "Google", icon: Globe },
              { label: "GitHub", icon: Github },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={label === "Google" ? handleGoogle : undefined}
                className={`flex items-center justify-center gap-2.5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isDark
                    ? "border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                    : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className={`flex-1 h-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
            <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>or continue with email</span>
            <div className={`flex-1 h-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {mode === "signup" && (
              <div className="relative">
                <User size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                <input className={`${inp} pl-10`} placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="relative">
              <Mail size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input className={`${inp} pl-10`} placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input
                className={`${inp} pl-10 pr-10`}
                placeholder="Password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
              <button onClick={() => setShowPass(p => !p)} className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 px-3 py-2.5 rounded-xl ring-1 ring-rose-500/20">
              <AlertCircle size={13} /> {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>

          <p className={`text-center text-sm mt-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Trust badges */}
        <div className={`flex items-center justify-center gap-6 mt-6 text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
          {[{ icon: Shield, label: "SOC 2 Compliant" }, { icon: Lock, label: "256-bit SSL" }, { icon: Check, label: "GDPR Ready" }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={12} /> {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FILE: src/pages/DashboardPage.jsx
// ============================================================
const stats = [
  { label: "Monthly Revenue", value: "$24,563", change: 12.5, icon: TrendingUp, color: "emerald" },
  { label: "Active Users", value: "3,847", change: 8.2, icon: Users, color: "blue" },
  { label: "Conversion Rate", value: "4.63%", change: -2.1, icon: Activity, color: "violet" },
  { label: "Avg. Session", value: "6m 42s", change: 5.7, icon: Package, color: "rose" },
];

function DashboardPage({ isDark, user }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {greeting}, {user?.displayName?.split(" ")[0] || "there"} 👋
            </h1>
            <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Here's what's happening with your product today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-[1.02] ${
              isDark ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}>
              <Bell size={15} /> Alerts
              <span className="w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">3</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-opacity">
              <Sparkles size={15} /> New Report
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(s => <StatCard key={s.label} {...s} isDark={isDark} />)}
      </div>

      {/* Quick Insight Banner */}
      <div className={`rounded-2xl border p-5 mb-8 flex items-center gap-4 ${
        isDark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"
      }`}>
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 shrink-0">
          <TrendingUp size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
            Revenue is up 12.5% this month
          </p>
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            You're on track to hit your $30K monthly target. Keep it up!
          </p>
        </div>
        <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors shrink-0 flex items-center gap-1">
          Details <ChevronRight size={12} />
        </button>
      </div>

      {/* Activity Table */}
      <ActivityTable isDark={isDark} />

      {/* Bottom spacer for mobile nav */}
      <div className="h-20 md:h-0" />
    </div>
  );
}

// ============================================================
// FILE: src/pages/SettingsPage.jsx
// ============================================================
function SettingsPage({ isDark, toggleTheme, user }) {
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
  const [saved, setSaved] = useState(false);
  const [plan] = useState("Pro");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-emerald-500" : isDark ? "bg-slate-700" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : ""}`} />
    </button>
  );

  const Section = ({ title, children }) => (
    <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-slate-200"}`}>
      <div className={`px-6 py-4 border-b ${isDark ? "border-slate-700/50" : "border-slate-100"}`}>
        <h3 className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
      </div>
      <div className="divide-y divide-slate-700/30">
        {children}
      </div>
    </div>
  );

  const Row = ({ label, desc, children }) => (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>{label}</p>
        {desc && <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{desc}</p>}
      </div>
      {children}
    </div>
  );

  const inp2 = `w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all focus:ring-2 focus:ring-emerald-500/30 ${
    isDark ? "bg-slate-900/60 border-slate-700 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900"
  }`;

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Settings</h1>
        <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Manage your account and preferences</p>
      </div>

      <div className="space-y-5">
        {/* Profile */}
        <Section title="Profile">
          <div className="px-6 py-5">
            <div className="flex items-center gap-4 mb-5">
              <Avatar name={user?.displayName || "U"} size="lg" />
              <div>
                <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{user?.displayName || "User"}</p>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{user?.email}</p>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md ring-1 ring-emerald-500/20 mt-1 inline-block">
                  {plan} Plan
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className={inp2} defaultValue={user?.displayName || ""} placeholder="Display name" />
              <input className={inp2} defaultValue={user?.email || ""} placeholder="Email address" type="email" />
            </div>
          </div>
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <Row label="Dark mode" desc="Toggle between light and dark interface">
            <Toggle checked={isDark} onChange={toggleTheme} />
          </Row>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <Row label="Email notifications" desc="Receive updates via email">
            <Toggle checked={notifications.email} onChange={v => setNotifications(p => ({ ...p, email: v }))} />
          </Row>
          <Row label="Push notifications" desc="Browser push alerts">
            <Toggle checked={notifications.push} onChange={v => setNotifications(p => ({ ...p, push: v }))} />
          </Row>
          <Row label="Weekly digest" desc="Summary report every Monday">
            <Toggle checked={notifications.weekly} onChange={v => setNotifications(p => ({ ...p, weekly: v }))} />
          </Row>
        </Section>

        {/* Plan */}
        <Section title="Subscription">
          <div className="px-6 py-5">
            <div className={`flex items-center justify-between p-4 rounded-xl ${isDark ? "bg-emerald-500/5 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}>
              <div>
                <p className="text-sm font-semibold text-emerald-400">Pro Plan</p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>$49/month · Renews Jan 1, 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <Star size={14} className="text-emerald-400 fill-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">Active</span>
              </div>
            </div>
            <button className={`mt-3 w-full py-2.5 rounded-xl border text-sm font-medium transition-all hover:scale-[1.01] ${
              isDark ? "border-slate-700 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}>
              Manage subscription
            </button>
          </div>
        </Section>

        {/* Danger Zone */}
        <Section title="Danger Zone">
          <div className="px-6 py-5">
            <p className={`text-xs mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              These actions are permanent and cannot be undone.
            </p>
            <button className="py-2.5 px-4 rounded-xl border border-rose-500/30 text-rose-400 text-sm font-medium hover:bg-rose-500/10 transition-colors">
              Delete account
            </button>
          </div>
        </Section>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            {saved ? <><Check size={15} /> Saved!</> : "Save changes"}
          </button>
          <button className={`px-6 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            isDark ? "border-slate-700 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}>
            Cancel
          </button>
        </div>
      </div>
      <div className="h-20 md:h-0" />
    </div>
  );
}

// ============================================================
// FILE: src/pages/PlaceholderPage.jsx
// ============================================================
function PlaceholderPage({ title, isDark }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
        <Database size={24} className={isDark ? "text-slate-500" : "text-slate-400"} />
      </div>
      <h2 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      <p className={`text-sm max-w-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        This page is ready for your custom implementation. Connect your Firestore data to build it out.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg ring-1 ring-emerald-500/20">
        <HelpCircle size={12} /> See <code className="font-mono">src/pages/</code> to add your content
      </div>
    </div>
  );
}

// ============================================================
// FILE: src/App.jsx — Root Application
// ============================================================
function AppShell() {
  const { currentUser, logout } = useAuth();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [page, setPage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!currentUser) return <LoginPage isDark={isDark} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage isDark={isDark} user={currentUser} />;
      case "settings": return <SettingsPage isDark={isDark} toggleTheme={toggleTheme} user={currentUser} />;
      default: return <PlaceholderPage title={navItems.find(n => n.id === page)?.label || page} isDark={isDark} />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <Sidebar page={page} setPage={setPage} isDark={isDark} onLogout={logout} user={currentUser} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className={`md:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-40 ${
          isDark ? "bg-slate-900/95 border-slate-800 backdrop-blur-xl" : "bg-white/95 border-slate-200 backdrop-blur-xl"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/25">
              <Zap size={14} className="text-white" />
            </div>
            <span className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>NexusKit</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Avatar name={currentUser?.displayName || "U"} size="sm" />
          </div>
        </header>

        {/* Desktop top bar */}
        <header className={`hidden md:flex items-center justify-between px-8 py-4 border-b ${
          isDark ? "bg-slate-900/50 border-slate-800/60 backdrop-blur-sm" : "bg-white/70 border-slate-200 backdrop-blur-sm"
        }`}>
          <div>
            <p className={`text-xs capitalize ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Dashboard / <span className={isDark ? "text-slate-300" : "text-slate-600"}>{navItems.find(n => n.id === page)?.label || page}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className={`relative p-2 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}>
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <MobileNav page={page} setPage={setPage} isDark={isDark} />
    </div>
  );
}

// ============================================================
// ROOT EXPORT
// ============================================================
export default function NexusKitApp() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
