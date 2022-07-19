import Icon from "components/Icon/Icon";
import Select, { SelectProps } from "components/Select/Select";
import { Categories, YesNo } from "enums";
import { useRouter } from "next/router";
import AuthPopup from "components/AuthPopup/AuthPopup";
import styles from "./ListingSearch.module.scss";
import get from "lodash/get";
import { IOption } from "type";
import { useState } from "react";

export const ListingMenuFooter = ({ onClick }) => {
  const router = useRouter();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const checkLogin = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.token) {
      onClick(YesNo.NO)    
    }
    else {
      setShowAuthPopup(true)
    }
  }
  return (
    <div
      className={styles.add_listing_search_footer}
      onClick={checkLogin}
    >
      <div>Cannot find the listing?</div>
      <p>List it now</p>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

const listingIcon = (category) => {
  let icon;
  switch (category) {
    case Categories.BUY:
      icon = "buy-color";
      break;
    case Categories.EAT:
      icon = "eat-color";
      break;
    case Categories.SEE_AND_DO:
      icon = "camera-color";
      break;
    case Categories.TRANSPORT:
      icon = "car-color";
      break;
    case Categories.STAY:
      icon = "bed-color";
      break;
    default:
      icon = "";
      break;
  }
  return icon;
};

export const formatListingResultOption = (bizListing: any[]) => {
  const result = Array.isArray(bizListing)
    ? bizListing.map((item: any) => ({
        ...item,
        value: get(item, "attributes.name"),
        // @ts-ignore
        label: (
          <div className="flex gap-2">
            <div>
              <Icon
                icon={listingIcon(
                  get(item, "attributes.categories.data[0].attributes.order")
                )}
                size={20}
              />
            </div>
            <div>
              <div>{get(item, "attributes.name")}</div>
              <div style={{ fontSize: 12, color: "#3C4467" }}>
                {get(item, "attributes.address")}
              </div>
            </div>
          </div>
        ),
      }))
    : [];
  return result;
};

interface ListingSearchProps extends SelectProps {
  listingOptions: IOption[];
  menuFooter?: JSX.Element | JSX.Element[];
}
const ListingSearch = (props: ListingSearchProps) => {
  const { onChange, onInputChange, listingOptions, menuFooter, ...rest } =
    props;
  return (
    <Select
      shouldControlShowValue
      size="large"
      isSearchable
      prefixIcon="search"
      options={formatListingResultOption(listingOptions)}
      onChange={(e) => onChange?.(e)}
      menuFooter={menuFooter || <ListingMenuFooter onClick={onChange} />}
      onInputChange={onInputChange}
      {...rest}
    />
  );
};

export default ListingSearch;
