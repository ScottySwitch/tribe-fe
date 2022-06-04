import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import { otherList } from "components/Filter/Filter";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import Radio from "components/Radio/Radio";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { categories } from "constant";
import { useState } from "react";

const mealOptions = [
  { label: "Breakfast" },
  { label: "Brunch" },
  { label: "Late night" },
  { label: "Drinks" },
  { label: "Lunch" },
  { label: "Dinner" },
];

const placeGoodFor = [
  { label: "Business Meetings" },
  { label: "Large Groups" },
  { label: "Families with Children" },
  { label: "Local Cuisine" },
  { label: "Hidden Gems" },
  { label: "Romantic" },
  { label: "Hot New Restaurants" },
  { label: "Scenic View" },
  { label: "Kids" },
  { label: "Special Occations" },
];

const parkingNearby = [
  { label: "Street Parking" },
  { label: "Valet Parking" },
  { label: "Validated Parking" },
  { label: "Parking Available" },
  { label: "Free Off-Street Parking" },
];

const atmosphere = [
  { label: "Beach" },
  { label: "Outdoor Seating" },
  { label: "Watergront" },
  { label: "Highchairs Available" },
  { label: "Live Music" },
  { label: "Non-smoking Restaurants" },
  { label: "Playground" },
  { label: "Private Dining" },
  { label: "Television" },
  { label: "Seating" },
];

const paymentMethods = [
  { label: "Accepts Credit Cards" },
  { label: "Accepts Discover" },
  { label: "Accepts Visa" },
  { label: "Accepts American Express" },
  { label: "Accepts Mastercard" },
  { label: "Cash Only" },
  { label: "Digital Payment" },
];

const additionalFeatures = [
  { label: "Delivery" },
  { label: "Gift Cards Availale" },
  { label: "Drive Thru" },
  { label: "Reservations" },
  { label: "Buffet" },
  { label: "Takeout" },
  { label: "Family style" },
  { label: "Wheelchair Accessible" },
  { label: "Serves Alcohol" },
  { label: "BYOB" },
  { label: "Jazz Bar" },
  { label: "prayer facility available/nearby" },
  { label: "Free Wifi" },
  { label: "wudu facilities available/nearby" },
];

const AddEatInfor = () => {
  const [isPrevPage, setIsPrevPage] = useState<boolean>(false);

  return (
    <SectionLayout title="Add a restaurant">
      <p>
        After you complete this form, you will be able to make changes before
        submitting.
      </p>
      <Question question="What is the category best associated with this place?">
        <div className="flex flex-wrap gap-2">
          {categories[0].options.map((opt) => (
            <Badge key={opt.value} text={opt.label} />
          ))}
        </div>
        <br />
        <Input placeholder="Please tell us the listing type" />
      </Question>
      <Question
        question="What type of cuisine does this place serve?  "
        optional
      >
        <Button text="Edit cruisines" width="fit-content" size="small" />
      </Question>
      <Question question="What are the opening hours? " optional>
        <Button
          text="Add open hour"
          width="fit-content"
          size="small"
          variant="secondary"
        />
      </Question>
      <Question question="What tags best describe this place? " optional>
        <div className="flex flex-wrap gap-y-5">
          {otherList.map((item) => (
            <Checkbox key={item.label} label={item.label} className="w-1/2" />
          ))}
        </div>
      </Question>
      <Question question="What’s the general price range of a meal? " optional>
        <Input placeholder="Select a currency" />
        <br />
        <div className="flex gap-10">
          <Input placeholder="Minimum price (optional)" className="w-1/2" />
          <Input placeholder="Maximum Price (optional)" className="w-1/2" />
        </div>
      </Question>
      <Question question="What kind of meals does this place serve?" optional>
        <div className="flex flex-wrap gap-y-5">
          {mealOptions.map((item) => (
            <Radio key={item.label} label={item.label} className="w-1/2" />
          ))}
        </div>
      </Question>
      <Question question="What is this place good for? " optional>
        <div className="flex flex-wrap gap-y-5">
          {placeGoodFor.map((item) => (
            <Checkbox key={item.label} label={item.label} className="w-1/2" />
          ))}
        </div>
      </Question>
      <Question question="Is parking available nearby?" optional>
        <div className="flex flex-col gap-y-5">
          {parkingNearby.map((item) => (
            <Radio key={item.label} label={item.label} />
          ))}
        </div>
      </Question>
      <Question
        question="What best describe this place’s atmosphere? "
        optional
      >
        <div className="flex flex-wrap gap-y-5">
          {atmosphere.map((item) => (
            <Checkbox key={item.label} label={item.label} className="w-1/2" />
          ))}
        </div>
      </Question>
      <Question question="What type of payment method is available?" optional>
        <div className="flex flex-wrap gap-y-5">
          {paymentMethods.map((item) => (
            <Checkbox key={item.label} label={item.label} className="w-1/2" />
          ))}
        </div>
      </Question>
      <Question
        question="Any additional features/ services that are available? "
        optional
      >
        <div className="flex flex-wrap gap-y-5">
          {additionalFeatures.map((item) => (
            <Checkbox key={item.label} label={item.label} className="w-1/2" />
          ))}
        </div>
      </Question>
      <Question question="Do you have photos or videos to share? " optional>
        <br />
        <br />
        <br />
      </Question>
      <Checkbox label="Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image" />
      <br />
      <br />
      <br />
      <div className="flex gap-3 sm:gap-10  text-sm">
        <button
          className="underline w-max cursor-pointer flex items-end text-left"
          type="submit"
          onClick={() => setIsPrevPage(true)}
        >
          Go back
        </button>
        <Button text="Continue" size="small" width={270} type="submit" />
      </div>
    </SectionLayout>
  );
};

export default AddEatInfor;
