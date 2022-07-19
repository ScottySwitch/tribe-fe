import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard";
import DealDetailModal from "components/DealDetailModal/DealDetailModal";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import MenuCard from "components/MenuCard/MenuCard";
import ProductDetailModal from "components/ProductDetailModal/ProductDetailModal";
import PromotionCard from "components/PromotionCard/PromotionCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import { ListingTabs } from "enums";
import { get, orderBy } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BizListingApi from "services/biz-listing";
import { calcRateNumber } from "utils";

import styles from "styles/Property.module.scss";

interface PropertiesContainerProps {
  cardItem?: any;
  list?: any[];
  onShowDetailModal?: (item: { [key: string]: any }) => void;
}

const PropertiesContainer = ({
  cardItem,
  list,
  onShowDetailModal,
}: PropertiesContainerProps) => {
  const CardItem = cardItem;
  return (
    <div className="flex flex-wrap gap-10">
      {Array.isArray(list) && list.length > 0 ? (
        list.map((item) => {
          console.log(item);
          const id = get(item, "attributes.id") || item.id;
          const images = item?.images || item.menu_file || [];
          const firstImage = item.imgUrl || images[0];
          const name = get(item, "attributes.name") || item.name || "";
          const price = get(item, "attributes.price") || item.price || "";
          const description =
            get(item, "attributes.description") ||
            item.information ||
            item.description ||
            "";
          const expiredAt =
            get(item, "attributes.expire_at") ||
            item.expireAt ||
            `${item?.start_date?.replaceAll(
              "-",
              "/"
            )} - ${item?.end_date?.replaceAll("-", "/")} ` ||
            "";
          const endDate =
            get(item, "attributes.end_date") || item.end_date || "";
          const startDate =
            get(item, "attributes.start_date") || item.start_date || "";
          const termsConditions =
            get(item, "attributes.terms_conditions") ||
            item.terms_conditions ||
            item.conditions ||
            "";
          return (
            <CardItem
              key={id}
              imgUrl={firstImage || "https://picsum.photos/200/300"}
              title={name}
              price={price}
              description={description}
              expiredAt={expiredAt}
              termsConditions={termsConditions}
              conditions={termsConditions}
              endDate={endDate}
              startDate={startDate}
              onClick={() => onShowDetailModal?.(item)}
              onCardClick={() => onShowDetailModal?.(item)}
            />
          );
        })
      ) : (
        <div>There is no data yet</div>
      )}
    </div>
  );
};

const Properties = () => {
  const router = useRouter();
  const { query } = router;
  const { property, listingSlug }: any = query;

  const upperCaseTitle = property?.[0].toUpperCase() + property?.slice(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [listingInformation, setListingInformation] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    const getProperties = async () => {
      let data = await BizListingApi.getInfoBizListingBySlug(listingSlug);
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      const listingDetail = get(data, `data.data[0]`);
      userInfo.now_biz_listing = listingDetail;
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUserInfo(userInfo);
      let handleProperties = "products";
      if (property === "menu") {
        handleProperties = "menus";
      } else if (property === "deals") {
        handleProperties = "deals";
      }
      let propertiesData = get(data, `data.data[0].${handleProperties}`);

      setListingInformation(listingDetail);
      if (property === "products") {
        propertiesData = orderBy(
          propertiesData,
          ["attributes.is_pinned"],
          ["desc"]
        );
      }
      setProperties(propertiesData);
      setLoading(false);
    };
    listingSlug && getProperties();
  }, [property, listingSlug]);

  const handleShowDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  let DetailModal: any = ProductDetailModal;
  const renderProperties = () => {
    switch (property) {
      case ListingTabs.DISH:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.PRODUCT:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.SERVICE:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.DEAL:
        DetailModal = DealDetailModal;
        return (
          <PropertiesContainer
            cardItem={PromotionCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.MENU:
        return (
          <PropertiesContainer
            cardItem={MenuCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        );
    }
  };

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  return (
    <div>
      <SectionLayout className={styles.listing_container}>
        <ListingInforCard
          isViewPage={true}
          logo={listingInformation.logo}
          phoneNumber={listingInformation.phone_number}
          socialInfo={listingInformation.social_info}
          priceRange={{
            min: listingInformation.min_price,
            max: listingInformation.max_price,
            currency: listingInformation.currecy
          }}
          bizListing={listingInformation}
          userInfo={userInfo}
        />
      </SectionLayout>
      <SectionLayout title={upperCaseTitle}>{renderProperties()}</SectionLayout>
      <SectionLayout>
        <TopSearches />
      </SectionLayout>
      <DetailModal
        visible={showDetailModal}
        data={selectedItem}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Properties;
