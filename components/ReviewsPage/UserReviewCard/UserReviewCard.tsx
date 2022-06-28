import { ReactElement, ReactNode } from "react"
import { rateType } from "../ReviewCard/ReviewCard"
import classNames from "classnames"
import Icon from "components/Icon/Icon"
import Rate from "components/Rate/Rate"
import Image from "next/image"
import styles from "./UserReviewCard.module.scss"
import Popover from "components/Popover/Popover"
import Button from "components/Button/Button"
export interface UserReviewCardProps {
  className?: string
  isPaid?: boolean
  actions?: boolean
  children?: ReactElement | ReactNode
  avatarUrl?: string
  content?: string
  listImage?: any[]
  dateVisit?: string
  displayName?: string
  rating?: number
  censorshipLabel?: string
  status?: "pending" | "approved" | "denied"
  date?: string
  isDivier?: boolean
  user?: any
  onReplyClick?(): void
}

const UserReviewCard = (props: UserReviewCardProps) => {
  const {
    className = "",
    avatarUrl = "https://picsum.photos/200",
    content,
    listImage,
    dateVisit,
    displayName,
    rating,
    isPaid,
    actions,
    user,
    censorshipLabel,
    status,
    children,
    date,
    onReplyClick,
    isDivier = false,
  } = props

  const userReviewCardClassName = classNames(styles.review_completed, className, {
    [styles.divider]: isDivier,
  })

  const statusClassName = classNames(styles.status, {
    [styles.pending]: status === "pending",
    [styles.approved]: status === "approved",
    [styles.denied]: status === "denied",
  })
  const censoredStatusClassName = classNames(styles.censored_status, "flex", {
    ["justify-end"]: status === "denied",
  })

  return (
    <div className={userReviewCardClassName}>
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
          <div className={styles.header}>
            <h6 className={styles.name}>
              {/* <span>{displayName}</span> */}
              <span>{(user?.first_name || "") + " " + (user?.last_name || "")}</span>
              {censorshipLabel && <span className="font-normal ml-2">{censorshipLabel}</span>}
            </h6>
            {actions && (
              <Popover content={<div>Report review</div>} position="bottom-left">
                <Icon icon="toolbar" />
              </Popover>
            )}
          </div>
          <div className={styles.status_date}>
            {status && <div className={statusClassName}>{status}</div>}
            {date && <div className={styles.date}>{date}</div>}
          </div>
        </div>
      </div>
      <div className={styles.review_summary}>
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
            <strong>Date of visit: </strong>
            {dateVisit}
          </div>
        )}
        {children && <div className={styles.children}>{children}</div>}

        {status !== "pending" && (
          <div className={censoredStatusClassName}>
            {status === "approved" && (
              <div className={styles.censored_status_approved}>
                <Icon icon="checked-approved" className="mr-3" />
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
        {actions && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              text="Reply review"
              width={150}
              className="mt-4"
              disabled={!isPaid}
              onClick={onReplyClick}
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

export default UserReviewCard
