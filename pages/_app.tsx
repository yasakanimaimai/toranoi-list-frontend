import '../styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export function App({ Component, pageProps }: AppProps) {
  // FEとBEでcookieをやりとりするときはtrueにする
  axios.defaults.withCredentials = true
  // Appコンポーネントがマウントされたとき自動的にcsrfトークンを取得し、
  // axiosのheaderにセットする処理をuseEffectで実現
  useEffect(() => {
    console.log('APP useEffect')
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      console.log('csrfToken:' + data.csrfToken)
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  return (
    // プロジェクト全体でreact queryを使用するための記述
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      {/* react query devtoolsを使用するための設定 */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
