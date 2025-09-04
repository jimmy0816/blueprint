import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Universal Blueprint MVP",
  description: "Turn any idea into a structured execution blueprint."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Universal Blueprint Generator</h1>
            <p className="text-sm text-zinc-600">輸入一個想法 → 生成結構化藍圖（MVP 版）</p>
          </header>
          {children}
          <footer className="mt-16 text-xs text-zinc-500">
            MVP · Next.js + Prisma · 由 ChatGPT 產生的樣板
          </footer>
        </div>
      </body>
    </html>
  );
}
