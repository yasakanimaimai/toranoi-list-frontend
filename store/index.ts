// import create from 'zustand'
// import { Article } from '../types'

// type State = {
//   aritcle: Article
//   updateArticle: (payload: Article) => void
//   resetArticle: () => void
// }

// const useStore = create<State>((set) => ({
//   aritcle: { id: '', siteUrl: '', siteTitle: '', abstractText: '' },
//   updateArticle: (payload) => {
//     set({
//       aritcle: {
//         id: payload.id,
//         siteTitle: payload.siteTitle,
//         siteUrl: payload.siteUrl,
//         abstractText: payload.abstractText,
//       }
//     })
//   },
//   resetArticle: () => {
//     set({ aritcle: { id: '', siteUrl: '', siteTitle: '', abstractText: '' },})
//   },
// }))

// export default useStore

// モジュール化しないとコメントアウトできないため以下を記述
export {}