import Break from "components/Break/Break"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { Categories } from "enums"
import { IAddListingForm } from "pages/add-listing"
import BusinessDetailBuy from "./BusinessDetailCategories/BusinessDetailBuy"
import BusinessDetailEat from "./BusinessDetailCategories/BusinessDetailEat"
import BusinessDetailSeeAndDo from "./BusinessDetailCategories/BusinessDetailSeeAndDo"
import BusinessDetailTransport from "./BusinessDetailCategories/BusinessDetailTransport"
import BusinessDetailStay from "./BusinessDetailCategories/BusinessDetailStay"

interface BusinessDetailProps {
  category?: any
  formData: IAddListingForm
  submitFormData?: (form: IAddListingForm) => void
}

const BusinessDetail = (props: BusinessDetailProps) => {
  const { category, formData, submitFormData } = props

  const renderBusinessDetail = () => {
    let detail
    switch (category) {
      case Categories.BUY:
        detail = <BusinessDetailBuy formData={formData} submitFormData={submitFormData} />
        break
      case Categories.EAT:
        detail = <BusinessDetailEat formData={formData} submitFormData={submitFormData} />
        break
      case Categories.SEE_AND_DO:
        detail = <BusinessDetailSeeAndDo formData={formData} submitFormData={submitFormData} />
        break
      case Categories.TRANSPORT:
        detail = <BusinessDetailTransport formData={formData} submitFormData={submitFormData} />
        break
      case Categories.STAY:
        detail = <BusinessDetailStay formData={formData} submitFormData={submitFormData} />
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
