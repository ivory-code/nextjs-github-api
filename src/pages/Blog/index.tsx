'use client'

import {useEffect, useState} from 'react'

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
  }, [])

  return (
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
  )
}
