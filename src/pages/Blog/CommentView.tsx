import {useEffect, useState} from 'react'

import {getComments} from '@/pages/api/get-comments'
import {type Database} from '@/supabase/database.types'

interface Props {
  postId: string
}

export default function CommentView({postId}: Props) {
  const [commentsData, setCommentsData] = useState<
    Database['public']['Tables']['comments']['Row'][] | null
  >(null)

  useEffect(() => {
    void getComments(postId).then(res => {
      if (res) {
        setCommentsData(res)
      }
    })
  }, [postId])

  return (
    <div>
      <p>Comments</p>
      <div>
        {commentsData
          ? commentsData.map(data => (
              <p key={data.id}>{`comment: ${data.content}`}</p>
            ))
          : null}
      </div>
    </div>
  )
}
