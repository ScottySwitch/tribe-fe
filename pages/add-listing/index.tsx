import React, { useEffect, useState } from "react";
import Link from "next/link";

import SectionLayout from "components/SectionLayout/SectionLayout";
import useTrans from "hooks/useTrans";
import { categories, listingSearchResult, roleList } from "constant";
import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import { Categories } from "enums";

import styles from "styles/AddListing.module.scss";
import Select from "components/Select/Select";
import Icon from "components/Icon/Icon";
import Image from "next/image";

import SearchListing, {
  listingTypes,
} from "components/AddListingComponents/SearchListing/SearchListing";
import RelationshipToBusiness from "components/AddListingComponents/RelationshipToBusiness/RelationshipToBusiness";
import ChooseCategory from "components/AddListingComponents/ChooseCategory/ChooseCategory";
import DatePicker from "components/DatePicker/DatePicker";

const AddListing = () => {
  const trans = useTrans();
  const [category, setCategory] = useState<string | undefined>(Categories.BUY);
  const [relationship, setRelationship] = useState<string | undefined>("yes");
  const [listing, setListing] = useState<listingTypes>("searching");
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState<boolean>(true);
  const [openDate, setOpenDate] = useState(new Date());

  return (
    <div className={styles.add_listing}>
      <SectionLayout title={trans.addNewListing}>
        <p>
          Thank you for sharing with us a new place to list on Tribes. We thrive
          better as a community and your contribution will help enrich the
          experience of Tribes members! To get started, please share more about
          the place.
        </p>
        <Link href="/add-listing/guide">View our listing guidelines</Link>
        <br />

        <div className={styles.question}>
          Firstly, tell us. Which category would you like to add?
        </div>
        <ChooseCategory
          category={category}
          setCategory={(e) => setCategory(e)}
        />

        <div className={styles.question}>
          Are you the owner, employee, or official representative of this place?
        </div>
        <RelationshipToBusiness
          relationship={relationship}
          setRelationship={(e) => setRelationship(e)}
        />

        <div className={styles.question}>
          Let’s find out if business is already listed in Tribes.
        </div>
        <SearchListing
          listing={listing}
          setListing={(e) => {
            setListing(e);
          }}
        />

        <div className={styles.question}>What is your role?</div>
        <Select prefixIcon="search" options={roleList} onChange={setListing} />

        <div className={styles.question}>Is this busines currently open?</div>
        <div className="flex gap-2">
          <Badge
            onClick={() => setIsCurrentlyOpen(true)}
            selected={isCurrentlyOpen}
            text="Yes"
          />
          <Badge
            onClick={() => setIsCurrentlyOpen(false)}
            selected={!isCurrentlyOpen}
            text="No"
          />
        </div>

        <div className={styles.question}>What is open date?</div>
        <DatePicker />

        <Button
          className={styles.continue_button}
          text="Continue"
          size="small"
          disabled
          width={270}
        />
      </SectionLayout>
    </div>
  );
};

export default AddListing;
