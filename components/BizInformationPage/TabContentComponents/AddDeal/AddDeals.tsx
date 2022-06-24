import Break from "components/Break/Break"
import Button from "components/Button/Button"
import DatePicker from "components/DatePicker/DatePicker"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Upload from "components/Upload/Upload"
import { ListingHomePageScreens } from "enums"
import React, { useState } from "react"
import { getIndex, randomId } from "utils"

import styles from "./AddDeal.module.scss"

interface AddDealsProps {
  isPaid?: boolean
  multiple?: boolean
  dealList: { [key: string]: any }[]
  onCancel: () => void
  onSubmit: (dealList: { [key: string]: any }[]) => void
}

const AddDeals = (props: AddDealsProps) => {
  const { dealList, isPaid, multiple, onCancel, onSubmit } = props
  const [localDealList, setLocalDeaList] = useState(dealList || [])

  const handleRemoveDeal = (id: number) => {
    const newArray = [...localDealList].filter((deal) => deal.id !== id)
    setLocalDeaList(newArray)
  }

  const handleChangeDeal = (id: number, type: string, value: string | number | string[]) => {
    const index = getIndex(id, localDealList)
    const newArray = [...localDealList]
    newArray[index][type] = value
    setLocalDeaList(newArray)
  }

  const handleAddDeal = () => {
    setLocalDeaList([...localDealList, { id: randomId(), isNew: true, validUntil: new Date() }])
  }

  const AddDealButton = () => (
    <Button
      prefix={<Icon icon="plus" />}
      width={130}
      variant="secondary"
      text="Add another"
      size="small"
      onClick={handleAddDeal}
    />
  )

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => {
        setLocalDeaList(dealList)
        onCancel()
      }}
    />
  )
  return (
    <React.Fragment>
      <Break />
      {Array.isArray(localDealList) && localDealList.length
        ? localDealList.map((deal) => (
            <div key={deal.id} className={styles.add_deals_container}>
              <div className={styles.break} />
              <div className={styles.header}>
                <p className="text-left">Add images</p>
                {multiple && (
                  <div className={styles.close} onClick={() => handleRemoveDeal(deal.id)}>
                    <Icon icon="cancel" />
                  </div>
                )}
              </div>
              <Upload multiple isPaid={isPaid} centerIcon={<Icon icon="plus" size={20} />} />
              <Input
                value={deal.name}
                placeholder="Deal name"
                onChange={(e: any) => handleChangeDeal(deal.id, "name", e.target.value)}
              />
              <Input
                value={deal.information}
                placeholder="Deal information"
                onChange={(e: any) => handleChangeDeal(deal.id, "information", e.target.value)}
              />
              <DatePicker
                value={new Date()}
                onChange={(e: any) => handleChangeDeal(deal.id, "validUntil", e)}
                suffixIcon
                label="Valid until"
              />
              <Input
                label="Terms and Conditions"
                placeholder="A valid tribe listing pass must be presented upon payment to enjoy the offer."
                onChange={(e: any) => handleChangeDeal(deal.id, "termsConditions", e.target.value)}
              />
              {multiple && <AddDealButton />}
              <Break />
            </div>
          ))
        : multiple && (
            <div>
              <AddDealButton />
              <Break />
            </div>
          )}
      <div className="flex gap-5">
        <CancelButton />
        <Button text="Confirm" width={280} size="small" onClick={() => onSubmit(localDealList)} />
      </div>
    </React.Fragment>
  )
}

export default AddDeals
