import classNames from "classnames";
import { ReactNode, useState } from "react";
import styles from "./Tabs.module.scss";

const TabPane = (props: {
  label: string;
  value: string;
  currentTab: string;
  setCurrentTab: (e: string) => void;
}) => {
  const { label, value, currentTab, setCurrentTab } = props;
  const tabClassNames = classNames(styles.tab_label, {
    [styles.selected]: currentTab === value,
  });
  return (
    <div
      key={label}
      className={tabClassNames}
      onClick={() => setCurrentTab(value)}
    >
      <div className={styles.left_border} />
      <div className={styles.tab_label_content}>{label}</div>
    </div>
  );
};

const Tabs = (props: {
  tabList: {
    label: string;
    value: string;
    content?: ReactNode | ReactNode[];
  }[];
}) => {
  const { tabList } = props;
  const [currentTab, setCurrentTab] = useState<string>(tabList[0].value);
  const getCurrentTabIndex = tabList.findIndex(
    (item) => item.value === currentTab
  );
  return (
    <div className={styles.tabs}>
      <div className={styles.tab_label_container}>
        {tabList.map((tab) => {
          return (
            <TabPane
              key={tab.label}
              label={tab.label}
              value={tab.value}
              currentTab={currentTab}
              setCurrentTab={(e) => setCurrentTab(e)}
            />
          );
        })}
      </div>
      <div className={styles.panel}>{tabList[getCurrentTabIndex].content}</div>
    </div>
  );
};

export default Tabs;
