import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import Input from "components/Input/Input"
import MenuCard from "components/MenuCard/MenuCard"
import PromotionCard from "components/PromotionCard/PromotionCard"
import { eatTabList, productTabList, serviceTabList } from "constant"
import { Categories, ListingHomePageScreens, ListingTabs } from "enums"
import { get } from "lodash"
import Image from "next/image"
import { useState } from "react"
import Heading from "../../Heading/Heading"

import styles from "./RenderTabs.module.scss"

interface TabContentProps {
  selectedTab?: ListingTabs
  cardItem?: any
  list: any[]
  blankImg: string
  blankText: string
  buttonText: string
  onClick: () => void
  onDelete: (item: any) => void
}

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

<<<<<<< HEAD
const CardContainer = ({ list }) =>
  Array.isArray(list) ? (
    <div className={styles.items_container}>
      <div className="w-full flex justify-center">
        <Input placeholder="search" width="100%" prefix={<Icon icon="search" />} />
      </div>
      {list.map((item) => (
          // <InforCard
          //   key={item.attributes.id}
          //   imgUrl={item.attributes.images ? item.attributes.images[0] : "https://picsum.photos/200/300"}
          //   title={item.attributes.name}
          //   price={item.attributes.price}
          //   description={item.attributes.description || item.information}
          // />
          <InforCard
            key={item.id}
            imgUrl={item.images ? item.images[0] : "https://picsum.photos/200/300"}
            title={item.name}
            price={item.price}
            description={item.description || item.information}
            tags={item.tags}
            validUntil={item.validUntil}
          />
      ))}
    </div>
  ) : null

=======
>>>>>>> master
const EditList = ({ category, selectedTab, onSetScreen }) => {
  const tabList = initSelectedTab(category).tabList
  const tabScreen = tabList.find((tab) => tab.value === selectedTab)?.screen
  return <a onClick={() => onSetScreen(tabScreen)}>Edit {selectedTab}</a>
}

const TabContent = ({
  selectedTab,
  cardItem,
  list,
  blankImg,
  blankText,
  buttonText,
  onClick,
  onDelete,
}: TabContentProps) => {
  const CardItem = cardItem
  const isDeal = selectedTab === ListingTabs.DEAL
  const isItem =
    selectedTab &&
    [ListingTabs.DISH, ListingTabs.PRODUCT, ListingTabs.SERVICE].includes(selectedTab)

  if (!(Array.isArray(list) && list.length)) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image src={blankImg} width={100} alt="" />
        <p>{blankText}</p>
        <Button text={buttonText} size="small" width={300} className="my-5" onClick={onClick} />
      </div>
    )
  }

  return (
    <div className={styles.items_container}>
      <div className="w-full flex justify-center">
        <Input placeholder="search" width="100%" prefix={<Icon icon="search" />} />
      </div>
      {list.map((item) => {
        const id = get(item, "attributes.id") || item.id
        const images = get(item, "attributes.images")
        const firstImage = get(item, "attributes.images[0]") || item.imgUrl
        const name = get(item, "attributes.name") || item.name || ""
        const price = get(item, "attributes.price") || item.price || ""
        const description = get(item, "attributes.description") || item.information || ""
        const expiredAt = get(item, "attributes.expire_at") || item.expireAt || ""
        return (
          <div
            key={id}
            className={styles.info_card_container}
            style={{ width: isDeal ? "50%" : "" }}
          >
            <CardItem
              imgUrl={firstImage || "https://picsum.photos/200/300"}
              title={name}
              price={price}
              description={description}
              expiredAt={expiredAt}
            />
            {isItem && (
              <div className={styles.delete} onClick={() => onDelete(item)}>
                <Icon icon="delete" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const RenderTabs = (props: {
  itemList: any[]
  dealList: any[]
  menuList: any[]
  category: Categories
  onSetScreen: (e: ListingHomePageScreens) => void
  onDelete: (e: { [key: string]: any }) => void
}) => {
  const { itemList, dealList, menuList, category, onSetScreen, onDelete } = props
  const [selectedTab, setSelectedTab] = useState<ListingTabs>(initSelectedTab(category).itemType)
  let tabContent
  switch (selectedTab) {
    case ListingTabs.SERVICE:
      tabContent = (
        <TabContent
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no services yet"
          buttonText="Add Service now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      )
      break
    case ListingTabs.PRODUCT:
      tabContent = (
        <TabContent
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no products yet"
          buttonText="Add product now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      )
      break

    case ListingTabs.DISH:
      tabContent = (
        <TabContent
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-dish.svg")}
          blankText="There are no dish yet"
          buttonText="Add dish now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      )
      break
    case ListingTabs.MENU:
      tabContent = (
        <TabContent
          cardItem={MenuCard}
          onDelete={onDelete}
          list={menuList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no menu yet"
          buttonText="Add menu now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_MENU)}
        />
      )
      break
    case ListingTabs.DEAL:
      tabContent = (
        <TabContent
          selectedTab={ListingTabs.DEAL}
          cardItem={PromotionCard}
          onDelete={onDelete}
          list={dealList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no deal yet"
          buttonText="Add deals now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_DEALS)}
        />
      )
      break
  }

  return (
    <div className="w-full">
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
