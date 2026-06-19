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
  title: "cleverOps — DevOps & AI skills di Cleversoft",
  description:
    "Le skill e gli agent DevOps/AI di Cleversoft IT per Claude Code e Codex. Catalogo, comandi copia-incolla, installer.",
  metadataBase: new URL("https://cleverops.akkaz.dev"),
  openGraph: {
    title: "cleverOps — DevOps & AI skills di Cleversoft",
    description:
      "Skill e agent per Claude Code e Codex: Drupal, DevOps, AI, design system. Codice pulito, niente fuffa.",
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
