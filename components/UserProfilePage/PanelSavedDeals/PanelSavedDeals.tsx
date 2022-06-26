import PromotionCard, { IPromotionProp } from "components/PromotionCard/PromotionCard"
import React, { useEffect, useState } from "react"
import styles from "./PanelSavedDeals.module.scss"

const dummyPromotion = [
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 17, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 30, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 24, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
  {
    images: ["https://picsum.photos/300/600"],
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 3,
    link: "/",
    favourite: true,
  },
]

const SavedDealsPanel = () => {
  const [listSaveDeals, setListSavedDeals] = useState<any>()
  const [total, setTotal] = useState<number>()

  useEffect(() => {
    setTotal(dummyPromotion.length)
    setListSavedDeals(dummyPromotion)
  }, [listSaveDeals])

  return (
    <div className={styles.save_deals_panel}>
      {total && (<div className={styles.total}>Total: {total}</div>)}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
      {listSaveDeals?.map((item, index) => (
        <PromotionCard
          key={index}
          title={item.title}
          imgUrl={item.images[0]}
          expiredAt={item.expiredAt}
          type={item.type}
          favourite={item.favourite}
        />
      ))}
      </div>
    </div>
  )
}

export default SavedDealsPanel