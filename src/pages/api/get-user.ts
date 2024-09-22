import {createClient} from '@/supabase/client'

export async function getUser() {
  const user = await createClient().from('users').select('*')

  return user.data
}
