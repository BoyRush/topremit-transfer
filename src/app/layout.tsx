import type { Metadata } from "next";
import { RootProvider } from "@/providers/RootProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Topremit - Kirim Uang ke Luar Negeri Cepat, Murah & Aman",
  description:
    "Simulasi pengiriman uang internasional dari Indonesia ke seluruh dunia dengan kurs terbaik dan biaya transparan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
