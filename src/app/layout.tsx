import type { Metadata } from "next";
import "./globals.css";

// Import Poppins font
import { Poppins } from "next/font/google";

// Atur style Poppins
const poppins = Poppins({
  weight: ["400", "700"], // Anda bisa memilih weight yang diinginkan
  subsets: ["latin"], // Pilih subset sesuai kebutuhan
  display: "swap", // Menyediakan fallback font sebelum Poppins dimuat
});

export const metadata: Metadata = {
  title: "Baratheon",
  description: "auto check item",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
