import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Heading from "components/Heading/Heading"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Rate from "components/Rate/Rate"
import { ReviewForm } from "components/ReviewsPage/ReviewCard/ReviewCard"
import UserReviewCard from "components/ReviewsPage/UserReviewCard/UserReviewCard"
import Select from "components/Select/Select"
import { reviewSequenceOptions } from "constant"
import { get } from "lodash"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { IOption } from "type"

import styles from "./HomepageReviews.module.scss"
interface HomepageReviewsProps {
  isPaid?: boolean
  listingSlug?: any
  isViewPage?: boolean
  listingRate?: number
  reviews: any[]
  onSubmitReply?: (any) => void
  onChangeReviewsSequence: (e: IOption) => void
}

const HomepageReviews = (props: HomepageReviewsProps) => {
  const {
    listingSlug,
    reviews,
    listingRate,
    isPaid,
    isViewPage,
    onSubmitReply,
    onChangeReviewsSequence,
  } = props
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})

  const router = useRouter()

  return (
    <div>
      <Heading text="Reviews" />
      <br />
      <div className="flex gap-3 items-center">
        <div className={styles.listing_rate}>{listingRate || 0}</div>
        <Rate readonly={true} initialRating={listingRate || 0} />
        <div className={styles.followers}>
          | {Array.isArray(reviews) && reviews.length} review(s)
        </div>
      </div>
      {isViewPage && (
        <div className="flex justify-between items-center mt-3">
          <Button
            variant="outlined"
            text="Add your review"
            width={300}
            prefix={<Icon icon="edit-color" />}
            onClick={() => router.push(`/reviews/${listingSlug}`)}
          />
          <Select
            width={200}
            options={reviewSequenceOptions}
            defaultValue={reviewSequenceOptions[0]}
            onChange={onChangeReviewsSequence}
          />
        </div>
      )}
      <br />
      <div>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index}>
              <UserReviewCard
                isPaid={isPaid}
                actions={!isViewPage}
                user={get(review, "attributes.user.data.attributes")}
                listImage={get(review, "attributes.images")}
                content={get(review, "attributes.content")}
                dateVisit={get(review, "attributes.visited_date")}
                rating={get(review, "attributes.rating")}
                onReplyClick={() => {
                  setSelectedReview(review)
                  setShowReplyModal(true)
                }}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={require("public/images/no-review.svg")} width={100} alt="" />
            <p>There are no review yet</p>
          </div>
        )}
      </div>
      <Modal
        visible={showReplyModal}
        title="Reply Review"
        width={780}
        onClose={() => setShowReplyModal(false)}
      >
        <div className="p-[30px]">
          <UserReviewCard
            isPaid={isPaid}
            actions={!isViewPage}
            user={get(selectedReview, "attributes.user.data.attributes")}
            listImage={get(selectedReview, "attributes.images")}
            content={get(selectedReview, "attributes.content")}
            dateVisit={get(selectedReview, "attributes.visited_date")}
            rating={get(selectedReview, "attributes.rating")}
            onReplyClick={() => setShowReplyModal(true)}
          />
          <Input placeholder="Reply ( 100 character minumum )" />
        </div>
        <div className="flex gap-3 justify-end p-[30px]">
          <Button text="Cancel" variant="secondary-no-outlined" />
          <Button text="Send reply" />
        </div>
      </Modal>
    </div>
  )
}

export default HomepageReviews
