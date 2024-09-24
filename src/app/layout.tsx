import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Suspense} from 'react'

import type React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={'loading...'}>{children}</Suspense>
        </QueryClientProvider>
      </body>
    </html>
  )
}
