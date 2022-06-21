import { randomId } from "utils"
import { useState } from "react"
import Image from "next/image"
import SectionLayout from "components/SectionLayout/SectionLayout"
import ReviewSearchBox from "components/ReviewsPage/ReviewSearchBox/ReviewSearchBox"
import ReviewCard from "components/ReviewsPage/ReviewCard/ReviewCard"
import TopSearches from "components/ReviewsPage/TopSearches/TopSearches"
import ModalReviewSuccess from "components/ReviewsPage/ModalReviewSuccess/ModalReviewSuccess"
import ModalReviewFail from "components/ReviewsPage/ModalReviewFail/ModalReviewFail"
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
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false)
  const [isModalFail, setIsModalFail] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalSuccess(false)
    setIsModalFail(false)
    if (isModalSuccess) {
      
    }
  }
  
  const handleSubmit = () => {
    setIsModalSuccess(true)
    // setIsModalFail(true)
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
        <SectionLayout className={styles.section_review_search_box} childrenClassName="h-full" containerClassName="h-full">
          <ReviewSearchBox />
        </SectionLayout>
      </div>

      <SectionLayout childrenClassName={styles.section_children_reviews}>
        <div className={styles.main_content}>
          <div className="font-semibold text-base mb-8">Share your experiences with the Tribes community!</div>
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

      <SectionLayout>
        <TopSearches keywords={dummyKeywords}/>
      </SectionLayout>

      <ModalReviewSuccess visible={isModalSuccess} onClose={handleCloseModal} />
      <ModalReviewFail visible={isModalFail} onClose={handleCloseModal} />
    </div>
  )
}

export default ReviewsPage