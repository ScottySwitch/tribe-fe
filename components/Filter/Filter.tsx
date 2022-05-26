import classNames from "classnames";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalFooter, ModalProps } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Range from "components/Range/Range";
import { setValues } from "framer-motion/types/render/utils/setters";
import { ReactElement, useState } from "react";
import { Filters } from "./enums";
import styles from "./Filter.module.scss";

export interface FilterProps extends ModalProps {}

const tabList = [
  { label: "Sort", value: Filters.SORT },
  { label: "Rating", value: Filters.RATING },
  { label: "Price range", value: Filters.PRICE_RANGE },
  { label: "Other", value: Filters.OTHER },
  { label: "Location", value: Filters.LOCATION },
];

const sortList = [
  { label: "Price (Low to high)" },
  { label: "Price (High to low)" },
  { label: "Rating (Low to high)" },
  { label: "Recently added" },
];

const otherList = [
  { label: "Halal Certified" },
  { label: "Mulism Owned" },
  { label: "Halal Ingredients used" },
  { label: "Vegetarian" },
  { label: "Halal meals available on request" },
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
  <div className="flex flex-col gap-[20px]">
    <Input
      size="large"
      placeholder="Search"
      prefix={<Icon icon="search" size={25} />}
    />
    {otherList.map((opt) => (
      <Checkbox key={opt.label} label={opt.label} />
    ))}
  </div>
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

const Filter = (props: FilterProps) => {
  const { visible, onClose } = props;
  const [currentTab, setCurrentTab] = useState<string>(Filters.SORT);

  const renderPanel = () => {
    switch (currentTab) {
      case Filters.SORT:
        return <Sort />;
      case Filters.RATING:
        return <Rating />;
      case Filters.PRICE_RANGE:
        return <PriceRange />;
      case Filters.OTHER:
        return <Other />;
      case Filters.LOCATION:
        return <Location />;
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      closable
      title="Filter & Sort"
      width="670px"
    >
      <div className={styles.body}>
        <div className={styles.tab_container}>
          {tabList.map((tab) => {
            const tabClassNames = classNames(styles.tab, {
              [styles.selected]: currentTab === tab.value,
            });
            return (
              <div
                key={tab.label}
                className={tabClassNames}
                onClick={() => setCurrentTab(tab.value)}
              >
                <div className={styles.left_border} />
                <div className={styles.tab_content}>{tab.label}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.panel}>{renderPanel()}</div>
      </div>
      <ModalFooter className="flex justify-between">
        <div className={styles.reset_btn}>Reset all</div>
        <Button text="Apply" className={styles.apply_btn} />
      </ModalFooter>
    </Modal>
  );
};

export default Filter;
