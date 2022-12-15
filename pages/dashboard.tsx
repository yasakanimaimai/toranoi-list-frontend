import { LogoutIcon } from '@heroicons/react/solid'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ArticleForm } from '../components/ArticleForm'
import { ArticleList } from '../components/ArticleList'
import { Layout } from '../components/Layout'
import { Userinfo } from '../components/UserInfo'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const logout = async () => {
    // react queryでブラウザにキャッシュした情報を削除
    queryClient.removeQueries(['user'])
    queryClient.removeQueries(['articles'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }
  return (
    <Layout title="Article Board">
      <LogoutIcon 
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout} 
      >
      </LogoutIcon>
      <Userinfo />
      <ArticleForm />
      <ArticleList />
    </Layout>
  )
}

export default Dashboard