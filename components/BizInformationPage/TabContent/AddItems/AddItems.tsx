import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Upload from "components/Upload/Upload"
import { ListingHomePageScreens } from "enums"
import { useState } from "react"
import { getIndex, randomId } from "utils"

import styles from "./AddItems.module.scss"

interface AddItemsProps {
  itemList: { [key: string]: any }[]
  placeholders: string[]
  onSetItemList: (list: { [key: string]: any }[]) => void
  onSetScreen: (e: ListingHomePageScreens) => void
}

const AddItems = (props: AddItemsProps) => {
  const { itemList, placeholders, onSetItemList, onSetScreen } = props

  const handleRemoveItem = (id: number) => {
    const newArray = [...itemList].filter((item) => item.id !== id)
    onSetItemList(newArray)
  }

  const handleChangeItem = (id: number, type: string, value: string | number | string[]) => {
    const index = getIndex(id, itemList)
    const newArray = [...itemList]
    newArray[index][type] = value
    onSetItemList(newArray)
  }

  const handleAddItem = () => {
    onSetItemList([...itemList, { id: randomId() }])
  }

  const AddItemButton = () => (
    <Button
      prefix={<Icon icon="plus" />}
      width={130}
      variant="secondary"
      text="Add another"
      size="small"
      onClick={handleAddItem}
    />
  )

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => onSetScreen(ListingHomePageScreens.HOME)}
    />
  )

  return (
    <div className=" w-full sm:w-3/4 lg:w-1/2">
      <Break />
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
              placeholder={placeholders[0]}
              onChange={(e: any) => handleChangeItem(item.id, "name", e.target.value)}
            />
            <Input
              placeholder={placeholders[1]}
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
      <Break />
      <div className="flex gap-5">
        <CancelButton />
        <Button
          text={placeholders[2]}
          width={280}
          size="small"
          onClick={() => onSetScreen(ListingHomePageScreens.HOME)}
        />
      </div>
    </div>
  )
}

export default AddItems
