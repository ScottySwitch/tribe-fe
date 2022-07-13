import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Popover from "components/Popover/Popover";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Table, { IColumn } from "components/Table/Table";
import { bizInformationDefaultFormData } from "constant";
import React, { useEffect, useState } from "react";
import AddDeals from "./AddDeal/AddDeals";
import get from "lodash/get";

import styles from "./TabContent.module.scss";
import DealApi from "services/deal";
import Modal, { ModalFooter } from "../../Modal/Modal";

interface ManageDealProps {
  bizListingId?: number | string;
}

enum ManageDealsScreens {
  LIST = "list",
  ADD = "add",
  EDIT = "edit",
}

const ManageDeals = (props: ManageDealProps) => {
  const { bizListingId } = props;

  const [formData, setFormData] = useState<any>(bizInformationDefaultFormData);
  const [selectedDeal, setSelectedDeal] = useState<any[]>([]);
  const [screen, setScreen] = useState<ManageDealsScreens>(
    ManageDealsScreens.LIST
  );
  const { activeDeals, pastDeals } = formData;
  const [activeDealList, setActiveDealList] = useState<any>();
  const [pastDealList, setPastDealList] = useState<any>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteModalDealId, setDeleteModalDealId] = useState<number>(0);

  const getDealsByBizListingId = async (
    bizListingId: number | string | undefined
  ) => {
    const result = await DealApi.getDealsByBizListingId(
      bizListingId,
      "is_pinned:desc"
    );
    const currentDate = new Date();
    const activeDeals: any = [];
    const pastDeals: any = [];
    const dealList = get(result, "data.data");
    Array.isArray(dealList) &&
      dealList.forEach((deal: any) => {
        const startDate = new Date(get(deal, "attributes.start_date"));
        const endDate = new Date(get(deal, "attributes.end_date"));
        if (startDate <= currentDate && currentDate <= endDate) {
          activeDeals.push(deal);
        } else {
          pastDeals.push(deal);
        }
      });
    setActiveDealList(activeDeals);
    setPastDealList(pastDeals);
  };

  useEffect(() => {
    getDealsByBizListingId(bizListingId);
  }, [bizListingId]);

  const submitDeal = async (e) => {
    console.log(e)
    if (e[0].isEdited) {
      const dataSend = { ...e[0] };
      await DealApi.updateDeal(e[0]?.id, dataSend);
    } else {
      const newDeal = e[0];
      const dataSend = {
        biz_listing: bizListingId,
        start_date: new Date(),
        end_date: newDeal.validUntil || new Date(),
        ...newDeal,
      };
      await DealApi.createDeal(dataSend).then((result) => {
        getDealsByBizListingId(bizListingId);
      });
    }
  };

  const handleDelete = async () => {
    const newDealList =
      Array.isArray(activeDealList) &&
      activeDealList.filter((deal) => {
        return deal.id !== deleteModalDealId;
      });
    await DealApi.deleteDeal(deleteModalDealId);
    setActiveDealList(newDealList);
    setIsShowDeleteModal(false);
  };

  const handlePinToTop = async (e) => {
    await DealApi.updateDeal(e.id, {
      is_pinned: get(e, "attributes.is_pinned"),
    });
    await getDealsByBizListingId(bizListingId);
  };

  const activeDealColumns: IColumn[] = [
    {
      key: "name",
      title: "DEALS",
      render: (item: any) => (
        <div>
          <div className={styles.name}>{get(item, "attributes.name")}</div>
          <div className={styles.deal_information}>
            {get(item, "attributes.description")}
          </div>
        </div>
      ),
      width: "35%",
    },
    {
      key: "date",
      title: "DATE",
      render: (item: any) =>
        `${get(item, "attributes.start_date")} - ${get(
          item,
          "attributes.end_date"
        )}`,
      width: "45%",
    },
    {
      key: "clicks",
      title: "CLICKS",
      render: (item: any) => (
        <div className={styles.click}>
          {get(item, "attributes.click_counts") || 0}
        </div>
      ),
      width: "10%",
      textAlign: "right",
    },
    {
      key: "action",
      title: "ACTIONS",
      render: (item: any) => <TableAction item={item} />,
      width: "10%",
    },
  ];

  const pastDealColumns: IColumn[] = [
    {
      key: "name",
      title: "DEALS",
      render: (item: any) => (
        <div>
          <div className={styles.name}>{get(item, "attributes.name")}</div>
          <div className={styles.deal_information}>
            {get(item, "attributes.description")}
          </div>
        </div>
      ),
      width: "35%",
    },
    {
      key: "date",
      title: "DATE",
      render: () => <span className="text-gray-500">Ended</span>,
      width: "45%",
    },
    {
      key: "clicks",
      title: "CLICKS",
      render: (item: any) => (
        <div className={styles.click}>
          {get(item, "attributes.click_counts") || 0}
        </div>
      ),
      width: "10%",
      textAlign: "right",
    },
  ];

  const TableAction = (props) => {
    const { item } = props;
    const content = (
      <React.Fragment>
        <div
          onClick={() => {
            setSelectedDeal([item]);
            setScreen(ManageDealsScreens.EDIT);
          }}
        >
          Edit deal
        </div>
        <div
          className={styles.delete_action}
          onClick={() => {
            setDeleteModalDealId(item.id);
            setIsShowDeleteModal(true);
          }}
        >
          Delete deal
        </div>
      </React.Fragment>
    );
    return (
      <div className="flex gap-1">
        <div className={styles.pin} onClick={() => handlePinToTop(item)}>
          <Icon
            icon="pin"
            color={get(item, "attributes.is_pinned") ? undefined : "gray"}
          />
        </div>
        <Popover content={content} position="bottom-left">
          <Icon icon="toolbar" />
        </Popover>
      </div>
    );
  };

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
            <strong>Tips:</strong> Click the pin icon to put 5 deals on the top.
          </div>
          <Button
            text="Create deal"
            width={200}
            onClick={() => {
              setSelectedDeal([{}]);
              setScreen(ManageDealsScreens.ADD);
            }}
          />
        </div>
        <Question
          question={`Active deals (${
            Array.isArray(activeDealList) ? activeDealList.length : 0
          })`}
        >
          <Table columns={activeDealColumns} data={activeDealList} />
        </Question>

        <Question
          question={`Past deals (${
            Array.isArray(pastDealList) ? pastDealList.length : 0
          })`}
        >
          <Table columns={pastDealColumns} data={pastDealList} />
        </Question>
      </SectionLayout>
      <SectionLayout
        show={screen !== ManageDealsScreens.LIST}
        title={screen === ManageDealsScreens.EDIT ? "Edit deal" : "Add deal"}
      >
        <AddDeals
          isEdit={screen === ManageDealsScreens.EDIT}
          isPaid={true}
          dealList={selectedDeal}
          onCancel={() => setScreen(ManageDealsScreens.LIST)}
          onSubmit={(e) => {
            setScreen(ManageDealsScreens.LIST);
            submitDeal(e);
          }}
        />
      </SectionLayout>
      <DeleteModal
        visible={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onSubmit={handleDelete}
      />
    </React.Fragment>
  );
};

const DeleteModal = (props) => {
  const { visible, onClose, onSubmit } = props;
  return (
    <Modal visible={visible} width={579} title="Delete deal?" onClose={onClose}>
      <div className="p-7">
        <div className="text-sm max-w-sm mx-auto text-center mb-7">
          <p>You are about to delete this deal.</p>
          <p>
            This action <span className="font-bold">cannot</span> be undone. Are
            you sure?
          </p>
        </div>
        <ModalFooter>
          <Button
            className="text-sm bg-transparent text-black border mr-2"
            text="Do not delete"
            onClick={onClose}
          />
          <Button className="text-sm" text="Delete" onClick={onSubmit} />
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default ManageDeals;
