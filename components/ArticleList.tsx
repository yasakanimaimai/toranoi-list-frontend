import { useQueryArticles } from "../hooks/useQueryArticle"
import { List, ThemeIcon, Loader } from "@mantine/core"
import { IconCircleDashed } from "@tabler/icons"
import { ArticleItem } from "./ArticleItem" 
import { ScrollArea } from '@mantine/core';

export const ArticleList = () => {
  const { data: articles, status } = useQueryArticles()
  if (status === 'loading') return <Loader my="lg" color="cyan" />

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
      {articles?.map((article) => (
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