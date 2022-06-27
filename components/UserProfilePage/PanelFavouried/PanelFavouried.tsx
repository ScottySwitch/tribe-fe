import { ProfileTabFavourited } from "enums"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import InforCard, {InforCardProps} from "components/InforCard/InforCard"
import styles from "./PanelFavouried.module.scss"
import { useEffect, useState } from "react"
import { inforCardList } from "constant"

const ListCard = (props: {data: InforCardProps[]}) => {
  const { data } = props
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
      {data?.map((card: InforCardProps, index) => (
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
  const [currentTab, setCurrentTab] = useState<string>()
  const [listCard, setListCard] = useState<any>()
  const [total, setTotal] = useState<number>()
  
  const TabList: ITab[] = [
    { label: ProfileTabFavourited.EAT, value: ProfileTabFavourited.EAT, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.BUY, value: ProfileTabFavourited.BUY, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.SEE_DO, value: ProfileTabFavourited.SEE_DO, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.TRANSPORT, value: ProfileTabFavourited.TRANSPORT, content: <ListCard data={listCard}/> },
    { label: ProfileTabFavourited.STAY, value: ProfileTabFavourited.STAY, content: <ListCard data={listCard}/> },
  ]

  useEffect(() => {
    switch (currentTab) {
      case ProfileTabFavourited.EAT:
        setListCard(inforCardList)
        break;
      case ProfileTabFavourited.BUY:
        setListCard(inforCardList)
        break;
      case ProfileTabFavourited.SEE_DO:
        setListCard(inforCardList)
        break;
      case ProfileTabFavourited.TRANSPORT:
        setListCard(inforCardList)
        break;
      case ProfileTabFavourited.STAY:
        setListCard(inforCardList)
        break;
      default:
        setListCard(inforCardList)
        break;
    }
    setTotal(listCard?.length)
  }, [currentTab])

  return (
    <div className={styles.favouried_panel}>
      <TabsHorizontal
        type="primary-outline"
        tablist={TabList}
        className={styles.favouried_tab}
        onCurrentTab={(e) => setCurrentTab(e)}
      />
      {total && (<div className={styles.total}>Total: {total}</div>)}
    </div>
  )
}

export default FavouriedPanel