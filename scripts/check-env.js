#!/usr/bin/env node

// 环境变量检查工具
console.log('🔍 检查环境变量...\n');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY'
];

let allPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: 未设置`);
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('🎉 所有环境变量都已设置！');
  process.exit(0);
} else {
  console.log('⚠️  请设置缺失的环境变量');
  console.log('\n📋 设置方法：');
  console.log('1. 在 Vercel Dashboard 中设置');
  console.log('2. 或在 .env.local 文件中设置');
  console.log('3. 或在 GitHub Secrets 中设置（用于 GitHub Pages）');
  process.exit(1);
}
