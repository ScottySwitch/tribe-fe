import React, { useState } from "react"
import Image from "next/image"

import SectionLayout from "components/SectionLayout/SectionLayout"
import { dummyKeywords } from "constant"
import TopSearches from "components/TopSearches/TopSearches"
import ListingSearchBox from "components/ListingSearchBox/ListingSearchBox"

import styles from "styles/Claim.module.scss"
import ListingCard from "components/ListingCard/ListingCard"
import Button from "components/Button/Button"
import { useRouter } from "next/router"

const ClaimPage = () => {
  const [listing, setListing] = useState<{ [key: string]: any }>()

  const RightColumn = (props: { listing: { [key: string]: any } }) => {
    const { listing } = props
    const router = useRouter()
    const handleClick = () => router.push(`/claim/${listing.attributes.id}`)
    return (
      <>
        <Button text="Claim free listing" onClick={handleClick} />
        <span>Not your business?</span>
      </>
    )
  }

  return (
    <div className={styles.claim}>
      <div className="relative bg-white">
        <Image
          src="https://picsum.photos/1440"
          width="100%"
          height="30%"
          layout="responsive"
          alt=""
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
              onListingSearchChange={(e) => setListing(e)}
            />
          )}
        </SectionLayout>
      </div>
      <SectionLayout className={styles.section_two}>
        <div className={styles.header}>Grow your business with Tribes</div>
        <div className={styles.advantage}>
          <Image src={require("public/images/take-control.svg")} width={600} alt="" />
          <div className={styles.description}>
            <div className={styles.title}>Take control of your listing</div>
            <p className={styles.content}>
              Customise your listing details, upload photos, and more to show customers what makes
              your business special.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <Image src={require("public/images/respond-to-reviews.svg")} width={600} alt="" />
          <div className={styles.description}>
            <div className={styles.title}>Respond to reviews</div>
            <p className={styles.content}>
              Analyse reviews that can help your company overall customer satisfaction and Increase
              brand awareness to reach your targetted muslim audience, local and internationally.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <Image src={require("public/images/track-perfomance.svg")} width={600} alt="" />
          <div className={styles.description}>
            <div className={styles.title}>Track your performance</div>
            <p className={styles.content}>
              Use analytics to keep track of the number of products sold and to determine if a
              product is performing poorly so that you can address the issues and work toward
              success.
            </p>
          </div>
        </div>
      </SectionLayout>
      <SectionLayout className={styles.top_search} containerClassName={styles.top_search_container}>
        <TopSearches keywords={dummyKeywords} />
      </SectionLayout>
    </div>
  )
}

export default ClaimPage