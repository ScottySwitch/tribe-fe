import { ReactElement, ReactNode, useState } from "react";

import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalFooter, ModalProps } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Range from "components/Range/Range";
import Tabs from "components/Tabs/Tabs";
import { Filters } from "./enums";
import styles from "./Filter.module.scss";

const sortList = [
  { label: "Price (Low to high)" },
  { label: "Price (High to low)" },
  { label: "Rating (Low to high)" },
  { label: "Recently added" },
];

export const otherList = [
  { label: "Halal Certified" },
  { label: "Kosher options available" },
  { label: "Halal Ingredients Used" },
  { label: "Halal Certified" },
  { label: "Mulism Owned" },
  { label: "Seafood options available " },
  { label: "Vegetarian" },
  { label: "Alcohol served in premise" },
  { label: "Vegetarian options available" },
];

const Sort = () => (
  <>
    {sortList.map((sort) => (
      <Radio key={sort.label} label={sort.label} name="sort" />
    ))}
  </>
);

const Rating = () => <div>Rating</div>;

const PriceRange = () => {
  const [rangeValues, setRangeValues] = useState<any>({ min: 0, max: 0 });
  return (
    <div>
      <div className="flex">
        <div>${rangeValues?.min}</div>
        &nbsp;-&nbsp;
        <div>${rangeValues?.max}</div>
      </div>
      <div className="flex flex-start mt-5">
        <Range min={0} max={2000} onChange={(value) => setRangeValues(value)} />
      </div>
    </div>
  );
};

const Other = () => (
  <>
    <Input
      size="large"
      placeholder="Search"
      prefix={<Icon icon="search" size={25} />}
    />
    <div className={styles.option_container}>
      {otherList.map((opt) => (
        <Checkbox key={opt.label} label={opt.label} />
      ))}
    </div>
  </>
);

const Location = () => (
  <div>
    <Input
      size="large"
      placeholder="Search"
      prefix={<Icon icon="search" size={20} />}
    />
  </div>
);

const tabList = [
  { label: "Sort", value: Filters.SORT, content: <Sort /> },
  { label: "Rating", value: Filters.RATING, content: <Rating /> },
  { label: "Price range", value: Filters.PRICE_RANGE, content: <PriceRange /> },
  { label: "Other", value: Filters.OTHER, content: <Other /> },
  { label: "Location", value: Filters.LOCATION, content: <Location /> },
];

export interface FilterProps extends ModalProps {}

const Filter = (props: FilterProps) => {
  const { visible, onClose } = props;

  return (
    <Modal
      width="700px"
      visible={visible}
      onClose={onClose}
      title="Filter & Sort"
    >
      <Tabs tabList={tabList} />
      <div className="flex justify-between p-[10px]">
        <div className={styles.reset_btn}>Reset all</div>
        <Button text="Apply" className={styles.apply_btn} />
      </div>
    </Modal>
  );
};

export default Filter;
