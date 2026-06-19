import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "cleverOps — catalogo interno skill, agent e tool",
  description:
    "Riferimento interno del team Cleversoft: skill, agent, toolbelt CLI e installer per Claude Code e Codex. Comandi copia-incolla.",
  metadataBase: new URL("https://cleverops.akkaz.dev"),
  openGraph: {
    title: "cleverOps — catalogo interno skill, agent e tool",
    description:
      "Skill, agent, toolbelt e installer per Claude Code e Codex. Riferimento interno Cleversoft.",
    locale: "it_IT",
    type: "website",
  },
};

// Tema senza flash: applica .dark prima del paint.
const themeScript = `
(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${dmSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
