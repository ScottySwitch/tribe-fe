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
import Break from "components/Break/Break"

const associatedCategories = [
  { label: "Trains" },
  { label: "Car rentals" },
  { label: "Buses and ferries" },
  { label: "Private transport" },
  { label: "Public transport" },
  { label: "Scooter and motorbike rentals" },
  { label: "Airport transfer" },
]

const areas = [{ label: "Private airport transfer" }, { label: "Airport trains & buses" }]

interface AddTransportInforProps {
  data: { [key: string]: any }
  show?: boolean
  onPrevPage: () => void
  onPreview: (data: { [key: string]: any }) => void
}

const AddTransportInfor = (props: AddTransportInforProps) => {
  const { data, show, onPrevPage, onPreview } = props

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      categoryKind: data.categoryKind,
      tags: data.tags,
      currency: data.currency,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      agreePolicies: data.agreePolicies,
    },
  })

  const [categoryKind, setCategoryKind] = useState<string | undefined>(getValues("categoryKind"))

  const onSubmit = (data) => {
    onPreview(data)
  }

  if (!show) {
    return null
  }
  return (
    <>
      <SectionLayout
        title="Add a mean of transport"
        subTitle="After you complete this form, you will be able to make changes before submitting."
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question question="What is the category best associated with this service?">
            <div className="flex flex-wrap gap-2">
              {associatedCategories.map((opt) => (
                <Badge
                  key={opt.label}
                  text={opt.label}
                  selected={categoryKind === opt.label}
                  onClick={() => {
                    setValue("categoryKind", opt.label)
                    setCategoryKind(opt.label)
                  }}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What areas best associated with this service?"
            instruction="Select 5 max"
            optional
          >
            <div className="flex flex-wrap gap-2">
              {areas.map((opt) => (
                <Badge key={opt.label} text={opt.label} />
              ))}
            </div>
            <br />
            <Button text="Edit cruisines" width="fit-content" size="small" />
          </Question>
          <Question question="What are the opening hours?" optional>
            <Button text="Add open hour" width="fit-content" size="small" variant="secondary" />
          </Question>
          <Question question="What’s the average price range of this service?" optional>
            <Input placeholder="Select a currency" register={register("currency")} />
            <br />
            <div className="flex gap-10">
              <Input
                placeholder="Minimum price (optional)"
                className="w-full sm:w-1/2"
                register={register("minPrice")}
              />
              <Input
                placeholder="Maximum Price (optional)"
                className="w-full sm:w-1/2"
                register={register("maxPrice")}
              />
            </div>
          </Question>
          <br /> <Break /> <br />
          <Checkbox
            register={register("agreePolicies")}
            label="Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image"
          />
          <br /> <br /> <br />
          <div className="flex items-end gap-3 sm:gap-10text-sm">
            <Button text="Go back" variant="underlined" width="fit-content" onClick={onPrevPage} />
            <Button text="Continue" size="small" width={270} type="submit" />
          </div>
        </form>
      </SectionLayout>
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

export default AddTransportInfor
