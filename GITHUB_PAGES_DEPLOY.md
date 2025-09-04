# GitHub Pages 部署指南

## ⚠️ 重要限制

GitHub Pages 只支持静态网站，因此需要特殊配置：

1. **无法使用 API 路由** - 所有数据库操作必须在客户端进行
2. **环境变量限制** - 只能使用 `NEXT_PUBLIC_` 前缀的变量
3. **需要静态导出** - 使用 `next export` 生成静态文件

## 🚀 部署步骤

### 1. 设置 GitHub Secrets

在您的 GitHub 仓库中设置以下 Secrets：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 添加以下 secrets：
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   OPENAI_API_KEY
   ```

### 2. 启用 GitHub Pages

1. 进入仓库 → Settings → Pages
2. Source 选择 "GitHub Actions"
3. 保存设置

### 3. 推送代码

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 4. 自动部署

GitHub Actions 会自动：
1. 构建静态文件
2. 部署到 GitHub Pages
3. 您的网站将在 `https://yourusername.github.io/your-repo-name` 可用

## 🔧 本地测试静态版本

```bash
# 构建静态版本
pnpm run build:static

# 查看构建结果
ls -la out/
```

## 📁 文件结构

静态部署后的文件结构：
```
out/
├── index.html
├── library/
│   └── index.html
├── b/
│   └── [id]/
│       └── index.html
└── _next/
    └── static/
```

## 🔒 安全注意事项

### 环境变量安全
- ✅ 只使用 `NEXT_PUBLIC_` 前缀的变量
- ✅ 这些变量会暴露在客户端代码中
- ✅ 确保 Supabase 使用 RLS 保护数据

### Supabase 安全配置
```sql
-- 启用 RLS
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;

-- 创建安全的策略
CREATE POLICY "Allow public read access" ON ideas FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON ideas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access" ON blueprints FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON blueprints FOR INSERT WITH CHECK (true);
```

## 🆚 与其他部署方案对比

| 特性 | GitHub Pages | Vercel | Netlify |
|------|-------------|--------|---------|
| 免费额度 | ✅ 无限 | ✅ 100GB | ✅ 100GB |
| API 路由 | ❌ 不支持 | ✅ 支持 | ✅ 支持 |
| 环境变量 | ⚠️ 有限制 | ✅ 完整支持 | ✅ 完整支持 |
| 部署复杂度 | ⚠️ 中等 | ✅ 简单 | ✅ 简单 |
| 性能 | ✅ 良好 | ✅ 优秀 | ✅ 优秀 |

## 💡 推荐

对于您的项目，我强烈推荐使用 **Vercel** 而不是 GitHub Pages，因为：

1. **功能完整** - 支持所有 Next.js 功能
2. **部署简单** - 一键部署
3. **环境变量安全** - 服务端变量不会暴露
4. **性能更好** - 全球 CDN 和边缘计算
5. **免费额度充足** - 个人项目完全够用

## 🆘 故障排除

### 常见问题

1. **构建失败**
   - 检查环境变量是否正确设置
   - 确保所有依赖都已安装

2. **页面空白**
   - 检查浏览器控制台错误
   - 确认 Supabase 连接正常

3. **API 调用失败**
   - 检查 Supabase RLS 策略
   - 确认 API 密钥权限

### 调试命令

```bash
# 检查环境变量
echo $NEXT_PUBLIC_SUPABASE_URL

# 本地测试
pnpm dev

# 构建测试
pnpm build:static
```
