import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import Input from "components/Input/Input"
import { eatTabList, productTabList, serviceTabList } from "constant"
import { Categories, ListingHomePageScreens, ListingTabs } from "enums"
import Image from "next/image"
import { useState } from "react"
import Heading from "../../Heading/Heading"

import styles from "./RenderTabs.module.scss"

const initSelectedTab = (category) => {
  switch (category) {
    case Categories.BUY:
      return { itemType: ListingTabs.PRODUCT, tabList: productTabList }
    case Categories.EAT:
      return { itemType: ListingTabs.DISH, tabList: eatTabList }
    default:
      return { itemType: ListingTabs.SERVICE, tabList: serviceTabList }
  }
}

const CardContainer = ({ list }) =>
  Array.isArray(list) ? (
    <div className={styles.items_container}>
      <div className="w-full flex justify-center">
        <Input placeholder="search" width="100%" prefix={<Icon icon="search" />} />
      </div>
      {list.map((item) => (
        <InforCard
          key={item.attributes.id}
          imgUrl={
            item.attributes.images ? item.attributes.images[0] : "https://picsum.photos/200/300"
          }
          title={item.attributes.name}
          price={item.attributes.price}
          description={item.attributes.description || item.information}
        />
      ))}
    </div>
  ) : null

const EditList = ({ category, selectedTab, onSetScreen }) => {
  const tabList = initSelectedTab(category).tabList
  const tabScreen = tabList.find((tab) => tab.value === selectedTab)?.screen
  return <a onClick={() => onSetScreen(tabScreen)}>Edit {selectedTab}</a>
}

const TabContent = ({ list, blankImg, blankText, buttonText, onClick }) => {
  return Array.isArray(list) && list.length ? (
    <CardContainer list={list} />
  ) : (
    <div className="flex flex-col items-center justify-center">
      <Image src={require(blankImg)} width={100} alt="" />
      <p>{blankText}</p>
      <Button text={buttonText} size="small" width={300} className="my-5" onClick={onClick} />
    </div>
  )
}

const RenderTabs = (props: {
  itemList: any[]
  dealList: any[]
  menuList: any[]
  category: Categories
  onSetScreen: (e: ListingHomePageScreens) => void
}) => {
  const { itemList, dealList, menuList, category, onSetScreen } = props
  const [selectedTab, setSelectedTab] = useState<ListingTabs>(initSelectedTab(category).itemType)
  let tabContent
  switch (selectedTab) {
    case ListingTabs.SERVICE:
      tabContent = (
        <TabContent
          list={itemList}
          blankImg="public/images/no-product.svg"
          blankText="There are no services yet"
          buttonText="Add Service now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      )
    case ListingTabs.PRODUCT:
      tabContent = (
        <TabContent
          list={itemList}
          blankImg="public/images/no-product.svg"
          blankText="There are no products yet"
          buttonText="Add product now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      )
    case ListingTabs.DISH:
      tabContent = (
        <TabContent
          list={itemList}
          blankImg="public/images/no-dish.svg"
          blankText="There are no dish yet"
          buttonText="Add dish now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      )
      break
    case ListingTabs.MENU:
      tabContent = (
        <TabContent
          list={menuList}
          blankImg="public/images/no-product.svg"
          blankText="There are no menu yet"
          buttonText="Add menu now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_MENU)}
        />
      )
    case ListingTabs.DEAL:
      tabContent = (
        <TabContent
          list={dealList}
          blankImg="public/images/no-product.svg"
          blankText="There are no deal yet"
          buttonText="Add deals now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_DEALS)}
        />
      )
  }

  return (
    <div>
      <div className="flex gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          {initSelectedTab(category).tabList.map((tab) => (
            <Heading
              key={tab.text}
              selected={selectedTab === tab.value}
              text={tab.text}
              onClick={() => setSelectedTab(tab.value)}
            />
          ))}
        </div>
        <EditList category={category} selectedTab={selectedTab} onSetScreen={onSetScreen} />
      </div>
      {tabContent}
    </div>
  )
}
export default RenderTabs
