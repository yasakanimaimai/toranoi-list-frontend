import {ReactNode, FC} from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'Toranoi' }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center" style={{backgroundColor:"#2b2b2b"}}>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </div>
  )
}
