import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Icon from "components/Icon/Icon";
import Details from "components/ListingHomePage/Details/Details";
import EditAction from "components/ListingHomePage/EditAction/EditAction";
import Links from "components/ListingHomePage/Links/Links";
import ListingInforCard from "components/ListingHomePage/ListingInforCard/ListingInforCard";
import OnboardChecklist from "components/ListingHomePage/OnboardChecklist/OnboardChecklist";
import RenderTabs from "components/ListingHomePage/RenderTabs/RenderTabs";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Upload from "components/Upload/Upload";
import { Categories, ListingHomePageScreens } from "enums";

import styles from "styles/ListingHomepage.module.scss";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
);

const getAddItemsFields = (category) => {
  switch (category) {
    case Categories.BUY:
      return {
        title: "Add products",
        placeholder: ["Product", "describe your product (optional)", "Create products"],
      };
    case Categories.EAT:
      return {
        title: "Add dishes",
        placeholder: ["Dish", "describe your dish (optional)", "Create dishes"],
      };
    default:
      return {
        title: "Add services",
        placeholder: ["Service", "describe your service (optional)", "Create services"],
      };
  }
};

const randomId = () => Math.floor(Math.random() * 10000000);
const getIndex = (id, list) => {
  return list.findIndex((item) => item.id === id);
};

const EditListingHomepage = () => {
  const [category, setCategory] = useState(Categories.BUY);
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME);
  const [description, setDescription] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "", currency: "" });
  const [action, setAction] = useState({ label: "", value: "" });
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([]);

  const handleAddItem = () => {
    setItemList([...itemList, { id: randomId() }]);
  };

  const handleRemoveItem = (id: number) => {
    const newArray = [...itemList].filter((item) => item.id !== id);
    setItemList(newArray);
  };

  const handleChangeItem = (id: number, type: string, value: string | number | string[]) => {
    const index = getIndex(id, itemList);
    const newArray = [...itemList];
    newArray[index][type] = value;
    setItemList(newArray);
  };

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => setScreen(ListingHomePageScreens.HOME)}
    />
  );

  const AddItemButton = () => (
    <Button
      prefix={<Icon icon="plus" />}
      width={130}
      variant="secondary"
      text="Add another"
      size="small"
      onClick={handleAddItem}
    />
  );

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
        <div className=" w-full sm:w-3/4 lg:w-1/2">
          {Array.isArray(itemList) && itemList.length ? (
            itemList.map((item) => (
              <div key={item.id} className={styles.add_items_container}>
                <div className={styles.break} />
                <div className={styles.header}>
                  <p style={{ textAlign: "left" }}>Add images</p>
                  <div className={styles.close} onClick={() => handleRemoveItem(item.id)}>
                    <Icon icon="cancel" />
                  </div>
                </div>
                <Upload className={styles.upload} centerIcon={<Icon icon="plus" size={20} />} />
                <Input
                  placeholder={getAddItemsFields(category).placeholder[0]}
                  onChange={(e: any) => handleChangeItem(item.id, "name", e.target.value)}
                />
                <Input
                  placeholder={getAddItemsFields(category).placeholder[1]}
                  onChange={(e: any) => handleChangeItem(item.id, "description", e.target.value)}
                />
                <Input
                  placeholder="Price"
                  onChange={(e: any) => handleChangeItem(item.id, "price", e.target.value)}
                />
                <Input
                  placeholder="Tags"
                  onChange={(e: any) => handleChangeItem(item.id, "tags", e.target.value)}
                />
                <AddItemButton />
              </div>
            ))
          ) : (
            <AddItemButton />
          )}
          <div className={styles.break} />
          <div className="flex gap-5">
            <CancelButton />
            <Button
              text={getAddItemsFields(category).placeholder[2]}
              width={280}
              size="small"
              onClick={() => setScreen(ListingHomePageScreens.HOME)}
            />
          </div>
        </div>
      </SectionLayout>
      <SectionLayout show={screen === ListingHomePageScreens.ADD_MENU} title="Add a menu">
        <div className=" w-full sm:w-3/4 lg:w-1/2">
          <Upload className={styles.upload} centerIcon={<Icon icon="plus" size={20} />} />
          <div className={styles.break} />
          <div className="flex gap-5">
            <CancelButton />
            <Button
              text="Create Menu"
              width={280}
              size="small"
              onClick={() => setScreen(ListingHomePageScreens.HOME)}
            />
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};

export default EditListingHomepage;
