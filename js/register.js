// ============================================
// 📝 register.js — Register Page Logic
// Sirf register.html is file ko use karta hai
// Naya account banana yahan handle hota hai
// ============================================

import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { checkAuth, showMessage, getErrorMessage } from "./auth.js";

// ─────────────────────────────────────────────
// Pehle check karo — agar already logged in hai toh dashboard pe bhejo
// ─────────────────────────────────────────────
checkAuth(false);

// HTML se register form pakdo
const registerForm = document.getElementById("register-form");

// ─────────────────────────────────────────────
// Form Submit — Naya account banana
// ─────────────────────────────────────────────
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Page reload rokho

  // Input fields se values lo
  const name            = document.getElementById("name").value.trim();
  const email           = document.getElementById("email").value.trim();
  const password        = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const btn             = document.getElementById("register-btn");

  // ── Validation — Submit se pehle check karo ──

  // Naam khali nahi hona chahiye
  if (!name) {
    showMessage("Please enter your full name.", "error");
    return;
  }

  // Dono passwords match karne chahiye
  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  // Password kam az kam 6 characters ka hona chahiye
  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  // Button disable karo processing ke doran
  btn.disabled    = true;
  btn.textContent = "Creating account...";

  try {
    // Step 1: Firebase mein email/password se account banao
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Step 2: Firebase profile mein naam save karo
    // Yeh naam dashboard pe dikhega
    await updateProfile(userCredential.user, {
      displayName: name
    });

    showMessage(`✅ Account created! Welcome, ${name}!`, "success");

    // 1.5 second baad dashboard pe bhejo
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);

  } catch (error) {
    // Error — user ko samjhao kya hua
    showMessage(getErrorMessage(error.code), "error");
    btn.disabled    = false;
    btn.textContent = "Create Account";
  }
});
