"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../lib/supabase-browser";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: false });
export function useAuth() { return useContext(AuthContext); }
export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const client = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(client));
  useEffect(() => {
    if (!client) return;
    client.auth.getUser().then(({ data }) => { setUser(data.user); setLoading(false); });
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, [client]);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
