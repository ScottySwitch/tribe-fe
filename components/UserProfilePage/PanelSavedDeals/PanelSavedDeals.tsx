import PromotionCard, { PromotionProps } from "components/PromotionCard/PromotionCard"
import React, { useEffect, useState } from "react"
import styles from "./PanelSavedDeals.module.scss"

const SavedDealsPanel = (props: {data: PromotionProps[]}) => {
  const { data } = props
  const [total, setTotal] = useState<number>()

  useEffect(() => {
    setTotal(data.length)
  }, [data])

  return (
    <div className={styles.save_deals_panel}>
      {total && (<div className={styles.total}>Total: {total}</div>)}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
      {data?.map((item: PromotionProps, index) => (
        <PromotionCard
          key={index}
          title={item.title}
          imgUrl={item.imgUrl}
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