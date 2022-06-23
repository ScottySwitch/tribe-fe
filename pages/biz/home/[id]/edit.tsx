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
import BizListingApi from "../../../../services/biz-listing"
import AddMenu from "components/BizInformationPage/TabContentComponents/AddMenu/AddMenu"
import AddItems from "components/BizInformationPage/TabContentComponents/AddItems/AddItems"
import AddDeals from "components/BizInformationPage/TabContentComponents/AddDeal/AddDeals"
import TagApi from "services/tag";
import FacilityApi from "services/facility"

import styles from "styles/BizHomepage.module.scss"
import Facilities from "components/BizHomePage/Facilities/Facilities"
import { IOption } from "type"
import Tags from "components/BizHomePage/Tags/Tags"
import HomeOpenHours from "components/BizHomePage/HomeOpenHours/HomeOpenHours"
import { getAddItemsFields } from "constant"
import ProductApi from "../../../../services/product";
import DealApi from "../../../../services/deal";
import get from "lodash/get"

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
)

const EditListingHomepage = (context) => {
  const [category, setCategory] = useState(Categories.EAT)
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME)
  const [description, setDescription] = useState<string>("")
  const [facilities, setFacilities] = useState<IOption[]>([])
  const [facilityOptions, setFacilityOptions] = useState<IOption[]>([])
  const [tags, setTags] = useState<IOption[]>([])
  const [tagOptions, setTagOptions] = useState<IOption[]>([])
  const [openHours, setOpenHours] = useState([])
  const [priceRange, setPriceRange] = useState({ min: "", max: "", currency: "" })
  const [socialInfo, setSocialInfo] = useState<any>("")
  const [phoneNumber, setPhoneNumber] = useState<any>("")
  const [action, setAction] = useState({ label: "", value: "" })
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([])
  const [menu, setMenu] = useState<string[]>()
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([])
  const [bizListing, setBizListing] = useState<any>({})
  // const [listingImages, setListingImages] = useState<string[]>([])
  const [listingImages, setListingImages] = useState<any>([])
  const [logo, setLogo] = useState<any>([])

  const [isPaid, setIsPaid] = useState<boolean>(false)

  const {
    query: { id: listingSlug },
  } = useRouter()

  useEffect(() => {
    getTags()
    getFacilities()
    const getListingData = async (listingSlug) => {
      const data = await BizListingApi.getBizListingBySlug(listingSlug)
      // if (data.data.data.length > 0) {
      if (Array.isArray(get(data, 'data.data')) && get(data, 'data.data').length > 0 ) {
        const listing = data.data.data[0]
        console.log(listing)
        setBizListing(listing)
        setAction(get(listing, 'attributes.action'))
        setListingImages(get(listing, 'attributes.images'))
        setCategory(get(listing, "attributes.categories.data[0].id") || Categories.BUY)
        setDescription(get(listing, 'attributes.description'))
        setOpenHours(get(listing, 'attributes.open_hours'))
        setPriceRange(get(listing, 'attributes.price_range'))
        setSocialInfo(get(listing, 'attributes.social_info'))
        setItemList(get(listing, 'attributes.products.data'))
        setDealList(get(listing, 'attributes.deals.data'))
        // setPhoneNumber(listing.attributes.phone_number)
        setLogo(listing.attributes.logo)
        if(Array.isArray(get(listing, 'attributes.tags.data')) && get(listing, 'attributes.tags.data').length > 0) {
        // if(listing.attributes.tags.data.length > 0) {
          let arrayTags: IOption[] = [];
          listing.attributes.tags.data.map((item: any) => {
              arrayTags.push({
                label: item.attributes.label, 
                value: item.attributes.value, 
                id: item.id
              })
          })
          setTags(arrayTags)
        }
        if(Array.isArray(get(listing, 'attributes.facilities.data')) && get(listing, 'attributes.facilities.data').length > 0) {
        // if(listing.attributes.facilities.data.length > 0) {
          let arrayTags: IOption[] = [];
          listing.attributes.facilities.data.map((item: any) => {
              arrayTags.push({
                label: item.attributes.label, 
                value: item.attributes.value, 
                id: item.id
              })
          })
          setFacilities(arrayTags)
        }
        if(Array.isArray(get(listing, 'attributes.biz_invoices.data')) && get(listing, 'attributes.biz_invoices.data').length > 0) {
        // if (listing.attributes.biz_invoices.data.length > 0) {
          setIsPaid(true)
        }
        if(Array.isArray(get(listing, 'attributes.biz_invoices.data')) && get(listing, 'attributes.biz_invoices.data').length > 0) {
        // if (listing.attributes.biz_invoices.data.length > 0) {
          setPhoneNumber(listing.attributes.phone_number)
        } else {
          let defaultPhone = ""
          for (let index = 0; index < listing.attributes.phone_number.length; index++) {
            if (index < 6 && index > 2) {
              defaultPhone = defaultPhone + "X"
            } else {
              defaultPhone = defaultPhone + listing.attributes.phone_number[index]
            }
          }
          setPhoneNumber(defaultPhone)
        }
      }
    }
    if (listingSlug) {
      getListingData(listingSlug)
    }
  }, [listingSlug])

  //Get tags
  const getTags = async () => {
    const data = await TagApi.getTags()
    const tagsList = get(data, 'data.data')||[]
    let arrayTags : IOption[] = [];
    const tagArray = tagsList.map( item => ( { label: item.attributes.label, value: item.attributes.value, id: item.id } ))
    setTagOptions(tagArray);
    // if (Array.isArray(get(data, 'data.data')) && get(data, 'data.data').length > 0 ) {
    // // if (data.data.data && data.data.data.length > 0) {
    // }
  }

  //Get Facility
  const getFacilities = async () => {
    const data = await FacilityApi.getFacility()
    const facilitiesList = get(data, 'data.data')||[]
    let arrayFacilities : IOption[] = [];
    const facilitiesArray = facilitiesList.map( item => ( { label: item.attributes.label, value: item.attributes.value, id: item.id } ))
    setFacilityOptions(facilitiesArray);
    // if (Array.isArray(get(data, 'data.data')) && get(data, 'data.data').length > 0 ) {
    // // if (data.data.data && data.data.data.length > 0) {
            // data.data.data.map((item: any, index: number) => {
            //   arrayTags.push({
            //     label: item.attributes.label,
            //     value: item.attributes.value,
            //     id: item.id
            //   })
            // })
          // }
    // }
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
    setDealList(dealList)
    setScreen(ListingHomePageScreens.HOME)
  }
  const handleSetMenu = (menu) => {
    setMenu(menu)
    setScreen(ListingHomePageScreens.HOME)
  }
  const handleCancel = () => setScreen(ListingHomePageScreens.HOME)

  const handleSubmit = async () => {
    console.log('openHours', openHours);
    
    if (itemList.length > 0) {
      await Promise.all(
        itemList.map(async (item) => {
          if (item.isNew) {
            const dataSend = {
              biz_listing: bizListing.id,
              name: item.name,
              description: item.description,
              price: item.price,
              tags: item.tags,
              images: [item.imgUrl],
            }
            await ProductApi.createProduct(dataSend)
          }
        })
      )
    }

    if (dealList.length > 0) {
      await Promise.all(
        dealList.map(async (item) => {
          const dataSend = {
            biz_listing: bizListing.id,
            name: item.name,
            description: item.description,
            images: [item.imgUrl],
            end_date: item.validUntil,
          }
          await DealApi.createDeal(dataSend)
        })
      )
    }

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
    }).then((response) => {
      console.log(response)
      window.location.reload()
    })
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
              <Facilities
                facilities={facilities}
                onSetFacilities={handleSetFacilities}
                facilityOptions={facilityOptions}
              />
              <div className={styles.break} />
              <Tags tags={tags} onSetTags={handleSetTags} tagOptions={tagOptions} />
              <div className={styles.break} />
              <HomeOpenHours openHours={openHours} onSetOpenHours={handleSetOpenHours} />
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
            multiple
            onSubmit={handleSetItemList}
            onCancel={handleCancel}
            itemList={itemList}
            placeholders={getAddItemsFields(category).placeholder}
          />
        </SectionLayout>
        <SectionLayout show={screen === ListingHomePageScreens.ADD_MENU} title="Add a menu">
          <AddMenu menu={menu} onCancel={handleCancel} onSubmit={handleSetMenu} />
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_DEALS}
          title="Add deals"
          childrenClassName=" w-full sm:w-3/4 lg:w-1/2"
        >
          <AddDeals
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
