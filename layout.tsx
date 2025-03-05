import { Metadata } from "next";
import Script from "next/script";
import React from "react";

export const metadata: Metadata = {
  title: "Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Website Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="gbdULNzfy6U-pVRZnUws5VR81Ykd6UoWAGEOkKLf1KM" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <meta name="theme-color" content="#0D9488" />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-SYPNF50J1Q" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SYPNF50J1Q');
            `,
          }}
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
