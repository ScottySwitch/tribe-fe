import { useState } from "react";

import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";

const associatedCategories = [
  { label: "Trains" },
  { label: "Car rentals" },
  { label: "Buses and ferries" },
  { label: "Private transport" },
  { label: "Public transport" },
  { label: "Scooter and motorbike rentals" },
  { label: "Airport transfer" },
];

const areas = [
  { label: "Private airport transfer" },
  { label: "Airport trains & buses" },
];

const AddTransportInfor = () => {
  const [isPrevPage, setIsPrevPage] = useState<boolean>(false);

  return (
    <SectionLayout title="Add a mean of transport">
      <p>
        After you complete this form, you will be able to make changes before
        submitting.
      </p>
      <Question question="What is the category best associated with this service?">
        <div className="flex flex-wrap gap-2">
          {associatedCategories.map((opt) => (
            <Badge key={opt.label} text={opt.label} />
          ))}
        </div>
      </Question>
      <Question
        question="What areas best associated with this service?"
        instruction="Select 5 max"
        optional
      >
        <div className="flex flex-wrap gap-2">
          {areas.map((opt) => (
            <Badge key={opt.label} text={opt.label} />
          ))}
        </div>
        <br />
        <Button text="Edit cruisines" width="fit-content" size="small" />
      </Question>
      <Question question="What are the opening hours?" optional>
        <Button
          text="Add open hour"
          width="fit-content"
          size="small"
          variant="secondary"
        />
      </Question>
      <Question
        question="What’s the average price range of this service?"
        optional
      >
        <Input placeholder="Select a currency" />
        <br />
        <div className="flex gap-10">
          <Input placeholder="Minimum price (optional)" className="w-1/2" />
          <Input placeholder="Maximum Price (optional)" className="w-1/2" />
        </div>
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

export default AddTransportInfor;
