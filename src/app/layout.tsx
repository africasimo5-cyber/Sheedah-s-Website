import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Sheedah's Hair World | Luxury Wholesale Hair Supplier in Lagos",
  description: "Premium wholesale and retail hair supplier based in Lagos, Nigeria. We deliver worldwide. Shop straight, body wave, curly, kinky and more.",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    images: ["https://placehold.co/1200x630/111111/222222?text=Sheedah's+Hair+World"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="pt-20 flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
