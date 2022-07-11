import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  rateType,
  ReviewForm,
} from "components/ReviewsPage/ReviewCard/ReviewCard";
import classNames from "classnames";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import Rate from "components/Rate/Rate";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import styles from "styles/Reviews.module.scss";
import TopSearches from "components/TopSearches/TopSearches";
import ReviewApi from "../../../services/review";
import { data } from "browserslist";
import BizListingApi from "../../../services/biz-listing";
import get from "lodash/get";
import UserReviewCard from "components/ReviewsPage/UserReviewCard/UserReviewCard";
import { dummyTopSearchKeywords } from "constant";
import ContributeApi from "services/contribute"

const AddReviewPage = () => {
  const router = useRouter();
  // const { id } = router.query

  const [rating, setRating] = useState<number>();
  const [ratingType, setRatingType] = useState<string>("");
  const [isRecent, setIsRecent] = useState<boolean>(true);
  const [isShowResultModal, setIsShowResultModal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any>();
  const [bizListing, setBizListing] = useState<any>();

  const dividerVerticalClassName = classNames({
    [styles.divider_vertical]: isRecent,
  });

  const {
    query: { listingSlug },
  } = useRouter();

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      const data = await BizListingApi.getBizListingReviews(listingSlug);
      const listingData = get(data, "data.data");
      if (listingData.length > 0) {
        const listing = get(listingData, "[0]");
        setReviews(get(listing, "attributes.reviews.data"));
        setBizListing(listing);
      }
    };
    if (listingSlug) {
      getListingData(listingSlug);
    }
  }, [listingSlug]);

  const handleCickRating = (value: number) => {
    setRating(value);
    setRatingType(rateType[value]);
  };

  const handleCloseModal = () => {
    setIsShowResultModal(false);
  };

  const handleSubmit = async (dataSend) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const dataSendApi = {
      user: userInfo.id,
      biz_listing: bizListing.id,
      rating,
      content: dataSend.content,
      visited_date: dataSend.visitedDate,
      images: dataSend.images,
    };
    const dataSendContribute = {
      user: userInfo.id,
      biz_listing: bizListing.id,
      type: "Review",
      status: "Approved"
    }
    await ReviewApi.addReview(dataSendApi).then(() => {
      setIsShowResultModal(true);
      setIsSuccess(true);
    });
    await ContributeApi.createContribute(dataSendContribute).then(() => {
    });
  };

  return (
    bizListing && (
      <div className={styles.review_add_new}>
        <SectionLayout>
          <div className={styles.container}>
            <div
              className={`${styles.container_left} ${dividerVerticalClassName}`}
            >
              <h1 className={styles.page_title}>Add your review</h1>
              <div className={`${styles.review_card} mb-0 sm:mb-7`}>
                <div className={styles.featured_image}>
                  <div className={styles.verified}>
                    <Icon
                      icon="verified-tag"
                      className={styles.verified_icon}
                    />
                  </div>
                  <Image
                    src={
                      get(bizListing, "attributes.images[0]") ||
                      "https://picsum.photos/300/600"
                    }
                    width="100%"
                    height="56%"
                    layout="responsive"
                    className="rounded-lg"
                    alt="review_featured_image"
                  />
                </div>
                <div className="w-full">
                  <h4 className={styles.title}>
                    {get(bizListing, "attributes.name")}
                  </h4>
                  <div className={styles.location}>
                    {get(bizListing, "attributes.address")}
                  </div>
                </div>
              </div>
              <p className={`${styles.note} mb-8`}>
                Your first-hand experiences would help and inspire our fellow
                Tribes member to get ideas and make better planning. Thank you!
              </p>
              <p className={`${styles.note} mb-6`}>
                Your overall rating of this place
              </p>
              <div className="flex mb-6">
                <Rate
                  readonly={false}
                  initialRating={rating}
                  placeholderRating={0}
                  onClick={handleCickRating}
                />
                <div className={styles.cta_click}>{ratingType}</div>
              </div>
              <ReviewForm positionButton="right" onSubmit={handleSubmit} />
            </div>
            {/* render when there are related reviews */}
            {isRecent && (
              <div className={styles.container_right}>
                <div className="flex items-center mb-10 mt-5">
                  <Icon icon="map-color" size={28} />
                  <h2 className={styles.page_title_sub}>
                    Recent reviews of this place
                  </h2>
                </div>
                {reviews.length > 0 &&
                  reviews.map((review, index) => (
                    <UserReviewCard
                      key={index}
                      user={get(review, "attributes.user.data.attributes")}
                      listImage={get(review, "attributes.images")}
                      content={get(review, "attributes.content")}
                      dateVisit={get(review, "attributes.visited_date")}
                      rating={get(review, "attributes.rating")}
                    />
                  ))}
              </div>
            )}
          </div>
        </SectionLayout>

        <SectionLayout>
          <TopSearches />
        </SectionLayout>

        <ResultModal
          visible={isShowResultModal}
          isSuccess={isSuccess}
          onClose={handleCloseModal}
        />
      </div>
    )
  );
};

export default AddReviewPage;
