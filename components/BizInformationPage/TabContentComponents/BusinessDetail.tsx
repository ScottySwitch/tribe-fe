import Break from "components/Break/Break"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { Categories } from "enums"
import { IAddListingForm } from "pages/add-listing"
import BusinessDetailEat from "./BusinessDetailCategories/BusinessDetailEat"
import styles from "./TabContent.module.scss"

interface BusinessDetailProps {
  category?: string
  formData: IAddListingForm
  submitFormData?: (form: IAddListingForm) => void
}

const BusinessDetail = (props: BusinessDetailProps) => {
  const { category, formData, submitFormData } = props

  const renderBusinessDetail = () => {
    let detail
    switch (category) {
      case Categories.BUY:
        detail = <div>Buy</div>
        break
      case Categories.EAT:
        detail = <BusinessDetailEat formData={formData} submitFormData={submitFormData} />
        break
      case Categories.SEE_AND_DO:
        detail = <div>See</div>
        break
      case Categories.TRANSPORT:
        detail = <div>Transport</div>
        break
      case Categories.STAY:
        detail = <div>Stay</div>
        break
      default:
        detail = <div></div>
        break
    }
    return detail
  }

  return renderBusinessDetail()
}

export default BusinessDetail
