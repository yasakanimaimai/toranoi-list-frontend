import {ReactNode, FC} from 'react'
import {LoadingOverlay} from "@mantine/core"

type Props = {
  visible: boolean
  children: ReactNode
}

export const LoadingFrame: FC<Props> = ({visible=false, children}) => {
  return (
    <div style={{position: 'relative'}}>
      <LoadingOverlay visible={visible} overlayBlur={2} overlayColor={"1"} radius={10} />
      {children}
    </div>
  )
}
