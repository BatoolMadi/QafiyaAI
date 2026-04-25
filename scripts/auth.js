import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0qXo-9_UdpxmEp1lGd3MkUFyB9rZ_e7g",
  authDomain: "genbayt-1520b.firebaseapp.com",
  projectId: "genbayt-1520b",
  storageBucket: "genbayt-1520b.firebasestorage.app",
  messagingSenderId: "811766112009",
  appId: "1:811766112009:web:948331fd9f3c3d6132bdd8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ============================
//  Tabs + Forms
// ============================
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// ============================
//  Mode (login / register)
// ============================
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

// ============================
//  Navbar Active
// ============================
function updateNavbarActive() {
    const mode = new URLSearchParams(window.location.search).get("mode");

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
    });

    if (mode === "register") {
        document.querySelector('a[href*="mode=register"]')?.classList.add("active");
    } else {
        document.querySelector('a[href*="mode=login"]')?.classList.add("active");
    }
}

// ============================
//  Initial State
// ============================
if (mode === "register") {
    registerTab.classList.add("active-tab");
    loginTab.classList.remove("active-tab");

    registerForm.classList.add("active-form");
    loginForm.classList.remove("active-form");
} else {
    loginTab.classList.add("active-tab");
    registerTab.classList.remove("active-tab");

    loginForm.classList.add("active-form");
    registerForm.classList.remove("active-form");
}

updateNavbarActive();

// ============================
//  Tab Click Events
// ============================
loginTab.onclick = () => {
    loginTab.classList.add("active-tab");
    registerTab.classList.remove("active-tab");

    loginForm.classList.add("active-form");
    registerForm.classList.remove("active-form");

    window.history.replaceState(null, "", "?mode=login");

    updateNavbarActive();
};

registerTab.onclick = () => {
    registerTab.classList.add("active-tab");
    loginTab.classList.remove("active-tab");

    registerForm.classList.add("active-form");
    loginForm.classList.remove("active-form");

    window.history.replaceState(null, "", "?mode=register");

    updateNavbarActive();
};

/////////////////////////////////////////////////////////////////
// ============================
//  Inputs
// ============================

// Login
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

// Register
const nameInput = document.getElementById("name");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");

// ============================
//  Validation Helpers
// ============================

//  Error
function showError(input, message) {
    const error = input.parentElement.querySelector(".error");
    error.innerText = message;

    input.classList.add("error-input");
    input.classList.remove("success-input");
}

//  Success
function showSuccess(input) {
    const error = input.parentElement.querySelector(".error");
    error.innerText = "";

    input.classList.remove("error-input");
    input.classList.add("success-input");
}

// Email check
function isValidEmail(email) {
    return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);
}

/////////////////////////////////////////////////////////////////
// ============================
//  LOGIN VALIDATION
// ============================
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // Email
    if (!loginEmail.value) {
        showError(loginEmail, "البريد الإلكتروني مطلوب");
        valid = false;
    } else if (!isValidEmail(loginEmail.value)) {
        showError(loginEmail, "بريد غير صالح");
        valid = false;
    } else {
        showSuccess(loginEmail);
    }

    // Password
    if (!loginPassword.value) {
        showError(loginPassword, "كلمة المرور مطلوبة");
        valid = false;
    } else {
        showSuccess(loginPassword);
    }


    if (valid) {
        signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.log("ERROR CODE:", error.code);
            console.log("ERROR MESSAGE:", error.message);

            if (error.code === "auth/user-not-found") {
                showError(loginEmail, "المستخدم غير موجود");
            } else if (error.code === "auth/wrong-password") {
                showError(loginPassword, "كلمة المرور غير صحيحة");
            } else {
                showError(loginEmail, "حدث خطأ، حاول مرة أخرى");
            }
        });
    }
});

/////////////////////////////////////////////////////////////////
// ============================
//  REGISTER VALIDATION
// ============================

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // Name
    if (!nameInput.value) {
        showError(nameInput, "الاسم مطلوب");
        valid = false;
    } else {
        showSuccess(nameInput);
    }

    // Email
    if (!registerEmail.value) {
        showError(registerEmail, "البريد الإلكتروني مطلوب");
        valid = false;
    } else if (!isValidEmail(registerEmail.value)) {
        showError(registerEmail, "بريد غير صالح");
        valid = false;
    } else {
        showSuccess(registerEmail);
    }

    // Password
    if (registerPassword.value.length < 6) {
        showError(registerPassword, "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
        valid = false;
    } else {
        showSuccess(registerPassword);
    }

    // Confirm Password
    if (confirmPassword.value !== registerPassword.value || !confirmPassword.value) {
        showError(confirmPassword, "كلمات المرور غير متطابقة");
        valid = false;
    } else {
        showSuccess(confirmPassword);
    }

    if (valid) {
        createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
        .then((userCredential) => {
            showSuccessMessage("تم إنشاء الحساب بنجاح ");
        })
        .catch((error) => {
            console.log("ERROR CODE:", error.code);
            console.log("ERROR MESSAGE:", error.message);

            showError(registerEmail, error.message);
        });
    }
});

/////////////////////////////////////////////////////////////////
// ============================
//  Live Reset (اختياري)
// ============================

const allInputs = document.querySelectorAll("input");

allInputs.forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("success-input");
    });
});

/////////////////////////////////////////////////////////////////
// ============================
//  Show / Hide Password
// ============================

// Login
const loginToggle = document.getElementById("toggleLoginPassword");
if (loginToggle) {
    loginToggle.onclick = () => {
        loginPassword.type =
            loginPassword.type === "password" ? "text" : "password";
    };
}

// Register
const registerToggle = document.getElementById("toggleRegisterPassword");
if (registerToggle) {
    registerToggle.onclick = () => {
        registerPassword.type =
            registerPassword.type === "password" ? "text" : "password";
    };
}

// Confirm
const confirmToggle = document.getElementById("toggleConfirmPassword");
if (confirmToggle) {
    confirmToggle.onclick = () => {
        confirmPassword.type =
            confirmPassword.type === "password" ? "text" : "password";
    };
}

/////////////////////////////////////////////////////////////////
// ============================
//  Remember Me (Simple Version)
// ============================

// عند تسجيل الدخول
loginForm.addEventListener("submit", () => {
    const remember = document.getElementById("rememberMe")?.checked;

    if (remember) {
        localStorage.setItem("email", loginEmail.value);
    } else {
        localStorage.removeItem("email");
    }
});

// عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
    const savedEmail = localStorage.getItem("email");

    if (savedEmail && loginEmail) {
        loginEmail.value = savedEmail;

        const checkbox = document.getElementById("rememberMe");
        if (checkbox) checkbox.checked = true;
    }
});

/////////////////////////////////////////////////////////////////
// ============================
//  Success Message (اختياري)
// ============================

function showSuccessMessage(message) {
    const box = document.getElementById("successMessage");

    box.innerText = message;
    box.classList.add("show");

    setTimeout(() => {
        box.classList.remove("show");
    }, 2500);
}