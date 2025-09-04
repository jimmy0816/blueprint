"use client";

import { useState } from "react";
import { createIdea, createBlueprint, getBlueprintTemplate } from "@/lib/db.client";
import { generateBlueprint } from "@/lib/ai";

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
      // 创建想法记录
      const ideaRecord = await createIdea(idea.trim());
      
      // 获取模板并生成蓝图
      const template = await getBlueprintTemplate();
      const prompt = template.replace("{{idea}}", idea.trim());
      const markdown = await generateBlueprint(prompt);

      // 解析蓝图内容
      const sections = splitSections(markdown);

      // 创建蓝图记录
      await createBlueprint({
        idea_id: ideaRecord.id,
        core_value: sections.coreValue ?? "",
        mvp: sections.mvp ?? "",
        modules: sections.modules ?? "",
        monetization: sections.monetization ?? "",
        milestones: sections.milestones ?? "",
        raw_output: markdown
      });

      setOutput(markdown);
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

function splitSections(md: string) {
  const grab = (label: string) => {
    const regex = new RegExp(`##\\s*${label}[\\s\\S]*?(?=\n##|$)`, "u");
    const match = md.match(regex);
    if (!match) return "";
    return match[0].replace(new RegExp(`^##\\s*${label}\\s*\n?`), "").trim();
  };

  return {
    coreValue: grab("核心價值"),
    mvp: grab("MVP（最小可行版本）"),
    modules: grab("擴展模組"),
    monetization: grab("變現模式"),
    milestones: grab("管理與里程碑")
  };
}
