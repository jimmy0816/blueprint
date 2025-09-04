import { createClient } from '@supabase/supabase-js'

// 验证环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Please set it in your environment variables.')
}

if (!supabaseKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Please set it in your environment variables.')
}

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required. Please set it in your environment variables.')
}

// 客户端 Supabase 实例（用于前端组件）
export const supabase = createClient(supabaseUrl, supabaseKey)

// 服务端 Supabase 实例（用于 API 路由）
export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
