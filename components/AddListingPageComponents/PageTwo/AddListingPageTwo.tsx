import React, { useState } from "react";

import SectionLayout from "components/SectionLayout/SectionLayout";
import useTrans from "hooks/useTrans";
import Button from "components/Button/Button";
import Question from "components/Question/Question";
import Input from "components/Input/Input";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";

interface AddListingProps {
  onPrevPage(): void;
  onNextPage: (data: { [key: string]: any }) => void;
  show: boolean;
}

const AddListingPageTwo = (props: AddListingProps) => {
  const { show, onNextPage, onPrevPage } = props;
  const trans = useTrans();

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      businessName: event.target.businessName.value,
      description: event.target.description.value,
      isOnline: event.target.isOnline.value,
      city: event.target.city.value,
      country: event.target.country.value,
      address: event.target.address.value,
      additionalAddress: event.target.additionalAddress.value,
      contact: event.target.contact.value,
      email: event.target.email.value,
      socialMedia: event.target.socialMedia.value,
    };
    console.log(data);
    onNextPage(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SectionLayout title="Add a place to buy">
        <p>How can we find this place</p>
        <br />
        <Question show question="Name & Description">
          <Input
            label="Business name"
            placeholder="Name of the business"
            name="businessName"
          />
          <br />
          <Input
            name="description"
            placeholder="Description of property (optional)"
            size="large"
          />
        </Question>
        <Question show question="Address">
          <Checkbox label="Online business with no address" name="isOnline" />
          <br />
          <Input
            name="city"
            label="City/Town, State/Province/Region"
            placeholder="50 Bussorah St, Singapore 199466"
          />
          <br />
          <Input
            name="country"
            label="Country (optional)"
            placeholder="Singapore"
          />
          <br />
          <Input
            name="address"
            label="Street address"
            placeholder="50 Bussorah St, Singapore 199466"
          />
          <br />
          <Input
            name="additionalAddress"
            size="large"
            placeholder="Additional address information (optional)"
          />
        </Question>
        <Question show question="Contact">
          <Input
            name="contact"
            label="Phone number ( optional )"
            placeholder="335 657 8878"
            prefix="+84"
          />
          <br />
          <Input name="email" size="large" placeholder="Email (optional)" />
        </Question>
        <Question show question="Social media">
          <Input
            name="socialMedia"
            label="Social media( optional )"
            placeholder="https://www.facebook.com/YourFacebook"
            prefix={<Icon icon="twitter-logo" size={20} />}
          />
        </Question>
        <br />
        <br />
        <br />
        <div className="flex gap-10 text-sm">
          <div
            className="underline	cursor-pointer flex items-end"
            onClick={onPrevPage}
          >
            Go back
          </div>
          <Button text="Continue" size="small" width={270} type="submit" />
        </div>
      </SectionLayout>
    </form>
  );
};

export default AddListingPageTwo;
