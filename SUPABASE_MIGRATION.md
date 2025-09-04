# 迁移到 Supabase 指南

## 概述
此项目已从 Prisma + SQLite 迁移到 Supabase。以下是迁移步骤和配置说明。

## 1. 设置 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 在项目设置中获取以下信息：
   - Project URL
   - Anon (public) key

## 2. 创建数据库表

在 Supabase Dashboard 的 SQL Editor 中运行 `supabase-schema.sql` 文件中的 SQL 脚本。

## 3. 环境变量配置

创建 `.env.local` 文件并添加以下环境变量：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

## 4. 安装依赖

```bash
pnpm install
```

## 5. 主要变更

### 数据库客户端
- 从 `@prisma/client` 改为 `@supabase/supabase-js`
- 数据库连接从 `src/lib/db.ts` 中的 Prisma 客户端改为 Supabase 客户端

### 数据模型变更
- 字段名从 camelCase 改为 snake_case：
  - `ideaId` → `idea_id`
  - `coreValue` → `core_value`
  - `rawOutput` → `raw_output`
  - `createdAt` → `created_at`
  - `updatedAt` → `updated_at`

### API 查询变更
- 所有 Prisma 查询已替换为 Supabase 查询
- 使用 Supabase 的链式查询语法
- 错误处理已更新为 Supabase 的错误格式

## 6. 清理旧文件

迁移完成后，可以删除以下 Prisma 相关文件：
- `prisma/` 目录
- `prisma/schema.prisma`
- `prisma/seed.ts`

## 7. 验证迁移

1. 启动开发服务器：`pnpm dev`
2. 测试创建新蓝图功能
3. 验证历史蓝图页面显示
4. 检查蓝图详情页面

## 注意事项

- Supabase 使用 PostgreSQL，支持更复杂的数据类型和查询
- Row Level Security (RLS) 已启用，当前设置为允许所有操作（开发环境）
- 在生产环境中，建议创建更严格的 RLS 策略
- 所有时间戳都使用 UTC 时区
