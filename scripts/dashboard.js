console.log("JS Loaded 🚀");

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";


import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0qXo-9_UdpxmEp1lGd3MkUFyB9rZ_e7g",
    authDomain: "genbayt-1520b.firebaseapp.com",
    projectId: "genbayt-1520b",
    appId: "1:811766112009:web:948331fd9f3c3d6132bdd8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// 🔐 حماية الصفحة
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "auth.html";
    } else {
        document.getElementById("userEmail").innerText = user.email;

        // اسم مؤقت (لأنه Firebase Auth ما فيه اسم افتراضي)
        document.getElementById("userName").innerText = user.email.split("@")[0];
    }
});

// 🔄 Tabs
const tabs = document.querySelectorAll(".side-tab");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        panes.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");

        const target = tab.dataset.tab;
        document.getElementById(target).classList.add("active");

        if (target === "favorites") {
            displayFavorites();
        }
    });
});

// 🚪 Logout
document.getElementById("logoutBtn").onclick = () => {
    signOut(auth).then(() => {
        window.location.href = "auth.html";
    });
};

const textarea = document.querySelector(".input-area textarea");
const generateBtn = document.querySelector(".send-btn");

console.log(textarea, generateBtn);

textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        generateBtn.click();
    }
});

generateBtn.addEventListener("click", () => {
    console.log("تم الإرسال ✅");
});