import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/db";
import { getBlueprintTemplate } from "@/lib/prompt";
import { generateBlueprint } from "@/lib/ai";

const schema = z.object({
  idea: z.string().min(3).max(300)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "輸入過短或格式不正確" }, { status: 400 });
    }

    const ideaText = parsed.data.idea.trim();
    
    // 创建想法记录
    const { data: idea, error: ideaError } = await supabaseAdmin
      .from('ideas')
      .insert({ content: ideaText })
      .select()
      .single();

    if (ideaError) throw ideaError;

    const template = await getBlueprintTemplate();
    const prompt = template.replace("{{idea}}", ideaText);

    const markdown = await generateBlueprint(prompt);

    // naive parsing: split sections by headings (MVP OK). In future, request JSON.
    const sections = splitSections(markdown);

    // 创建蓝图记录
    const { data: bp, error: bpError } = await supabaseAdmin
      .from('blueprints')
      .insert({
        idea_id: idea.id,
        core_value: sections.coreValue ?? "",
        mvp: sections.mvp ?? "",
        modules: sections.modules ?? "",
        monetization: sections.monetization ?? "",
        milestones: sections.milestones ?? "",
        raw_output: markdown
      })
      .select()
      .single();

    if (bpError) throw bpError;

    return NextResponse.json({
      id: bp.id,
      sections,
      markdown
    });
  } catch (e: any) {
    console.error("[/api/generate] error", e);
    return NextResponse.json({ error: "系統忙碌或設定錯誤，請稍後再試" }, { status: 500 });
  }
}

function splitSections(md: string) {
  // Very simple parser; expects headings like "## 核心價值" etc.
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
