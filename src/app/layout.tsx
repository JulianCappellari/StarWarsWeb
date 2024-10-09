import type { Metadata } from "next";
import {  Russo_One  } from 'next/font/google';
// import localFont from "next/font/local";
import "./globals.css";


// const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });
// const audiowide = Audiowide({ subsets: ['latin'], weight: ['400'] });
const russoOne  = Russo_One({ subsets: ['latin'], weight: ['400'] });
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "StarWars Website",
  description: "Pagina de starWars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${russoOne.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
