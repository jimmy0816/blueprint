"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "生成失敗");
      setOutput(data.markdown ?? data.text ?? JSON.stringify(data, null, 2));
    } catch (e: any) {
      setError(e.message ?? "發生錯誤");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">輸入你的想法</label>
        <textarea
          className="w-full rounded-md border border-zinc-300 p-3 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          rows={4}
          placeholder="例如：做一個 AI 故事生成網站給家長"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onGenerate}
          disabled={loading || idea.trim().length < 3}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "生成中…" : "生成藍圖"}
        </button>
        <a href="/library" className="text-sm underline">查看歷史藍圖</a>
      </div>

      {error && <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-800">{error}</div>}

      {output && (
        <article className="prose max-w-none whitespace-pre-wrap rounded-md border border-zinc-200 bg-white p-4">
          {output}
        </article>
      )}
    </main>
  );
}
