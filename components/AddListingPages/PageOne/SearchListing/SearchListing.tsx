import Badge from "components/Badge/Badge"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import ListingCard from "components/ListingCard/ListingCard"
import ListingSearch from "components/ListingSearch/ListingSearch"
import Modal from "components/Modal/Modal"
import Select from "components/Select/Select"
// import { listingSearchResult } from "constant"
import { ClaimStep, YesNo } from "enums"
import { get } from "lodash"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"

import styles from "./SearchListing.module.scss"

export type listingTypes = { [key: string]: string } | YesNo.NO | undefined

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
                pathname: `/claim/${listing.id}`,
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
  console.log("bizListing", bizListing)

  if (listing) {
    localStorage.setItem("biz_id", get(listing, "id"))
    localStorage.setItem("biz_slug", get(listing, "attributes.slug"))
  }
  
  const [showUpcomingFeature, setShowUpcomingFeature] = useState(false)
  switch (listing) {
    case undefined:
      return <ListingSearch listingOptions={bizListing} onChange={setListing} />
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
