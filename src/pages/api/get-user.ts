import {createBrowserClient} from '@/supabase/client'

export async function getUser() {
  const user = await createBrowserClient().from('users').select('*')

  return user.data
}
