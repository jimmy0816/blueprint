import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 客户端 Supabase 实例（用于静态部署）
export const supabase = createClient(supabaseUrl, supabaseKey)

// 客户端数据库操作函数
export async function createIdea(content: string) {
  const { data, error } = await supabase
    .from('ideas')
    .insert({ content })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createBlueprint(blueprintData: {
  idea_id: string;
  core_value: string;
  mvp: string;
  modules: string;
  monetization: string;
  milestones: string;
  raw_output: string;
}) {
  const { data, error } = await supabase
    .from('blueprints')
    .insert(blueprintData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getBlueprint(id: string) {
  const { data, error } = await supabase
    .from('blueprints')
    .select(`
      *,
      ideas (*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getAllBlueprints() {
  const { data, error } = await supabase
    .from('blueprints')
    .select(`
      *,
      ideas (*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getBlueprintTemplate() {
  const { data, error } = await supabase
    .from('prompts')
    .select('template')
    .eq('name', 'universal-blueprint-v1')
    .single();
  
  if (error) {
    // 返回默认模板
    return `你是一位產品與專案拆解助理。請依固定結構輸出：
# 執行藍圖
## 核心價值
## MVP（最小可行版本）
## 擴展模組
## 變現模式
## 管理與里程碑

請務必簡潔、具體、可執行。避免空話。每節至少 3 條要點。
想法：{{idea}}`;
  }
  
  return data.template;
}
