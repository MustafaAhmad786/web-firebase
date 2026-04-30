// ============================================
// 🔐 auth.js — Shared Authentication Logic
// Yeh file sari pages mein share hoti hai
// Login check, logout, aur messages is file mein hain
// ============================================

import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ─────────────────────────────────────────────
// checkAuth() — Har page pe call karo
// protectedPage = true  → sirf logged-in users dekh sakte hain (jaise dashboard)
// protectedPage = false → agar logged in hai toh dashboard pe bhejo (jaise login page)
// ─────────────────────────────────────────────
export function checkAuth(protectedPage = false) {
  onAuthStateChanged(auth, (user) => {
    if (protectedPage) {
      // Dashboard jaisi page — agar user nahi hai toh login pe bhejo
      if (!user) {
        window.location.href = "login.html";
      }
    } else {
      // Login/Register page — agar pehle se logged in hai toh dashboard pe bhejo
      if (user) {
        window.location.href = "dashboard.html";
      }
    }
  });
}

// ─────────────────────────────────────────────
// logoutUser() — User ko logout karo
// Firebase se sign out karo aur login page pe bhejo
// ─────────────────────────────────────────────
export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
}

// ─────────────────────────────────────────────
// getCurrentUser() — Abhi logged in user return karta hai
// Agar koi logged in nahi toh null return karta hai
// ─────────────────────────────────────────────
export function getCurrentUser() {
  return auth.currentUser;
}

// ─────────────────────────────────────────────
// showMessage() — Page pe success/error message dikhao
// id="message-box" wala div HTML mein hona zaroori hai
// type = "success" ya "error"
// ─────────────────────────────────────────────
export function showMessage(message, type = "success") {
  const msgBox = document.getElementById("message-box");
  if (!msgBox) return;

  msgBox.textContent = message;
  msgBox.className = `message-box ${type}`;
  msgBox.style.display = "block";

  // 4 second baad message hide kar do
  setTimeout(() => {
    msgBox.style.display = "none";
  }, 4000);
}

// ─────────────────────────────────────────────
// getErrorMessage() — Firebase error codes ko readable text mein badlo
// Firebase technical codes deta hai, hum user ko simple message dikhate hain
// ─────────────────────────────────────────────
export function getErrorMessage(code) {
  const errors = {
    "auth/user-not-found":        "No account found with this email address.",
    "auth/wrong-password":        "Incorrect password. Please try again.",
    "auth/email-already-in-use":  "This email is already registered.",
    "auth/weak-password":         "Password must be at least 6 characters.",
    "auth/invalid-email":         "Please enter a valid email address.",
    "auth/too-many-requests":     "Too many attempts. Please try again later.",
    "auth/network-request-failed":"Network error. Check your internet connection.",
    "auth/invalid-credential":    "Invalid email or password.",
  };
  // Agar code list mein nahi hai toh generic message do
  return errors[code] || "Something went wrong. Please try again.";
}
