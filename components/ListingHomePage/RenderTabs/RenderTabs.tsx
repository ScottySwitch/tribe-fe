import Button from "components/Button/Button";
import { eatTabList, productTabList, serviceTabList } from "constant";
import { Categories, ListingHomePageScreens, ListingTabs } from "enums";
import Image from "next/image";
import { useState } from "react";
import Heading from "../Heading/Heading";

const RenderTabs = (props: {
  category: Categories;
  onSetScreen: (e: ListingHomePageScreens) => void;
}) => {
  const { category, onSetScreen } = props;

  const finalTabs =
    category === Categories.EAT
      ? eatTabList
      : category === Categories.BUY
      ? productTabList
      : serviceTabList;

  const [selectedTab, setSelectedTab] = useState<ListingTabs>(
    category === Categories.BUY
      ? ListingTabs.PRODUCT
      : category === Categories.EAT
      ? ListingTabs.DISH
      : ListingTabs.SERVICE
  );

  let tabContent;

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
      );
      break;
    case ListingTabs.PRODUCT:
      tabContent = (
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
      );
      break;

    case ListingTabs.DISH:
      tabContent = (
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
      );
      break;

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
      );
      break;
    case ListingTabs.DEAL:
      tabContent = (
        <div className="flex flex-col items-center justify-center">
          <Image src={require("public/images/no-product.svg")} width={100} alt="" />
          <p>There are no deal yet</p>
          <Button
            text="Add Deal now"
            size="small"
            width={300}
            className="my-5"
            onClick={() => onSetScreen(ListingHomePageScreens.ADD_DEAL)}
          />
        </div>
      );
      break;

    default:
      return null;
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
  );
};
export default RenderTabs;
