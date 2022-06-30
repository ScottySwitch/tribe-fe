import React, { useState, useEffect } from "react"
import Image from "next/image"

import SectionLayout from "components/SectionLayout/SectionLayout"
import { dummyKeywords } from "constant"
import TopSearches from "components/TopSearches/TopSearches"
import ListingSearchBox from "components/ListingSearchBox/ListingSearchBox"

import styles from "styles/Claim.module.scss"
import ListingCard from "components/ListingCard/ListingCard"
import Button from "components/Button/Button"
import { useRouter } from "next/router"
import BizListingApi from "services/biz-listing"
import { Categories, YesNo } from "enums"
import SearchListing, {
  listingTypes,
} from "components/AddListingPages/PageOne/SearchListing/SearchListing"
import get from "lodash/get"


const ClaimPage = () => {
  const [listing, setListing] = useState<{ [key: string]: any }>()
  const [bizListing, setBizListing] = useState([])
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isLoading, setIsloading] = useState<boolean>(true)

  useEffect(() => {
    getBizListing()
  }, [])

  const getBizListing = async () => {
    const data = await BizListingApi.getBizListing()
    setBizListing(get(data, 'data.data'));
    console.log('data', get(data, 'data.data'));
  }

  const handleSetListing = (e) => {
    setIsDisabled(false)
    setIsloading(true)
    console.log(e);
    let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
    userInfo = {...userInfo, biz_id: get(e, "id"), biz_slug: get(e, "attributes.slug")}
    localStorage.setItem("user", JSON.stringify(userInfo))
    setListing(e)
    checkListingHaveOwner()
  }

  const checkListingHaveOwner = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
    const data = await BizListingApi.checkListingHaveOwner(userInfo.biz_slug)
    const data1 = await BizListingApi.getBizListingBySlug(userInfo.biz_slug)
    const haveOwner = get(data, 'data.data') || []
    const haveClaims = get(data1, 'data.data[0].attributes.claim_listings.data') || []
    if (haveOwner.length > 0 || haveClaims.length > 0) {
      setIsDisabled(true)
    } 
    else {
      setIsDisabled(false)
    }
    setIsloading(false)
  }

  const RightColumn = (props: { listing: { [key: string]: any }, isDisabled: boolean, isLoading: boolean }) => {
    const { listing, isDisabled, isLoading } = props
    console.log('listing', listing);
    const router = useRouter()
    const handleClick = () => router.push(`/claim/${listing.id}`)
    return (
      <>
        <Button 
          text="Claim free listing" 
          onClick={handleClick} 
          isLoading={isLoading}
          disabled={isDisabled}        
        />
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
              rightColumn={<RightColumn listing={listing} isDisabled={isDisabled} isLoading={isLoading}/>}
            />
          ) : (
            <ListingSearchBox
              title="Claim Your Free Listing"
              listingOptions={bizListing}
              onListingSearchChange={handleSetListing}
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
