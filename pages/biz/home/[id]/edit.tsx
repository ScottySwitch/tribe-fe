import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useEffect, useState } from "react"

import Icon from "components/Icon/Icon"
import Details from "components/BizHomePage/Details/Details"
import EditAction from "components/BizHomePage/EditAction/EditAction"
import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard"
import OnboardChecklist from "components/BizHomePage/OnboardChecklist/OnboardChecklist"
import RenderTabs from "components/BizHomePage/RenderTabs/RenderTabs"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Upload from "components/Upload/Upload"
import { Categories, ListingHomePageScreens } from "enums"
import BizListingApi from "../../../../services/biz-listing"
import AddMenu from "components/BizInformationPage/TabContentComponents/AddMenu/AddMenu"
import AddItems from "components/BizInformationPage/TabContentComponents/AddItems/AddItems"
import AddDeals from "components/BizInformationPage/TabContentComponents/AddDeal/AddDeals"
import TagApi from "services/tag"
import FacilityApi from "services/facility"
import ReviewApi from "services/review"

import styles from "styles/BizHomepage.module.scss"
import Facilities from "components/BizHomePage/Facilities/Facilities"
import { IOption } from "type"
import Tags from "components/BizHomePage/Tags/Tags"
import HomeOpenHours from "components/BizHomePage/HomeOpenHours/HomeOpenHours"
import { getAddItemsFields } from "constant"
import ProductApi from "../../../../services/product"
import MenuApi from "../../../../services/menu"
import DealApi from "../../../../services/deal"
import get from "lodash/get"
import moment from "moment"
import parseISO from "date-fns/parseISO"
import Break from "components/Break/Break"
import Contacts from "components/BizHomePage/Contacts/Contacts"
import HomepageReviews from "components/BizHomePage/HomepageReviews/HomepageReviews"

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
)

const EditListingHomepage = (props: { isViewPage?: boolean }) => {
  const { isViewPage } = props
  const [category, setCategory] = useState(Categories.EAT)
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME)
  const [description, setDescription] = useState<string>("")
  const [facilities, setFacilities] = useState<IOption[]>([])
  const [facilityOptions, setFacilityOptions] = useState<IOption[]>([])
  const [tags, setTags] = useState<IOption[]>([])
  const [tagOptions, setTagOptions] = useState<IOption[]>([])
  const [openHours, setOpenHours] = useState([])
  const [reviews, setReviews] = useState([])
  const [listingRate, setListingRate] = useState(1)
  const [priceRange, setPriceRange] = useState({ min: "", max: "", currency: "" })
  const [socialInfo, setSocialInfo] = useState<any>("")
  const [phoneNumber, setPhoneNumber] = useState<any>("")
  const [action, setAction] = useState({ label: "", value: "" })
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([])
  const [menuList, setMenuList] = useState<{ [key: string]: any }[]>([])
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([])
  const [bizListing, setBizListing] = useState<any>({})
  // const [listingImages, setListingImages] = useState<string[]>([])
  const [listingImages, setListingImages] = useState<any>([])
  const [logo, setLogo] = useState<any>([])

  const [isPaid, setIsPaid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { query } = router
  const { id: listingSlug } = query

  const formatOptions = (list) =>
    list.map((item: any) => ({
      label: item.attributes.label,
      value: item.attributes.value,
      id: item.id,
    }))

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      const data = await BizListingApi.getOwnerBizListingBySlug(listingSlug)
      if (get(data, "data.data.length") == 0) {
        window.location.href = "/"
      }
      // const data = await BizListingApi.getBizListingBySlug(listingSlug)
      const listing = get(data, "data.data[0]")
      console.log("listing", listing)
      if (listing) {
        console.log(listing)
        const rawTags = get(listing, "attributes.tags.data") || []
        const rawFacilities = get(listing, "attributes.facilities.data") || []
        const invoiceList = get(listing, "attributes.biz_invoices.data") || []
        const rawPhoneNumber = get(listing, "attributes.phone_number")
        const defaultPhone = rawPhoneNumber
          ? rawPhoneNumber.substring(0, 2) + "XXXXXX" + rawPhoneNumber.substring(7)
          : ""
        const rawListing = get(listing, "attributes.products.data") || []
        const listingArray = rawListing.map((item) => ({
          name: get(item, "attributes.name"),
          price: get(item, "attributes.price"),
          id: item.id,
          description: get(item, "attributes.description"),
          images: get(item, "attributes.images"),
          imgUrl: get(item, "attributes.images[0]"),
          discount: get(item, "attributes.discount_percent"),
          tags: get(item, "attributes.tags"),
          websiteUrl: get(item, "attributes.website_url"),
          klookUrl: get(item, "attributes.klook_url"),
          isChange: false,
        }))
        const rawMenu = get(listing, "attributes.menus.data") || []
        const menuArray = rawMenu.map((item) => ({
          id: item.id,
          name: get(item, "attributes.name"),
          images: get(item, "attributes.menu_file"),
          imgUrl: get(item, "attributes.menu_file[0]"),
          isChange: false,
        }))
        const rawDeal = get(listing, "attributes.deals.data") || []
        const dealArray = rawDeal.map((item) => ({
          id: item.id,
          name: get(item, "attributes.name"),
          images: get(item, "attributes.images"),
          imgUrl: get(item, "attributes.images[0]"),
          information: get(item, "attributes.description"),
          termsConditions: get(item, "attributes.terms_conditions"),
          // start_date: item.attributes.start_date,
          // end_date: moment(get(item,'attributes.end_date')).format("YYYY-MM-DD HH:mm:ss"),
          validUntil: parseISO(
            moment(get(item, "attributes.end_date")).format("YYYY-MM-DD HH:mm:ss")
          ),
          isChange: false,
        }))
        const tagArray = formatOptions(rawTags)
        const arrayFacilities = formatOptions(rawFacilities)

        setBizListing(listing)
        setAction(get(listing, "attributes.action"))
        setListingImages(get(listing, "attributes.images"))
        setCategory(get(listing, "attributes.categories.data[0].id") || Categories.BUY)
        setDescription(get(listing, "attributes.description"))
        setOpenHours(get(listing, "attributes.open_hours"))
        setPriceRange(get(listing, "attributes.price_range"))
        setSocialInfo(get(listing, "attributes.social_info"))
        // setReviews(get(listing, "attributes.reviews.data"))
        // setItemList(get(listing, "attributes.products.data"))
        setDealList(get(listing, "attributes.deals.data"))
        setLogo(listing.attributes.logo)
        setTags(tagArray)
        setFacilities(arrayFacilities)
        setItemList(listingArray)
        setMenuList(menuArray)
        setDealList(dealArray)
        setListingRate(get(listing, "attributes.rate"))
        if (invoiceList.length > 0) {
          setIsPaid(true)
          setPhoneNumber(rawPhoneNumber)
        } else {
          setPhoneNumber(defaultPhone)
        }
      }
    }

    if (listingSlug) {
      getListingData(listingSlug)
      getTags()
      getFacilities()
    }
  }, [listingSlug])

  const getBizListingReviews = async (listingSlug, sortBy) => {
    const data = await ReviewApi.getReviewsByBizListingSlugWithSort(listingSlug, sortBy)
    const reviewsData = get(data, "data.data")
    if (reviewsData.length > 0) {
      setReviews(reviewsData)
    }
  }
  useEffect(() => {
    if (listingSlug) {
      getBizListingReviews(listingSlug, "rating:desc")
    }
  }, [listingSlug])

  const handleChangeReviewsSequence = async ({ value }: IOption) => {
    if (value === "top") {
      await getBizListingReviews(listingSlug, "rating:desc")
    } else {
      await getBizListingReviews(listingSlug, "id:desc")
    }
  }

  //Get tags
  const getTags = async () => {
    const data = await TagApi.getTags()
    const tagsList = get(data, "data.data") || []
    const tagArray = tagsList.map((item) => ({
      label: item.attributes.label,
      value: item.attributes.value,
      id: item.id,
    }))
    setTagOptions(tagArray)
  }

  //Get Facility
  const getFacilities = async () => {
    const data = await FacilityApi.getFacility()
    const facilitiesList = get(data, "data.data") || []
    const facilitiesArray = facilitiesList.map((item) => ({
      label: item.attributes.label,
      value: item.attributes.value,
      id: item.id,
    }))
    setFacilityOptions(facilitiesArray)
  }

  // TODO: check function upload multiple images
  const handleChangeImages = (srcImages) => setListingImages(srcImages)
  const handleChangeLogo = (srcImages) => setLogo(srcImages)
  const handleSetPriceRange = (priceRange) => setPriceRange(priceRange)
  const handleSetSocialInfo = (socialInfo) => setSocialInfo(socialInfo)
  const handleSetPhoneNumber = (phoneNumber) => setPhoneNumber(phoneNumber)
  const handleSetDescription = (description) => setDescription(description)
  const handleSetFacilities = (facilities) => setFacilities(facilities)
  const handleSetTags = (tags) => setTags(tags)
  const handleSetOpenHours = (openHours) => setOpenHours(openHours)
  const handleSetAction = (action: string, value: string) =>
    setAction({ label: action, value: value })
  const handleSetItemList = (list: { [key: string]: string }[]) => {
    setItemList(list)
    setScreen(ListingHomePageScreens.HOME)
  }
  const handleSetDealList = (dealList: { [key: string]: string }[]) => {
    console.log("deal", dealList)
    setDealList(dealList)
    setScreen(ListingHomePageScreens.HOME)
  }
  const handleSetMenu = (menu) => {
    setMenuList(menu)
    setScreen(ListingHomePageScreens.HOME)
  }
  const handleCancel = () => setScreen(ListingHomePageScreens.HOME)

  const handleSubmitReply = (values) => {
    console.log(values)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const currentItemList = [...itemList].filter((item) => item.isNew !== true)
    const currentMenuList = [...menuList].filter((item) => item.isNew !== true)
    const currentDealList = [...dealList].filter((item) => item.isNew !== true)
    const newItemList = itemList.filter((item) => item.isNew)
    const editedItemList = itemList.filter((item) => !item.isNew && item.isEdited)
    const newMenuList = menuList.filter((item) => item.isNew)
    const editedMenuList = menuList.filter((item) => !item.isNew && item.isEdited)
    const newDealList = dealList.filter((item) => item.isNew)
    const editedDealList = dealList.filter((item) => !item.isNew && item.isEdited)
    await BizListingApi.updateBizListing(bizListing.id, {
      description: description,
      price_range: priceRange,
      action: action,
      images: listingImages,
      social_info: socialInfo,
      phone_number: phoneNumber,
      facilities: facilities,
      open_hours: openHours,
      tags: tags.map((item) => item.id),
      is_verified: false,
      logo: logo,
      products: currentItemList.map((item) => item.id) || [],
      menus: currentMenuList.map((item) => item.id) || [],
      deals: currentDealList.map((item) => item.id) || [],
    }).then((response) => {
      console.log(response)
    })

    if (newItemList.length > 0) {
      await Promise.all(
        newItemList.map(async (item) => {
          const dataSend = {
            biz_listing: bizListing.id,
            name: item.name,
            description: item.description,
            price: item.price,
            discount_percent: item.discount,
            tags: item.tags,
            images: item.images,
            website_url: item.websiteUrl,
            klook_url: item.klookUrl,
          }
          await ProductApi.createProduct(dataSend)
        })
      )
    }
    if (editedItemList.length > 0) {
      await Promise.all(
        editedItemList.map(async (item) => {
          const dataUpdate = {
            biz_listing: bizListing.id,
            name: item.name,
            description: item.description,
            price: item.price,
            discount_percent: item.discount,
            tags: item.tags,
            images: item.images,
            website_url: item.websiteUrl,
            klook_url: item.klookUrl,
          }
          await ProductApi.updateProduct(item.id, dataUpdate)
        })
      )
    }

    if (newMenuList.length > 0) {
      await Promise.all(
        newMenuList.map(async (item) => {
          const dataSend = {
            biz_listing: bizListing.id,
            name: item.name,
            menu_file: item.images,
          }
          await MenuApi.createMenu(dataSend)
        })
      )
    }
    if (editedMenuList.length > 0) {
      await Promise.all(
        editedMenuList.map(async (item) => {
          const dataUpdate = {
            biz_listing: bizListing.id,
            name: item.name,
            menu_file: item.images,
          }
          await MenuApi.updateMenu(item.id, dataUpdate)
        })
      )
    }

    if (newDealList.length > 0) {
      await Promise.all(
        newDealList.map(async (item) => {
          let convertEndDate = moment(item.validUntil).format("YYYY-MM-DD") + "T:00:00.000Z"
          const dataSend = {
            biz_listing: bizListing.id,
            name: item.name,
            description: item.information,
            images: item.images,
            terms_conditions: item.termsConditions,
            start_date: item.validUntil,
            end_date: convertEndDate,
          }
          await DealApi.createDeal(dataSend)
        })
      )
    }
    if (editedDealList.length > 0) {
      await Promise.all(
        editedDealList.map(async (item) => {
          let convertEndDate = moment(item.validUntil).format("YYYY-MM-DD") + "T:00:00.000Z"
          const dataUpdate = {
            biz_listing: bizListing.id,
            name: item.name,
            description: item.information,
            images: item.images,
            terms_conditions: item.termsConditions,
            end_date: convertEndDate,
          }
          await DealApi.updateDeal(item.id, dataUpdate)
        })
      )
    }
    window.location.reload()
  }

  return (
    bizListing.attributes && (
      <div className={styles.listing_homepage}>
        <SectionLayout show={screen === ListingHomePageScreens.HOME}>
          <Upload
            className={styles.banner}
            centerIcon={<CenterIcon />}
            onChange={handleChangeImages}
            type="banner"
            isPaid
            fileList={listingImages}
          />
          <div className={styles.breadcrumbs}>
            Home <Icon icon="carret-right" size={14} color="#7F859F" />
            {bizListing.attributes.name}
          </div>
          <ListingInforCard
            isViewPage={isViewPage}
            logo={logo}
            handleChangeLogo={handleChangeLogo}
            bizListing={bizListing.attributes}
            priceRange={priceRange}
            socialInfo={socialInfo}
            phoneNumber={phoneNumber}
            onSetPriceRange={handleSetPriceRange}
            onSetSocialInfo={handleSetSocialInfo}
            onSetPhoneNumber={handleSetPhoneNumber}
          />
          <div className={styles.body}>
            <div className={styles.right_col}>
              <EditAction
                isOwned={true}
                isViewPage={isViewPage}
                isLoading={isLoading}
                isPaid={isPaid}
                action={action}
                onApplyAction={handleSetAction}
                onPublishPage={handleSubmit}
              />
            </div>
            <div className={styles.left_col}>
              <Break show={!isViewPage} />
              {!isViewPage && <OnboardChecklist />}
              <Break show={!isViewPage} />
              <Details
                isViewPage={isViewPage}
                description={description}
                onSetDescription={handleSetDescription}
              />
              <Break show={!isViewPage} />
              <Facilities
                isViewPage={isViewPage}
                facilities={facilities}
                onSetFacilities={handleSetFacilities}
                facilityOptions={facilityOptions}
              />
              <Break show={!isViewPage} />
              <Tags
                isViewPage={isViewPage}
                tags={tags}
                onSetTags={handleSetTags}
                tagOptions={tagOptions}
              />
              <Break show={!isViewPage} />
              <HomeOpenHours
                isViewPage={isViewPage}
                openHours={openHours}
                onSetOpenHours={handleSetOpenHours}
              />
              <Break />
              <div>
                <RenderTabs
                  isViewPage={isViewPage}
                  isPaid={isPaid}
                  menuList={menuList}
                  category={category}
                  itemList={itemList}
                  dealList={dealList}
                  onSetScreen={(e) => setScreen(e)}
                  onDelete={(e) => console.log(e)}
                />
              </div>
              <Break />
              <HomepageReviews
                listingSlug={listingSlug}
                listingRate={listingRate}
                isPaid={isPaid}
                isViewPage={isViewPage}
                reviews={reviews}
                onSubmitReply={handleSubmitReply}
                onChangeReviewsSequence={handleChangeReviewsSequence}
              />
              <Break />
              <Contacts />
            </div>
          </div>
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_ITEMS}
          title={getAddItemsFields(category).title}
          childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
        >
          <AddItems
            isPaid={isPaid}
            multiple
            onSubmit={handleSetItemList}
            onCancel={handleCancel}
            itemList={itemList}
            placeholders={getAddItemsFields(category).placeholder}
          />
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_MENU}
          title="Add a menu"
          childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
        >
          <AddMenu
            isPaid={isPaid}
            multiple={true}
            menuList={menuList}
            onCancel={handleCancel}
            onSubmit={handleSetMenu}
          />
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_DEALS}
          title="Add deals"
          childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
        >
          <AddDeals
            isPaid={isPaid}
            multiple
            onCancel={handleCancel}
            onSubmit={handleSetDealList}
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
