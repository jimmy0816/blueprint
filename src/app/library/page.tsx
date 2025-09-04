import { supabase } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Library() {
  const { data: items, error } = await supabase
    .from('blueprints')
    .select(`
      *,
      ideas (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blueprints:', error);
    return <div className="text-sm text-red-500">載入資料時發生錯誤</div>;
  }

  return (
    <main className="space-y-6">
      <h2 className="text-xl font-semibold">歷史藍圖</h2>
      <div className="space-y-3">
        {items?.map((bp) => (
          <div key={bp.id} className="rounded-md border border-zinc-200 bg-white p-4">
            <div className="text-xs text-zinc-500">{new Date(bp.created_at).toLocaleString()}</div>
            <div className="mt-1 font-medium">想法：{bp.ideas.content}</div>
            <Link className="text-sm underline" href={`/b/${bp.id}`}>查看</Link>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="text-sm text-zinc-500">目前沒有資料</p>}
      </div>
    </main>
  );
}
