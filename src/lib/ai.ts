import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateBlueprint(prompt: string) {
  // Using Responses API for simplicity; you can switch to chat.completions if preferred
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "你是一位產品與專案拆解助理，輸出清晰、結構化、可執行的藍圖。" },
      { role: "user", content: prompt }
    ],
    temperature: 0.3
  });

  const text = res.choices?.[0]?.message?.content ?? "";
  return text.trim();
}
