import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import { useEffect } from "react";
import styles from "./TabsHorizontal.module.scss";

export interface ITab {
  className?: string;
  label: string;
  value: string | number;
  content?: ReactNode | ReactNode[];
  currentTab?: string | number;
  onSelectedTab?: (e: string | number) => void;
}

const TabNav = (props: ITab) => {
  const {
    className,
    label,
    value,
    currentTab,
    onSelectedTab = () => "",
  } = props;

  const selectedClassNames = classNames(styles.tab_nav, className, {
    [styles.selected]: currentTab === value,
  });

  const formatLabel = (value: string) => {
    return value.replace("-", " ");
  };

  return (
    <div className={selectedClassNames} onClick={() => onSelectedTab(value)}>
      <span className="capitalize">{formatLabel(label)}</span>
    </div>
  );
};

interface TabsHorizontalProps {
  className?: string;
  type?:
    | "secondary-no-outline"
    | "secondary-outline"
    | "primary-no-outline"
    | "primary-outline";
  tablist?: ITab[];
  selectedTab?: string | number;
  onCurrentTab?: (e) => void;
}

const TabsHorizontal = (props: TabsHorizontalProps) => {
  const {
    className = "",
    selectedTab,
    type = "secondary-no-outline",
    tablist = [],
    onCurrentTab = () => "",
  } = props;

  const [currentTab, setCurrentTab] = useState<string | number>(
    selectedTab || tablist[0]?.value
  );

  const getCurrentTabIndex = tablist.findIndex(
    (item) => item.value === currentTab
  );

  const typeClassName = classNames({
    [styles.secondary_outline]: type === "secondary-outline",
    [styles.secondary_no_outline]: type === "secondary-no-outline",
    [styles.primary_outline]: type === "primary-outline",
    [styles.primary_no_outline]: type === "primary-no-outline",
  });

  const handleSelectedTab = (e) => {
    setCurrentTab(e);
    onCurrentTab(e);
  };

  return (
    <React.Fragment>
      <div className={`${className} ${styles.tab_container}`}>
        {tablist?.map((tab: ITab) => {
          return (
            <TabNav
              className={typeClassName}
              key={tab.value}
              label={tab.label}
              value={tab.value}
              currentTab={currentTab}
              onSelectedTab={(e: string | number) => handleSelectedTab(e)}
            />
          );
        })}
      </div>

      <div className={styles.panel_container}>
        {tablist[getCurrentTabIndex]?.content}
      </div>
    </React.Fragment>
  );
};

export default TabsHorizontal;
