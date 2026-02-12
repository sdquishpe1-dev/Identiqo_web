import "./globals.css";
import Providers from "./components/Providers";
import Script from "next/script";

export const metadata = {
  title: "Identiqo",
  description: "Tu identidad profesional en un solo enlace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className="bg-white dark:bg-black transition-colors duration-300"
    >
      <body className="min-h-screen text-gray-900 dark:text-gray-100">
        <Providers>
          {children}
        </Providers>

        {/* Google Identity Script */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
