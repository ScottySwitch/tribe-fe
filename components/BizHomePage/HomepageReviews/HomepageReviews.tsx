import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Rate from "components/Rate/Rate";
import ReportModal from "components/ReportModal/ReportModal";
import UserReviewCard from "components/ReviewsPage/UserReviewCard/UserReviewCard";
import Select from "components/Select/Select";
import { optionsReportReview, reviewSequenceOptions } from "constant";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IOption } from "type";
import ReportApi from "services/report";
import AuthPopup from "components/AuthPopup/AuthPopup";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";

import styles from "./HomepageReviews.module.scss";
interface HomepageReviewsProps {
  isPaid?: boolean;
  bizListingId?: number;
  listingSlug?: any;
  isViewPage?: boolean;
  listingRate?: number;
  reviews: any[];
  onSubmitReply: (value, id) => void;
  onChangeReviewsSequence?: (e: IOption) => void;
}

const HomepageReviews = (props: HomepageReviewsProps) => {
  const {
    bizListingId,
    listingSlug,
    reviews,
    listingRate,
    isPaid,
    isViewPage,
    onSubmitReply,
    // onChangeReviewsSequence,
  } = props;
  const [sortingReviews, setSortingReviews] = useState(reviews);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>({});
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [reply, setReply] = useState<string>("");
  const router = useRouter();

  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setSortingReviews(reviews);
  }, [reviews]);

  // const handleSetReplyReview = (value) => {
  //   if (value.length <= 100) {
  //     setReplyReview(value)
  //   }
  //   else {
  //     alert('Reply cannot over 100 character')
  //   }
  // }

  const calcRateNumber = (reviews) => {
    const reviewsData = reviews;
    let rateNumber = 0;
    if (reviewsData.length > 0) {
      let sum = 0;
      reviewsData.map((review) => {
        sum += get(review, "rating") || 0;
      });
      rateNumber = Math.ceil(sum / reviewsData.length);
    } else {
      rateNumber = 0;
    }
    return rateNumber;
  };

  const handleSubmitReportReview = async (data?: any) => {
    let userInfo;
    if (typeof localStorage.getItem("user") !== null) {
      userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    }
    const userId = userInfo.id || null;
    const body = {
      type: "review",
      reason: data,
      user: userId,
      review: selectedReview.id,
      biz_listing: bizListingId,
    };


    await ReportApi
    .createReport(body)
    .then((res) => {
      setMessage(
        "Thank you for your report. We will review the report and take action within 24 hours."
      );
      setSubmitResult(true)
    })
    .catch((error) => setSubmitResult(false))
    .finally(() => {
      setShowReportModal(false)
      setShowResultModal(true)
    });
  };

  const checkLogin = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.token
      ? router.push(`/reviews/${listingSlug}`)
      : setShowAuthPopup(true);
  };

  const handleChangeReviewSequence = (e) => {
    const newSequenceReviews = [...reviews];
    newSequenceReviews.sort((a, b) => {
      if (e.value === "lowest") {
        return a.rating - b.rating;
      } else if (e.value === "highest") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    setSortingReviews(newSequenceReviews);
  };

  return (
    <div>
      <Heading text="Reviews" />
      <br />
      <div className="flex gap-3 items-center">
        <div className={styles.listing_rate}>{calcRateNumber(reviews)}</div>
        <Rate readonly={true} initialRating={calcRateNumber(reviews)} />
        <div className={styles.followers}>
          | {Array.isArray(reviews) && reviews.length} review(s)
        </div>
      </div>
      {isViewPage && (
        <div className="flex justify-between items-center mt-3 gap-5">
          <Button
            variant="outlined"
            text="Add your review"
            width={300}
            prefix={<Icon icon="edit-color" />}
            onClick={checkLogin}
          />
          <Select
            width={200}
            menuWidth={200}
            options={reviewSequenceOptions}
            defaultValue={reviewSequenceOptions[0]}
            onChange={handleChangeReviewSequence}
          />
        </div>
      )}
      <br />
      <div>
        {Array.isArray(sortingReviews) && !!sortingReviews.length ? (
          sortingReviews.map((review, index) => (
            <div key={index} className="mb-10">
              <UserReviewCard
                isPaid={isPaid}
                actions={!isViewPage}
                user={get(review, "user.data.attributes")}
                listImage={get(review, "images")}
                content={get(review, "content")}
                dateVisit={get(review, "visited_date")}
                createdDate={get(review, "createdAt")}
                rating={get(review, "rating")}
                reply={get(review, "reply_reviews")}
                replyAt={get(review, "date_create_reply")}
                onReplyClick={() => {
                  setSelectedReview(review);
                  setShowReplyModal(true);
                }}
                onReportClick={() => {
                  setSelectedReview(review);
                  setShowReportModal(true);
                }}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={require("public/images/no-review.svg")}
              width={100}
              alt=""
            />
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
      <ResultModal
        message={message}
        visible={showResultModal}
        isSuccess={submitResult}
        onClose={() => setShowResultModal(false)}
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
          {!get(selectedReview, "reply_reviews") && (
            <Input
              placeholder="Reply ( 100 character maximum )"
              value={reply}
              maxLength={100}
              onChange={(e: any) => setReply(e.target.value)}
            />
          )}
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
              setShowReplyModal(false);
              setReply(get(selectedReview, "reply_reviews") || "");
              onSubmitReply(reply, selectedReview);
            }}
          />
        </div>
      </Modal>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

export default HomepageReviews;
