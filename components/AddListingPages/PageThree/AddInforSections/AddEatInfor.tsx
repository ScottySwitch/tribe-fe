import { useEffect, useState } from "react";
import get from "lodash/get";
import { useForm } from "react-hook-form";

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
import {
  additionalFeatures,
  atmosphere,
  cuisineModalList,
  mealOptions,
  parkingNearby,
  paymentMethods,
  placeGoodFor,
} from "../constant";

interface AddEatInforProps {
  data: { [key: string]: any };
  show?: boolean;
  onPrevPage: () => void;
  onSubmitFormData: (data: { [key: string]: any }) => void;
  onUpdateFormData: (data: { [key: string]: any }) => void;
}

const AddEatInfor = (props: AddEatInforProps) => {
  const { data, show, onPrevPage, onSubmitFormData, onUpdateFormData } = props;
  const [cuisineVisible, setCuisineVisible] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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
      openHours: data.openHours,
    },
  });

  const [categoryKind, setCategoryKind] = useState<string | undefined>(
    getValues("categoryKind")
  );

  const onSubmit = () => {
    setShowPreviewModal(true);
  };

  const handleSubmitFormData = () => {
    setShowPreviewModal(false);
    onSubmitFormData({ ...data, ...getValues() });
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <SectionLayout
        title="Add a restaurant"
        subTitle="After you complete this form, you will be able to make changes before
          submitting."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Question question="What is the category best associated with this place?">
            <div className="flex flex-wrap gap-2">
              {categories[0].options.map((opt) => (
                <Badge
                  key={opt.value}
                  text={opt.label}
                  selected={categoryKind === opt.label}
                  onClick={() => {
                    setValue("categoryKind", opt.label);
                    setCategoryKind(opt.label);
                  }}
                />
              ))}
            </div>
            <br />
            <Input placeholder="Please tell us the listing type" />
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
                  // name="tags"
                  value={item.label}
                  className="w-full sm:w-1/2"
                  register={register("tags")}
                />
              ))}
            </div>
          </Question>
          <Question
            question="What’s the general price range of a meal? "
            optional
          >
            <Input
              placeholder="Select a currency"
              register={register("currency")}
            />
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
          <Question
            question="What kind of meals does this place serve?"
            optional
          >
            <div className="flex flex-wrap gap-y-5 w-full lg:w-1/2">
              {mealOptions.map((item) => (
                <Radio
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
          <Question
            question="What best describe this place’s atmosphere? "
            optional
          >
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
          <Question
            question="What type of payment method is available?"
            optional
          >
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
          <Question
            question="Any additional features/ services that are available? "
            optional
          >
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
            <br /> <br /> <br />
          </Question>
          <Checkbox
            // name="agreePolicies"
            value="on"
            register={register("agreePolicies")}
            label="Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to hold Tribes or harmless for any and all copyright issues arising from your use of the image"
          />
          <br /> <br /> <br />
          <div className="flex items-end gap-3 sm:gap-10text-sm">
            <Button
              text="Go back"
              variant="underlined"
              width="fit-content"
              onClick={onPrevPage}
            />
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
            onClick={() => setCuisineVisible(true)}
          />
        </div>
      </Modal>
      <Modal
        visible={showPreviewModal}
        title="Does everything look correct?"
        subTitle="Please review this information before submiting!"
        width={780}
        mobileFullHeight
        onClose={() => setShowPreviewModal(false)}
      >
        <div className="px-[30px] gap-6 flex flex-col">
          {previewInfo.map((row) => (
            <div key={row.question} className="flex gap-20">
              <div className="flex flex-wrap w-3/5">{row.question}</div>
              <div className="w-2/5">
                {get({ ...data, ...getValues() }, row.value) || ""}
              </div>
            </div>
          ))}
          <div className="flex justify-end px-[30px] py-3">
            <Button
              text="Cancel"
              size="small"
              variant="underlined"
              width="fit-content"
              onClick={() => setShowPreviewModal(false)}
            />
            <Button
              text="Continue"
              size="small"
              width={270}
              onClick={handleSubmitFormData}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

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
];

export default AddEatInfor;
