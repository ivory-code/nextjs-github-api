import {createBrowserClient} from '@/supabase/client'

export async function createComment({
  userId,
  postId,
  content,
}: {
  userId: string
  postId: string
  content: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase.from('comments').insert({
      user_id: userId,
      post_id: postId,
      content,
    })

    if (error) {
      return alert('권한이 없습니다.')
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
