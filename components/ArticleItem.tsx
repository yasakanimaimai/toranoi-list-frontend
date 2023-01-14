import { FC } from "react"
import { 
  List,
  Text, 
  Paper,
  Title,
  Box,
  Textarea,
  Card,
  Group,
  Menu,
  ActionIcon,
  SimpleGrid,
  ColorInput,
  Button,
} from "@mantine/core"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import { EditedArticle } from "../types"
import useStore from "../store"
import { useMutateArticle } from "../hooks/useMutateArticles"
import { IconArrowsLeftRight, IconCopy, IconDots, IconExternalLink, IconEye, IconFileZip, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from "@tabler/icons"


export const ArticleItem: FC<EditedArticle> = ({
  id,
  siteTitle,
  siteUrl,
  abstractText,
}) => {
  // 編集する記事の内容を入力欄に表示するためにzustandを使う
  // const update = useStore((state) => state.updateEditedArticle)

  // const { editedArticle } = useStore()

  // react queryを使って編集・削除する
  const { updateArticleMutation, deleteArticleMutation } = useMutateArticle()

  // テキストエリアをクリックしたとき
  const editableTextarea = (e: any) => {
    e.target.readOnly = false
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = scrollHeight + 'px';
    e.target.style.cursor = 'text'
    e.target.style.WebkitLineClamp = 9999
    

    // // saveとcancelボタンを追加
    const cancelButton = document.getElementById(id + '-cancel')
    const saveButton = document.getElementById(id + '-save')    
    if (cancelButton?.style.visibility) {
      cancelButton.style.visibility = "visible"
    }
    if (saveButton?.style.visibility) {
      saveButton.style.visibility = "visible"
    }
  }

  // コピーを押した時
  const copyTextOnClipboard = (e: any) => {
    // リアルタイムのテキストをコピーできるように修正必要
    const markdownSiteTitle = `[${siteTitle}](${siteUrl}) \n`
    navigator.clipboard.writeText(markdownSiteTitle + abstractText)
  }

  // saveボタン押下
  const updateArticle = (e: any) => {
    console.log("updateArticle")
    
    const textarea = document.getElementById(id + '-textarea') as HTMLTextAreaElement

    console.log('textarea:' + textarea.value)
    let text = ''
    if (textarea) {
      text = textarea.value
    }

    updateArticleMutation.mutate({
      id: id,
      siteTitle: siteTitle,
      siteUrl: siteUrl,
      abstractText: text,
    })

    // update({ ...editedArticle, abstractText: '変更' })

  }

  // キャンセルボタン押下
  const reset = () => {
    const textarea = document.getElementById(id + '-textarea') as HTMLTextAreaElement
    textarea.value = textarea.defaultValue
  }

  const paperColor = '#e6eae3'

  return (
    // 初期バージョン
    // <List.Item>
    //   <div className="float-left mr-10">
    //     <PencilAltIcon 
    //       className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
    //       onClick={() => {
    //         update({
    //           id,
    //           siteTitle,
    //           siteUrl,
    //           abstractText,
    //         })
    //       }}
    //     />
    //     <TrashIcon 
    //       className="h-5 w-5 cursor-pointer text-blue-500"
    //       onClick={() => {
    //         deleteArticleMutation.mutate(id)
    //       }}
    //     />
    //   </div>
    //   <span>{siteTitle}</span>
    // </List.Item>

    <Paper shadow="md" p="md" radius={10} withBorder style={{marginTop:"50px", marginBottom:"20px", width: "600px", backgroundColor:paperColor, }}>
      <div className="flex">

        <Text lineClamp={3} size="lg" weight={900} style={{width:"95%", color:"#333631",}}>{siteTitle}</Text>
          
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{cursor:"pointer", color:"#333631"}}>
              <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconCopy size={14} />} onClick={copyTextOnClipboard}>Copy</Menu.Item>
            <Menu.Item icon={<IconExternalLink size={14} />}>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" style={{color:"inherit", textDecoration:"none"}}>
                  Go page
              </a>
            </Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => {deleteArticleMutation.mutate(id)}}>Delete</Menu.Item>

          </Menu.Dropdown>
        </Menu>
      </div>

      <hr style={{borderTop: "0.5px solid rgba(0, 0, 0, 0.1)", borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)"}}></hr>

      <textarea 
        id={id + '-textarea'}
        defaultValue={abstractText}
        // value={abstractText}
        readOnly
        rows={3} 
        style={{
          overflow:"hidden", 
          width:"100%", 
          resize:"none",
          backgroundColor:paperColor,
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
        onClick={editableTextarea}
        // onChange={(e) => {
        //   update({ ...editedArticle, abstractText: e.target.value })
        // }}
      />
      
      <div className="" style={{height:"30px", marginTop:"15px"}}>

        <Group position="right" spacing="lg">

          <Button id={id + '-cancel'} className="cancel-button" size="xs" onClick={reset} style={{backgroundColor:"#90A4AE", visibility:"hidden" }}>
            Cancel
          </Button>

          <Button id={id + '-save'} className="save-button" size="xs" onClick={updateArticle} style={{backgroundColor:"#448AFF", visibility:"hidden"}}>
            Save
          </Button>

        </Group>

      </div>
    </Paper>

  )
}
