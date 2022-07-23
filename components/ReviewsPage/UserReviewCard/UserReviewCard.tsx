import { ReactElement, ReactNode, useState } from "react";
import { rateType } from "../ReviewCard/ReviewCard";
import classNames from "classnames";
import Icon from "components/Icon/Icon";
import Rate from "components/Rate/Rate";
import Image from "next/image";
import styles from "./UserReviewCard.module.scss";
import Popover from "components/Popover/Popover";
import Button from "components/Button/Button";
import { calcDistanceFromNow } from "utils";
import Upload from "components/Upload/Upload";
import Album from "components/Album/Album";
import { get } from "lodash";
import Modal from "components/Modal/Modal";
export interface UserReviewCardProps {
  reply?: string;
  replyAt?: string;
  idReview?: string;
  className?: string;
  isPaid?: boolean;
  actions?: boolean;
  children?: ReactElement | ReactNode;
  listingCard?: ReactElement | ReactNode;
  avatarUrl?: string;
  content?: string;
  listImage?: any[];
  dateVisit?: string;
  displayName?: string;
  rating?: number;
  censorshipLabel?: string;
  status?: "Pending" | "Approved" | "Denied";
  date?: string;
  approvedDate?: string;
  publishedAt?: string;
  createdDate?: string;
  isDivier?: boolean;
  bizListingId?: number | string;
  user?: any;
  onReplyClick?(): void;
  onReportClick?(): void;
}

const UserReviewCard = (props: UserReviewCardProps) => {
  const {
    bizListingId,
    reply,
    replyAt,
    className = "",
    avatarUrl = "https://picsum.photos/200",
    content,
    listImage,
    dateVisit,
    listingCard,
    rating,
    isPaid,
    actions,
    user,
    censorshipLabel,
    status,
    children,
    date,
    approvedDate,
    createdDate,
    onReplyClick,
    onReportClick,
    isDivier = false,
  } = props;

  const [showAlbumModal, setShowAlbumModal] = useState(false);

  const userReviewCardClassName = classNames(
    styles.review_completed,
    className,
    {
      [styles.divider]: isDivier,
    }
  );

  const statusClassName = classNames(styles.status, {
    [styles.pending]: status === "Pending",
    [styles.approved]: status === "Approved",
    [styles.denied]: status === "Denied",
  });
  const censoredStatusClassName = classNames(styles.censored_status, "flex", {
    ["justify-end"]: status === "Denied",
  });

  return (
    <div className={userReviewCardClassName}>
      <div className={styles.group_heading}>
        <div className={styles.review_avatar}>
          {(user?.avatar || avatarUrl) && (
            <Image
              src={user?.avatar || avatarUrl}
              height={56}
              width={56}
              alt=""
              className="rounded-full"
            />
          )}
        </div>
        {/* <div className="flex items-center justify-between flex-wrap w-full mb-2.5">
          <div className={styles.header}>
            <h6 className={styles.name}>
              <span>
                {(user?.first_name || "") + " " + (user?.last_name || "")}
              </span>
              {censorshipLabel && (
                <span className="font-normal ml-2">{censorshipLabel}</span>
              )}
            </h6>
            {actions && (
              <Popover
                content={<div onClick={onReportClick}>Report review</div>}
                position="bottom-left"
              >
                <Icon icon="toolbar" />
              </Popover>
            )}
          </div>
          <div className={styles.status_date}>
            {status && <div className={statusClassName}>{status}</div>}
            {(createdDate || date) && (
              <div className={styles.date}>{createdDate || date}</div>
            )}
          </div>
        </div> */}
      </div>
      <div className={styles.review_summary}>
        <div className="flex items-center justify-between flex-wrap w-full mb-2.5">
          <div className={styles.header}>
            <h6 className={styles.name}>
              <span>
                {(user?.first_name || "") + " " + (user?.last_name || "")}
              </span>
              {censorshipLabel && (
                <span className="font-normal ml-2">{censorshipLabel}</span>
              )}
            </h6>
            {
              <Popover
                content={<div onClick={onReportClick}>Report review</div>}
                position="bottom-left"
              >
                <Icon icon="toolbar" />
              </Popover>
            }
          </div>
          <div className={styles.status_date}>
            {status && <div className={statusClassName}>{status}</div>}
            {(createdDate || date) && (
              <div className={styles.date}>{createdDate || date}</div>
            )}
          </div>
        </div>
        {rating && (
          <div className={styles.rating_group}>
            <Rate readonly={true} initialRating={rating} />
            <div className={styles.rating_type}>{rateType[rating]}</div>
          </div>
        )}
        {content && <p className={styles.content}>{content}</p>}
        {Array.isArray(listImage) && listImage.length > 0 && (
          <ul className={styles.image_list}>
            {listImage.map((image, index) => (
              <li
                key={index}
                className={styles.image_item}
                onClick={() => setShowAlbumModal(true)}
              >
                {typeof image === "string" && (
                  <Image
                    src={image}
                    height={106}
                    width={106}
                    className="rounded-2xl"
                    alt=""
                  />
                )}
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
        {status !== "Pending" && (
          <div className={censoredStatusClassName}>
            {status === "Approved" && (
              <div className={styles.censored_status_approved}>
                <Icon icon="checked-approved" className="mr-3" />
                <span>Approved on {approvedDate}</span>
              </div>
            )}
            {status === "Denied" && (
              <div className={styles.censored_status_denied}>
                <span>Contact admin</span>
              </div>
            )}
          </div>
        )}
        {reply && (
          <div className={styles.reply_review}>
            <div className={styles.head_review}>
              <p className={styles.title}>Response from the owner</p>
              <div className={styles.time_date}>
                {calcDistanceFromNow(replyAt)}
              </div>
            </div>
            <div className={styles.description_review}>{reply}</div>
          </div>
        )}
        {actions && (
          <div className="flex flex-wrap gap-y-0 gap-3">
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
      <Modal
        visible={showAlbumModal}
        title=" "
        width="90%"
        // maxHeight="90%"
        mobilePosition="center"
        onClose={() => setShowAlbumModal(false)}
      >
        <div className="p-5">
          <Album
            id="listing-review-album"
            reportMedia={false}
            key={get(listImage, "length")}
            images={listImage}
            listingId={bizListingId}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserReviewCard;
