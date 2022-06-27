import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Popover from "components/Popover/Popover"
import Rate from "components/Rate/Rate"
import Image from "next/image"
import { ReactElement } from "react"
import { rateType } from "../ReviewCard/ReviewCard"

import styles from "./ReviewCompleted.module.scss"
interface ReviewCompletedProps {
  className?: string
  isPaid?: boolean
  repliable?: boolean
  children?: ReactElement
  avatarUrl?: string
  content?: string
  listImage?: any[]
  dateVisit?: string
  name?: string
  rating?: number
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
    isPaid,
    repliable,
    rating,
    user = {},
  } = props

  return (
    <div className={`${styles.review_completed} ${className}`}>
      <div className={styles.review_avatar}>
        {(user.avatar || avatarUrl) && (
          <Image
            src={user.avatar || avatarUrl}
            height={56}
            width={56}
            alt=""
            className="rounded-full"
          />
        )}
      </div>
      <div className={styles.review_sumary}>
        <div className={styles.header}>
          <h6 className={styles.name}>{user.first_name + " " + user.last_name}</h6>
          {repliable && (
            <Popover content={<div>Report review</div>}>
              <Icon icon="toolbar" />
            </Popover>
          )}
        </div>
        {rating && (
          <div className={styles.rating_group}>
            <Rate readonly={true} initialRating={rating} />
            <div className={styles.rating_type}>{rateType[rating]}</div>
          </div>
        )}

        {content && <p className={styles.content}>{content}</p>}

        {listImage && listImage.length && (
          <ul className={styles.image_list}>
            {listImage?.map((image, index) => (
              <li key={index} className={styles.image_item}>
                <Image src={image} height={106} width={106} className="rounded-2xl" alt="" />
              </li>
            ))}
          </ul>
        )}
        {dateVisit && (
          <div className={styles.date_visit}>
            <strong>Date of visit:</strong> {dateVisit}
          </div>
        )}
        {repliable && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              text="Reply review"
              width={150}
              className="mt-4"
              disabled={!isPaid}
            />
            {!isPaid && (
              <Button
                text="Upgrade to reply reviews"
                width={300}
                className="mt-4"
                backgroundColor="#3c4467"
                prefix={<Icon icon="star-2" color="white" />}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewCompleted
