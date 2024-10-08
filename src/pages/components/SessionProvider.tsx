'use client'

import {useEffect} from 'react'

import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

export default function SessionProvider() {
  const setUser = useUser(state => state.setUser)
  const supabase = createBrowserClient()

  const readUserSession = async () => {
    const {data} = await supabase.auth.getSession()

    if (data.session) {
      setUser(data.session?.user)
    }
  }

  useEffect(() => {
    void readUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
