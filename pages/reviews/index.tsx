import { randomId } from "utils"
import { useEffect, useState } from "react"
import Image from "next/image"
import SectionLayout from "components/SectionLayout/SectionLayout"
import ReviewSearchBox from "components/ListingSearchBox/ListingSearchBox"
import ReviewCard from "components/ReviewsPage/ReviewCard/ReviewCard"
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal"
import { dummyKeywords } from "constant"

import styles from "styles/Reviews.module.scss"
import TopSearches from "components/TopSearches/TopSearches"
import BizListingApi from "../../services/biz-listing"
import get from "lodash/get"
import ReviewApi from "../../services/review"

const dummyReviews = [
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    images: ["https://picsum.photos/300/600"],
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466",
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    images: ["https://picsum.photos/300/600"],
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466",
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    images: ["https://picsum.photos/300/600"],
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466",
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    images: ["https://picsum.photos/300/600"],
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466",
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    images: ["https://picsum.photos/300/600"],
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466",
  },
]

const ReviewsPage = () => {
  const [isShowResultModal, setIsShowResultModal] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [locationList, setLocationList] = useState<any>([])
  const [listingOptions, setListingOptions] = useState<any>([])
  const [listingSearchResult, setListingSearchResult] = useState<any>()

  useEffect(() => {
    const getBizListingCountries = async () => {
      const data = await BizListingApi.getBizListingCountries()
      const countries = get(data, "data.data")
      const countriesArr: any = []
      countries.map((country) => {
        countriesArr.push({
          label: country,
          value: country,
        })
      })
      setLocationList(countriesArr)
    }
    getBizListingCountries().catch((e) => console.log(e))
  }, [])

  const handleOnLocationChange = async ({ value }: any) => {
    const result = await BizListingApi.getBizListingByCountry(value)
    const data = get(result, "data.data")
    setListingOptions(data)
  }

  const handleOnListingSearchChange = async (option: any) => {
    const result = await BizListingApi.getBizListingBySlug(option.attributes.slug)
    const data = get(result, "data.data")
    setListingSearchResult(data)
  }

  const calcRateNumber = (reviews) => {
    // TODO: rateNumber not work on FE
    const reviewsData = get(reviews, "data")
    let rateNumber = 0
    if (reviewsData.length > 0) {
      let sum = 0
      reviewsData.map((review) => {
        sum += get(review, "attributes.rating") || 0
      })
      rateNumber = Math.ceil(sum / reviewsData.length)
    } else {
      rateNumber = 0
    }
    return rateNumber
  }

  const handleCloseModal = () => {
    setIsShowResultModal(false)
  }

  const handleSubmit = async (dataSend: any) => {
    const bizListingId = get(listingSearchResult, "[0].id")
    const dataSendApi = {
      user: localStorage.getItem("user_id"),
      biz_listing: bizListingId,
      rating: dataSend.rating,
      content: dataSend.content,
      visited_date: dataSend.visitedDate,
      images: dataSend.images,
    }
    await ReviewApi.addReview(dataSendApi).then(() => {
      setIsShowResultModal(true)
      setIsSuccess(true)
    })
  }

  return (
    <div className={`${styles.review}`}>
      <div className="relative pb-6 bg-white">
        <Image
          src="https://picsum.photos/1440"
          width="100%"
          height="30%"
          layout="responsive"
          alt=""
        />
        <SectionLayout
          className={styles.section_review_search_box}
          childrenClassName="h-full"
          containerClassName={styles.section_review_search_box_container}
        >
          <ReviewSearchBox
            title="Review a place you've visited"
            locationList={locationList}
            onLocationChange={handleOnLocationChange}
            listingOptions={listingOptions}
            onListingSearchChange={handleOnListingSearchChange}
          />
        </SectionLayout>
      </div>
      <SectionLayout
        childrenClassName={styles.section_children_reviews}
        containerClassName={styles.section_children_reviews_container}
      >
        <div className={styles.main_content}>
          <div className="font-semibold text-sm sm:text-base mb-8">
            Share your experiences with the Tribes community!
          </div>
          <div className="review-list">
            {listingSearchResult?.map((review) => (
              <ReviewCard
                key={review.id}
                id={review.id}
                title={get(review, "attributes.name")}
                imgUrl={get(review, "attributes.images[0]") || "https://picsum.photos/200/300"}
                isVerified={get(review, "attributes.is_verified")}
                rateNumber={calcRateNumber(get(review, "attributes.reviews"))}
                location={get(review, "attributes.address")}
                onSubmit={handleSubmit}
              />
            ))}
          </div>
        </div>
        <div className={`${styles.advertisement} mt-8`}>
          <Image src="https://picsum.photos/300/600" height={600} width={300} alt="" />
        </div>
      </SectionLayout>

      <SectionLayout className={styles.top_search} containerClassName={styles.top_search_container}>
        <TopSearches keywords={dummyKeywords} />
      </SectionLayout>

      <ResultModal visible={isShowResultModal} isSuccess={isSuccess} onClose={handleCloseModal} />
    </div>
  )
}

export default ReviewsPage
