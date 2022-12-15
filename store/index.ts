import create from 'zustand'
import { EditedArticle } from '../types'

// zustandを用いてstoreを作成する

type State = {
  editedArticle: EditedArticle
  updateEditedArticle: (payload: EditedArticle) => void
  resetEditedArticle: () => void
}

const useStore = create<State>((set) => ({
  editedArticle: { id: '', siteUrl: '', siteTitle: '', abstractText: '' },
  updateEditedArticle: (payload) => {
    set({
      editedArticle: {
        id: payload.id,
        siteTitle: payload.siteTitle,
        siteUrl: payload.siteUrl,
        abstractText: payload.abstractText,
      }
    })
  },
  resetEditedArticle: () => {
    set({ editedArticle: { id: '', siteUrl: '', siteTitle: '', abstractText: '' },})
  },
}))

export default useStore