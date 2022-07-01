import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Heading from "components/Heading/Heading"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Rate from "components/Rate/Rate"
import ReportModal from "components/ReportModal/ReportModal"
import UserReviewCard from "components/ReviewsPage/UserReviewCard/UserReviewCard"
import Select from "components/Select/Select"
import { optionsReportReview, reviewSequenceOptions } from "constant"
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
  onSubmitReply: (value, id) => void
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
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})
  const router = useRouter()
  const [reply, setReply ] = useState<string>('')
  // const handleSetReplyReview = (value) => {
  //   if (value.length <= 100) {
  //     setReplyReview(value)
  //   }
  //   else {
  //     alert('Reply cannot over 100 character')
  //   }    
  // }

  const handleSubmitReportReview = () => {
    setShowReportModal(false)
  }

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
            <div key={index} className="mb-10">
              <UserReviewCard
                isPaid={isPaid}
                actions={!isViewPage}
                user={get(review, "user.data.attributes")}
                listImage={get(review, "images")}
                content={get(review, "content")}
                dateVisit={get(review, "visited_date")}
                rating={get(review, "rating")}
                reply={get(review, "reply_reviews")}
                replyAt={get(review, "date_create_reply")}
                onReplyClick={() => {
                  console.log('setSelectedReview', review)
                  setSelectedReview(review)
                  setShowReplyModal(true)
                }}
                onReportClick={() => setShowReportModal(true)}
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
      <ReportModal
        title="Why are you reporting this comment?"
        visible={showReportModal}
        options={optionsReportReview}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleSubmitReportReview}
      />
      <Modal
        visible={showReplyModal}
        title="Reply Review"
        width={780}
        onClose={() => setShowReplyModal(false)}
      >
        <div className="p-[30px]">
          <UserReviewCard
            isPaid={isPaid}
            actions={false}
            user={get(selectedReview, "user.data.attributes")}
            listImage={get(selectedReview, "images")}
            content={get(selectedReview, "content")}
            dateVisit={get(selectedReview, "visited_date")}
            rating={get(selectedReview, "rating")}
            reply={get(selectedReview, "reply_reviews")}
            replyAt={get(selectedReview, "date_create_reply")}
            onReplyClick={() => setShowReplyModal(false)}
          />
          {!get(selectedReview, "reply_reviews") &&
              <Input 
                placeholder="Reply ( 100 character maximum )" 
                value={reply}
                maxLength={100}
                onChange={(e: any) => setReply(e.target.value)}
              />
          }
        </div>
        <div className="flex gap-3 justify-end p-[30px]">
          <Button 
            text="Cancel" 
            variant="secondary-no-outlined" 
            onClick={() => setShowReplyModal(false)} 
          />
          <Button 
            text="Send reply"  
            onClick={() => {
              setShowReplyModal(false)
              // setReply (get(selectedReview, "reply_reviews") || '')
              onSubmitReply(reply, selectedReview)
            }}  
          />
        </div>
      </Modal>
    </div>
  )
}

export default HomepageReviews
