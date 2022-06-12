import { Categories } from "enums"
import { IAddListingForm } from "pages/add-listing"
import { useForm } from "react-hook-form"
import AddBuyInfor from "./AddInforSections/AddBuyInfor"
import AddEatInfor from "./AddInforSections/AddEatInfor"
import AddSeeAndDoInfor from "./AddInforSections/AddSeeAndDoInfor"
import AddStayInfor from "./AddInforSections/AddStayInfor"
import AddTransportInfor from "./AddInforSections/AddTransportInfor"

interface AddListingPageThreeProps {
  onPrevPage: () => void
  onNextPage: () => void
  onUpdateFormData: (data: { [key: string]: any }) => void
  onSubmitFormData: (data: { [key: string]: any }) => void
  show: boolean
  data: IAddListingForm
}

const AddListingPageThree = (props: AddListingPageThreeProps) => {
  const { data, show, onPrevPage, onNextPage, onUpdateFormData, onSubmitFormData } = props

  if (!show) {
    return null
  }

  const AddInfor = () => {
    switch (data.category) {
      case Categories.EAT:
        return (
          <AddEatInfor
            data={data}
            onPrevPage={onPrevPage}
            onUpdateFormData={onUpdateFormData}
            onSubmitFormData={onSubmitFormData}
          />
        )
      // case Categories.STAY:
      //   return (
      //     <AddStayInfor
      //       data={data}
      //       onUpdateForm={onUpdateForm}
      //       onPrevPage={onPrevPage}
      //       onNextPage={onNextPage}
      //     />
      //   );
      // case Categories.SEE:
      //   return (
      //     <AddSeeAndDoInfor
      //       data={data}
      //       onUpdateForm={onUpdateForm}
      //       onPrevPage={onPrevPage}
      //       onNextPage={onNextPage}
      //     />
      //   );
      // case Categories.BUY:
      //   return (
      //     <AddBuyInfor
      //       data={data}
      //       onUpdateForm={onUpdateForm}
      //       onPrevPage={onPrevPage}
      //       onNextPage={onNextPage}
      //     />
      //   );
      // case Categories.TRANSPORT:
      //   return (
      //     <AddTransportInfor
      //       data={data}
      //       onUpdateForm={onUpdateForm}
      //       onPrevPage={onPrevPage}
      //       onNextPage={onNextPage}
      //     />
      //   );
      default:
        return null
    }
  }
  return (
    <>
      <AddInfor />
    </>
  )
}

export default AddListingPageThree
