import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import SectionLayout from "components/SectionLayout/SectionLayout";
import Button from "components/Button/Button";
import Question from "components/Question/Question";
import Input from "components/Input/Input";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Select from "components/Select/Select";
import { roleList } from "constant";
import { IAddListingForm } from "pages/add-listing";

interface AddListingProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  onUpdateFormData: (data: { [key: string]: any }) => void;
  show: boolean;
  data: IAddListingForm;
}

const AddListingPageTwo = (props: AddListingProps) => {
  const { data, show, onUpdateFormData, onNextPage, onPrevPage } = props;

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      businessName: data.businessName,
      description: data.description,
      isOnline: data.description,
      city: data.description,
      country: data.country,
      address: data.address,
      additionalAddress: data.additionalAddress,
      contact: data.contact,
      email: data.email,
      socialMedia: data.socialMedia,
    },
  });

  if (!show) {
    return null;
  }

  const onSubmit = (form) => {
    onUpdateFormData(form);
    onNextPage();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionLayout title="Add a place to buy">
        <p>How can we find this place</p>
        <br />
        <Question show question="Name & Description">
          <Input
            label="Business name"
            placeholder="Name of the business"
            register={register("businessName")}
          />
          <br />
          <Input
            register={register("description")}
            placeholder="Description of property (optional)"
            size="large"
          />
        </Question>
        <Question show question="Address">
          <Checkbox
            label="Online business with no address"
            name="isOnline"
            value={"on"}
            register={register("isOnline")}
          />
          <br />
          <Input
            register={register("city")}
            label="City/Town, State/Province/Region"
            placeholder="50 Bussorah St, Singapore 199466"
          />
          <br />
          <Input
            register={register("country")}
            label="Country (optional)"
            placeholder="Singapore"
          />
          <br />
          <Input
            register={register("address")}
            label="Street address"
            placeholder="50 Bussorah St, Singapore 199466"
          />
          <br />
          <Input
            register={register("additionalAddress")}
            size="large"
            placeholder="Additional address information (optional)"
          />
        </Question>
        <Question show question="Contact">
          <Input
            register={register("contact")}
            label="Phone number ( optional )"
            placeholder="335 657 8878"
            prefix="+84"
          />
          <br />
          <Input
            register={register("email")}
            size="large"
            placeholder="Email (optional)"
          />
        </Question>
        {/* <Question show question="What is your role?">
          <Select
            prefixIcon="search"
            options={roleList}
            value={getValues("role")}
            onChange={(e) => {
              setValue("role", e);
            }}
          />
        </Question> */}
        <Question show question="Social media">
          <Input
            register={register("socialMedia")}
            label="Social media( optional )"
            placeholder="https://www.facebook.com/YourFacebook"
            prefix={<Icon icon="twitter-logo" size={20} />}
          />
        </Question>
        <br />
        <br />
        <br />
        <div className="flex gap-3 sm:gap-10  text-sm">
          <button
            className="underline w-max cursor-pointer flex items-end text-left"
            onClick={onPrevPage}
          >
            Go back
          </button>
          <Button text="Continue" size="small" width={270} type="submit" />
        </div>
      </SectionLayout>
    </form>
  );
};

export default AddListingPageTwo;
