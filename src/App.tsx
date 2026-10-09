import IndexAbout from '@/components/index/IndexAbout/IndexAbout'
import IndexCerts from '@/components/index/IndexCerts/IndexCerts'
import IndexContact from '@/components/index/IndexContact/IndexContact'
import IndexExperience from '@/components/index/IndexExperience/IndexExperience'
import IndexHero from '@/components/index/IndexHero/IndexHero'
import IndexProjects from '@/components/index/IndexProjects/IndexProjects'
import Layout from '@/layout/Layout'

const App = () => (
  <Layout>
    <IndexHero />
    <IndexAbout />
    <IndexExperience />
    <IndexProjects />
    <IndexCerts />
    <IndexContact />
  </Layout>
)

export default App
