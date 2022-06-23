import Rate from "components/Rate/Rate"
import Image from "next/image"
import { ReactElement } from "react"
import { rateType } from "../ReviewCard/ReviewCard"
import styles from "./ReviewCompleted.module.scss"
interface ReviewCompletedProps {
  className?: string
  children?: ReactElement
  avatarUrl?: string
  content?: string
  listImage?: any[]
  dateVisit?: string
  name?: string
  rating?: number
}

const ReviewCompleted = (props: ReviewCompletedProps) => {
  const {
    className = "",
    children,
    avatarUrl = "https://picsum.photos/200",
    content,
    listImage,
    dateVisit,
    name,
    rating,
  } = props
  return (
    <div className={`${styles.review_completed} ${className}`}>
      <div className={styles.review_avatar}>
        <Image
          src={avatarUrl}
          height={56}
          width={56}
          alt=""
          className="rounded-full"
        />
      </div>
      <div className={styles.review_sumary}>
        <h6 className={styles.name}>Pragya Method</h6>
        {rating &&
          (<div className={styles.rating_group}>
            <Rate
              readonly={true}
              initialRating={rating}
            />
            <div className={styles.rating_type}>{rateType[rating]}</div>
          </div>)
        }

        {content &&
          (<p className={styles.content}>{content}</p>)
        }

        {listImage && listImage.length &&
        (<ul className={styles.image_list}>
          { listImage?.map((image, index) => (
            <li key={index} className={styles.image_item}>
              <Image
                src={image}
                height={106}
                width={106}
                className="rounded-2xl"
                alt=""
              />
            </li>
          ))
          }
        </ul>)}
        {dateVisit &&
          (<div className={styles.date_visit}><strong>Date of visit:</strong> March 2021</div>)
        }
      </div>
    </div>
  )
}

export default ReviewCompleted