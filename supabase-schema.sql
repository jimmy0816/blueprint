-- Supabase 数据库结构
-- 在 Supabase Dashboard 的 SQL Editor 中运行此脚本

-- 创建 ideas 表
CREATE TABLE IF NOT EXISTS ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 blueprints 表
CREATE TABLE IF NOT EXISTS blueprints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  core_value TEXT,
  mvp TEXT,
  modules TEXT,
  monetization TEXT,
  milestones TEXT,
  raw_output TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 prompts 表
CREATE TABLE IF NOT EXISTS prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  template TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 logs 表
CREATE TABLE IF NOT EXISTS logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  payload TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_blueprints_idea_id ON blueprints(idea_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_created_at ON blueprints(created_at);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);

-- 插入默认提示模板
INSERT INTO prompts (name, template) VALUES (
  'universal-blueprint-v1',
  '你是一位產品與專案拆解助理。請依固定結構輸出：
# 執行藍圖
## 核心價值
## MVP（最小可行版本）
## 擴展模組
## 變現模式
## 管理與里程碑

請務必簡潔、具體、可執行。避免空話。每節至少 3 條要點。
想法：{{idea}}'
) ON CONFLICT (name) DO UPDATE SET 
  template = EXCLUDED.template,
  updated_at = NOW();

-- 启用 Row Level Security (RLS)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- 创建允许所有操作的策略（开发环境）
-- 在生产环境中，您应该创建更严格的策略
CREATE POLICY "Allow all operations on ideas" ON ideas FOR ALL USING (true);
CREATE POLICY "Allow all operations on blueprints" ON blueprints FOR ALL USING (true);
CREATE POLICY "Allow all operations on prompts" ON prompts FOR ALL USING (true);
CREATE POLICY "Allow all operations on logs" ON logs FOR ALL USING (true);
