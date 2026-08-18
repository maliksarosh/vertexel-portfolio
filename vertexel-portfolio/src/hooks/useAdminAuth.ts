import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth, ADMIN_UID } from "@/lib/firebase";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAdmin = !!user && user.uid === ADMIN_UID;

  return {
    user,
    isAdmin,
    loading,
    login: (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
  };
}
