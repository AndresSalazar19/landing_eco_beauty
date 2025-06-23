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
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: "https://landing-ecobeauty-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Función para guardar opiniones
export const saveOpinion = async (opinionData) => {
  try {
    const opinionesRef = ref(database, 'opiniones');
    const newOpinionRef = await push(opinionesRef, opinionData);
    return newOpinionRef.key;
  } catch (error) {
    console.error('Error al guardar la opinión:', error);
    throw error;
  }
};

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
  const startButton = document.getElementById('start-button');

  if (user) {
    if (userDisplay) {
      const name = user.displayName || user.email;
      userDisplay.textContent = `Bienvenid@ ${name}`;
      if (startButton) startButton.classList.add('hidden');
      console.log('Usuario autenticado:', user);
      if (logoutBtn) logoutBtn.classList.remove("hidden");
    }
  } else {
    // Ocultar el botón de logout y limpiar el display del usuario
    if (logoutBtn) logoutBtn.classList.add("hidden");
    if (userDisplay) userDisplay.textContent = "";
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
        window.location.href = 'index.html';
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
        window.location.href = 'index.html';
      } catch (err) {
        alert('Error de registro: ' + err.message);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await logout();
      alert('Sesión cerrada');
      window.location.href="index.html"; 
      if(logoutBtn) logoutBtn.classList.add("hidden");
    });
  }

  const opinionForm = document.getElementById('opinionForm');
  if (opinionForm) {
    opinionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        const opinionData = {
          nombre: e.target.nombreOpinion.value,
          email: e.target.emailOpinion.value,
          telefono: e.target.telefonoOpinion.value,
          tema: e.target.temaOpinion.value,
          opinion: e.target.opinionOpinion.value,
        };

        await saveOpinion(opinionData);
        alert('¡Gracias por tu opinión! Ha sido guardada exitosamente.');
        opinionForm.reset();
      } catch (error) {
        console.error('Error al enviar la opinión:', error);
        alert('Hubo un error al guardar tu opinión. Por favor, intenta nuevamente.');
      }
    });
  }
});
