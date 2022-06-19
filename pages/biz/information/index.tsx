import { useState } from "react"

import BusinessInformation from "components/BizInformationPage/TabContentComponents/BusinessInformation"
import ManageDeals from "components/BizInformationPage/TabContentComponents/ManageDeals"
import ProductListing from "components/BizInformationPage/TabContentComponents/ProductListing"
import Icon from "components/Icon/Icon"
import Heading from "components/Heading/Heading"
import SectionLayout from "components/SectionLayout/SectionLayout"
import {
  bizInformationDefaultFormData,
  defaultAddlistingForm,
  fakeAddlistingForm,
  informationList,
} from "constant"
import { Categories, InformationList, Tiers } from "enums"

import styles from "styles/BizInformation.module.scss"
import BusinessDetail from "components/BizInformationPage/TabContentComponents/BusinessDetail"
import { IAddListingForm } from "pages/add-listing"
import TierTable from "components/TierTable/TierTable"

const BizInformation = () => {
  const [tier, setTier] = useState<Tiers>(Tiers.BASIC)
  const [formData, setFormData] = useState<any>(bizInformationDefaultFormData)
  const [selectedTab, setSelectedTab] = useState<string>(informationList[0].label)

  const submitFormData = (e) => {
    console.log(e)
  }
  const handleUpdateBusinessInformation = (e) => {
    console.log(e)
  }
  const handleUpdateProductList = (e) => {
    console.log(e)
  }

  const handleSelectTab = (tab) => {
    if (tier === Tiers.FREE && tab.paid) {
      return
    }
    setSelectedTab(tab.label)
  }

  const handleChangeTier = (isPayQuarterly: boolean) => {
    console.log("isPayQuarterly", isPayQuarterly)
  }

  const tabContent = () => {
    switch (selectedTab) {
      case InformationList.BUSINESS_INFORMATION:
        return (
          <BusinessInformation
            formData={formData}
            submitFormData={handleUpdateBusinessInformation}
          />
        )
      case InformationList.BUSINESS_DETAIL:
        return (
          <BusinessDetail
            category={Categories.SEE_AND_DO}
            formData={formData}
            submitFormData={submitFormData}
          />
        )
      case InformationList.PRODUCT_LISTING:
        return <ProductListing formData={formData} submitFormData={handleUpdateProductList} />
      case InformationList.PHOTOS_VIDEOS:
        return <div>photo</div>
      case InformationList.MANAGE_DEALS:
        return <ManageDeals formData={formData} submitFormData={submitFormData} />
      case InformationList.ANALYTICS:
        return <div>analytics</div>
      case InformationList.CHANGE_ACCOUNT_TIER:
        return (
          <TierTable isPayQuarterly={formData.isActive} onSetIsPayQuarterly={handleChangeTier} />
        )
      case InformationList.VERIFICATION:
        return <div>verify</div>
      case InformationList.LOGOUT:
        return <div>logout</div>
      default:
        return <div />
    }
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
        <div className={styles.right_col}>{tabContent()}</div>
      </div>
    </SectionLayout>
  )
}

export default BizInformation
