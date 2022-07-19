import Button from "components/Button/Button";
import DealDetailModal from "components/DealDetailModal/DealDetailModal";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Input from "components/Input/Input";
import MenuCard from "components/MenuCard/MenuCard";
import ProductDetailModal from "components/ProductDetailModal/ProductDetailModal";
import PromotionCard from "components/PromotionCard/PromotionCard";
import { eatTabList, productTabList, serviceTabList } from "constant";
import { Categories, ListingHomePageScreens, ListingTabs } from "enums";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Heading from "../../Heading/Heading";
import AuthPopup from "components/AuthPopup/AuthPopup";
import styles from "./RenderTabs.module.scss";

const initSelectedTab = (category) => {
  switch (category) {
    case Categories.BUY:
      return { itemType: ListingTabs.PRODUCT, tabList: productTabList };
    case Categories.EAT:
      return { itemType: ListingTabs.DISH, tabList: eatTabList };
    default:
      return { itemType: ListingTabs.SERVICE, tabList: serviceTabList };
  }
};

const EditList = ({ category, selectedTab, onSetScreen }) => {
  const tabList = initSelectedTab(category).tabList;
  const tabScreen = tabList.find((tab) => tab.value === selectedTab)?.screen;
  return <a onClick={() => onSetScreen(tabScreen)}>Edit {selectedTab}</a>;
};

interface TabContentProps {
  isViewPage?: boolean;
  selectedTab?: ListingTabs;
  cardItem?: any;
  list: any[];
  blankImg: string;
  blankText: string;
  buttonText: string;
  onClick: () => void;
  onDelete: (item: any) => void;
}

const TabContent = ({
  isViewPage,
  selectedTab,
  cardItem,
  list,
  blankImg,
  blankText,
  buttonText,
  onClick,
  onDelete,
}: TabContentProps) => {
  const router = useRouter();
  const { query } = router;
  const { listingSlug } = query;

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const isDeal = selectedTab === ListingTabs.DEAL;
  const itemArray = [
    ListingTabs.DISH,
    ListingTabs.PRODUCT,
    ListingTabs.SERVICE,
  ];
  const isItem = selectedTab && itemArray.includes(selectedTab);
  const CardItem = cardItem;

  if (!(Array.isArray(list) && list.length)) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image src={blankImg} width={100} alt="" />
        <p>{blankText}</p>
        {!isViewPage && (
          <Button
            text={buttonText}
            size="small"
            width={300}
            className="my-5"
            onClick={onClick}
          />
        )}
      </div>
    );
  }

  const handleOpenDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  // let DetailModal = ProductDetailModal;
  let DetailModal;
  switch (selectedTab) {
    case ListingTabs.DISH:
      DetailModal = ProductDetailModal;
      break;
    case ListingTabs.PRODUCT:
      DetailModal = ProductDetailModal;
      break;

    case ListingTabs.SERVICE:
      DetailModal = ProductDetailModal;
      break;
    case ListingTabs.DEAL:
      DetailModal = DealDetailModal;
      break;
  }

  return (
    <div className={styles.tab_content_container}>
      <div className="w-full flex justify-center p-[16px]">
        <Input
          placeholder="search"
          width="100%"
          prefix={<Icon icon="search" />}
        />
      </div>
      <div className={styles.items_container}>
        {list.map((item) => {
          const id = get(item, "attributes.id") || item.id;
          const images = item.images || [];
          const firstImage = item.imgUrl || images[0];
          const name = get(item, "attributes.name") || item.name || "";
          const price = get(item, "attributes.price") || item.price || "";
          const description =
            get(item, "attributes.description") ||
            item.information ||
            item.description ||
            item.termsConditions ||
            "";
          const expiredAt =
            get(item, "attributes.expire_at") ||
            new Date(item.validUntil).toLocaleString() ||
            item.expireAt ||
            "";
          return (
            <div
              key={id}
              className={styles.info_card_container}
              style={{ width: isDeal ? "50%" : "" }}
              onClick={() => handleOpenDetailModal(item)}
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
          );
        })}
      </div>
      <div
        className={styles.see_all}
        onClick={() => router.push(`/biz/${selectedTab}/${listingSlug}`)}
      >
        See all
      </div>
      <DetailModal
        visible={showDetailModal}
        data={selectedItem}
        onClose={() => setShowDetailModal(false)}
      />
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

const RenderTabs = (props: {
  isPaid?: boolean;
  isViewPage?: boolean;
  itemList: any[];
  dealList: any[];
  menuList: any[];
  category: Categories;
  onSetScreen: (e: ListingHomePageScreens) => void;
  onDelete: (e: { [key: string]: any }) => void;
}) => {
  const {
    isPaid,
    isViewPage,
    itemList,
    dealList,
    menuList,
    category,
    onSetScreen,
    onDelete,
  } = props;
  const [selectedTab, setSelectedTab] = useState<ListingTabs>(
    initSelectedTab(category).itemType
  );

  let tabContent;
  switch (selectedTab) {
    case ListingTabs.SERVICE:
      tabContent = (
        <TabContent
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no services yet"
          buttonText="Add Service now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      );
      break;
    case ListingTabs.PRODUCT:
      tabContent = (
        <TabContent
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no products yet"
          buttonText="Add product now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      );
      break;
    case ListingTabs.DISH:
      tabContent = (
        <TabContent
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={InforCard}
          onDelete={onDelete}
          list={itemList}
          blankImg={require("public/images/no-dish.svg")}
          blankText="There are no dish yet"
          buttonText="Add dish now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_ITEMS)}
        />
      );
      break;
    case ListingTabs.MENU:
      tabContent = (
        <TabContent
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={MenuCard}
          onDelete={onDelete}
          list={menuList}
          blankImg={require("public/images/no-product.svg")}
          blankText="There are no menu yet"
          buttonText="Add menu now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_MENU)}
        />
      );
      break;
    case ListingTabs.DEAL:
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      tabContent = (
        <TabContent
          selectedTab={selectedTab}
          isViewPage={isViewPage}
          cardItem={PromotionCard}
          onDelete={onDelete}
          list={!userInfo.token ? [] : dealList}
          blankImg={require("public/images/no-product.svg")}
          blankText={
            !userInfo.token
              ? "Login/sign up to see deals"
              : "There are no deal yet"
          }
          buttonText="Add deals now"
          onClick={() => onSetScreen(ListingHomePageScreens.ADD_DEALS)}
        />
      );
      break;
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
              onClick={() =>
                !(tab.value === ListingTabs.DEAL && !isPaid) &&
                setSelectedTab(tab.value)
              }
            />
          ))}
        </div>
        {!isViewPage && (
          <EditList
            category={category}
            selectedTab={selectedTab}
            onSetScreen={onSetScreen}
          />
        )}
      </div>
      {tabContent}
    </div>
  );
};
export default RenderTabs;
