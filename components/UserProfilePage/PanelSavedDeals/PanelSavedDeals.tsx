import PromotionCard, {
  PromotionProps,
} from "components/PromotionCard/PromotionCard";
import React, { useEffect, useState } from "react";
import styles from "./PanelSavedDeals.module.scss";
import BizlistingApi from "services/biz-listing";
import { get } from "lodash";

const SavedDealsPanel = (props: { data: PromotionProps[] }) => {
  // const { data } = props
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    // setTotal(data.length)
    (userInfo && userInfo?.token) && getData();
  }, []);

  const getData = async () => {
    const data = await BizlistingApi.getFavouriteDeals();
    if (get(data, "data.data")) {
      const rawDealFavourite = get(data, "data.data");
      const favouriteDeals = rawDealFavourite.map((item) => ({
        key: get(item, "attributes.deal.data.id"),
        title: get(item, "attributes.deal.data.attributes.name"),
        imgUrl: get(item, "attributes.deal.data.attributes.images[0"),
        expiredAt: get(item, "attributes.deal.data.attributes.end_date"),
        startDate: get(item, "attributes.deal.data.attributes.start_date"),
      }));
      setData(favouriteDeals);
    }
  };

  return (
    <div className={styles.save_deals_panel}>
      {total && <div className={styles.total}>Total: {total}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
        {data?.map((item: PromotionProps, index) => (
          <PromotionCard
            key={index}
            title={item.title}
            imgUrl={item.imgUrl}
            expiredAt={item.expiredAt}
            type={item.type}
            favourite
            startDate={item.startDate}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedDealsPanel;
