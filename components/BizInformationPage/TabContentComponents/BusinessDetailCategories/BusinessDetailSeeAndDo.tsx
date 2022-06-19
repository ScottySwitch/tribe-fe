import AddBuyInfor from "components/AddListingPages/PageThree/AddInforSections/AddBuyInfor"
import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor"
import AddSeeAndDoInfor from "components/AddListingPages/PageThree/AddInforSections/AddSeeAndDoInfor"
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

const BusinessDetailSeeAndDo = (props: BusinessDetailProps) => {
  const { formData, submitFormData } = props
  const { categoryKind, tags, describePlace, openHours, minPrice, maxPrice, currency } = formData

  const [isEdit, setIsEdit] = useState(false)
  return (
    <React.Fragment>
      <SectionLayout title="Business detail" show={!isEdit}>
        <Break />
        <Question
          question="What is the category best associated with this store?"
          childrenClassName="flex"
        >
          <Badge>{categoryKind}</Badge>
        </Question>
        <Question
          question="What type of products does this store offer?"
          childrenClassName="flex flex-wrap gap-3"
        >
          {tags?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question question="What are the opening hours?" optional>
          <PreviewValue valueKey="openHours" value={openHours} />
        </Question>
        <Question question="What tags best describe this place?" optional>
          {describePlace?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </Question>
        <Question question="What’s the average price range of a meal?">
          {`${currency}${minPrice} - ${currency}${maxPrice}`}
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
      <AddSeeAndDoInfor
        subCateList={fakeSubCateList}
        data={formData}
        show={isEdit}
        isEdit={true}
        onEdit={(data) => submitFormData?.(data)}
      />
    </React.Fragment>
  )
}

export default BusinessDetailSeeAndDo
