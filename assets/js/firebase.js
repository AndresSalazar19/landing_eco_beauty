// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Registro con nombre
export const register = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

// UI: Login, Registro, Logout
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const logoutBtn = document.getElementById('logout-btn');
  const userDisplay = document.getElementById('user-email');

onAuthStateChanged(auth, (user) => {
  const authForms = document.getElementById('auth-forms');
  const sessionInfo = document.getElementById('session-info');

  if (user) {
    if (userDisplay) {
      const name = user.displayName || user.email;
      userDisplay.textContent = `Sesión activa: ${name}`;
    }

    if (authForms) authForms.classList.add('hidden');
    if (sessionInfo) sessionInfo.classList.remove('hidden');

  } else {
    if (userDisplay) userDisplay.textContent = 'No hay sesión activa';
    if (authForms) authForms.classList.remove('hidden');
    if (sessionInfo) sessionInfo.classList.add('hidden');
  }
});


  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const user = await login(email, password);
        alert('Login exitoso: ' + (user.displayName || user.email));
      } catch (err) {
        alert('Error de login: ' + err.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const user = await register(name, email, password);
        alert('Registro exitoso: ' + user.displayName);
      } catch (err) {
        alert('Error de registro: ' + err.message);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await logout();
      alert('Sesión cerrada');
    });
  }
});
