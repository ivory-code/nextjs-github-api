import axios from 'axios'

import {supabaseUrl} from '@/supabase/client'

export async function axiosGetPost() {
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/posts`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    })
    return response.data
  } catch (err) {
    alert('데이터를 불러오는 중 오류가 발생했습니다.')
    // eslint-disable-next-line no-console
    console.error(err)
  }
}
