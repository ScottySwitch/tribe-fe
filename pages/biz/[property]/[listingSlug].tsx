import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard"
import DealDetailModal from "components/DealDetailModal/DealDetailModal"
import InforCard from "components/InforCard/InforCard"
import MenuCard from "components/MenuCard/MenuCard"
import ProductDetailModal from "components/ProductDetailModal/ProductDetailModal"
import PromotionCard from "components/PromotionCard/PromotionCard"
import SectionLayout from "components/SectionLayout/SectionLayout"
import TopSearches from "components/TopSearches/TopSearches"
import { ListingTabs } from "enums"
import { get } from "lodash"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import BizListingApi from "services/biz-listing"

import styles from "styles/Property.module.scss"

interface PropertiesContainerProps {
  cardItem?: any
  list?: any[]
  onShowDetailModal?: (item: { [key: string]: any }) => void
}

const PropertiesContainer = ({ cardItem, list, onShowDetailModal }: PropertiesContainerProps) => {
  const CardItem = cardItem
  return (
    <div className="flex flex-wrap gap-10">
      {Array.isArray(list) && list.length > 0 ? (
        list.map((item) => {
          const id = get(item, "attributes.id") || item.id
          const images = item.images || []
          const firstImage = item.imgUrl || images[0]
          const name = get(item, "attributes.name") || item.name || ""
          const price = get(item, "attributes.price") || item.price || ""
          const description =
            get(item, "attributes.description") || item.information || item.description || ""
          const expiredAt = get(item, "attributes.expire_at") || item.expireAt || ""
          return (
            <CardItem
              key={id}
              imgUrl={firstImage || "https://picsum.photos/200/300"}
              title={name}
              price={price}
              description={description}
              expiredAt={expiredAt}
              onClick={() => onShowDetailModal?.(item?.attributes)}
              onCardClick={() => onShowDetailModal?.(item?.attributes)}
            />
          )
        })
      ) : (
        <div>There is no data yet</div>
      )}
    </div>
  )
}

const Properties = () => {
  const router = useRouter()
  const { query } = router
  const { property, listingSlug }: any = query

  const upperCaseTitle = property?.[0].toUpperCase() + property?.slice(1)
  const [properties, setProperties] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any>({})
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [listingInformation, setListingInformation] = useState<any>({})
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    const getProperties = async () => {
      let data
      data = await BizListingApi.getBizListingBySlug(listingSlug)
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      const listingDetail = get(data, `data.data[0].attributes`)
      const propertiesData = get(data, `data.data[0].attributes.${property}.data`)
      userInfo.now_biz_listing = listingDetail;
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUserInfo(userInfo)
      setListingInformation(listingDetail)
      console.log("listing", listingDetail)
      console.log("userInfo", userInfo)
      setProperties(propertiesData)
    }
    listingSlug && getProperties()
  }, [property, listingSlug])

  const handleShowDetailModal = (item) => {
    setSelectedItem(item)
    setShowDetailModal(true)
  }

  let DetailModal: any = ProductDetailModal
  const renderProperties = () => {
    switch (property) {
      case ListingTabs.DISH:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        )
      case ListingTabs.PRODUCT:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        )
      case ListingTabs.SERVICE:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        )
      case ListingTabs.DEAL:
        DetailModal = DealDetailModal
        return (
          <PropertiesContainer
            cardItem={PromotionCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        )
      case ListingTabs.MENU:
        return (
          <PropertiesContainer
            cardItem={MenuCard}
            list={properties}
            onShowDetailModal={handleShowDetailModal}
          />
        )
    }
  }

  return (
    <div>
      <SectionLayout className={styles.listing_container}>
        <ListingInforCard
          isViewPage={true}
          logo={listingInformation.logo}
          phoneNumber={listingInformation.phone}
          socialInfo={listingInformation.social_info}
          priceRange={listingInformation.price_range}
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
  )
}

export default Properties
