# Universal Blueprint Generator (MVP)

把任何想法轉成結構化「執行藍圖」的最小可行專案。Next.js (App Router) + Prisma。

## 快速開始

```bash
pnpm i          # 或 npm i / yarn
cp .env.example .env.local
# 填寫 OPENAI_API_KEY；本機可用 SQLite 預設 DATABASE_URL
pnpm db:push
pnpm seed
pnpm dev
```

打開 http://localhost:3000 輸入你的想法，按「生成藍圖」。  
歷史藍圖在 /library。

## 主要檔案
- `src/app/page.tsx`：首頁輸入與結果顯示
- `src/app/api/generate/route.ts`：呼叫 OpenAI、寫入資料庫
- `src/lib/prompt.ts`：讀取（或 fallback）模板
- `prisma/schema.prisma`：資料模型（Idea / Blueprint / Prompt / Log）

## TODO / 擴充建議
- 請模型同時輸出 JSON 結構，避免字串解析
- 加入帳號系統、Rate Limit、Notion/Trello 同步
- Streaming UI、語音入口（Siri/Telegram）
```

