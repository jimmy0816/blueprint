# 部署指南

## 方案一：Vercel（推荐）

### 优点
- ✅ 完美支持 Next.js
- ✅ 支持 API 路由
- ✅ 安全的环境变量管理
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 免费额度充足

### 部署步骤

1. **准备代码**
   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 选择您的仓库

3. **设置环境变量**
   在 Vercel Dashboard 中：
   - 进入项目设置
   - 点击 "Environment Variables"
   - 添加以下变量：
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     OPENAI_API_KEY=your_openai_key
     ```

4. **部署**
   - 点击 "Deploy"
   - 等待部署完成

## 方案二：Netlify

### 优点
- ✅ 支持 Next.js
- ✅ 支持 API 路由
- ✅ 环境变量管理
- ✅ 免费额度

### 部署步骤

1. **准备代码**
   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push origin main
   ```

2. **连接 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 用 GitHub 账号登录
   - 点击 "New site from Git"
   - 选择您的仓库

3. **设置构建配置**
   - Build command: `pnpm build`
   - Publish directory: `.next`

4. **设置环境变量**
   在 Netlify Dashboard 中：
   - 进入 Site settings
   - 点击 "Environment variables"
   - 添加所有必要的环境变量

## 方案三：Railway

### 优点
- ✅ 支持全栈应用
- ✅ 数据库支持
- ✅ 环境变量管理
- ✅ 简单易用

### 部署步骤

1. **准备代码**
   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push origin main
   ```

2. **连接 Railway**
   - 访问 [railway.app](https://railway.app)
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"

3. **设置环境变量**
   在 Railway Dashboard 中：
   - 进入项目设置
   - 点击 "Variables"
   - 添加所有必要的环境变量

## 方案四：GitHub Pages（静态版本）

如果您坚持使用 GitHub Pages，需要将应用改为静态版本：

### 限制
- ❌ 无法使用 API 路由
- ❌ 无法使用服务器端功能
- ❌ 需要客户端直接连接 Supabase

### 实现方式
1. 移除所有 API 路由
2. 在客户端直接调用 Supabase
3. 使用 `next export` 生成静态文件

## 安全注意事项

### 环境变量安全
- ✅ 永远不要将 `.env` 文件提交到 Git
- ✅ 使用部署平台的环境变量功能
- ✅ 定期轮换 API 密钥

### Supabase 安全
- ✅ 使用 Row Level Security (RLS)
- ✅ 限制 API 密钥权限
- ✅ 监控数据库访问

## 推荐配置

对于您的项目，我推荐使用 **Vercel**，因为：
1. 与 Next.js 完美集成
2. 部署简单
3. 性能优秀
4. 免费额度充足
5. 环境变量管理安全
