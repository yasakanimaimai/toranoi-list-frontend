import { useRouter } from "next/router";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import { EditedArticle } from "../types";

export const useQueryArticles = () => {
  const router = useRouter()
  const getArticles = async () => {
    const { data } = await axios.get<EditedArticle[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/article`
    )
    return data
  }

  return useQuery<EditedArticle[], Error>({
    queryKey: ['articles'],
    queryFn: getArticles,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })
}