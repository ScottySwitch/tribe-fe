import { ProfileTabFavourited } from "enums"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import InforCard, {InforCardProps} from "components/InforCard/InforCard"
import styles from "./PanelFavouried.module.scss"
import { useEffect, useState } from "react"
import { inforCardList } from "constant"
import UserFavouriteApi from "services/user-listing-favourite"
import BizlistingApi from "services/biz-listing"
import {get} from "lodash"

const ListCard = (props: {data: InforCardProps[]}) => {
  const { data } = props
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
      {Array.isArray(data) && data?.map((card: InforCardProps, index) => (
        <InforCard
          key={index}
          imgUrl={card.imgUrl}
          title={card.title}
          rate={card.rate}
          rateNumber={card.rateNumber}
          followerNumber={card.followerNumber}
          price={card.price}
          categories={card.categories}
          tags={card.tags}
          iconTag={true}
          isVerified={card.isVerified}
          className="w-full"
          isFavourited={true}
        />
      ))}
    </div>
  )
}

const FavouriedPanel = () => {
  const [currentTab, setCurrentTab] = useState<string>(ProfileTabFavourited.EAT)
  const [listCard, setListCard] = useState<any>()
  const [total, setTotal] = useState<number>(0)
  
  const TabList: ITab[] = [
    { label: ProfileTabFavourited.EAT, value: ProfileTabFavourited.EAT, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.BUY, value: ProfileTabFavourited.BUY, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.SEE_DO, value: ProfileTabFavourited.SEE_DO, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.TRANSPORT, value: ProfileTabFavourited.TRANSPORT, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.STAY, value: ProfileTabFavourited.STAY, content: <ListCard data={listCard}/> },
  ]

  useEffect(() => {
    getListingFavourite(currentTab)
  }, [currentTab])

  const getListingFavourite = async (slug) => {
    const data = await BizlistingApi.getListingFavouriteByCategory(slug)
    const rawData = get(data, 'data.data')
    const listings = Array.isArray(rawData) && rawData.map((item) => ({
      images: item.images || [],
      title: item.name,
      slug: item.slug,
      isVerified: item.is_verified,
      address: item.address,
      country: item.country,
      description: item.description,
      followerNumber: item.user_listing_follows.length,
      tags: item.tags,
      categories: item.categories,
      price: get(item, 'price_range.min') || '',
      rate: item.rate,
      rateNumber: item.rate_number,
    })) || []
    setListCard(listings)
    setTotal(listings.length)
    console.log('data', data)
  }

  return (
    <div className={styles.favouried_panel}>
      <TabsHorizontal
        type="primary-outline"
        tablist={TabList}
        className={styles.favouried_tab}
        onCurrentTab={(e) => {
          console.log(e)
          setCurrentTab(e)
        }}
      />
      {total > 0 && (<div className={styles.total}>Total: {total}</div>)}
    </div>
  )
}

export default FavouriedPanel