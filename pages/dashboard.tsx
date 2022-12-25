import { LogoutIcon } from '@heroicons/react/solid'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ArticleForm } from '../components/ArticleForm'
import { ArticleList } from '../components/ArticleList'
import { Layout } from '../components/Layout'
import { Userinfo } from '../components/UserInfo'
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from '@mantine/core'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user, error, getAccessTokenWithPopup, getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();

  console.log("user:" + JSON.stringify(user))

  const logout = async () => {
    // react queryでブラウザにキャッシュした情報を削除
    queryClient.removeQueries(['user'])
    queryClient.removeQueries(['articles'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  const getaccessToken = async () => {
    // const accessToken = await getAccessTokenSilently({
    //   audience: process.env.NEXT_PUBLIC_API_URL,
    //   scope: "read:current_user",
    // })
    const accessToken = await getAccessTokenWithPopup()

    console.log("accessToken:" + accessToken)
    console.log("error:" + error)

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/get`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
    )

    console.log("data:" + JSON.stringify(data))
  }


  return (
    <Layout title="Article Board">
      <LogoutIcon 
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout} 
      >
      </LogoutIcon>
      <Button onClick={getaccessToken}>getaccessToken</Button>
      {/* <Userinfo />
      <ArticleForm />
      <ArticleList /> */}
    </Layout>
  )
}

export default Dashboard