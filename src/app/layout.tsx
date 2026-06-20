import type { Metadata } from "next";
import { Inter, Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TripLand Travels & Tours | Cheap Air Tickets, Outbound Packages & Visas",
  description: "IATA Accredited travel agent with 18 years of commitment in Nepal. We provide cheap domestic & international flight ticketing, visa services (Dubai, Hong Kong, Schengen), and tour packages to Japan, China, Bali, and Thailand.",
  metadataBase: new URL("https://triplandtravels.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${caveat.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col antialiased">
        <CustomCursor />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
