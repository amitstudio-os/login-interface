// ============================================================
// src/context/AuthContext.jsx
// ============================================================
// Full Firebase Auth integration with React Context.
// Provides: currentUser, login, signup, logout, loginWithGoogle
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const AuthContext = createContext({});

/**
 * Custom hook to access auth context.
 * Usage: const { currentUser, login, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /** Sign in with email + password */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  /** Create account with email + password, then set displayName */
  const signup = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    return result;
  };

  /** Sign out */
  const logout = () => signOut(auth);

  /** Google OAuth popup */
  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  /** Send password reset email */
  const resetPassword = (email) =>
    sendPasswordResetEmail(auth, email);

  /** Subscribe to auth state changes */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // cleanup on unmount
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
