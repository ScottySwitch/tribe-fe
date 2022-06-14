import { useState } from "react"
import get from "lodash/get"
import { useForm } from "react-hook-form"

import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import Input from "components/Input/Input"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Modal from "components/Modal/Modal"
import Break from "components/Break/Break"

const associatedCategories = [
  { label: "Electronic Devices" },
  { label: "Electronic Accessories" },
  { label: "TV & Home Appliances" },
  { label: "Health & Beauty" },
  { label: "Babies & Toys" },
  { label: "Groceries" },
  { label: "Home & Lifestyle" },
  { label: "Women's Fashion" },
  { label: "Men's Fashion" },
  { label: "Watches & Bags" },
  { label: "Sports & Lifestyle" },
  { label: "Automotive & Motorcycle" },
  { label: "Pets" },
]

const productBrands = [{ label: "Laptops & Notebooks" }, { label: "2-in-1s" }]

const tags = [
  { label: "Family Friendly" },
  { label: "Pet Friendly" },
  { label: "Child Friendly" },
  { label: "Disability Friendly" },
]

const productTypes = [
  { label: "Mobiles" },
  { label: "Tablets" },
  { label: "Action/Video Cameras" },
  { label: "Security Cameras" },
  { label: "Laptops" },
  { label: "Digital Cameras" },
  { label: "Desktops Computers" },
  { label: "Gadgets & Drones" },
  { label: "Gaming Consoles" },
]

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

interface AddBuyInforProps {
  data: { [key: string]: any }
  show?: boolean
  onPrevPage: () => void
  onPreview: (data: { [key: string]: any }) => void
}

const AddBuyInfor = (props: AddBuyInforProps) => {
  const { data, show, onPrevPage, onPreview } = props

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      categoryKind: data.categoryKind,
      placeGoodFor: data.placeGoodFor,
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
        title="Add a store"
        subTitle="After you complete this form, you'll be able to make changes before submitting."
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question question="What is the category best associated with this store?">
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
          <Question question="What is this place good for? " optional>
            <div className="flex flex-wrap gap-y-5">
              {productTypes.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("placeGoodFor")}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What kind of product brands this store provide?"
            instruction="Select 5 max"
            optional
          >
            <div className="flex flex-wrap gap-2">
              {productBrands.map((opt) => (
                <Badge key={opt.label} text={opt.label} />
              ))}
            </div>
            <br />
            <Button text="Edit product" width="fit-content" size="small" />
          </Question>
          <Question question="What are the opening hours?" optional>
            <Button text="Add open hour" width="fit-content" size="small" variant="secondary" />
          </Question>
          <Question question="What tags best describe this place? " optional>
            <div className="flex flex-wrap gap-y-5">
              {tags.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  className="w-1/2"
                  value={item.label}
                  register={register("tags")}
                />
              ))}
            </div>
          </Question>
          <Question question="What’s the average price range of this service?" optional>
            <Input placeholder="Select a currency" register={register("currency")} />
            <br />
            <div className="flex gap-10">
              <Input
                placeholder="Minimum price (optional)"
                className="w-1/2"
                register={register("minPrice")}
              />
              <Input
                placeholder="Maximum Price (optional)"
                className="w-1/2"
                register={register("maxPrice")}
              />
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
          <Checkbox
            className="w-full sm:w-1/2"
            register={register("agreePolicies")}
            label="Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image"
          />
          <br /> <Break /> <br />
          <div className="flex items-end gap-3 sm:gap-10text-sm">
            <Button text="Go back" variant="underlined" width="fit-content" onClick={onPrevPage} />
            <Button text="Continue" size="small" width={270} type="submit" />
          </div>
        </form>
      </SectionLayout>
    </>
  )
}

export default AddBuyInfor
