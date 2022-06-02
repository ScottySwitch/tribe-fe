import React, { useEffect, useState } from "react";
import Link from "next/link";

import SectionLayout from "components/SectionLayout/SectionLayout";
import useTrans from "hooks/useTrans";
import { categories, listingSearchResult } from "constant";
import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import { Categories } from "enums";

import styles from "styles/AddListing.module.scss";
import Select from "components/Select/Select";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import SearchListing, {
  listingTypes,
} from "components/AddListingComponents/SearchListing";

const AddListing = () => {
  const trans = useTrans();
  const [category, setCategory] = useState<string | undefined>(Categories.BUY);
  const [isOwner, setIsOwner] = useState<string | undefined>("yes");
  const [listing, setListing] = useState<listingTypes>("searching");

  const handleChangeListing = (e: listingTypes) => {
    setListing(e);
  };

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
        <div className="flex flex-wrap gap-2">
          {categories.map((cate) => (
            <Badge
              key={cate.value}
              onClick={(e) => setCategory(e)}
              value={cate.value}
              selected={cate.value === category}
            >
              {cate.label}
            </Badge>
          ))}
          <p className="mb-10">
            For shopping trip. Market, mall, souvenir shop, bookstore, etc
          </p>
        </div>

        <div className={styles.question}>
          Are you the owner, employee, or official representative of this place?
        </div>
        <div className="flex gap-2">
          <Badge
            onClick={(e) => setIsOwner(e)}
            value="yes"
            selected={"yes" === isOwner}
            text="Yes"
          />
          <Badge
            onClick={(e) => setIsOwner(e)}
            value="no"
            selected={"no" === isOwner}
            text="No"
          />
        </div>
        <div className={styles.question}>
          Let’s find out if business is already listed in Tribes.
        </div>
        <SearchListing
          listing={listing}
          setListing={(e) => {
            setListing(e);
          }}
        />

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
