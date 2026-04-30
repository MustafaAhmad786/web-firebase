// ============================================
// 🏠 dashboard.js — Dashboard Page Logic
// Sirf dashboard.html is file ko use karta hai
// Protected page — sirf logged in users dekh sakte hain
// ============================================

import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { checkAuth, logoutUser } from "./auth.js";

// ─────────────────────────────────────────────
// Protected Page Check
// true matlab — login zaroori hai is page ke liye
// Agar user logged in nahi toh login.html pe redirect hoga
// ─────────────────────────────────────────────
checkAuth(true);

// ─────────────────────────────────────────────
// onAuthStateChanged — Firebase batata hai jab user ready ho
// User ki info yahan se milti hai aur page pe dikhate hain
// ─────────────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  if (user) {
    const displayName = user.displayName || "User";
    const email = user.email;

    document.getElementById("user-name").textContent = displayName;
    document.getElementById("user-email").textContent = email;

    document.getElementById("user-initial").textContent =
      displayName.charAt(0).toUpperCase();

    const createdAt = new Date(user.metadata.creationTime);
    document.getElementById("join-date").textContent =
      createdAt.toLocaleDateString();
  } else {
    window.location.href = "login.html";
  }
});

// ─────────────────────────────────────────────
// Logout Button
// User click kare toh confirm karo, phir logout karo
// logoutUser() auth.js mein define hai
// ─────────────────────────────────────────────
document.getElementById("logout-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    logoutUser(); // auth.js wala function — Firebase signOut + login pe redirect
  }
});
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();

