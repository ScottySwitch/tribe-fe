import { inforCardList } from "constant"
import { ProfileTabFavourited } from "enums"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import InforCard, {InforCardProps} from "components/InforCard/InforCard"
import styles from "./PanelFavouried.module.scss"
import { useEffect, useState } from "react"

const ListCard = (props: {data?: InforCardProps[]}) => {
  const { data } = props
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
      {data?.map((card, index) => (
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
  const [total, setTotal] = useState<number>()
  const [listCard, setListCard] = useState<InforCardProps[] | any>()
  
  const TabList: ITab[] = [
    { label: ProfileTabFavourited.EAT, value: ProfileTabFavourited.EAT, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.BUY, value: ProfileTabFavourited.BUY, content: "<ListCard data={BUY} />" },
    { label: ProfileTabFavourited.SEE_DO, value: ProfileTabFavourited.SEE_DO, content: "<ListCard data={SEE_DO} />" },
    { label: ProfileTabFavourited.TRANSPORT, value: ProfileTabFavourited.TRANSPORT, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.STAY, value: ProfileTabFavourited.STAY, content: <ListCard data={listCard}/> },
  ]

  useEffect(() => {
    setTotal(inforCardList.length)
    setListCard(inforCardList)
  }, [listCard])

  return (
    <div className={styles.favouried_panel}>
      <TabsHorizontal tablist={TabList} type="primary-outline" className={styles.favouried_tab}/>
      {total && (<div className={styles.total}>Total: {total}</div>)}
      
    </div>
  )
}

export default FavouriedPanel