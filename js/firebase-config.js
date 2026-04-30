// ============================================
// 🔥 firebase-config.js
// Yeh file Firebase se connection banati hai
// Sari doosri JS files is file se auth import karti hain
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ⚠️ YAHAN APNA CONFIG PASTE KARO
// Firebase Console → Project Settings → Your Apps → SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvVesUZX844kqsy8Oy-5BYAWA4EmtUxbg",
  authDomain: "saylani-firebase-class-baedb.firebaseapp.com",
  projectId: "saylani-firebase-class-baedb",
  storageBucket: "saylani-firebase-class-baedb.firebasestorage.app",
  messagingSenderId: "416380066770",
  appId: "1:416380066770:web:42c1507343ca29e2c6c60b",
  measurementId: "G-8BSGL5BLXC"
};
// Firebase app initialize karo — yeh ek baar hi hona chahiye poori website mein
const app = initializeApp(firebaseConfig);

// Auth instance banao aur export karo
// Doosri files "import { auth } from './firebase-config.js'" likh ke use karein
export const auth = getAuth(app);
