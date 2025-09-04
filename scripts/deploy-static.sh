#!/bin/bash

# 静态部署脚本
echo "🚀 开始静态部署..."

# 备份原始配置
cp next.config.js next.config.server.js

# 使用静态配置
cp next.config.static.js next.config.js

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 构建静态文件
echo "🔨 构建静态文件..."
pnpm build

# 检查构建结果
if [ -d "out" ]; then
    echo "✅ 构建成功！静态文件在 'out' 目录中"
    echo "📁 文件列表："
    ls -la out/
else
    echo "❌ 构建失败！"
    exit 1
fi

# 恢复原始配置
cp next.config.server.js next.config.js
rm next.config.server.js

echo "🎉 静态部署准备完成！"
echo "💡 提示：将 'out' 目录的内容上传到 GitHub Pages 或任何静态托管服务"
