import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import Popover from "components/Popover/Popover"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Table, { IColumn } from "components/Table/Table"
import { bizInformationDefaultFormData } from "constant"
import React, { useState } from "react"
import AddDeals from "./AddDeal/AddDeals"

import styles from "./TabContent.module.scss"

enum ManageDealsScreens {
  LIST = "list",
  ADD = "add",
  EDIT = "edit",
}

const ManageDeals = () => {
  const [formData, setFormData] = useState<any>(bizInformationDefaultFormData)
  const [selectedDeal, setSelectedDeal] = useState<any[]>([])
  const [screen, setScreen] = useState<ManageDealsScreens>(ManageDealsScreens.LIST)
  const { activeDeals, pastDeals } = formData

  const submitDeal = (e) => console.log(e)

  const handleDelete = (e) => {
    console.log(e)
  }

  const columns: IColumn[] = [
    {
      key: "name",
      title: "DEALS",
      render: (item: any) => (
        <div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.deal_information}>{item.information}</div>
        </div>
      ),
      width: "35%",
    },
    {
      key: "date",
      title: "DATE",
      render: (item: any) => item.date,
      width: "45%",
    },
    {
      key: "clicks",
      title: "CLICKS",
      render: (item: any) => <div className={styles.click}>{item.clicks}</div>,
      width: "10%",
      textAlign: "right",
    },
    {
      key: "action",
      title: "ACTIONS",
      render: (item: any) => <TableAction item={item} />,
      width: "10%",
    },
  ]

  const TableAction = (props) => {
    const { item } = props
    const content = (
      <React.Fragment>
        <div
          onClick={() => {
            setSelectedDeal([item])
            setScreen(ManageDealsScreens.EDIT)
          }}
        >
          Edit deal
        </div>
        <div className={styles.delete_action} onClick={() => handleDelete(item)}>
          Delete deal
        </div>
      </React.Fragment>
    )
    return (
      <div className="flex gap-1">
        <Icon icon="pin" />
        <Popover content={content} position="bottom-left">
          <Icon icon="toolbar" />
        </Popover>
      </div>
    )
  }

  return (
    <React.Fragment>
      <SectionLayout
        title="Manage deals"
        className={styles.manage_deals}
        containerClassName="w-full"
        show={screen === ManageDealsScreens.LIST}
      >
        <div className={styles.tips_button}>
          <div className={styles.tips}>
            <strong>Tips:</strong> Click the pin icon to put 5 products on the top.
          </div>
          <Button
            text="Create deal"
            width={200}
            onClick={() => {
              setSelectedDeal([{}])
              setScreen(ManageDealsScreens.ADD)
            }}
          />
        </div>
        <Question
          question={`Active deals (${Array.isArray(activeDeals) ? activeDeals.length : 0})`}
        >
          <Table columns={columns} data={activeDeals} />
        </Question>

        <Question question={`Past deals (${Array.isArray(pastDeals) ? pastDeals.length : 0})`}>
          <Table columns={columns} data={pastDeals} />
        </Question>
      </SectionLayout>
      <SectionLayout
        show={screen !== ManageDealsScreens.LIST}
        title={screen === ManageDealsScreens.EDIT ? "Edit deal" : "Add deal"}
      >
        <AddDeals
          isPaid={true}
          dealList={selectedDeal}
          onCancel={() => setScreen(ManageDealsScreens.LIST)}
          onSubmit={(e) => {
            setScreen(ManageDealsScreens.LIST)
            submitDeal(e)
          }}
        />
      </SectionLayout>
    </React.Fragment>
  )
}

export default ManageDeals
