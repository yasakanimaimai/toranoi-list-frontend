import { FC, useState } from "react"
import { 
  Text, 
  Paper,
  Group,
  Button,
} from "@mantine/core"
import { Article } from "../types"
import { useMutateArticle } from "../hooks/useMutateArticles"
import { LoadingFrame } from "./LoadingFrame"
import { ArticleItemMenu } from "./ArticleItemMenu"

export const ArticleItem: FC<Article> = ({
  id,
  siteTitle,
  siteUrl,
  abstractText,
}) => {

  const [text, setText] = useState(abstractText)
  const [buttunVisibility, setButtunVisibility] = useState("hidden")
  const {updateArticleMutation, deleteArticleMutation } = useMutateArticle()
  const ARTICLE_COLOR = '#e6eae3'

  const onClickTextarea = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.currentTarget.readOnly = false
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px"
    e.currentTarget.style.cursor = 'text'
    e.currentTarget.style.webkitLineClamp = "9999"
    setButtunVisibility('visible')
  }

  const ButtonGroup: FC<{visibility: string}> = (props) => {

    if (props.visibility !== 'visible') {
      return <Group position="right" spacing="lg"></Group>
    }

    const onClickSaveBtn = async () => {
      updateArticleMutation.mutate({
        id: id,
        siteTitle: siteTitle,
        siteUrl: siteUrl,
        abstractText: text,
      })
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

  return (
    <LoadingFrame visible={updateArticleMutation.isLoading || deleteArticleMutation.isLoading}>
      <Paper shadow="md" p="md" radius={10} withBorder style={{marginTop:"50px", marginBottom:"20px", width: "600px", backgroundColor:ARTICLE_COLOR }}>
        <div className="flex">
          <Text lineClamp={3} size="lg" weight={900} style={{width:"95%", color:"#333631",}}>{siteTitle}</Text>
          <ArticleItemMenu 
            id={id}
            siteTitle={siteTitle}
            siteUrl={siteUrl}
            text={text}
            // LoadingFrameで使用するmutationと同じインスタンスを渡す必要がある
            deleteMutation={deleteArticleMutation}
          />
        </div>

        <hr style={{borderTop: "0.5px solid rgba(0, 0, 0, 0.1)", borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)"}}></hr>

        <textarea 
          id={id + '-textarea'}
          defaultValue={text}
          readOnly
          rows={3} 
          style={{
            overflow:"hidden",
            width:"100%", 
            resize:"none",
            backgroundColor:ARTICLE_COLOR,
            color:"#333631",
            border:"none",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp:3,
            cursor: "pointer", 
            outline: "none",
            lineHeight: 1.7,
            fontFamily: 'Inter',
            letterSpacing: 1.5,
          }}
          onClick={onClickTextarea}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        
        <div style={{height:"25px", marginTop:"15px"}}>
          <ButtonGroup visibility={buttunVisibility} />
        </div>
      </Paper>
    </LoadingFrame>
  )
}
