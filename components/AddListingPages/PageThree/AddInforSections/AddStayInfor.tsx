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
import OpeningHours from "components/OpeningHours/OpeningHours"

const associatedCategories = [
  { label: "Holiday homes & apartment rentals" },
  { label: "Hotel" },
  { label: "Homestay" },
]

const accommodation = [
  { label: "Eco friendly" },
  { label: "Pet friendly" },
  { label: "Child friendly" },
  { label: "Disability friendly" },
  { label: "Budget" },
  { label: "Luxury" },
]

const foodOptions = [
  { label: "List of Halal restaurants in the vicinity" },
  { label: "Halal meals and menus" },
  { label: "Halal items in the mini-bar" },
  { label: "Halal-certified kitchen" },
  { label: "Restaurants that are all Halal-certified" },
  { label: "Only Halal food regulation on entire premises" },
]

const areas = [{ label: "Villa" }, { label: "Apart-hotel" }]

const prayerFacilities = [
  { label: "Basic necessities to break fast (dates & water)" },
  { label: "Iftar during Ramadan" },
  { label: "Suhoor & iftar buffets" },
  { label: "Halal room service? Halal restaurants in the area?" },
  { label: "Meals for suhoor & iftar and transport to local mosques" },
  { label: "Only Halal food regulation on entire premises" },
]

const nonHalalActivities = [
  { label: "Any nightclub and casinos" },
  { label: "Any adult channel or non-Halal friendly activities" },
  { label: "Separate spa & pool times for men and women" },
  { label: "Completely separate spas, pools and gyms for women" },
]

interface AddStayInforProps {
  data: { [key: string]: any }
  show?: boolean
  onPrevPage: () => void
  onPreview: (data: { [key: string]: any }) => void
}

const AddStayInfor = (props: AddStayInforProps) => {
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
      foodOptions: data.foodOptions,
      paryerFacilities: data.paryerFacilities,
      foodOptionsRamadan: data.foodOptionsRamadan,
      nonHalalActivities: data.nonHalalActivities,
      agreePolicies: data.agreePolicies,
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
        title="Add a place to stay"
        subTitle="After you complete this form, you'll be able to make changes before submitting."
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
            <div className="flex flex-wrap gap-2">
              {areas.map((opt) => (
                <Badge key={opt.label} text={opt.label} />
              ))}
            </div>
            <br />
            <Button text="Edit Property" width="fit-content" size="small" />
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
          <Question
            question="Do you have photos or videos to share?"
            instruction="Add images/ videos ( up to 3 )"
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

export default AddStayInfor
