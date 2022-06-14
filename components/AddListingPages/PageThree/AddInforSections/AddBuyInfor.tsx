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
import Upload from "components/Upload/Upload"
import Icon from "components/Icon/Icon"
import Heading from "components/ListingHomePage/Heading/Heading"
import OpeningHours from "components/OpeningHours/OpeningHours"
import { setValues } from "framer-motion/types/render/utils/setters"

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
      openingHours: data.openingHours,
    },
  })

  const [categoryKind, setCategoryKind] = useState<string | undefined>(getValues("categoryKind"))
  const [showOpeningHoursModal, setShowOpeningHoursModal] = useState(false)

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
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
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
            <Button
              text="Add opening hours"
              width="fit-content"
              size="small"
              variant="secondary"
              onClick={() => setShowOpeningHoursModal(true)}
            />
          </Question>
          <Question question="What tags best describe this place? " optional>
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
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
            <div className="w-full lg:w-1/2">
              <Input placeholder="Select a currency" register={register("currency")} />
              <br />
              <div className="flex gap-5">
                <Input placeholder="Minimum Price" register={register("minPrice")} />
                <Input placeholder="Maximum Price" register={register("maxPrice")} />
              </div>
            </div>
          </Question>
          <Question
            question="Do you have photos or videos to share?"
            sub_title="Add images/ videos ( up to 3 )"
            optional
          >
            <Upload type="media" centerIcon={<Icon icon="plus" />} />
          </Question>
          <br /> <Break /> <br />
          <Checkbox
            className="w-full sm:w-1/2"
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
      <Modal
        visible={showOpeningHoursModal}
        title="Add opening hours"
        width={780}
        mobileFullHeight
        onClose={() => setShowOpeningHoursModal(false)}
      >
        <OpeningHours
          data={getValues("openingHours")}
          onCancel={() => setShowOpeningHoursModal(false)}
          onSubmit={(openingHours) => {
            setShowOpeningHoursModal(false)
            console.log(openingHours)
            setValue("openingHours", openingHours)
          }}
        />
      </Modal>
    </>
  )
}

export default AddBuyInfor
