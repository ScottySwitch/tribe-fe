import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import ListingCard from "components/ListingCard/ListingCard";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { listingSearchResult } from "constant";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultListing = listingSearchResult[0];

const ClaimListing = () => {
  const { query } = useRouter();
  const [listing, setListing] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const getListingData = () => {
      // fetchingApi
      setListing(defaultListing);
    };
    getListingData();
  }, []);

  const { handleSubmit, register } = useForm();

  const agreePolicies = (
    <div>
      I have read and accept Tribes <Link href="/terms">Terms of Use</Link> and{" "}
      <Link href="/policies">Privacy Policy.</Link>
    </div>
  );

  const onSubmit = (form) => {
    //do submit things
    console.log(form);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionLayout
          title="Claim your FREE Listing"
          contentClassName="flex flex-col gap-5 sm:w-3/4 w-full"
        >
          <ListingCard listing={listing} />
          <Input
            placeholder="First name"
            size="large"
            register={register("firstName")}
          />
          <Input
            label="Last name"
            placeholder="First name"
            register={register("lastName")}
          />
          <Input
            label="Last name"
            placeholder="Role of business"
            register={register("businessRole")}
          />
          <Checkbox
            register={register("getNotified")}
            label="Get notified by email about new reviews, best practices, and more to help you improve your online reputation and build your business."
          />
          <Question question="Please click the statements below to indicate you understand and accept these terms.">
            <Checkbox
              register={register("isAuthorized")}
              label="I certify that I am an authorized representative or affiliate of this establishment and have the authority to register as a business representative. The information I have entered into this form is neither false nor fraudulent. I also understand that Tripadvisor may disclose my name and affiliation to other verified representatives of this establishment."
            />
            <br />
            <Checkbox
              register={register("agreePolicies")}
              label={agreePolicies}
            />
          </Question>
          <Button type="submit" text="Continue" size="small" width={280} />
        </SectionLayout>
      </form>
    </React.Fragment>
  );
};
export default ClaimListing;
