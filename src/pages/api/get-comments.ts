import {createBrowserClient} from '@/supabase/client'

export async function getComments(postId: string) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)

    if (error) {
      return alert(error)
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
