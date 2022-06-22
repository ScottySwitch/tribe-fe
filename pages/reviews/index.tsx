import { randomId } from "utils"
import { useState } from "react"
import Image from "next/image"
import SectionLayout from "components/SectionLayout/SectionLayout"
import ReviewSearchBox from "components/ReviewsPage/ReviewSearchBox/ReviewSearchBox"
import ReviewCard from "components/ReviewsPage/ReviewCard/ReviewCard"
import TopSearches from "components/ReviewsPage/TopSearches/TopSearches"
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal"
import styles from "styles/Reviews.module.scss"

const dummyReviews = [
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 0,
    location: "50 Bussorah St, Singapore 199466"
  }
]

const dummyKeywords = [
  "Fast Food", "Desserts", "Desserts", "Desserts", "Desserts", "Desserts", "Desserts",
  "Fast Food", "Desserts", "Desserts", "Desserts", "Desserts", "Fast Food", "Desserts",
  "Desserts", "Desserts", "Beverages", "Desserts", "Beverages", "Fast Food", "Desserts",
  "Fast Food", "Desserts", "Beverages", "Desserts", "Beverages", "Fast Food", "Desserts"
]

const ReviewsPage = () => {
  const [isShowResultModal, setIsShowResultModal] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsShowResultModal(false)
  }
  
  const handleSubmit = () => {
    setIsSuccess(true)
    setIsShowResultModal(true)
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
          <ReviewSearchBox />
        </SectionLayout>
      </div>
      <SectionLayout 
        childrenClassName={styles.section_children_reviews}
        containerClassName={styles.section_children_reviews_container}
      >
        <div className={styles.main_content}>
          <div className="font-semibold text-sm sm:text-base mb-8">Share your experiences with the Tribes community!</div>
          <div className="review-list">
            {
              dummyReviews?.map((review) => (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  title={review.title}
                  imgUrl={review.imgUrl}
                  isVerified={review.isVerified}
                  rateNumber={review.rateNumber}
                  location={review.location}
                  onSubmit={handleSubmit}
                />
              ))
            }
          </div>
        </div>
        <div className={`${styles.advertisement} mt-8`}>
          <Image
            src="https://picsum.photos/300/600"
            height={600}
            width={300}
            alt=""
          />
        </div>
      </SectionLayout>

      <SectionLayout className={styles.top_search} containerClassName={styles.top_search_container}>
        <TopSearches keywords={dummyKeywords}/>
      </SectionLayout>

      <ResultModal
        visible={isShowResultModal}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ReviewsPage