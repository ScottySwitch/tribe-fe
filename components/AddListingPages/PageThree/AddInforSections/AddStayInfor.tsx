import { useForm } from "react-hook-form"
import { useState } from "react"

import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Checkbox from "components/Checkbox/Checkbox"
import Break from "components/Break/Break"

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
  const [showPreviewModal, setShowPreviewModal] = useState(false)

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
            <Button text="Add open hour" width="fit-content" size="small" variant="secondary" />
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
export default AddStayInfor
