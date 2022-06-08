import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Input from "components/Input/Input";
import ListingCard from "components/ListingCard/ListingCard";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TierTable from "components/TierTable/TierTable";
import { listingSearchResult } from "constant";
import { Tiers } from "enums";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultListing = listingSearchResult[0];

enum ClaimStep {
  CLAIM_FREE_LISTING = "claim_free_listing",
  CHOOSE_TIER = "choose_tierr",
}

const ClaimListing = () => {
  const { query } = useRouter();
  const [listing, setListing] = useState<{ [key: string]: any }>({});
  const [claimStep, setClaimStep] = useState(ClaimStep.CLAIM_FREE_LISTING);
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  useEffect(() => {
    const getListingData = () => {
      // fetchingApi
      setListing(defaultListing);
    };
    getListingData();
  }, []);

  const agreePolicies = (
    <div>
      I have read and accept Tribes <Link href="/terms">Terms of Use</Link> and{" "}
      <Link href="/policies">Privacy Policy.</Link>
    </div>
  );

  const onSubmit = (form) => {
    //do submit things
    console.log(form);
    setClaimStep(ClaimStep.CHOOSE_TIER);
  };

  const handleDirectToVerification = (tier: Tiers) => {
    router.push({
      pathname: "/biz/verify",
      query: {
        isPaidUser: !(tier === Tiers.FREE),
        tier: tier,
      },
    });
    console.log("asdjaskdjn");
  };

  return (
    <React.Fragment>
      <SectionLayout
        title="Claim your FREE Listing"
        show={claimStep === ClaimStep.CLAIM_FREE_LISTING}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 sm:w-3/4 w-full">
            <ListingCard listing={listing} />
            <Input placeholder="First name" size="large" register={register("firstName")} />
            <Input label="Last name" placeholder="First name" register={register("lastName")} />
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
              <Checkbox register={register("agreePolicies")} label={agreePolicies} />
            </Question>
            <Button type="submit" text="Continue" size="small" width={280} />
          </div>
        </form>
      </SectionLayout>
      <SectionLayout
        title="Choose tier"
        subTitle="Choose the tier suitable for your business. You can change tier anytime."
        show={claimStep === ClaimStep.CHOOSE_TIER}
      >
        <TierTable onDirectToVerification={handleDirectToVerification} />
      </SectionLayout>
    </React.Fragment>
  );
};
export default ClaimListing;
