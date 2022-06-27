import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Heading from "components/Heading/Heading"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import { ReviewForm } from "components/ReviewsPage/ReviewCard/ReviewCard"
import ReviewCompleted from "components/ReviewsPage/ReviewCompleted/ReviewCompleted"
import { get } from "lodash"
import Image from "next/image"
import { useState } from "react"

interface HomepageReviewsProps {
  isPaid?: boolean
  isViewPage?: boolean
  reviews: any[]
  onSubmitReply?: (any) => void
}

const HomepageReviews = (props: HomepageReviewsProps) => {
  const { reviews, isPaid, isViewPage, onSubmitReply } = props
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})
  return (
    <div>
      <Heading text="Reviews" />
      <div className="mt-5">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index}>
              <ReviewCompleted
                isPaid={true}
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
          <ReviewCompleted
            isPaid={true}
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
