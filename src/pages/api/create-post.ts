import {createClient} from '@/supabase/client'

export async function createPost({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content: string
}) {
  const supabase = createClient()

  try {
    const {data, error} = await supabase.from('posts').insert({
      author_id: id,
      title,
      content,
      created_at: new Date(),
      updated_at: new Date(),
      published: true,
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