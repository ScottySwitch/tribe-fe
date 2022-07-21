import { ReactElement, ReactNode, useContext, useState } from "react";

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
import { UserInforContext } from "Context/UserInforContext";
import { locations } from "constant";
import { isArray } from "lodash";

const sortList = [
  // { label: "Price (Low to high)" },
  // { label: "Price (High to low)" },
  { label: "Rating (High to low)" },
  { label: "Rating (Low to high)" },
  // { label: "Recently added" },
];

export const otherList = [
  { label: "Halal Certified" },
  { label: "Kosher options available" },
  { label: "Halal Ingredients Used" },
  { label: "Mulism Owned" },
  { label: "Seafood options available " },
  { label: "Vegetarian" },
  { label: "Alcohol served in premise" },
  { label: "Vegetarian options available" },
];

const Sort = () => (
  <div className="flex flex-col gap-2">
    {sortList.map((sort) => (
      <Radio key={sort.label} label={sort.label} name="sort" />
    ))}
  </div>
);

const Rating = () => <div>Rating</div>;

const PriceRange = () => {
  const [rangeValues, setRangeValues] = useState<any>({ min: 0, max: 0 });
  const { user } = useContext(UserInforContext);
  const { location } = user;

  const country =
    locations.find((item) => item.value === location) || locations[0];

  return (
    <div>
      <div className="flex">
        <div>{`${country.currency} ${rangeValues?.min}`}</div>
        &nbsp;-&nbsp;
        <div>{`${country.currency} ${rangeValues?.max}`}</div>
      </div>
      <div className="flex flex-start mt-5">
        <Range
          min={0}
          max={country.max}
          onChange={(value) => setRangeValues(value)}
        />
      </div>
    </div>
  );
};

const Other = ({ productTypes }: { productTypes?: any[] }) => (
  <>
    <Input
      size="large"
      placeholder="Search"
      prefix={<Icon icon="search" size={25} />}
    />
    <div className={styles.option_container}>
      {isArray(productTypes) &&
        productTypes.map((opt) => (
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

export interface FilterProps extends ModalProps {
  otherList?: any[];
}

const Filter = (props: FilterProps) => {
  const { visible, otherList, onClose } = props;

  const tabList = [
    { label: "Sort", value: Filters.SORT, content: <Sort /> },
    { label: "Rating", value: Filters.RATING, content: <Rating /> },
    {
      label: "Price range",
      value: Filters.PRICE_RANGE,
      content: <PriceRange />,
    },
    {
      label: "Other",
      value: Filters.OTHER,
      content: <Other productTypes={otherList} />,
    },
    // { label: "Location", value: Filters.LOCATION, content: <Location /> },
  ];

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
