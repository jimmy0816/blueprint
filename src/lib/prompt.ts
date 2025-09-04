import { supabase } from "./db";

export async function getBlueprintTemplate() {
  const { data: p } = await supabase
    .from('prompts')
    .select('template')
    .eq('name', 'universal-blueprint-v1')
    .single();
  
  // fallback (in case seed not run)
  return (
    p?.template ??
    `你是一位產品與專案拆解助理。請依固定結構輸出：
# 執行藍圖
## 核心價值
## MVP（最小可行版本）
## 擴展模組
## 變現模式
## 管理與里程碑

請務必簡潔、具體、可執行。避免空話。每節至少 3 條要點。
想法：{{idea}}`
  );
}
