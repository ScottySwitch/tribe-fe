import { useRouter } from "next/router"
import { useState } from "react"
import { rateType, ReviewForm } from "components/ReviewsPage/ReviewCard/ReviewCard"
import classNames from "classnames"
import ModalReviewSuccess from "components/ReviewsPage/ModalReviewSuccess/ModalReviewSuccess"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Icon from "components/Icon/Icon"
import TopSearches from "components/ReviewsPage/TopSearches/TopSearches"
import Image from "next/image"
import Rate from "components/Rate/Rate"
import ReviewCompleted from "components/ReviewsPage/ReviewCompleted/ReviewCompleted"
import styles from "styles/Reviews.module.scss"
import ModalReviewFail from "components/ReviewsPage/ModalReviewFail/ModalReviewFail"

const dummyKeywords = [
  "Fast Food", "Desserts", "Desserts", "Desserts", "Desserts", "Desserts", "Desserts",
  "Fast Food", "Desserts", "Desserts", "Desserts", "Desserts", "Fast Food", "Desserts",
  "Desserts", "Desserts", "Beverages", "Desserts", "Beverages", "Fast Food", "Desserts",
  "Fast Food", "Desserts", "Beverages", "Desserts", "Beverages", "Fast Food", "Desserts"
]

const AddReviewPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [rating, setRating] = useState<number>()
  const [ratingType, setRatingType] = useState<string>("")
  const [isRecent, setIsRecent] = useState<boolean>(true)
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false)
  const [isModalFail, setIsModalFail] = useState<boolean>(false)
  
  const dividerVerticalClassName = classNames({
    [styles.divider_vertical]: isRecent
  })

  const handleCickRating = (value: number) => {
    setRating(value)
    setRatingType(rateType[value])
  }

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
    <div className={styles.review_add_new}>
      <SectionLayout>
        <div className={styles.container}>
          <div className={`${styles.container_left} ${dividerVerticalClassName}`}>
            <h1 className={styles.page_title}>Add your review</h1>
            <div className={`${styles.review_card} mb-0 sm:mb-7`}>
              <div className={styles.featured_image}>
                <div className={styles.verified}>
                  <Icon icon="verified-tag" className={styles.verified_icon} />
                </div>
                <Image
                  src="https://picsum.photos/300/600"
                  width="100%"
                  height="56%"
                  layout="responsive"
                  className="rounded-lg"
                  alt="review_featured_image"
                />
              </div>
              <div className="w-full">
                <h4 className={styles.title}>Evertop Hainanese Boneless Chicken</h4>
                <div className={styles.location}>50 Bussorah St, Singapore 199466</div>
              </div>
            </div>
            <p className={`${styles.note} mb-8`}>Your first-hand experiences would help and inspire our fellow Tribes member to get ideas and make better planning. Thank you!</p>
            <p className={`${styles.note} mb-6`}>Your overall rating of this place</p>
            <div className="flex mb-6">
              <Rate
                readonly={false}
                initialRating={rating}
                placeholderRating={0}
                onClick={handleCickRating}
              />
              <div className={styles.cta_click}>{ratingType}</div>
            </div>
            <ReviewForm positionButton="right" onSubmit={handleSubmit}/>
          </div>
          {/* render when there are related reviews */}
          {
            isRecent &&
            (<div className={styles.container_right}>
              <div className="flex items-center mb-10 mt-5">
                <Icon icon="map-color" size={28}/>
                <h2 className={styles.page_title_sub}>Recent reviews of this place</h2>
              </div>
              {Array.from({length: 3}).map((review, index) => (
                <ReviewCompleted
                  key={index}
                  avatarUrl="https://picsum.photos/200"
                  listImage={["https://picsum.photos/106", "https://picsum.photos/106"]}
                  content={`Salam Alikoum, Excellente food. A must try specially lamb stew or chef signature couscous lamb. I go at least once a week !!! So Yammy. `}
                  dateVisit="March 2021"
                  rating={5}
                />
              ))}
            </div>)
          }
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

export default AddReviewPage