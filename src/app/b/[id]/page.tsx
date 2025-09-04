import { supabase } from "@/lib/db";

export default async function BlueprintPage({ params }: { params: { id: string } }) {
  const { data: bp, error } = await supabase
    .from('blueprints')
    .select(`
      *,
      ideas (*)
    `)
    .eq('id', params.id)
    .single();

  if (error || !bp) return <div className="text-sm text-zinc-500">找不到此藍圖</div>;

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">執行藍圖</h2>
      <div className="rounded-md border border-zinc-200 bg-white p-4">
        <div className="text-xs text-zinc-500">想法</div>
        <div className="font-medium">{bp.ideas.content}</div>
      </div>

      <Section title="核心價值" content={bp.core_value} />
      <Section title="MVP（最小可行版本）" content={bp.mvp} />
      <Section title="擴展模組" content={bp.modules} />
      <Section title="變現模式" content={bp.monetization} />
      <Section title="管理與里程碑" content={bp.milestones} />

      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-zinc-600">原始輸出（除錯用）</summary>
        <pre className="mt-2 whitespace-pre-wrap rounded-md border border-zinc-200 bg-white p-4 text-sm">{bp.raw_output}</pre>
      </details>
    </main>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-md border border-zinc-200 bg-white p-4">
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <div className="prose max-w-none whitespace-pre-wrap">{content}</div>
    </section>
  );
}
