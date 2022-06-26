import classNames from "classnames"
import React, { ReactNode, useState } from "react"
import { useEffect } from "react"
import styles from "./TabsHorizontal.module.scss"

export interface ITab {
  className?: string
  label: string
  value: string
  content?: ReactNode | ReactNode[]
  currentTab?: string
  onSelected?: (e: string) => void
}

const TabNav = (props: ITab) => {
  const {
    className,
    label,
    value,
    currentTab,
    onSelected = () => "",
  } = props

  const selectedClassNames = classNames(styles.tab_nav, className, {
    [styles.selected]: currentTab === value,
  });

  const formatLabel = (value: string) => {
    return value.replace("-", " ")
  }
 
  return (
    <div
      className={selectedClassNames}
      onClick={() => onSelected(value)}
    >
      <span className="capitalize">{formatLabel(label)}</span>
    </div>
  )
}

interface TabsHorizontalProps {
  className?: string
  type?: "secondary-no-outline" | "secondary-outline" | "primary-no-outline" | "primary-outline"
  tablist?: ITab[]
}

const TabsHorizontal = (props: TabsHorizontalProps) => {
  const {
    className = "",
    type = "secondary-no-outline",
    tablist = [],
  } = props
  
  const [currentTab, setCurrentTab] = useState<string>(tablist[0]?.value);
  
  const getCurrentTabIndex = tablist.findIndex(
    (item) => item.value === currentTab
    );
    
  const typeClassName = classNames({
    [styles.secondary_outline]: type === "secondary-outline",
    [styles.secondary_no_outline]: type === "secondary-no-outline",
    [styles.primary_outline]: type === "primary-outline",
    [styles.primary_no_outline]: type === "primary-no-outline",
  })


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
              onSelected={(e: string) => setCurrentTab(e)
              }
            />
          )
        })}
      </div>

      <div className={styles.panel_container}>{tablist[getCurrentTabIndex]?.content}</div>
    </React.Fragment>
  )
}

export default TabsHorizontal