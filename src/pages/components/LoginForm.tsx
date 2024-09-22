'use client'

import {createClient} from '@/supabase/client'

export default function LoginForm() {
  const supabase = createClient()

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
