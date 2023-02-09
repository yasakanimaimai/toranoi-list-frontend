import { useRouter } from "next/router"
import axios from "axios"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Article } from "../types"
import { useAuth0 } from "@auth0/auth0-react"

export const useMutateArticle = () => {

  const queryClient = useQueryClient()
  const router = useRouter()
  const auth = useAuth0();

  const createPath = `${process.env.NEXT_PUBLIC_API_URL}/article/create`
  const updatePath = `${process.env.NEXT_PUBLIC_API_URL}/article/update`
  const deletePath = `${process.env.NEXT_PUBLIC_API_URL}/article/delete`

  // 記事作成
  const createArticleMutation = useMutation(
    async (article: Omit<Article, 'id'>) => {
      const accessToken = await auth.getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
      const res = await axios.post(
        createPath,
        article,
        config
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        // 新しく作成した記事をキャッシュに加える
        // useQueryArticleのqueryKeyを指定してキャッシュを取得
        const previousArticles = queryClient.getQueryData<Article[]>(['articles'])
        if (previousArticles) {
          queryClient.setQueryData(['articles'], [res, ...previousArticles])
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  // 記事更新
  const updateArticleMutation = useMutation(
    async (article: Article) => {
      const accessToken = await auth.getAccessTokenSilently();
      const config = {
        headers: {Authorization: `Bearer ${accessToken}`}
      }
      const res = await axios.patch(
        updatePath,
        article,
        config
      )
      return res.data
    },
    {
      // 更新した内容でキャッシュの記事を上書き
      onSuccess: (res, variables) => {
        const previousArticles = queryClient.getQueryData<Article[]>(['articles'])
        if (previousArticles) {
          queryClient.setQueryData(
            ['articles'],
            previousArticles.map((article) => (article.id === res.id ? res : article))
          )
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  // 記事削除
  const deleteArticleMutation = useMutation(
    async (articleId: string) => {
      const accessToken = await auth.getAccessTokenSilently()
      await axios.delete(
        deletePath,
        {
          data: {id: articleId},
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
    },
    {
      // variablesには非同期関数で渡した引数が入る
      onSuccess: (_, variables) => {
        const previousArticles = queryClient.getQueryData<Article[]>(['articles'])
        if (previousArticles) {
          queryClient.setQueryData(
            ['articles'],
            previousArticles.filter((article) => article.id !== variables)
          )
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  return { 
    createArticleMutation, 
    updateArticleMutation, 
    deleteArticleMutation 
  }
}