import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import React, { useEffect, useState } from "react"
import ReviewBizInfoCard from "components/ReviewsPage/ReviewBizInfoCard/ReviewBizInfoCard"
import styles from "./PanelContributed.module.scss"
import { dummyApproved, dummyDenied, dummyPending } from "constant"
import UserReviewCard, {
  UserReviewCardProps,
} from "components/ReviewsPage/ReviewCompleted/ReviewCompleted"
interface IBiz {
  title: string
  imgUrl: string
  location: string
  rate?: number
  rateNumber?: number
  followerNumber?: number
  tags?: any[]
}
export interface ListCardProps extends UserReviewCardProps {
  biz?: IBiz
}

const ListCard = (props: { data: ListCardProps[] }) => {
  const { data } = props

  return (
    <React.Fragment>
      {data?.map((item: ListCardProps, index) => (
        <UserReviewCard
          key={index}
          avatarUrl={item.avatarUrl}
          listImage={item.listImage}
          content={item.content}
          dateVisit={item.dateVisit}
          rating={item.rating}
          censorshipLabel={item.censorshipLabel}
          date={item.date}
          status={item.status}
          isDivier
          className={styles.user_review_card}
          displayName={item.displayName}
        >
          {item.biz && (
            <ReviewBizInfoCard
              title={item.biz.title}
              imgUrl={item.biz.imgUrl}
              location={item.biz.location}
              rate={item.biz.rate}
              rateNumber={item.biz.rateNumber}
              followerNumber={item.biz.followerNumber}
              tags={item.biz.tags}
            />
          )}
        </UserReviewCard>
      ))}
    </React.Fragment>
  )
}

const ContributedPanel = () => {
  const [listCard, setListCard] = useState<ListCardProps[] | any>()
  const [currentTab, setCurrentTab] = useState<string>()
  const [total, setTotal] = useState<number>()

  const TabList: ITab[] = [
    { label: "Pending", value: "pending", content: <ListCard data={listCard} /> },
    { label: "Approved", value: "approved", content: <ListCard data={listCard} /> },
    { label: "Denied", value: "denied", content: <ListCard data={listCard} /> },
  ]

  useEffect(() => {
    switch (currentTab) {
      case "pending":
        setListCard(dummyPending)
        break
      case "approved":
        setListCard(dummyApproved)
        break
      case "denied":
        setListCard(dummyDenied)
        break
      default:
        setListCard(dummyPending)
        break
    }
    setTotal(listCard?.length)
  }, [currentTab])

  return (
    <div className={styles.contributed_panel}>
      {total && <div className={styles.total}>Total: {total}</div>}
      <TabsHorizontal
        tablist={TabList}
        type="primary-outline"
        className={styles.contributed_tab}
        onCurrentTab={(e) => setCurrentTab(e)}
      />
    </div>
  )
}

export default ContributedPanel
