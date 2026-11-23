import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import AuthWrapper from "../components/auth-wrapper";

export const metadata: Metadata = { title: "Flowtask", description: "A focused workspace for getting work done." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="light"><AuthWrapper>{children}</AuthWrapper></ThemeProvider></body></html>;
}
