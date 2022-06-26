import { ReactElement, ReactNode } from "react"
import { rateType } from "../ReviewCard/ReviewCard"
import classNames from "classnames"
import Icon from "components/Icon/Icon"
import Rate from "components/Rate/Rate"
import Image from "next/image"
import styles from "./ReviewCompleted.module.scss"
export interface ReviewCompletedProps {
  className?: string
  children?: ReactElement | ReactNode
  avatarUrl?: string
  content?: string
  listImage?: any[]
  dateVisit?: string
  name?: string
  rating?: number
  censorshipLabel?: string
  status?: "pending" | "approved" | "denied",
  date?: string
  isDivier?: boolean
  user: any
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
    user,
    censorshipLabel,
    status,
    date,
    isDivier = false
  } = props

  const reviewCompletedClassName = classNames(styles.review_completed, className, {
    [styles.divider]: isDivier
  })

  const statusClassName = classNames(styles.status, {
    [styles.pending]: status === "pending",
    [styles.approved]: status === "approved",
    [styles.denied]: status === "denied",
  })
  const censoredStatusClassName = classNames(styles.censored_status, "flex", {
    ['justify-end']: status === "denied",
  })

  return (
    <div className={reviewCompletedClassName}>
      <div className={styles.group_heading}>
        <div className={styles.review_avatar}>
          <Image
            src={user?.avatar || avatarUrl}
            height={56}
            width={56}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="flex items-center justify-between flex-wrap w-full mb-2.5">
          <h6 className={styles.name}>
            <span>{user?.first_name + " " + user?.last_name}</span>
            {censorshipLabel && (<span className="font-normal ml-2">has reviewed</span>)}
          </h6>
          <div className={styles.status_date}>
            {status && (<div className={statusClassName}>{status}</div>)}
            {date && (<div className={styles.date}>{`24-2-2021`}</div>)}
          </div>
        </div>
      </div>
      <div className={styles.review_summary}>
        {rating && (
          <div className={styles.rating_group}>
            <Rate
              readonly={true}
              initialRating={rating}
            />
            <div className={styles.rating_type}>{rateType[rating]}</div>
          </div>
        )}
        {content && (<p className={styles.content}>{content}</p>)}
        {listImage && listImage.length &&
        (<ul className={styles.image_list}>
          {listImage?.map((image, index) => (
            <li key={index} className={styles.image_item}>
              <Image
                src={image}
                height={106}
                width={106}
                className="rounded-2xl"
                alt=""
              />
            </li>))}
        </ul>)}
        {dateVisit && (<div className={styles.date_visit}><strong>Date of visit:</strong> March 2021</div>)}
        {children && (
          <div className={styles.children}>
            {children}
          </div>
        )}

        {status !== "pending" && (
          <div className={censoredStatusClassName}>
            {status === "approved" && (
              <div className={styles.censored_status_approved}>
                <Icon icon="checked-approved" className="mr-3"/>
                <span>Approved on {date}</span>
              </div>
            )}
            {status === "denied" && (
              <div className={styles.censored_status_denied}>
                <span>Contact admin</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewCompleted
