import { FormEvent } from "react"
import { TextInput, Button, Center } from "@mantine/core"
import { IconDatabase } from "@tabler/icons"
import useStore from "../store"
import { useMutateArticle } from "../hooks/useMutateArticles"

export const ArticleForm = () => {

  // zustandから記事のstateとupdateアクションを呼び出し
  const { editedArticle } = useStore()
  const update = useStore((state) => state.updateEditedArticle)

  // form起動時の処理にreact queryの関数を仕込む
  const { 
    createArticleMutation, 
    updateArticleMutation 
  } = useMutateArticle()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("handleSubmit")

    if (editedArticle.id === '') {
      console.log("create")
      createArticleMutation.mutate({
      // postArticle.mutate({
        siteTitle: editedArticle.siteTitle,
        siteUrl: editedArticle.siteUrl,
        abstractText: editedArticle.abstractText,
      })
    } else {
      updateArticleMutation.mutate({
        id: editedArticle.id,
        siteTitle: editedArticle.siteTitle,
        siteUrl: editedArticle.siteUrl,
        abstractText: editedArticle.abstractText,
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput 
          mt="md"
          placeholder="site title"
          value={editedArticle.siteTitle || ''}
          onChange={(e) => update({ ...editedArticle, siteTitle: e.target.value })}
        />
        <TextInput 
          mt="md"
          placeholder="site url"
          value={editedArticle.siteUrl || ''}
          onChange={(e) => update({ ...editedArticle, siteUrl: e.target.value })}
        />
        <TextInput 
          mt="md"
          placeholder="description"
          value={editedArticle.abstractText || ''}
          onChange={(e) => update({ ...editedArticle, abstractText: e.target.value })}
        />
        <Center mt="lg">
          <Button
            disabled={editedArticle.siteTitle === '' || editedArticle.siteUrl === ''}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {editedArticle.id === '' ? 'Create' : 'Update'}
          </Button>
        </Center>
      </form>
    </>
  )
}
