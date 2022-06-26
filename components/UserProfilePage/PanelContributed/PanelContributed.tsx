import ReviewCompleted, { ReviewCompletedProps } from "components/ReviewsPage/ReviewCompleted/ReviewCompleted"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import React, { useEffect, useState } from "react"
import ReviewBizInfoCard from "components/ReviewsPage/ReviewBizInfoCard/ReviewBizInfoCard"
import styles from "./PanelContributed.module.scss"

const dummyPending = [
  {
    avatarUrl: "https://picsum.photos/100",
    content: "Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy.",
    listImage: ["https://picsum.photos/106", "https://picsum.photos/106"],
    dateVisit: "March 2021",
    name: "Anna Nhun",
    rating: 5,
    censorshipLabel: "has created a new listing",
    date: "24-2-2021",
    status: "pending",
    biz: {
      title: "Evertop Hainanese Bonelele",
      rate: 4,
      rateNumber: 24,
      followerNumber: 500,
      imgUrl: "https://picsum.photos/200",
      tags: ["Fast Food", "Desserts", "Beverages"],
      location: "50 Bussorah St, Singapore 199466"
    }
  },
  {
    avatarUrl: "https://picsum.photos/100",
    content: "Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy.",
    listImage: ["https://picsum.photos/106", "https://picsum.photos/106"],
    dateVisit: "March 2021",
    name: "Anna Nhun",
    rating: 5,
    censorshipLabel: "has reviewed",
    date: "24-2-2021",
    status: "pending",
    biz: {
      title: "Evertop Hainanese Bonelele",
      rate: 4,
      rateNumber: 24,
      followerNumber: 500,
      imgUrl: "https://picsum.photos/200",
      tags: ["Fast Food", "Desserts"],
      location: "50 Bussorah St, Singapore 199466"
    }
  }
]

const dummyApproved = [
  {
    avatarUrl: "https://picsum.photos/100",
    content: "Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy.",
    listImage: ["https://picsum.photos/106", "https://picsum.photos/106"],
    dateVisit: "March 2021",
    name: "Anna Nhun",
    rating: 5,
    censorshipLabel: "has created a new listing",
    date: "24-2-2021",
    status: "approved",
    biz: {
      title: "Evertop Hainanese Bonelele",
      rate: 4,
      rateNumber: 24,
      followerNumber: 500,
      imgUrl: "https://picsum.photos/200",
      tags: ["Fast Food", "Desserts", "Beverages"],
      location: "50 Bussorah St, Singapore 199466"
    }
  },
  {
    avatarUrl: "https://picsum.photos/100",
    content: "Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy.",
    listImage: ["https://picsum.photos/106", "https://picsum.photos/106"],
    dateVisit: "March 2021",
    name: "Anna Nhun",
    rating: 5,
    censorshipLabel: "has reviewed",
    date: "24-2-2021",
    status: "approved",
    biz: {
      title: "Evertop Hainanese Bonelele",
      rate: 4,
      rateNumber: 24,
      followerNumber: 500,
      imgUrl: "https://picsum.photos/200",
      tags: ["Fast Food", "Desserts"],
      location: "50 Bussorah St, Singapore 199466"
    }
  }
]

const dummyDenied = [
  {
    avatarUrl: "https://picsum.photos/100",
    content: "Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy.",
    listImage: ["https://picsum.photos/106", "https://picsum.photos/106"],
    dateVisit: "March 2021",
    name: "Anna Nhun",
    rating: 5,
    censorshipLabel: "has created a new listing",
    date: "24-2-2021",
    status: "denied",
    biz: {
      title: "Evertop Hainanese Bonelele",
      rate: 4,
      rateNumber: 24,
      followerNumber: 500,
      imgUrl: "https://picsum.photos/200",
      tags: ["Fast Food", "Desserts", "Beverages"],
      location: "50 Bussorah St, Singapore 199466"
    }
  },
  {
    avatarUrl: "https://picsum.photos/100",
    content: "Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy.",
    listImage: ["https://picsum.photos/106", "https://picsum.photos/106"],
    dateVisit: "March 2021",
    name: "Anna Nhun",
    rating: 5,
    censorshipLabel: "has reviewed",
    date: "24-2-2021",
    status: "denied",
    biz: {
      title: "Evertop Hainanese Bonelele",
      rate: 4,
      rateNumber: 24,
      followerNumber: 500,
      imgUrl: "https://picsum.photos/200",
      tags: ["Fast Food", "Desserts"],
      location: "50 Bussorah St, Singapore 199466"
    }
  }
]


const ListCard = (props) => {
  const { data } = props

  return (
    <React.Fragment>
      {data?.map((item, index) => (
        <ReviewCompleted
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
        >
          <ReviewBizInfoCard
            title={item.biz.title}
            rate={item.biz.rate}
            rateNumber={item.biz.rateNumber}
            followerNumber={item.biz.followerNumber}
            imgUrl={item.biz.imgUrl}
            tags={item.biz.tags}
            location={item.biz.location}
          />
        </ReviewCompleted>
      ))}
    </React.Fragment>
  )
}

const ContributedPanel = () => {
  const TabList: ITab[] = [
    { label: "Pending", value: "pending", content: <ListCard data={dummyPending} /> },
    { label: "Approved", value: "approved", content: <ListCard data={dummyApproved} />},
    { label: "Denied", value: "denied", content: <ListCard data={dummyDenied} /> },
  ]

  return (
    <div className={styles.contributed_panel}>
      <TabsHorizontal tablist={TabList} type="primary-outline" className={styles.contributed_tab}/>
    </div>
  )
}

export default ContributedPanel