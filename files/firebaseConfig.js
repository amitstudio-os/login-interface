// ============================================================
// src/config/firebaseConfig.js
// ============================================================
// Replace values below with your Firebase project credentials.
// Find them at: https://console.firebase.google.com
// Project Settings > General > Your Apps > Firebase SDK snippet
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const supabaseConfig = {
  url: process.env.REACT_APP_SUPABASE_URL ||
    'https://tlebjzzbfcabzbnpwtva.supabase.co/rest/v1/',
  key: process.env.REACT_APP_SUPABASE_KEY ||
    'sb_publishable_iH6m_qbHrDuQVwvqJvHB6Q_VUuYv_rQ',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
