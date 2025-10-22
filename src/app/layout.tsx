import type { Metadata } from "next";
import { Roboto, Mulish } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./providers/provider";

const Robotofont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  fallback: ["Arial"]
});

const Mulishfont = Mulish({
  variable: "--font-Mulishfont",
  subsets: ["latin"],
  fallback: ["Arial"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    template: "%s | News App",
    default: 'News App'
  },
  description: "A modern news application built with Next.js",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${Robotofont.variable} ${Mulishfont.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
