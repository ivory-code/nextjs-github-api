'use client'

import {useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'

import {axiosGetPost} from '@/pages/api/axios-get-post'
import {createPost} from '@/pages/api/create-post'
import {getUser} from '@/pages/api/get-user'
import PostView from '@/pages/Blog/PostView'
import LoginForm from '@/pages/components/LoginForm'
import {createBrowserClient} from '@/supabase/client'
import {type Database} from '@/supabase/database.types'

export default function BlogPage() {
  const supabase = createBrowserClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [user, setUser] = useState<
    Database['public']['Tables']['users']['Row'] | null
  >(null)

  const {data} = useQuery({
    queryKey: ['posts'],
    queryFn: axiosGetPost,
  })

  const handlePost = async () => {
    await createPost({id: user?.id || '', title, content})
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    void getUser().then(res => {
      if (res) {
        setUser(res[0])
      }
    })

    void axiosGetPost().then(res => {
      // eslint-disable-next-line no-console
      console.log(res, 'axios')
    })

    // eslint-disable-next-line no-console
    console.log(data, 'react-query data')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <h1>BlogPage</h1>
        <input name="title" onChange={e => setTitle(e.target.value)} />
        <input name="content" onChange={e => setContent(e.target.value)} />
        <button onClick={handlePost}>Post</button>
        <br />
        <PostView userId={user?.id || ''} />
        <br />
        {user ? <button onClick={handleLogout}>Logout</button> : <LoginForm />}
      </div>
    </>
  )
}
