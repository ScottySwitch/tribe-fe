import { useEffect, useState } from "react"
import get from "lodash/get"
import { useForm } from "react-hook-form"

import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import { otherList } from "components/Filter/Filter"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Question from "components/Question/Question"
import Radio from "components/Radio/Radio"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { categories } from "constant"
import {
  additionalFeatures,
  atmosphere,
  cuisineModalList,
  mealOptions,
  parkingNearby,
  paymentMethods,
  placeGoodFor,
} from "../constant"
import Break from "components/Break/Break"
import Upload from "components/Upload/Upload"
import Icon from "components/Icon/Icon"
import OpeningHours from "components/OpeningHours/OpeningHours"
import { YesNo } from "enums"

interface AddEatInforProps {
  data: { [key: string]: any }
  show?: boolean
  onPrevPage: () => void
  onPreview: (data: { [key: string]: any }) => void
}

const AddEatInfor = (props: AddEatInforProps) => {
  const { data, show, onPrevPage, onPreview } = props
  const [cuisineVisible, setCuisineVisible] = useState(false)
  const [showOpeningHoursModal, setShowOpeningHoursModal] = useState(false)

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
      openingHours: data.openingHours,
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
        title="Add a restaurant"
        subTitle="After you complete this form, you will be able to make changes before
          submitting."
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question question="What is the category best associated with this place?">
            <div className="flex flex-wrap gap-2">
              {categories[0].options.map((opt) => (
                <Badge
                  key={opt.value}
                  text={opt.label}
                  selected={categoryKind === opt.label}
                  onClick={() => {
                    setValue("categoryKind", opt.label)
                    setCategoryKind(opt.label)
                  }}
                />
              ))}
            </div>
            <br />
            <Input placeholder="Please tell us the listing type" />
          </Question>
          <Question question="What type of cuisine does this place serve?" optional>
            <Button
              text="Edit cruisines"
              width="fit-content"
              size="small"
              onClick={() => setCuisineVisible(true)}
            />
          </Question>
          <Question question="What are the opening hours? " optional>
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
              {otherList.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  // name="tags"
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("tags")}
                />
              ))}
            </div>
          </Question>
          <Question question="What’s the general price range of a meal?" optional>
            <div className="w-full lg:w-1/2">
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
            </div>
          </Question>
          <Question question="What kind of meals does this place serve?" optional>
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
              {mealOptions.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  name="mealsKind"
                  register={register("mealsKind")}
                />
              ))}
            </div>
          </Question>
          <Question question="What is this place good for? " optional>
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
              {placeGoodFor.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  // name="placeGoodFor"
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("placeGoodFor")}
                />
              ))}
            </div>
          </Question>
          <Question question="Is parking available nearby?" optional>
            <div className="flex flex-col gap-y-5">
              {parkingNearby.map((item) => (
                <Radio
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  name="parking"
                  register={register("parking")}
                />
              ))}
            </div>
          </Question>
          <Question question="What best describe this place’s atmosphere? " optional>
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
              {atmosphere.map((item) => (
                <Checkbox
                  key={item.label}
                  // name="atmosphere"
                  value={item.label}
                  label={item.label}
                  className="w-full sm:w-1/2"
                  register={register("atmosphere")}
                />
              ))}
            </div>
          </Question>
          <Question question="What type of payment method is available?" optional>
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
              {paymentMethods.map((item) => (
                <Checkbox
                  key={item.label}
                  // name="payment"
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("payment")}
                />
              ))}
            </div>
          </Question>
          <Question question="Any additional features/ services that are available? " optional>
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
              {additionalFeatures.map((item) => (
                <Checkbox
                  key={item.label}
                  // name="additionalServices"
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("additionalServices")}
                />
              ))}
            </div>
          </Question>
          <Question question="Do you have photos or videos to share? " optional>
            <Upload type="media" centerIcon={<Icon icon="plus" size={20} />} />
          </Question>
          <br /> <br /> <br />
          <Checkbox
            register={register("agreePolicies")}
            label={
              data.relationship === YesNo.NO
                ? "I certify that this is a genuine attraction  "
                : "Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image"
            }
          />
          <br /> <Break /> <br />
          <div className="flex items-end gap-3 sm:gap-10text-sm">
            <Button text="Go back" variant="underlined" width="fit-content" onClick={onPrevPage} />
            <Button text="Continue" size="small" width={270} type="submit" />
          </div>
        </form>
      </SectionLayout>
      <Modal
        title="Add cuisine"
        width={800}
        subTitle="Select max 5"
        visible={cuisineVisible}
        onClose={() => setCuisineVisible(false)}
      >
        <div className="px-[30px] pb-10" style={{ border: "1px solid #E2E4E9" }}>
          <br />
          <div className="flex flex-wrap justify-between gap-4">
            {cuisineModalList.map((opt) => (
              <Checkbox key={opt.label} label={opt.label} className="w-[23%]" />
            ))}
          </div>
        </div>
        <div className="flex items-center px-[30px] py-[20px] justify-end gap-12">
          <button
            className="underline w-max cursor-pointer flex items-end text-left"
            onClick={() => setCuisineVisible(false)}
          >
            Cancel
          </button>
          <Button
            text="Continue"
            size="small"
            width={270}
            onClick={() => setCuisineVisible(true)}
          />
        </div>
      </Modal>
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

export default AddEatInfor
