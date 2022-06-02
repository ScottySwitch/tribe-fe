import Badge from "components/Badge/Badge";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Select from "components/Select/Select";
import { listingSearchResult } from "constant";
import Image from "next/image";

import styles from "./SearchListing.module.scss";

export type listingTypes = { [key: string]: string } | "no" | "searching";

const ListingMenuFooter = ({ onClick }: { onClick?(): void }) => {
  return (
    <div className={styles.add_listing_search_footer} onClick={onClick}>
      <div>Cannot find the listing?</div>
      <p>List it now</p>
    </div>
  );
};

const formatListingResultOption = listingSearchResult.map((item) => ({
  ...item,
  label: (
    <div className="flex gap-2">
      <div>
        <Icon icon={item.icon} size={20} />
      </div>
      <div>
        <div>{item.label}</div>
        <div style={{ fontSize: 12, color: "#3C4467" }}>{item.location}</div>
      </div>
    </div>
  ),
}));

const SearchListing = ({
  listing,
  setListing,
}: {
  setListing: (e: listingTypes) => void;
  listing: any;
}) => {
  let result = null;
  switch (listing) {
    case "searching":
      result = (
        <Select
          prefixIcon="search"
          options={formatListingResultOption}
          onChange={setListing}
          menuFooter={
            <ListingMenuFooter
              onClick={() => {
                console.log("noooooooo");
                setListing("no");
              }}
            />
          }
        />
      );
      break;
    case "no":
      result = (
        <div className="flex gap-2">
          <Badge onClick={() => setListing("searching")} text="Yes" />
          <Badge value="no" selected text="No" />
        </div>
      );
      break;
    default:
      const { avatar, location, name, reviewNumber, imageNumber, followers } =
        listing;
      result = (
        <div className={styles.add_listing_card}>
          <div className={styles.left_col}>
            <div className={styles.listing_details}>
              <div className={styles.listing_details_avatar}>
                <Image src={avatar} layout="fill" alt="" />
              </div>
              <div className={styles.listing_details_infor}>
                <div className={styles.listing_details_infor_name}>{name}</div>
                <div className={styles.listing_details_infor_location}>
                  {location}
                </div>
              </div>
            </div>
            <div className={styles.listing_number}>
              <div>
                <p>{reviewNumber}</p>
                reviews
              </div>
              <div>
                <p>{imageNumber}</p>
                image
              </div>
              <div>
                <p>{followers}</p>
                followers
              </div>
            </div>
          </div>
          <div className={styles.right_col}>
            <Button text="Claim free listing" size="small" />
            <div className={styles.not_your_business}>Not your business?</div>
          </div>
          <div className={styles.close} onClick={() => setListing("searching")}>
            &times;
          </div>
        </div>
      );
      break;
  }
  return result
};

export default SearchListing;
