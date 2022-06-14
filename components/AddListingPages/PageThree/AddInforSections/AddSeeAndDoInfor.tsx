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
import OpeningHours from "components/OpeningHours/OpeningHours"

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
  onPreview: (data: { [key: string]: any }) => void
}

const AddSeeAndDoInfor = (props: AddSeeAndDoInforProps) => {
  const { data, show, onPrevPage, onPreview } = props
  const [cuisineVisible, setCuisineVisible] = useState(false)
  const [showOpeningHoursModal, setShowOpeningHoursModal] = useState(false)

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      categoryKind: data.categoryKind,
      tags: data.tags,
      currency: data.currency,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      agreePolicies: data.agreePolicies,
      openingHours: data.openingHours,
    },
  })

  const [categoryKind, setCategoryKind] = useState<string | undefined>(getValues("categoryKind"))

  const onSubmit = () => {
    onPreview(data)
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
            <Button
              text="Add opening hours"
              width="fit-content"
              size="small"
              variant="secondary"
              onClick={() => setShowOpeningHoursModal(true)}
            />
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
            <div className="w-full lg:w-1/2">
              <Input placeholder="Select a currency" register={register("currency")} />
              <br />
              <div className="flex gap-5">
                <Input
                  placeholder="Minimum Price"
                  className="w-full sm:w-1/2"
                  register={register("minPrice")}
                />
                <Input
                  placeholder="Maximum Price"
                  className="w-full sm:w-1/2"
                  register={register("maxPrice")}
                />
              </div>
            </div>
          </Question>
          <Question
            question="Do you have photos or videos to share?"
            sub_title="Add images/ videos ( up to 3 )"
            optional
          ></Question>
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

export default AddSeeAndDoInfor
