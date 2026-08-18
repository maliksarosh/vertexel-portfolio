// Firebase web config — these values are PUBLIC (safe in source; enforcement lives in Firestore rules).
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI3gAPUtq3DiW-xqXwdh6VDC1cmuyvf3M",
  authDomain: "vertexel-dadf3.firebaseapp.com",
  databaseURL: "https://vertexel-dadf3-default-rtdb.firebaseio.com",
  projectId: "vertexel-dadf3",
  storageBucket: "vertexel-dadf3.firebasestorage.app",
  messagingSenderId: "487189270334",
  appId: "1:487189270334:web:f8bcbf9a5043dd6c2f266f",
  measurementId: "G-S6KJV46N7X",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

/** Single admin UID that owns the CMS. */
export const ADMIN_UID = "4wfALd9ZDPeZozLrJnnfSGKmCBV2";

/** Cloudinary public config (used by the upload widget in the admin panel). */
export const CLOUDINARY = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "vertexel",
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "vertexel_unsigned",
};
