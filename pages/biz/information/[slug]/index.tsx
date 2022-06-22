import { useEffect, useState } from "react"

import BusinessInformation from "components/BizInformationPage/TabContentComponents/BusinessInformation"
import ManageDeals from "components/BizInformationPage/TabContentComponents/ManageDeals"
import ProductListing from "components/BizInformationPage/TabContentComponents/ProductListing"
import Icon from "components/Icon/Icon"
import Heading from "components/Heading/Heading"
import SectionLayout from "components/SectionLayout/SectionLayout"
import {
  bizInformationDefaultFormData,
  loginInforItem,
  user,
  userId,
  token,
  paidInformationList,
  freeInformationList,
} from "constant"
import { Categories, InformationList, Tiers } from "enums"

import styles from "styles/BizInformation.module.scss"
import BusinessDetail from "components/BizInformationPage/TabContentComponents/BusinessDetail"
import TierTable from "components/TierTable/TierTable"
import Verification from "components/BizInformationPage/TabContentComponents/Verification"
import PhotosVideos from "components/BizInformationPage/TabContentComponents/PhotosVideos"

const BizInformation = () => {
  const [isPaid, setIsPaid] = useState(true)
  const informationList = isPaid ? paidInformationList : freeInformationList

  const [formData, setFormData] = useState<any>(bizInformationDefaultFormData)
  const [selectedTab, setSelectedTab] = useState<string>(informationList[0].label)

  const tabContent = () => {
    switch (selectedTab) {
      case InformationList.BUSINESS_INFORMATION:
        return <BusinessInformation isPaid={isPaid} />
      case InformationList.BUSINESS_DETAIL:
        return <BusinessDetail isPaid={isPaid} />
      case InformationList.PRODUCT_LISTING:
        return <ProductListing isPaid={isPaid} />
      case InformationList.PHOTOS_VIDEOS:
        return <PhotosVideos isPaid={isPaid} />
      case InformationList.MANAGE_DEALS:
        return <ManageDeals />
      case InformationList.ANALYTICS:
        return (
          <SectionLayout title="Analytics" className="px-[30px]" containerClassName="w-full">
            <div />
          </SectionLayout>
        )
      case InformationList.CHANGE_ACCOUNT_TIER:
        return <TierTable isPaid={isPaid} />
      case InformationList.VERIFICATION:
        return <Verification isPaid={isPaid} />

      default:
        return <div />
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(loginInforItem)
    localStorage.removeItem(user)
    localStorage.removeItem(userId)
    localStorage.removeItem(token)
    window.location.href = "/"
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
              <div
                className="flex gap-3 justify-between"
                key={item.label}
                onClick={() => setSelectedTab(item.label)}
              >
                <Heading
                  icon={item.icon}
                  type="tab"
                  text={item.label}
                  selected={selectedTab === item.label}
                />
                {item.star && <Icon icon="star-2" color="#653fff" />}
              </div>
            ))}
            <div className="flex gap-3 justify-between" onClick={handleLogout}>
              <Heading icon="logout" type="tab" text="Log out" selected={false} />
            </div>
          </div>
        </div>
        <div className={styles.right_col}>{tabContent()}</div>
      </div>
    </SectionLayout>
  )
}

export default BizInformation
