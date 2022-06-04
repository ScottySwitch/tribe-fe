import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import { otherList } from "components/Filter/Filter";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Question from "components/Question/Question";
import Radio from "components/Radio/Radio";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { categories } from "constant";
import { useState } from "react";
import {
  additionalFeatures,
  atmosphere,
  cuisineModalList,
  mealOptions,
  parkingNearby,
  paymentMethods,
  placeGoodFor,
} from "./constant";

const AddEatInfor = () => {
  const [isPrevPage, setIsPrevPage] = useState<boolean>(false);
  const [cuisineVisible, setCuisineVisible] = useState(false);
  return (
    <>
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
          <br /> <Input placeholder="Please tell us the listing type" />
        </Question>
        <Question
          question="What type of cuisine does this place serve?"
          optional
        >
          <Button
            text="Edit cruisines"
            width="fit-content"
            size="small"
            onClick={() => setCuisineVisible(true)}
          />
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
          <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
            {otherList.map((item) => (
              <Checkbox
                key={item.label}
                label={item.label}
                className="w-full sm:w-1/2"
              />
            ))}
          </div>
        </Question>
        <Question
          question="What’s the general price range of a meal? "
          optional
        >
          <Input placeholder="Select a currency" /> <br />
          <div className="flex gap-10">
            <Input
              placeholder="Minimum price (optional)"
              className="w-full sm:w-1/2"
            />
            <Input
              placeholder="Maximum Price (optional)"
              className="w-full sm:w-1/2"
            />
          </div>
        </Question>
        <Question question="What kind of meals does this place serve?" optional>
          <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
            {mealOptions.map((item) => (
              <Radio
                key={item.label}
                label={item.label}
                className="w-full sm:w-1/2"
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
                className="w-full sm:w-1/2"
              />
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
          <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
            {atmosphere.map((item) => (
              <Checkbox
                key={item.label}
                label={item.label}
                className="w-full sm:w-1/2"
              />
            ))}
          </div>
        </Question>
        <Question question="What type of payment method is available?" optional>
          <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
            {paymentMethods.map((item) => (
              <Checkbox
                key={item.label}
                label={item.label}
                className="w-full sm:w-1/2"
              />
            ))}
          </div>
        </Question>
        <Question
          question="Any additional features/ services that are available? "
          optional
        >
          <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
            {additionalFeatures.map((item) => (
              <Checkbox
                key={item.label}
                label={item.label}
                className="w-full sm:w-1/2"
              />
            ))}
          </div>
        </Question>
        <Question question="Do you have photos or videos to share? " optional>
          <br /> <br /> <br />
        </Question>
        <Checkbox label="Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image" />
        <br /> <br /> <br />
        <div className="flex items-end gap-3 sm:gap-10text-sm">
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
      <Modal
        title="Add cuisine"
        width={800}
        subTitle="Select max 5"
        visible={cuisineVisible}
        onClose={() => setCuisineVisible(false)}
      >
        <div
          className="px-[30px] pb-10"
          style={{ border: "1px solid #E2E4E9" }}
        >
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
            onClick={() => setCuisineVisible(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddEatInfor;
