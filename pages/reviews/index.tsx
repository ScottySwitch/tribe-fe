import { randomId } from "utils"
import ReviewCard from "components/ReviewsPage/ReviewCard/ReviewCard"
import TopSearches from "components/ReviewsPage/TopSearches/TopSearches"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Image from "next/image"
import styles from "styles/Reviews.module.scss"

const dummyReviews = [
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 3,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 3,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 3,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 3,
    location: "50 Bussorah St, Singapore 199466"
  },
  {
    id: randomId(),
    title: "Evertop Hainanese Boneless Chicken",
    imgUrl: "https://picsum.photos/300/600",
    isVerified: true,
    rateNumber: 3,
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
  return (
    <div className="wrapper-reviews">
      <div>
        <Image
          src="https://picsum.photos/1440"
          width="100%"
          height="30%"
          layout="responsive"
          alt=""
        />
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
                />
              ))
            }
          </div>
        </div>
        <div className={styles.advertisement}>
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
    </div>
  )
}

export default ReviewsPage