import type { Metadata } from "next";
import Script from "next/script";
import { 
  Cormorant_Garamond,
  Playfair_Display,
  Roboto_Slab,
  Merriweather,
  Lora,
  Crimson_Text,
  Source_Serif_4,
  PT_Serif,
  Libre_Baskerville,
  EB_Garamond,
  Anonymous_Pro
} from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "700", "900"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "хсл щ — Цифровая креативная студия",
  description: "Цифровая креативная студия основанная Сережей Рисом. Создаем искусственный интеллект, телеграм боты, сайты, приложения, искусство, инсталляции, образовательные программы и воркшопы.",
  keywords: "креативная студия, цифровое агентство, искусственный интеллект, телеграм боты, веб-разработка, приложения, digital art, инсталляции, образовательные программы, воркшопы",
  authors: [{ name: "Сережа Рис" }],
  creator: "Сережа Рис",
  publisher: "хсл щ",
  openGraph: {
    title: "хсл щ — Цифровая креативная студия",
    description: "Создаем искусственный интеллект, телеграм боты, сайты, приложения, искусство и инсталляции",
    url: "https://khsl-shch.com",
    siteName: "хсл щ",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "хсл щ — Цифровая креативная студия",
    description: "Создаем искусственный интеллект, телеграм боты, сайты, приложения, искусство и инсталляции",
    creator: "@serezharis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌍</text></svg>',
    shortcut: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌍</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌍</text></svg>',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${cormorantGaramond.variable} ${playfairDisplay.variable} ${robotoSlab.variable} ${merriweather.variable} ${lora.variable} ${crimsonText.variable} ${sourceSerif4.variable} ${ptSerif.variable} ${libreBaskerville.variable} ${ebGaramond.variable} ${anonymousPro.variable}`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CT31D64PS0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CT31D64PS0');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
