import Icon from "components/Icon/Icon"
import Select from "components/Select/Select"
import { Categories, YesNo } from "enums"
import { useRouter } from "next/router"

import styles from "./ListingSearch.module.scss"

const ListingMenuFooter = ({ onClick }) => {
  const router = useRouter()
  return (
    <div className={styles.add_listing_search_footer} onClick={() => onClick(YesNo.NO)}>
      <div>Cannot find the listing?</div>
      <p>List it now</p>
    </div>
  )
}

const listingIcon = (category) => {
  let icon
  switch (category) {
    case Categories.BUY:
      icon = "buy-color"
      break
    case Categories.EAT:
      icon = "eat-color"
      break
    case Categories.SEE_AND_DO:
      icon = "camera-color"
      break
    case Categories.TRANSPORT:
      icon = "car-color"
      break
    case Categories.STAY:
      icon = "bed-color"
      break
    default:
      icon = ""
      break
  }
  return icon
}

const formatListingResultOption = (bizListing: any[]) => {
  const result = bizListing.map((item: any) => ({
    ...item,
    value: item.attributes.name,
    // @ts-ignore
    label: (
      <div className="flex gap-2">
        <div>
          <Icon icon={listingIcon(item.attributes.category)} size={20} />
        </div>
        <div>
          <div>{item.attributes.name}</div>
          <div style={{ fontSize: 12, color: "#3C4467" }}>{item.attributes.address}</div>
        </div>
      </div>
    ),
  }))
  return result
}

const ListingSearch = ({ listingOptions, onChange }) => {
  return (
    <Select
      shouldControlShowValue
      prefixIcon="search"
      size="large"
      options={formatListingResultOption(listingOptions)}
      onChange={(e) => onChange(e)}
      menuFooter={<ListingMenuFooter onClick={onChange} />}
    />
  )
}

export default ListingSearch
