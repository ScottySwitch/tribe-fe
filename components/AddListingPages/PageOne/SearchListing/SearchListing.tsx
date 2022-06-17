import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import ListingCard from "components/ListingCard/ListingCard"
import Modal from "components/Modal/Modal"
import Select from "components/Select/Select"
import { listingSearchResult } from "constant"
import { ClaimStep, YesNo } from "enums"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"

import styles from "./SearchListing.module.scss"

export type listingTypes = { [key: string]: string } | YesNo.NO | undefined

const ListingMenuFooter = ({ onClick }: { onClick?(): void }) => {
  return (
    <div className={styles.add_listing_search_footer} onClick={onClick}>
      <div>Cannot find the listing?</div>
      <p>List it now</p>
    </div>
  )
}

// const formatListingResultOption = listingSearchResult.map((item) => ({
//   ...item,
//   label: (
//     <div className="flex gap-2">
//       <div>
//         <Icon icon={item.icon} size={20} />
//       </div>
//       <div>
//         <div>{item.label}</div>
//         <div style={{ fontSize: 12, color: "#3C4467" }}>{item.location}</div>
//       </div>
//     </div>
//   ),
// }))

const formatListingResultOption = (bizListing: []) => {
  const result = []
  bizListing.map((item: any) => (
    result.push({
      ...item,
      // @ts-ignore
      label: (
        <div className="flex gap-2">
          <div>
            {/*<Icon icon={item.icon} size={20} />*/}
          </div>
          <div>
            <div>{item.attributes.name}</div>
            <div style={{ fontSize: 12, color: "#3C4467" }}>{item.attributes.address}</div>
          </div>
        </div>
      ),
    })));
  return result;
};

const RightColumn = (props: {
  onShowUpcomingFeature: () => void
  listing: any
  isRelationship?: boolean
}) => {
  const { listing, isRelationship, onShowUpcomingFeature } = props
  const router = useRouter()
  return (
    <>
      <Button
        text={isRelationship ? "Claim free listing" : "Improve this listing"}
        size="small"
        variant={isRelationship ? "primary" : "outlined"}
        onClick={() =>
          isRelationship
            ? router.push({
                pathname: `/add-listing/claim/${listing.id}`,
                query: { firstStep: ClaimStep.CLAIM_FREE_LISTING },
              })
            : onShowUpcomingFeature()
        }
      />
      <span>Not your business?</span>
    </>
  )
}

const SearchListing = ({
  relationship,
  listing,
  bizListing,
  setListing,
}: {
  setListing: (e: listingTypes) => void
  listing: any
  bizListing: any
  relationship?: string
}) => {
  console.log('listing', listing);
  const [showUpcomingFeature, setShowUpcomingFeature] = useState(false)
  switch (listing) {
    case undefined:
      return (
        <Select
          prefixIcon="search"
          options={formatListingResultOption(bizListing)}
          onChange={setListing}
          menuFooter={<ListingMenuFooter onClick={() => setListing(YesNo.NO)} />}
        />
      )
    case YesNo.NO:
      return (
        <div className="flex gap-2">
          <Badge onClick={() => setListing(undefined)} text="Yes" />
          <Badge value="no" selected text="No" />
        </div>
      )
    default:
      return (
        <React.Fragment>
          <ListingCard
            listing={listing}
            onClose={() => setListing(undefined)}
            rightColumn={
              <RightColumn
                onShowUpcomingFeature={() => setShowUpcomingFeature(true)}
                listing={listing}
                isRelationship={relationship === YesNo.YES}
              />
            }
          />
          <Modal visible={showUpcomingFeature} width={350} mobilePosition="center">
            <div className="p-5 flex flex-col items-center">
              <Image
                src={require("public/images/upcoming-feature.svg")}
                width={100}
                height={100}
                alt=""
              />
              <div>
                <strong>Upcoming feature</strong>
              </div>
              <p className="text-center">
                We are still working on it to give you the best experience possible.
              </p>
              <Button
                className="mt-5"
                text="Continue"
                size="small"
                width={270}
                onClick={() => setShowUpcomingFeature(false)}
              />
            </div>
          </Modal>
        </React.Fragment>
      )
  }
}

export default SearchListing
