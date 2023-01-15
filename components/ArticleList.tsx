import { useQueryArticles } from "../hooks/useQueryArticle"
import { List, ThemeIcon, Loader } from "@mantine/core"
import { IconCircleDashed } from "@tabler/icons"
import { ArticleItem } from "./ArticleItem" 
import { ScrollArea } from '@mantine/core';
import { useAuth0 } from "@auth0/auth0-react"

export const ArticleList = () => {
  const { data, status } = useQueryArticles()
  const { loginWithRedirect } = useAuth0();
  if (status === 'loading') return <Loader my="lg" color="cyan" />
  if (status === 'error') {
    loginWithRedirect()
  }

  // console.log("ArticleList  status:" + JSON.stringify(status))
  // console.log("ArticleList  data:" + JSON.stringify(data))

  return (
    // <List
    //   my="lg"
    //   spacing="sm"
    //   size="sm"
    //   icon={
    //     <ThemeIcon color="cyan" size={24} radius="xl">
    //       <IconCircleDashed size={16} />
    //     </ThemeIcon>
    //   }
    // >
    //   {articles?.map((article) => (
    //     <ArticleItem
    //       key={article.id}
    //       id={article.id}
    //       siteTitle={article.siteTitle}
    //       siteUrl={article.siteUrl}
    //       abstractText={article.abstractText}
    //     />
    //   ))}
    // </List>
    // <ScrollArea style={{ height: 500 }}>
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
    // </ScrollArea>
    )
}