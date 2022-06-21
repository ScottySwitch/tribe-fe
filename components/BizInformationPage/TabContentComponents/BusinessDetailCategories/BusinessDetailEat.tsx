import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor"
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue"
import Badge from "components/Badge/Badge"
import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { fakeSubCateList } from "constant"
import { IAddListingForm } from "pages/add-listing"
import React, { useState } from "react"

interface BusinessDetailProps {
  formData: IAddListingForm
  submitFormData?: (form: IAddListingForm) => void
}

const BusinessDetailEat = (props: BusinessDetailProps) => {
  const { formData, submitFormData } = props
  const {
    categoryKind,
    tags,
    openHours,
    minPrice,
    maxPrice,
    currency,
    mealsKind,
    placeGoodFor,
    parking,
    atmosphere,
    payment,
    additionalServices,
  } = formData

  const [isEdit, setIsEdit] = useState(false)
  return (
    <React.Fragment>
      <SectionLayout title="Business detail" show={!isEdit} containerClassName="w-full px-[30px]">
        <Break />
        <Question question="What category best describes this place?" childrenClassName="flex">
          {categoryKind && <Badge>{categoryKind}</Badge>}
        </Question>
        <Question
          question="What cuisines would you use to describe this place?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {tags?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question question="What are the opening hours?" optional>
          <PreviewValue valueKey="openHours" value={openHours} />
        </Question>
        <Question question="What’s the average price range of a meal?">
          {currency && minPrice && maxPrice && `${currency}${minPrice} - ${currency}${maxPrice}`}
        </Question>
        <Question
          question="What kind of meals does this place serve?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {mealsKind?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question question="What is this place good for?" childrenClassName="flex flex-wrap gap-3">
          {placeGoodFor?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question
          question="What best describe this place’s atmosphere?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {atmosphere?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question question="Are there parking area?" childrenClassName="flex flex-wrap gap-3">
          {parking?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question
          question="What Features and amneties does this restaurant have?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {payment?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question question="Additional?" optional childrenClassName="flex flex-wrap gap-3">
          {additionalServices?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Break />
        <div>
          <Button
            size="small"
            text="Edit information"
            width={250}
            onClick={() => setIsEdit(true)}
          />
        </div>
      </SectionLayout>
      <AddEatInfor
        subCateList={fakeSubCateList}
        data={formData}
        show={isEdit}
        isEdit={true}
        onEdit={(data) => submitFormData?.(data)}
      />
    </React.Fragment>
  )
}

export default BusinessDetailEat
