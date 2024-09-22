'use client'

import {createBrowserClient} from '@/supabase/client'

export default function LoginForm() {
  const supabase = createBrowserClient()

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin,
      },
    })
  }

  return <button onClick={handleLogin}>Login</button>
}
