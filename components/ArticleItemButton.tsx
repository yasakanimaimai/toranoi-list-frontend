import { Button, Group } from "@mantine/core";
import { UseMutationResult } from "@tanstack/react-query";
import { FC } from "react";
import { Article } from "../types";

type Props = {
  visibility: string
  article: Article
  updateMutation: UseMutationResult<any, any, Article, unknown>
}

export const ArticleItemButton: FC<Props> = ({
  visibility, 
  article,
  updateMutation
}) => {

  if (visibility !== 'visible') {
    return <Group position="right" spacing="lg"></Group>
  }

  const onClickSaveBtn = async () => {
    updateMutation.mutate(article)
  }

  return (
    <Group position="right" spacing="lg">
      <Button 
        className="save-button" 
        size="xs" 
        onClick={onClickSaveBtn} 
        style={{backgroundColor:"#448AFF"}}
      >
        Save
      </Button>
    </Group>
  )
}