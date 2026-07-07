import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siddhesh Narvekar | Software Engineer Portfolio",
  description: "Portfolio of Siddhesh Narvekar showcasing Full Stack Development, Artificial Intelligence, Computer Vision and Blockchain projects.",
  openGraph: {
    title: "Siddhesh Narvekar | Software Engineer Portfolio",
    description: "Portfolio of Siddhesh Narvekar showcasing Full Stack Development, Artificial Intelligence, Computer Vision and Blockchain projects.",
    type: "website",
    locale: "en_US",
    url: "https://github.com/Prosid26",
    siteName: "Siddhesh Narvekar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhesh Narvekar | Software Engineer Portfolio",
    description: "Portfolio of Siddhesh Narvekar showcasing Full Stack Development, Artificial Intelligence, Computer Vision and Blockchain projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Siddhesh Narvekar",
    "url": "https://github.com/Prosid26",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "India"
    },
    "jobTitle": "Software Engineer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Information Technology Engineering"
    },
    "sameAs": [
      "https://github.com/Prosid26",
      "https://www.linkedin.com/in/narvekar-siddhesh-7a216b31b"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
