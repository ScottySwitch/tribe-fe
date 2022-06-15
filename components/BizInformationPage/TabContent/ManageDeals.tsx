import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import Popover from "components/Popover/Popover"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Table, { IColumn } from "components/Table/Table"
import React, { useState } from "react"
import AddDeals from "./AddDeal/AddDeals"

import styles from "./TabContent.module.scss"

interface ManageDealsProps {
  submitFormValue?: (form: { [key: string]: any }[]) => void
  formValue?: { [key: string]: any }
}

const ManageDeals = (props: ManageDealsProps) => {
  const { formValue = {}, submitFormValue } = props
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([{}])
  const [isEdit, setIsEdit] = useState(false)

  const columns: IColumn[] = [
    {
      key: "name",
      title: "DEALS",
      render: (item: any) => (
        <div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.description}>{item.description}</div>
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
        <div onClick={() => console.log(item.name)}>Edit deal</div>
        <div className={styles.delete_action} onClick={() => console.log(item.name)}>
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
        show={!isEdit}
      >
        <div className={styles.tips_button}>
          <div className={styles.tips}>
            <strong>Tips:</strong> Click the pin icon to put 5 products on the top.
          </div>
          <Button text="Create deal" width={200} onClick={() => setIsEdit(true)} />
        </div>
        <Question
          question={`Active deals (${
            Array.isArray(formValue.activeDeals) ? formValue.activeDeals.length : 0
          })`}
        >
          <Table columns={columns} data={formValue.activeDeals} />
        </Question>

        <Question
          question={`Past deals (${
            Array.isArray(formValue.pastDeals) ? formValue.pastDeals.length : 0
          })`}
        >
          <Table columns={columns} data={formValue.pastDeals} />
        </Question>
      </SectionLayout>
      <SectionLayout show={isEdit} title="Add deals">
        <AddDeals
          onSetDealList={(dealList) => setDealList(dealList)}
          dealList={dealList}
          onSetScreen={() => setIsEdit(false)}
        />
      </SectionLayout>
    </React.Fragment>
  )
}

export default ManageDeals
