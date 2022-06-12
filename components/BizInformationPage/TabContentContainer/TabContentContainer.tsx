import { InformationList } from "enums"
import BusinessInformation from "../TabContent/BusinessInformation"
import ProductListing from "../TabContent/ProductListing"
import styles from "./TabContent.module.scss"

interface TabContentContainerProps {
  selectedTab?: string
  submitFormValue?: (form: { [key: string]: any }) => void
  formValue?: { [key: string]: any }
}

const TabContent = ({ selectedTab, submitFormValue, formValue }: any) => {
  console.log("selectedTab", selectedTab)
  switch (selectedTab) {
    case InformationList.BUSINESS_INFORMATION:
      return <BusinessInformation formValue={formValue} submitFormValue={submitFormValue} />
    case InformationList.BUSINESS_DETAIL:
      return <div>detail</div>
    case InformationList.PRODUCT_LISTING:
      return <ProductListing formValue={formValue} submitFormValue={submitFormValue} />
    case InformationList.PHOTOS_VIDEOS:
      return <div>photo</div>
    case InformationList.MANAGE_DEALS:
      return <div>deal</div>
    case InformationList.ANALYTICS:
      return <div>analytics</div>
    case InformationList.CHANGE_ACCOUNT_TIER:
      return <div>tier</div>
    case InformationList.VERIFICATION:
      return <div>verify</div>
    case InformationList.LOGOUT:
      return <div>logout</div>
    default:
      return <div />
  }
}

const TabContentContainer = (props: TabContentContainerProps) => {
  const { selectedTab, formValue, submitFormValue } = props
  return (
    <TabContent selectedTab={selectedTab} formValue={formValue} submitFormValue={submitFormValue} />
  )
}

export default TabContentContainer
