import { NextPage } from 'next'
import { ArticleList } from '../components/ArticleList'
import { Layout } from '../components/Layout'

const Dashboard: NextPage = () => {
  return (
    <Layout title="Article Board">
      <ArticleList />
    </Layout>
  )
}

export default Dashboard