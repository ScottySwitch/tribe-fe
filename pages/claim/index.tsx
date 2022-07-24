import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import SectionLayout from "components/SectionLayout/SectionLayout";
import { dummyKeywords, user } from "constant";
import TopSearches from "components/TopSearches/TopSearches";
import ListingSearchBox from "components/ListingSearchBox/ListingSearchBox";

import styles from "styles/Claim.module.scss";
import ListingCard from "components/ListingCard/ListingCard";
import Button from "components/Button/Button";
import { useRouter } from "next/router";
import BizListingApi from "services/biz-listing";
import { Categories, YesNo } from "enums";
import SearchListing, {
  listingTypes,
} from "components/AddListingPages/PageOne/SearchListing/SearchListing";
import get from "lodash/get";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { UserInforContext } from "Context/UserInforContext";
import { useDebounce } from "usehooks-ts";
import { changeToSlugify } from "utils";

const RightColumn = (props: { listing: { [key: string]: any } }) => {
  const { listing } = props;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const listingRolesArray =
      get(listing, "attributes.listing_roles.data") || [];
    const isBeingClaimed =
      get(listing, "attributes.claim_listings.data.length") > 0;
    const doesHasOwners = listingRolesArray.some(
      (item) => get(item, "attributes.name") == "owner"
    );
    if (isBeingClaimed || doesHasOwners) setIsDisabled(true);
  }, []);

  const handleClick = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo && userInfo.token
      ? router.push(`/claim/${listing.id}`)
      : setShowAuthPopup(true);
  };

  return (
    <>
      <Button
        text="Claim free listing"
        onClick={handleClick}
        disabled={isDisabled}
      />
      <span onClick={() => router.push("/add-listing")}>
        Not your business?
      </span>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </>
  );
};

const ClaimPage = () => {
  const [listing, setListing] = useState<{ [key: string]: any }>();
  const [bizListing, setBizListing] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [location, setLocation] = useState();
  const debouncedSearchTerm = useDebounce(changeToSlugify(searchKey), 500);
  const getRandomListing = async () => {
    const result = await BizListingApi.getListingBySlug("", location || 'singapore', 7)
    const data = get(result, "data.data")
    setBizListing(data)
  }
  useEffect(() => {
    if (bizListing.length === 0) {
      getRandomListing()
    }
  }, [])

  useEffect(() => {
    const getBizListing = async () => {
      const data = await BizListingApi.getListingBySlug(
        debouncedSearchTerm,
        location,
        20
      );
      setBizListing(get(data, "data.data"));
    };

    debouncedSearchTerm ? getBizListing() : getRandomListing();
  }, [debouncedSearchTerm, location]);

  const handleSetListing = (e) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo = {
      ...userInfo,
      type_handle: "Claim",
      biz_id: e.id,
      biz_slug: get(e, "attributes.slug"),
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setListing(e);
  };

  return (
    <div className={styles.claim}>
      <div className="relative bg-white">
        <Image
          src={require("/public/images/default-banner.svg")}
          width="100%"
          height="30%"
          layout="responsive"
          alt=""
          objectFit="cover"
        />
        <SectionLayout className={styles.section_claim_search_box}>
          {listing ? (
            <ListingCard
              listing={listing}
              onClose={() => setListing(undefined)}
              rightColumn={<RightColumn listing={listing} />}
            />
          ) : (
            <ListingSearchBox
              title="Claim Your Free Listing"
              listingOptions={bizListing}
              onListingSearchChange={handleSetListing}
              onInputChange={(e) => setSearchKey(e)}
              onLocationChange={(e) => setLocation(e.value)}
            />
          )}
        </SectionLayout>
      </div>
      <SectionLayout className={styles.section_two}>
        <div className={styles.header}>Grow your business with Tribes</div>
        <div className={styles.advantage}>
          <Image
            src={require("public/images/take-control.svg")}
            width={600}
            alt=""
          />
          <div className={styles.description}>
            <div className={styles.title}>Take control of your listing</div>
            <p className={styles.content}>
              Customise your listing details, upload photos, and more to show
              customers what makes your business special.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <Image
            src={require("public/images/respond-to-reviews.svg")}
            width={600}
            alt=""
          />
          <div className={styles.description}>
            <div className={styles.title}>Respond to reviews</div>
            <p className={styles.content}>
              Analyse reviews that can help your company overall customer
              satisfaction and Increase brand awareness to reach your targetted
              muslim audience, local and internationally.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <Image
            src={require("public/images/track-perfomance.svg")}
            width={600}
            alt=""
          />
          <div className={styles.description}>
            <div className={styles.title}>Track your performance</div>
            <p className={styles.content}>
              Use analytics to keep track of the number of products sold and to
              determine if a product is performing poorly so that you can
              address the issues and work toward success.
            </p>
          </div>
        </div>
      </SectionLayout>
      <SectionLayout
        className={styles.top_search}
        containerClassName={styles.top_search_container}
      >
        <TopSearches />
      </SectionLayout>
    </div>
  );
};

export default ClaimPage;
