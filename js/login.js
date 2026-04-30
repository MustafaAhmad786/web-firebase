// ============================================
// 🔑 login.js — Login Page Logic
// Sirf login.html is file ko use karta hai
// Email/Password login aur Google login yahan hai
// ============================================

import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { checkAuth, showMessage, getErrorMessage } from "./auth.js";

// ─────────────────────────────────────────────
// Pehle check karo — agar already logged in hai toh dashboard pe bhejo
// false matlab yeh public page hai (login page)
// ─────────────────────────────────────────────
checkAuth(false);

// HTML se form aur Google button pakdo
const loginForm   = document.getElementById("login-form");
const googleBtn   = document.getElementById("google-login-btn");

// ─────────────────────────────────────────────
// Email/Password Login
// Form submit hone pe yeh function chalta hai
// ─────────────────────────────────────────────
loginForm.addEventListener("submit", async (e) => {
  // Default form submission rokho (page reload na ho)
  e.preventDefault();

  // Input fields se values lo
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const btn      = document.getElementById("login-btn");

  // Button disable karo — double click se bacho
  btn.disabled    = true;
  btn.textContent = "Signing in...";

  try {
    // Firebase se login karo
    await signInWithEmailAndPassword(auth, email, password);

    showMessage("✅ Login successful! Redirecting...", "success");

    // 1 second baad dashboard pe bhejo
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (error) {
    // Error aaya — user ko message dikhao aur button wapas enable karo
    showMessage(getErrorMessage(error.code), "error");
    btn.disabled    = false;
    btn.textContent = "Sign In";
  }
});

// ─────────────────────────────────────────────
// Google Login
// Popup khulta hai jisme user apna Google account choose karta hai
// ─────────────────────────────────────────────
googleBtn.addEventListener("click", async () => {
  // GoogleAuthProvider — Firebase ka built-in Google login tool
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);

    showMessage("✅ Google login successful!", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (error) {
    showMessage(getErrorMessage(error.code), "error");
  }
});
