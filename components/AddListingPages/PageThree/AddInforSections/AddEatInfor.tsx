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
  mealOptions,
  parkingNearby,
  paymentMethods,
  placeGoodFor,
} from "../constant"
import Break from "components/Break/Break"
import Upload from "components/Upload/Upload"
import Icon from "components/Icon/Icon"
import OpenHours from "components/OpenHours/OpenHours"
import { YesNo } from "enums"
import { IOption } from "type"
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue"
import TagsSelection from "components/TagsSelection/TagsSelection"
import { IAddListingForm } from "pages/add-listing"

interface AddEatInforProps {
  isEdit?: boolean
  subCateList: IOption[]
  data: IAddListingForm
  show?: boolean
  onPrevPage?: () => void
  onPreview?: (data: IAddListingForm) => void
  onEdit?: (data: IAddListingForm) => void
}

const AddEatInfor = (props: AddEatInforProps) => {
  const { data, isEdit, subCateList, show, onPrevPage, onPreview, onEdit } = props

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      categoryKind: data.categoryKind,
      tags: data.tags,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      mealsKind: data.mealsKind,
      images: data.images,
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

  const [showTagsModal, setShowTagsModal] = useState(false)
  const [showOpeningHoursModal, setShowOpenHoursModal] = useState(false)
  const [categoryKind, setCategoryKind] = useState<string | undefined>(getValues("categoryKind"))

  const onSubmit = (data) => {
    onPreview?.(data)
    onEdit?.(data)
  }

  if (!show) {
    return null
  }

  return (
    <>
      <SectionLayout
        title={isEdit ? "Business Detail" : "Add a restaurant"}
        subTitle={
          isEdit
            ? undefined
            : "After you complete this form, you will be able to make changes before submitting."
        }
        containerClassName={isEdit ? "w-full px-[30px]" : ""}
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
          <Question
            question="What type of cuisine does this place serve?"
            instruction="Select 5 max"
            optional
          >
            <PreviewValue valueKey="tags" value={getValues("tags")} />
            <br />
            <Button
              text="Edit cruisines"
              width="fit-content"
              size="small"
              onClick={() => setShowTagsModal(true)}
            />
          </Question>
          <Question question="What are the opening hours? " optional>
            <PreviewValue valueKey="openHours" value={getValues("openHours")} />
            <br />
            <Button
              text="Add opening hours"
              width="fit-content"
              size="small"
              variant="secondary"
              onClick={() => setShowOpenHoursModal(true)}
            />
          </Question>
          <Question question="What tags best describe this place? " optional>
            <div className="flex flex-wrap gap-y-5 w-3/5">
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
            <div className="w-3/5">
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
            <div className="flex flex-wrap gap-y-5 w-3/5">
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
            <div className="flex flex-wrap gap-y-5 w-3/5">
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
            <div className="flex flex-wrap gap-y-5 w-3/5">
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
            <div className="flex flex-wrap gap-y-5 w-3/5">
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
            <div className="flex flex-wrap gap-y-5 w-3/5">
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
          <Question question="Do you have photos or videos to share? " show={!isEdit} optional>
            <Upload
              multiple={true}
              accept="images"
              fileList={getValues("images")}
              type="media"
              centerIcon={<Icon icon="plus" />}
              onChange={(urls) => setValue("images", [...(getValues("images") || []), ...urls])}
            />
          </Question>
          <Question show={!isEdit}>
            <br /> <br /> <br />
            <Checkbox
              register={register("agreePolicies")}
              label={
                data.relationship === YesNo.NO
                  ? "I certify that this is a genuine attraction  "
                  : "Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image"
              }
            />
          </Question>
          <br /> <Break /> <br />
          <div className="flex items-end gap-3 sm:gap-10text-sm">
            <Button text="Go back" variant="underlined" width="fit-content" onClick={onPrevPage} />
            <Button text="Continue" size="small" width={270} type="submit" />
          </div>
        </form>
      </SectionLayout>
      <Modal
        visible={showTagsModal}
        title="Add product"
        subTitle="Select max 5"
        width={780}
        mobileFullHeight
        onClose={() => setShowTagsModal(false)}
      >
        <TagsSelection
          options={subCateList}
          selectedList={getValues("tags")}
          onCancel={() => setShowTagsModal(false)}
          onSubmit={(list) => {
            setValue("tags", list)
            setShowTagsModal(false)
          }}
        />
      </Modal>
      <Modal
        visible={showOpeningHoursModal}
        title="Add opening hours"
        width={780}
        mobileFullHeight
        onClose={() => setShowOpenHoursModal(false)}
      >
        <OpenHours
          data={getValues("openHours") || []}
          onCancel={() => setShowOpenHoursModal(false)}
          onSubmit={(openHours) => {
            setShowOpenHoursModal(false)
            console.log(openHours)
            setValue("openHours", openHours)
          }}
        />
      </Modal>
    </>
  )
}

export default AddEatInfor
