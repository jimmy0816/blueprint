# 环境变量设置指南

## 🚨 当前错误

您遇到的错误：`supabaseUrl is required` 表示 Supabase 环境变量没有正确设置。

## 📋 需要的环境变量

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-...
```

## 🛠️ 设置方法

### 方法 1：Vercel 部署（推荐）

1. **进入 Vercel Dashboard**
   - 访问 [vercel.com](https://vercel.com)
   - 选择您的项目

2. **设置环境变量**
   - 点击 **Settings** → **Environment Variables**
   - 添加以下变量：

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_key_here` | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | `your_service_role_key_here` | Production, Preview, Development |
   | `OPENAI_API_KEY` | `your_openai_api_key_here` | Production, Preview, Development |

3. **重新部署**
   - 点击 **Deployments** → **Redeploy**

### 方法 2：GitHub Pages 部署

1. **设置 GitHub Secrets**
   - 进入仓库 → **Settings** → **Secrets and variables** → **Actions**
   - 添加以下 secrets：

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_key_here` |
   | `OPENAI_API_KEY` | `your_openai_api_key_here` |

2. **启用 GitHub Pages**
   - 进入仓库 → **Settings** → **Pages**
   - Source 选择 **GitHub Actions**

3. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "Add environment variables"
   git push origin master
   ```

### 方法 3：本地开发

1. **创建 .env.local 文件**
   ```bash
   # 在项目根目录创建
   touch .env.local
   ```

2. **添加环境变量**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **重启开发服务器**
   ```bash
   pnpm dev
   ```

## 🔍 获取 Supabase 信息

1. **访问 [supabase.com](https://supabase.com)**
2. **创建新项目**
3. **在 Settings → API 中获取**：
   - Project URL
   - anon public key
   - service_role key

## 🧪 验证设置

运行环境变量检查：
```bash
pnpm run check-env
```

## ❌ 常见错误

### 错误 1：环境变量值为空
```
❌ NEXT_PUBLIC_SUPABASE_URL: 未设置
```
**解决方案**：确保环境变量值不为空

### 错误 2：环境变量格式错误
```
❌ 环境变量包含多余的空格或引号
```
**解决方案**：确保格式正确，没有多余的空格

### 错误 3：环境变量未生效
```
❌ 部署后环境变量仍然未设置
```
**解决方案**：重新部署项目

## 📞 需要帮助？

如果仍然遇到问题，请检查：

1. ✅ 环境变量名称是否正确
2. ✅ 环境变量值是否完整
3. ✅ 是否重新部署了项目
4. ✅ Supabase 项目是否已创建
5. ✅ 数据库表是否已创建

## 🎯 下一步

设置好环境变量后：

1. **创建 Supabase 项目**
2. **运行数据库脚本**（`supabase-schema.sql`）
3. **重新部署项目**
4. **测试应用功能**
