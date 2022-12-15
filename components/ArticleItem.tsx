import { FC } from "react"
import { List } from "@mantine/core"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import { EditedArticle } from "../types"
import useStore from "../store"
import { useMutateArticle } from "../hooks/useMutateArticles"


export const ArticleItem: FC<EditedArticle> = ({
  id,
  siteTitle,
  siteUrl,
  abstractText,
}) => {
  // 編集する記事の内容を入力欄に表示するためにzustandを使う
  const update = useStore((state) => state.updateEditedArticle)

  // 削除する記事をreact queryを使って削除する
  const { deleteArticleMutation } = useMutateArticle()

  return (
    <List.Item>
      <div className="float-left mr-10">
        <PencilAltIcon 
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              siteTitle,
              siteUrl,
              abstractText,
            })
          }}
        />
        <TrashIcon 
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteArticleMutation.mutate(id)
          }}
        />
      </div>
      <span>{siteTitle}</span>
    </List.Item>
    
  )
}
