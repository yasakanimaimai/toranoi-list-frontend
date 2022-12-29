import { useRouter } from "next/router";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import { EditedArticle } from "../types";
import { useAuth0 } from "@auth0/auth0-react"

export const useQueryArticles = () => {
  const auth = useAuth0();
  return useQuery(["articles"],() => getArticles(auth));
}

const getArticles = async (auth: any) => {
  const accessToken = await auth.getAccessTokenSilently();

  const { data } = await axios.get<EditedArticle[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/article/get`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
  )
  return data
}