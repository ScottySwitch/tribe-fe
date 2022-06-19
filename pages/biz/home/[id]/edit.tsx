import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useEffect, useState } from "react"

import Icon from "components/Icon/Icon"
import Details from "components/BizHomePage/Details/Details"
import EditAction from "components/BizHomePage/EditAction/EditAction"
import Links from "components/BizHomePage/Links/Links"
import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard"
import OnboardChecklist from "components/BizHomePage/OnboardChecklist/OnboardChecklist"
import RenderTabs from "components/BizHomePage/RenderTabs/RenderTabs"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Upload from "components/Upload/Upload"
import { Categories, ListingHomePageScreens } from "enums"
import AddItems from "components/BizInformationPage/TabContent/AddItems/AddItems"
import AddMenu from "components/BizInformationPage/TabContent/AddMenu/AddMenu"
import AddDeals from "components/BizInformationPage/TabContent/AddDeal/AddDeals"
import BizListingApi from "../../../../services/biz-listing"

import styles from "styles/BizHomepage.module.scss"

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
)

const getAddItemsFields = (category) => {
  switch (category) {
    case 1: // Buy
      return {
        title: "Add products",
        placeholder: ["Product", "describe your product (optional)", "Create products"],
      }
    case 2: // Eat
      return {
        title: "Add dishes",
        placeholder: ["Dish", "describe your dish (optional)", "Create dishes"],
      }
    default:
      return {
        title: "Add services",
        placeholder: ["Service", "describe your service (optional)", "Create services"],
      }
  }
}

const EditListingHomepage = (context) => {
  const [category, setCategory] = useState(Categories.EAT)
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME)
  const [description, setDescription] = useState<string>("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "", currency: "" })
  const [action, setAction] = useState({ label: "", value: "" })
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([])
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([])
  const [bizListing, setBizListing] = useState<any>({})
  const [listingImages, setListingImages] = useState<string[]>([])

  const {
    query: { id: listingSlug },
  } = useRouter()

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      const data = await BizListingApi.getBizListingBySlug(listingSlug)
      if (data.data.data.length > 0) {
        const listing = data.data.data[0]
        console.log(listing)
        setBizListing(listing)
        setCategory(listing.attributes.categories.data[0].id) // Get the first category
        setDescription(listing.attributes.description)
        setPriceRange(listing.attributes.price_range)
      }
    }
    if (listingSlug) {
      getListingData(listingSlug)
    }
  }, [listingSlug])

  // TODO: check function upload multiple images
  const handleChangeImages = (srcImages) => setListingImages(srcImages)
  const handleSetPriceRange = (priceRange) => setPriceRange(priceRange)
  const handleSetDescription = async (description) => setDescription(description)
  const handleSetAction = (action: string, value: string) =>
    setAction({ label: action, value: value })
  const handleSetItemList = (list: { [key: string]: string }[]) => setItemList(list)
  const handleSetDealList = (dealList: { [key: string]: string }[]) => setDealList(dealList)
  const handleSetScreen = (screen: ListingHomePageScreens) => setScreen(screen)

  const handleSubmit = async () => {
    BizListingApi.updateBizListing(bizListing.id, {
      description: description,
      price_range: priceRange,
      action: action,
      item_list: itemList,
      deal_list: dealList,
      images: listingImages,
    }).then((response) => console.log(response))
  }

  return (
    bizListing.attributes && (
      <div className={styles.listing_homepage}>
        <SectionLayout show={screen === ListingHomePageScreens.HOME}>
          <Upload
            className={styles.banner}
            centerIcon={<CenterIcon />}
            multiple={true}
            onChange={handleChangeImages}
          />
          <div className={styles.breadcrumbs}>
            Home <Icon icon="carret-right" size={14} color="#7F859F" />
            {bizListing.attributes.name}
          </div>
          <ListingInforCard
            bizListing={bizListing.attributes}
            priceRange={priceRange}
            onSetPriceRange={handleSetPriceRange}
          />
          <div className={styles.body}>
            <div className={styles.right_col}>
              <EditAction
                action={action}
                onApplyAction={handleSetAction}
                onPublishPage={handleSubmit}
              />
            </div>
            <div className={styles.left_col}>
              <div className={styles.break} />
              <OnboardChecklist />
              <div className={styles.break} />
              <Details description={description} onSetDescription={handleSetDescription} />
              <div className={styles.break} />
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Icon icon="like-color" />
                  Facilities
                </div>
                <Link href="/">Add facilities</Link>
              </div>
              <div className={styles.break} />
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Icon icon="tags-color" />
                  Tags
                </div>
                <Link href="/">Add tags</Link>
              </div>
              <div className={styles.break} />
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Icon icon="clock" />
                  Opening hours
                </div>
              </div>
              <div className={styles.break} />
              <div>
                <RenderTabs
                  category={category}
                  itemList={itemList}
                  dealList={dealList}
                  onSetScreen={(e) => setScreen(e)}
                />
              </div>
              <div className={styles.break} />
              <div>
                <div className={styles.heading}>Reviews</div>
                <div className="flex flex-col items-center justify-center">
                  <Image src={require("public/images/no-review.svg")} width={100} alt="" />
                  <p>There are no review yet</p>
                </div>
              </div>
              <div className={styles.break} />
              <Links />
            </div>
          </div>
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_ITEMS}
          title={getAddItemsFields(category).title}
        >
          <AddItems
            onSetItemList={handleSetItemList}
            onSetScreen={handleSetScreen}
            itemList={itemList}
            placeholders={getAddItemsFields(category).placeholder}
          />
        </SectionLayout>
        <SectionLayout show={screen === ListingHomePageScreens.ADD_MENU} title="Add a menu">
          <AddMenu onSetScreen={handleSetScreen} />
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_DEALS}
          title="Add deals"
          childrenClassName=" w-full sm:w-3/4 lg:w-1/2"
        >
          <AddDeals
            onSetDealList={handleSetDealList}
            onSetScreen={handleSetScreen}
            dealList={dealList}
          />
        </SectionLayout>
      </div>
    )
  )
}

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {},
  }
}

export default EditListingHomepage
