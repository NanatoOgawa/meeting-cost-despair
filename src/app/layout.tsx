import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "絶望の会議コスト計算機",
  description: "あなたの会議が会社のカネを燃やし続けています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
