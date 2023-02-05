import { useQueryArticles } from "../hooks/useQueryArticle"
import { List, ThemeIcon, Loader } from "@mantine/core"
import { ArticleItem } from "./ArticleItem" 
import { useAuth0 } from "@auth0/auth0-react"

export const ArticleList = () => {
  const { data, status } = useQueryArticles()
  const { loginWithRedirect } = useAuth0();
  if (status === 'loading') return <Loader my="lg" color="cyan" />
  if (status === 'error') {
    loginWithRedirect()
  }

  return (
    <>
      {data?.map((article) => (
        <ArticleItem
          key={article.id}
          id={article.id}
          siteTitle={article.siteTitle}
          siteUrl={article.siteUrl}
          abstractText={article.abstractText}
        />
      ))}
    </>
    )
}