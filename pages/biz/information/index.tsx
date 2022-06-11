import TabContentContainer from "components/BizInformationPage/TabContentContainer/TabContentContainer"
import Icon from "components/Icon/Icon"
import Heading from "components/ListingHomePage/Heading/Heading"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { informationList } from "constant"
import { Tiers } from "enums"
import { useState } from "react"
import styles from "styles/BizInformation.module.scss"

const defaultFormValue = {
  address: "50 Bussorah St, Singapore 199466",
  phone: "+84 823996913",
}
const BizInformation = () => {
  const [tier, setTier] = useState<Tiers>(Tiers.FREE)
  const [formValue, setFormValue] = useState(defaultFormValue)
  const [selectedTab, setSelectedTab] = useState<string>(informationList[0].label)

  const submitFormValue = (e) => {
    console.log(e)
  }

  const handleSelectTab = (tab) => {
    if (tier === Tiers.FREE && tab.paid) {
      return
    }
    setSelectedTab(tab.label)
  }

  return (
    <SectionLayout backgroundColor>
      <div className={styles.biz_information}>
        <div className={styles.left_col}>
          <div className={styles.left_col_top}>
            <div className={styles.progress_bar} />
            <div>60% to complete your profile!</div>
          </div>
          <div className={styles.left_col_bottom}>
            {informationList.map((item) => (
              <div className="flex gap-3 justify-between" key={item.label}>
                <Heading
                  icon={item.icon}
                  type="tab"
                  text={item.label}
                  selected={selectedTab === item.label}
                  onClick={() => handleSelectTab(item)}
                />
                {tier === Tiers.FREE && item.paid && <Icon icon="red-star" />}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right_col}>
          <TabContentContainer
            formValue={formValue}
            selectedTab={selectedTab}
            submitFormValue={submitFormValue}
          />
        </div>
      </div>
    </SectionLayout>
  )
}

export default BizInformation
