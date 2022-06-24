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

const Cards = ({ list }) =>
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
          />
      ))}
    </div>
  ) : null

const RenderTabs = (props: {
  itemList: any[]
  dealList: any[]
  category: Categories
  onSetScreen: (e: ListingHomePageScreens) => void
}) => {
  const { itemList, dealList, category, onSetScreen } = props

  const finalTabs =
    category === Categories.EAT
      ? eatTabList
      : category === Categories.BUY
      ? productTabList
      : serviceTabList

  const [selectedTab, setSelectedTab] = useState<ListingTabs>(
    category === Categories.BUY
      ? ListingTabs.PRODUCT
      : category === Categories.EAT
      ? ListingTabs.DISH
      : ListingTabs.SERVICE
  )

  let tabContent
  switch (selectedTab) {
    case ListingTabs.SERVICE:
      tabContent = (
        <div className="flex flex-col items-center justify-center">
          <Image src={require("public/images/no-product.svg")} width={100} alt="" />
          <p>There are no services yet</p>
          <Button
            text="Add Service now"
            size="small"
            width={300}
            className="my-5"
            onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
          />
        </div>
      )
      break
    case ListingTabs.PRODUCT:
      tabContent =
        Array.isArray(itemList) && itemList.length ? (
          <Cards list={itemList} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={require("public/images/no-product.svg")} width={100} alt="" />
            <p>There are no products yet</p>
            <Button
              text="Add Product now"
              size="small"
              width={300}
              className="my-5"
              onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
            />
          </div>
        )
      break

    case ListingTabs.DISH:
      tabContent =
        Array.isArray(itemList) && itemList.length ? (
          <Cards list={itemList} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={require("public/images/no-dish.svg")} width={100} alt="" />
            <p>There are no dish yet</p>
            <Button
              text="Add Dish now"
              size="small"
              width={300}
              className="my-5"
              onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
            />
          </div>
        )
      break

    case ListingTabs.MENU:
      tabContent = (
        <div className="flex flex-col items-center justify-center">
          <Image src={require("public/images/no-product.svg")} width={100} alt="" />
          <p>There are no menu yet</p>
          <Button
            text="Add menu now"
            size="small"
            width={300}
            className="my-5"
            onClick={() => onSetScreen(ListingHomePageScreens.ADD_MENU)}
          />
        </div>
      )
      break
    case ListingTabs.DEAL:
      tabContent =
        Array.isArray(dealList) && dealList.length ? (
          <Cards list={dealList} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={require("public/images/no-product.svg")} width={100} alt="" />
            <p>There are no deals yet</p>
            <Button
              text="Add deals now"
              size="small"
              width={300}
              className="my-5"
              onClick={() => onSetScreen(ListingHomePageScreens.ADD_DEALS)}
            />
          </div>
        )
      break

    default:
      return null
  }

  return (
    <div>
      <div className="flex gap-5 items-center">
        {finalTabs.map((tab) => (
          <Heading
            key={tab.text}
            selected={selectedTab === tab.value}
            text={tab.text}
            onClick={() => setSelectedTab(tab.value)}
          />
        ))}
      </div>
      {tabContent}
    </div>
  )
}
export default RenderTabs
