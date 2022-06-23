import Image from "next/image"

import ReviewSearchBox from "components/ListingSearchBox/ListingSearchBox"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { dummyKeywords } from "constant"

import styles from "styles/Claim.module.scss"
import TopSearches from "components/TopSearches/TopSearches"

const ClaimPage = () => {
  return (
    <div className={styles.claim}>
      <div className="relative pb-6 bg-white">
        <Image
          src="https://picsum.photos/1440"
          width="100%"
          height="30%"
          layout="responsive"
          alt=""
        />
        <SectionLayout
          className={styles.section_claim_search_box}
          childrenClassName="h-full"
          containerClassName={styles.section_claim_search_box_container}
        >
          <ReviewSearchBox title="Claim Your Free Listing" />
        </SectionLayout>
      </div>

      <SectionLayout className={styles.top_search} containerClassName={styles.top_search_container}>
        <TopSearches keywords={dummyKeywords} />
      </SectionLayout>
    </div>
  )
}

export default ClaimPage
