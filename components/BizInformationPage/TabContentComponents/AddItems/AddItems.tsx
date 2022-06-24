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
  isPaid?: boolean
  multiple?: boolean
  itemList?: { [key: string]: any }[]
  placeholders: string[]
  onSubmit: (list: { [key: string]: any }[]) => void
  onCancel: () => void
}

const AddItems = (props: AddItemsProps) => {
  const { itemList = [], isPaid, multiple, placeholders, onCancel, onSubmit } = props
  const [localItemList, setLocalItemList] = useState(itemList || [])

  const handleRemoveItem = (id: number) => {
    const newArray = [...localItemList].filter((item) => item.id !== id)
    setLocalItemList(newArray)
  }

  const handleChangeItem = (id: number, type: string, value: string | number | string[]) => {
    const index = getIndex(id, localItemList)
    const newArray = [...localItemList]
    newArray[index][type] = value
    setLocalItemList(newArray)
  }

  const handleAddItem = () => {
    setLocalItemList([...localItemList, { id: randomId(), isNew: true }])
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
      onClick={() => {
        setLocalItemList(itemList)
        onCancel()
      }}
    />
  )

  return (
    <div>
      <Break />
      {Array.isArray(localItemList) && localItemList.length
        ? localItemList.map((item) => (
            <div key={item.id} className={styles.add_items_container}>
              <div className={styles.break} />
              <div className={styles.header}>
                <p className="text-left">Add images</p>
                {multiple && (
                  <div className={styles.close} onClick={() => handleRemoveItem(item.id)}>
                    <Icon icon="cancel" />
                  </div>
                )}
              </div>
              <Upload
                isPaid={isPaid}
                multiple
                fileList={item.images}
                centerIcon={<Icon icon="plus" size={20} />}
                onChange={(e) => handleChangeItem(item.id, "imgUrl", e[0])}
              />
              <Input
                value={item.name}
                placeholder={placeholders[0]}
                onChange={(e: any) => handleChangeItem(item.id, "name", e.target.value)}
              />
              <Input
                value={item.description}
                placeholder={placeholders[1]}
                onChange={(e: any) => handleChangeItem(item.id, "description", e.target.value)}
              />
              <Input
                type="number"
                value={item.price}
                placeholder="Price"
                onChange={(e: any) => handleChangeItem(item.id, "price", e.target.value)}
              />
              <Input
                value={item.tags}
                placeholder="Tags"
                onChange={(e: any) => handleChangeItem(item.id, "tags", e.target.value)}
              />
              {multiple && <AddItemButton />}
            </div>
          ))
        : multiple && <AddItemButton />}
      <Break />
      <div className="flex gap-5">
        <CancelButton />
        <Button
          text={placeholders[2]}
          width={280}
          size="small"
          onClick={() => onSubmit(localItemList)}
        />
      </div>
    </div>
  )
}

export default AddItems
