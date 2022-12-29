import { useRouter } from "next/router"
import axios from "axios"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { EditedArticle } from "../types"
import useStore from "../store"
import { useAuth0 } from "@auth0/auth0-react"

// react queryでサーバ側とデータをやりとりする為のフック
// zustandはブラウザのキャッシュをリセットするために呼び出している

export const useMutateArticle = () => {

  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedArticle)
  const auth = useAuth0();

  // 記事作成
  const createArticleMutation = useMutation(
    
    async (article: Omit<EditedArticle, 'id'>) => {
      const accessToken = await auth.getAccessTokenSilently();

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/article/create`,
        article,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      return res.data
    },

    // 上記処理の結果を受けて成功時と失敗時の処理を以下に持つ
    {
      onSuccess: (res) => {
        // 新しく作成した記事をキャッシュに加える
        // useQueryArticleのqueryKeyを指定してキャッシュを取得
        const previousArticles = queryClient.getQueryData<EditedArticle[]>(['articles'])
        if (previousArticles) {
          queryClient.setQueryData(['articles'], [res, ...previousArticles])
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  // 記事更新
  const updateArticleMutation = useMutation(
    async (article: EditedArticle) => {
      const accessToken = await auth.getAccessTokenSilently();
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/article/update`,
        article,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      return res.data
    },
    {
      // 成功したら更新した内容で変更したキャッシュのタスクを上書き
      onSuccess: (res, variables) => {
        const previousArticles = queryClient.getQueryData<EditedArticle[]>(['articles'])
        if (previousArticles) {
          queryClient.setQueryData(
            ['articles'],
            // 修正した記事だけキャッシュを上書きする
            previousArticles.map((article) => (article.id === res.id ? res : article))
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
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
      console.log("deleteArticleMutation accessToken:" + accessToken)

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/article/delete`,
        // axios.deleteをbody付きにする方法 https://masteringjs.io/tutorials/axios/delete-with-body
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
        const previousArticles = queryClient.getQueryData<EditedArticle[]>(['articles'])
        if (previousArticles) {
          queryClient.setQueryData(
            ['articles'],
            previousArticles.filter((article) => article.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  return { 
    createArticleMutation, 
    // postArticle, 
    updateArticleMutation, 
    deleteArticleMutation 
  }
}