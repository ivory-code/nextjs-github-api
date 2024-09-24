import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {type AppProps} from 'next/app' // AppProps 임포트
import '@/app/globals.css'

const queryClient = new QueryClient()

function App({Component, pageProps}: AppProps) {
  // AppProps 타입 적용
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
