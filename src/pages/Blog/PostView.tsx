import {useEffect, useState} from 'react'

import {createComment} from '@/pages/api/create-comment'
import {getPosts} from '@/pages/api/get-post'
import CommentView from '@/pages/Blog/CommentView'
import {type Database} from '@/supabase/database.types'

interface Props {
  userId: string
}

export default function PostView({userId}: Props) {
  const [postData, setPostData] = useState<
    Database['public']['Tables']['posts']['Row'][] | null
  >()
  const [content, setContent] = useState('')

  const handleAddComment = async ({
    postId,
    content,
  }: {
    postId: string
    content: string
  }) => {
    await createComment({userId, postId, content})
  }

  useEffect(() => {
    void getPosts().then(res => {
      if (res) {
        setPostData(res)
      }
    })
  }, [])

  return (
    <div>
      {postData?.map(data => {
        return (
          <div key={data.id}>
            <p>{`${data.id} ${data.title}`}</p>
            <p>{data.content}</p>
            <br />
            <input name="content" onChange={e => setContent(e.target.value)} />
            <br />
            <CommentView postId={data.id} />
            <br />
            <button
              onClick={() =>
                handleAddComment({postId: data.id, content: content})
              }>
              Post
            </button>
          </div>
        )
      })}
    </div>
  )
}
