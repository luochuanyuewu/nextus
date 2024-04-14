import Navbar from './Navbar'
import { fetchGlobalData as fetchData } from '@/data/fetch-globals'

export default async function TheHeader({ lang }: { lang: string }) {
  const data = await fetchData({ locale: lang })

  return (
    <>
      <Navbar
        locale={lang}
        title={data.globalData.title}
        navigation={data.mainNavData}
      ></Navbar>
    </>
  )
}
