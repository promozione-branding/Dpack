import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseAuth() {
  const requiredFields = ["apiKey", "authDomain", "projectId", "appId"];
  const missing = requiredFields.filter((field) => !firebaseConfig[field]);
  if (missing.length) {
    throw new Error(
      `Firebase phone sign-in is not configured. Set ${missing
        .map((field) => `NEXT_PUBLIC_FIREBASE_${field.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`)
        .join(", ")}.`
    );
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}

export const sendFirebaseOtp = async (phone, recaptchaId) => {
  try {
    const auth = getFirebaseAuth();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaId, {
        size: "invisible",
      });
      await window.recaptchaVerifier.render();
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
    window.confirmationResult = confirmationResult;
    return { success: true };
  } catch (error) {
    console.error("Firebase OTP request failed:", error);
    return { success: false, error };
  }
};

export const verifyFirebaseOtp = async (otp) => {
  try {
    if (!window.confirmationResult) {
      throw new Error("Request a new OTP before trying to verify it.");
    }
    const result = await window.confirmationResult.confirm(otp);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Firebase OTP verification failed:", error);
    return { success: false, error };
  }
};