import { useRouter } from "next/router"
import ModalReviewSuccess from "components/ReviewsPage/ModalReviewSuccess/ModalReviewSuccess"
import SectionLayout from "components/SectionLayout/SectionLayout"
import styles from "styles/Reviews.module.scss"
import { ReviewForm } from "components/ReviewsPage/ReviewCard/ReviewCard"
import Icon from "components/Icon/Icon"

const AddReviewPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.review_add_new}>
      <SectionLayout>
        <div className={styles.container}>
          <div className={`${styles.container_left} ${styles.divider_vertical}`}>
            <h1 className={styles.page_title}>Add your review</h1>
            <ReviewForm />
          </div>
          <div className={styles.container_right}>
            <div className="flex items-center">
              <Icon icon="map-color" size={28}/>
              <h2 className={styles.page_title_sub}>Recent reviews of this place</h2> 
            </div>
          </div>
        </div>
      </SectionLayout>
      <ModalReviewSuccess visible={false} />
    </div>
  )
}

export default AddReviewPage