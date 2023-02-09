import React, { FC } from 'react'
import { Anchor, Menu } from '@mantine/core'
import { IconCopy, IconExternalLink, IconTrash,  } from '@tabler/icons'
import { IconDotsVertical } from '@tabler/icons-react';
import { UseMutationResult } from '@tanstack/react-query'

type Props = {
  id: string
  siteTitle: string
  siteUrl: string
  text: string
  deleteMutation: UseMutationResult<void, any, string, unknown>
}

export const ArticleItemMenu: FC<Props> = ({
  id,
  siteTitle,
  siteUrl,
  text,
  deleteMutation,
}) => {

  const onClickCopyLink = () => {
    const markdownSiteTitle = `[${siteTitle}](${siteUrl}) \n`
    navigator.clipboard.writeText(markdownSiteTitle + text)
  }

  return (
    <Menu shadow="md" width={200} position="bottom-start">
      <Menu.Target>
        <IconDotsVertical size={20} style={{cursor:"pointer", color:"#333631"}}/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item 
          icon={<IconCopy size={14} />}
          onClick={onClickCopyLink}
        >
          Copy
        </Menu.Item>

        <Menu.Item icon={<IconExternalLink size={14} />}>
          <Anchor 
            href={siteUrl} 
            target="_blank" 
            rel="noreferrer" 
            underline={false} 
            variant="text"
          >
            Go page
          </Anchor>
        </Menu.Item>

        <Menu.Item 
          color="red" 
          icon={<IconTrash size={14} />} 
          onClick={() => {deleteMutation.mutate(id)}}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}