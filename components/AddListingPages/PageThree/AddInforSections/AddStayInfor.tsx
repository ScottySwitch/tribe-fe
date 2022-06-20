import { useForm } from "react-hook-form"
import { useState } from "react"

import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Checkbox from "components/Checkbox/Checkbox"
import Break from "components/Break/Break"
import Modal from "components/Modal/Modal"
import OpenHours from "components/OpenHours/OpenHours"
import { YesNo } from "enums"
import {
  accommodation,
  areas,
  associatedCategories,
  foodOptions,
  nonHalalActivities,
  prayerFacilities,
} from "../constant"
import TagsSelection from "components/TagsSelection/TagsSelection"
import { IOption } from "type"
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue"
import Upload from "components/Upload/Upload"
import { IAddListingForm } from "pages/add-listing"
import Icon from "components/Icon/Icon"

interface AddStayInforProps {
  isEdit?: boolean
  subCateList: IOption[]
  data: { [key: string]: any }
  show?: boolean
  onPrevPage?: () => void
  onPreview?: (data: { [key: string]: any }) => void
  onEdit?: (data: IAddListingForm) => void
}

const AddStayInfor = (props: AddStayInforProps) => {
  const { isEdit, data, show, subCateList, onEdit, onPrevPage, onPreview } = props

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      categoryKind: data.categoryKind,
      tags: data.tags,
      currency: data.currency,
      minPrice: data.minPrice,
      images: data.images,
      maxPrice: data.maxPrice,
      foodOptions: data.foodOptions,
      paryerFacilities: data.paryerFacilities,
      foodOptionsRamadan: data.foodOptionsRamadan,
      nonHalalActivities: data.nonHalalActivities,
      agreePolicies: data.agreePolicies,
      openHours: data.openHours,
    },
  })

  const [categoryKind, setCategoryKind] = useState<string | undefined>(getValues("categoryKind"))
  const [showTagsModal, setShowTagsModal] = useState(false)
  const [showOpeningHoursModal, setShowOpenHoursModal] = useState(false)

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
        title={isEdit ? "Business Detail" : "Add a place to stay"}
        subTitle={
          isEdit
            ? undefined
            : "After you complete this form, you'll be able to make changes before submitting."
        }
        containerClassName={isEdit ? "w-full px-[30px]" : ""}
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question question="What is the category best associated with this accommodation?">
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
            <p>A hotel, motel, or bed and breakfast.</p>
          </Question>
          <Question
            question="What type of property best describe this accommodation?"
            instruction="Select 5 max"
            optional
          >
            <PreviewValue valueKey="tags" value={getValues("tags")} />
            <br />
            <Button
              text="Edit Property"
              width="fit-content"
              size="small"
              onClick={() => setShowTagsModal(true)}
            />
          </Question>
          <Question question="What are the opening hours?" optional>
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
            <div className="flex flex-col gap-y-5">
              {accommodation.map((item) => (
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
            <div className="w-3/5">
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
          <Question question="What are the Halal food options available?" optional>
            <div className="flex flex-col gap-3">
              {foodOptions.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("foodOptions")}
                />
              ))}
            </div>
          </Question>
          <Question question="What are the prayer facilities available?" optional>
            <div className="flex flex-col gap-y-5">
              {prayerFacilities.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("paryerFacilities")}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What are the Halal food options available?"
            instruction="Services during Ramadan: "
            optional
          >
            <div className="flex flex-col gap-y-5">
              {prayerFacilities.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("foodOptionsRamadan")}
                />
              ))}
            </div>
          </Question>
          <Question question="What are the non-Halal activities in the hotel?" optional>
            <div className="flex flex-col gap-y-5">
              {nonHalalActivities.map((item) => (
                <Checkbox
                  key={item.label}
                  label={item.label}
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("nonHalalActivities")}
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
        visible={showOpeningHoursModal}
        title="Add opening hours"
        width={780}
        mobileFullHeight
        onClose={() => setShowOpenHoursModal(false)}
      >
        <OpenHours
          data={getValues("openHours")}
          onCancel={() => setShowOpenHoursModal(false)}
          onSubmit={(openHours) => {
            setShowOpenHoursModal(false)
            console.log(openHours)
            setValue("openHours", openHours)
          }}
        />
      </Modal>
      <Modal
        visible={showTagsModal}
        title="Add property"
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
    </>
  )
}

export default AddStayInfor
