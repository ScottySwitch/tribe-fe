import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

import Icon from "components/Icon/Icon"
import Details from "components/ListingHomePage/Details/Details"
import EditAction from "components/ListingHomePage/EditAction/EditAction"
import Links from "components/ListingHomePage/Links/Links"
import ListingInforCard from "components/ListingHomePage/ListingInforCard/ListingInforCard"
import OnboardChecklist from "components/ListingHomePage/OnboardChecklist/OnboardChecklist"
import RenderTabs from "components/ListingHomePage/RenderTabs/RenderTabs"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Upload from "components/Upload/Upload"
import { Categories, ListingHomePageScreens } from "enums"

import styles from "styles/BizHomepage.module.scss"
import AddItems from "components/BizInformationPage/TabContent/AddItems/AddItems"
import AddMenu from "components/BizInformationPage/TabContent/AddMenu/AddMenu"
import AddDeals from "components/BizInformationPage/TabContent/AddDeal/AddDeals"

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
)

const getAddItemsFields = (category) => {
  switch (category) {
    case Categories.BUY:
      return {
        title: "Add products",
        placeholder: ["Product", "describe your product (optional)", "Create products"],
      }
    case Categories.EAT:
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

const EditListingHomepage = () => {
  const [category, setCategory] = useState(Categories.EAT)
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME)
  const [description, setDescription] = useState<string>("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "", currency: "" })
  const [action, setAction] = useState({ label: "", value: "" })
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([])
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([])

  return (
    <div className={styles.listing_homepage}>
      <SectionLayout show={screen === ListingHomePageScreens.HOME}>
        <Upload className={styles.banner} centerIcon={<CenterIcon />} />
        <div className={styles.breadcrumbs}>
          Home <Icon icon="carret-right" size={14} color="#7F859F" />
          Evertop Hainanese Boneless Chicken
        </div>
        <ListingInforCard
          priceRange={priceRange}
          onSetPriceRange={(values) => setPriceRange(values)}
        />
        <div className={styles.body}>
          <div className={styles.right_col}>
            <EditAction
              action={action}
              onApplyAction={(action, value) => setAction({ label: action, value: value })}
            />
          </div>
          <div className={styles.left_col}>
            <div className={styles.break} />
            <OnboardChecklist />
            <div className={styles.break} />
            <Details description={description} onSetDescription={(e) => setDescription(e)} />
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
          onSetItemList={(list) => setItemList(list)}
          onSetScreen={(screen) => setScreen(screen)}
          itemList={itemList}
          placeholders={getAddItemsFields(category).placeholder}
        />
      </SectionLayout>
      <SectionLayout show={screen === ListingHomePageScreens.ADD_MENU} title="Add a menu">
        <AddMenu onSetScreen={(screen) => setScreen(screen)} />
      </SectionLayout>
      <SectionLayout show={screen === ListingHomePageScreens.ADD_DEALS} title="Add deals">
        <AddDeals
          onSetDealList={(dealList) => setDealList(dealList)}
          onSetScreen={(screen) => setScreen(screen)}
          dealList={dealList}
        />
      </SectionLayout>
    </div>
  )
}

export default EditListingHomepage
