import { useForm } from "react-hook-form"
import { useState } from "react"
import get from "lodash/get"

import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import Input from "components/Input/Input"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Modal from "components/Modal/Modal"

const associatedCategories = [
  { label: "Attractions & tickets" },
  { label: "Tours & must-sees" },
  { label: "Outdoors & sports" },
  { label: "Events & movies" },
  { label: "Water sports & activities" },
  { label: "Relaxation" },
  { label: "Fun & culture" },
]

const describes = [{ label: "Theme & water parks" }, { label: "Attraction passes" }]

const tags = [
  { label: "Family Friendly" },
  { label: "Pet Friendly" },
  { label: "Child Friendly" },
  { label: "Disability Friendly" },
]

interface AddSeeAndDoInforProps {
  data: { [key: string]: any }
  show?: boolean
  onPrevPage: () => void
  onSubmitFormData: (data: { [key: string]: any }) => void
}

const AddSeeAndDoInfor = (props: AddSeeAndDoInforProps) => {
  const { data, show, onPrevPage, onSubmitFormData } = props
  const [cuisineVisible, setCuisineVisible] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      categoryKind: data.categoryKind,
      tags: data.tags,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      mealsKind: data.mealsKind,
      placeGoodFor: data.placeGoodFor,
      parking: data.parking,
      atmosphere: data.atmosphere,
      payment: data.payment,
      additionalServices: data.additionalServices,
      agreePolicies: data.agreePolicies,
      currency: data.currency,
      openHours: data.openHours,
    },
  })

  const [categoryKind, setCategoryKind] = useState<string | undefined>(getValues("categoryKind"))

  const onSubmit = () => {
    setShowPreviewModal(true)
  }

  const handleSubmitFormData = () => {
    setShowPreviewModal(false)
    onSubmitFormData({ ...data, ...getValues() })
  }

  if (!show) {
    return null
  }
  return (
    <>
      <SectionLayout
        title="Add a thing to do"
        subTitle="After you complete this form, you'll be able to make changes before submitting."
      >
        <Question question="What is the category best associated with this service?">
          <div className="flex flex-wrap gap-2">
            {associatedCategories.map((opt) => (
              <Badge key={opt.label} text={opt.label} />
            ))}
          </div>
        </Question>
        <Question
          question="What category best describe this place?"
          instruction="Select 5 max"
          optional
        >
          <div className="flex flex-wrap gap-2">
            {describes.map((opt) => (
              <Badge key={opt.label} text={opt.label} />
            ))}
          </div>
          <br />
          <Button text="Edit property" width="fit-content" size="small" />
        </Question>
        <Question question="What are the opening hours?" optional>
          <Button text="Add open hour" width="fit-content" size="small" variant="secondary" />
        </Question>
        <Question question="What tags best describe this place? " optional>
          <div className="flex flex-wrap gap-y-5">
            {tags.map((item) => (
              <Checkbox key={item.label} label={item.label} className="w-1/2" />
            ))}
          </div>
        </Question>
        <Question question="What’s the average price range of this service?" optional>
          <Input placeholder="Select a currency" />
          <br />
          <div className="flex gap-10">
            <Input placeholder="Minimum price (optional)" className="w-1/2" />
            <Input placeholder="Maximum Price (optional)" className="w-1/2" />
          </div>
        </Question>
        <Question
          question="Do you have photos or videos to share?"
          sub_title="Add images/ videos ( up to 3 )"
          optional
        ></Question>
        <br />
        <br />
        <br />
        <Checkbox label="Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image" />
        <br />
        <br />
        <br />
      </SectionLayout>
      <Modal
        visible={showPreviewModal}
        title="Does everything look correct?"
        subTitle="Please review this information before submiting!"
        width={780}
        mobileFullHeight
        onClose={() => setShowPreviewModal(false)}
      >
        <div className="px-[30px] gap-6 flex flex-col">
          {previewInfo.map((row) => (
            <div key={row.question} className="flex gap-20">
              <div className="flex flex-wrap w-3/5">{row.question}</div>
              <div className="w-2/5">{get({ ...data, ...getValues() }, row.value) || ""}</div>
            </div>
          ))}
          <div className="flex justify-end px-[30px] py-3">
            <Button
              text="Cancel"
              size="small"
              variant="underlined"
              width="fit-content"
              onClick={() => setShowPreviewModal(false)}
            />
            <Button text="Continue" size="small" width={270} onClick={handleSubmitFormData} />
          </div>
        </div>
      </Modal>
    </>
  )
}

const previewInfo = [
  { question: "What kind of place is this?", value: "" },
  {
    question:
      "Are you affiliated with this place as an owner, employee, or official representative?",
    value: "relationship",
  },
  {
    question: "Does this place already have a listing on Tribes?",
    value: "listing",
  },
  { question: "What is your role at this business?", value: "role.label" },
  { question: "Is this place currently open?", value: "isOpen" },
  { question: "Official place name", value: "businessName" },
  { question: "Description of your property:", value: "description" },
  { question: "City/Town, State/Province/Region", value: "city" },
  { question: "Country", value: "country" },
  { question: "Street address ", value: "address" },
  { question: "Additional address information", value: "additionalAddress" },
  { question: "Social Media", value: "socialMedia" },
  { question: "What is the category that best fits this place?", value: "" },
  { question: "What type of cuisine does this place serve?", value: "" },
  { question: "Open hours", value: "openHours" },
  { question: "Select a currency", value: "currency" },
  { question: "Max price", value: "maxPrice" },
  { question: "Min price", value: "minPrice" },
]

export default AddSeeAndDoInfor
