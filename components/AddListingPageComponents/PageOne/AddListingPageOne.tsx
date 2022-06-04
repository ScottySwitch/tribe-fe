import React, { useEffect, useState } from "react";
import Link from "next/link";

import SectionLayout from "components/SectionLayout/SectionLayout";
import useTrans from "hooks/useTrans";
import { roleList } from "constant";
import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Select from "components/Select/Select";

import DatePicker from "components/DatePicker/DatePicker";

import SearchListing, {
  listingTypes,
} from "components/AddListingPageComponents/PageOne/SearchListing/SearchListing";
import RelationshipToBusiness from "components/AddListingPageComponents/PageOne/RelationshipToBusiness/RelationshipToBusiness";
import ChooseCategory from "components/AddListingPageComponents/PageOne/ChooseCategory/ChooseCategory";
import Question from "components/Question/Question";

interface AddListingProps {
  onNextPage: (data: { [key: string]: any }) => void;
  show: boolean;
}

const AddListingPageOne = (props: AddListingProps) => {
  const { show, onNextPage } = props;
  const trans = useTrans();
  const [category, setCategory] = useState<string | undefined>();
  const [relationship, setRelationship] = useState<string | undefined>();
  const [listing, setListing] = useState<listingTypes>();
  const [role, setRole] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState<string | undefined>();
  const [openDate, setOpenDate] = useState<Date | undefined>();

  if (!show) {
    return null;
  }

  const isContinueBtnDisable =
    !category || !relationship || !listing || !role || !isOpen || !openDate;

  return (
    <SectionLayout title={trans.addNewListing}>
      <p>
        Thank you for sharing with us a new place to list on Tribes. We thrive
        better as a community and your contribution will help enrich the
        experience of Tribes members! To get started, please share more about
        the place.
      </p>
      <Link href="/add-listing/guide">View our listing guidelines</Link>
      <br />
      <Question question="Firstly, tell us. Which category would you like to add?">
        <ChooseCategory
          category={category}
          setCategory={(e) => setCategory(e)}
        />
      </Question>
      <Question
        show={!!category}
        question="Are you the owner, employee, or official representative of this place?"
      >
        <RelationshipToBusiness
          relationship={relationship}
          setRelationship={(e) => setRelationship(e)}
        />
      </Question>
      <Question
        show={!!relationship}
        question="Let’s find out if business is already listed in Tribes."
      >
        <SearchListing
          listing={listing}
          setListing={(e) => {
            setListing(e);
            setRole(undefined);
            setIsOpen(undefined);
            setOpenDate(undefined);
          }}
        />
      </Question>
      <Question show={listing === "no"} question="What is your role?">
        <Select prefixIcon="search" options={roleList} onChange={setRole} />
      </Question>
      <Question show={!!role} question="Is this busines currently open?">
        <div className="flex gap-2">
          <Badge
            onClick={() => setIsOpen("yes")}
            selected={isOpen === "yes"}
            text="Yes"
          />
          <Badge
            onClick={() => setIsOpen("no")}
            selected={isOpen === "no"}
            text="No"
          />
        </div>
      </Question>
      <Question show={isOpen === "no"} question="What is open date?">
        <DatePicker onChange={setOpenDate} value={openDate} />
      </Question>
      <br />
      <br />
      <br />
      <Button
        text="Continue"
        size="small"
        disabled={isContinueBtnDisable}
        width={270}
        onClick={() => {
          onNextPage({
            category,
            relationship,
            listing,
            role,
            isOpen,
            openDate,
          });
        }}
      />
    </SectionLayout>
  );
};

export default AddListingPageOne;
