import { randomId } from "utils";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import SectionLayout from "components/SectionLayout/SectionLayout";
import ReviewSearchBox from "components/ListingSearchBox/ListingSearchBox";
import ReviewCard from "components/ReviewsPage/ReviewCard/ReviewCard";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import { dummyKeywords } from "constant";

import styles from "styles/Reviews.module.scss";
import TopSearches from "components/TopSearches/TopSearches";
import BizListingApi from "../../services/biz-listing";
import get from "lodash/get";
import ReviewApi from "../../services/review";
import ContributeApi from "services/contribute";
import { UserInforContext } from "Context/UserInforContext";
import { useDebounce } from "usehooks-ts";
import { changeToSlugify } from "utils";
import { useRouter } from "next/router";

const ReviewsPage = () => {
  const { user } = useContext(UserInforContext);
  const [isShowResultModal, setIsShowResultModal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [location, setLocation] = useState();
  const [listingOptions, setListingOptions] = useState<any>([]);
  const [searchKey, setSearchKey] = useState("");
  const [listingSearchResult, setListingSearchResult] = useState<any>([]);
  const debouncedSearchTerm = useDebounce(changeToSlugify(searchKey), 500);
  const router = useRouter();

  const resultType = [
    {
      title: "Thank you",
      message:
        "Thank you for sharing your experience and helping to improve this listing!",
      textButton: "Close",
    },
    {
      title: "Uh...oh...",
      message: "Something went wrong. Let’s give it another try!",
      textButton: "Try again",
    },
  ];

  useEffect(() => {
    const getRandomListing = async () => {
      const result = await BizListingApi.getListingBySlug("", location, 7);
      const data = get(result, "data.data");
      setListingSearchResult(data);
    };
    if (listingSearchResult.length === 0) {
      getRandomListing();
    }
  }, []);

  useEffect(() => {
    const getBizListing = async () => {
      const data = await BizListingApi.getListingBySlug(
        debouncedSearchTerm,
        location,
        20
      );
      setListingOptions(get(data, "data.data"));
    };

    debouncedSearchTerm ? getBizListing() : setListingOptions([]);
  }, [debouncedSearchTerm, location]);

  const calcRateNumber = (reviews) => {
    // TODO: rateNumber not work on FE
    const reviewsData = get(reviews, "data");
    let rateNumber = 0;
    if (reviewsData?.length > 0) {
      let sum = 0;
      reviewsData.map((review) => {
        sum += get(review, "attributes.rating") || 0;
      });
      rateNumber = Math.ceil(sum / reviewsData.length);
    } else {
      rateNumber = 0;
    }
    return rateNumber;
  };

  const handleCloseModal = () => {
    router.push("/");
    setIsShowResultModal(false);
  };

  const handleSubmit = async (dataSend: any) => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const bizListingId = get(listingSearchResult, "[0].id");
    const dataSendApi = {
      user: userInfo.id,
      biz_listing: bizListingId,
      rating: dataSend.rating,
      content: dataSend.content,
      visited_date: dataSend.visitedDate,
      images: dataSend.images,
    };
    const data = await ReviewApi.addReview(dataSendApi);
    if (data) {
      const dataSendContribute = {
        user: userInfo.id,
        biz_listing: bizListingId,
        type: "Review",
        status: "Approved",
        review: get(data, "data.data.id"),
      };
      await ContributeApi.createContribute(dataSendContribute).then(() => {});
      setIsShowResultModal(true);
      setIsSuccess(true);
    }
  };

  return (
    <div className={`${styles.review}`}>
      <div className="relative pb-6 bg-white">
        <Image
          src="https://picsum.photos/1440"
          width="100%"
          height="30%"
          layout="responsive"
          objectFit="cover"
          alt=""
        />
        <SectionLayout
          className={styles.section_review_search_box}
          childrenClassName="h-full"
          containerClassName={styles.section_review_search_box_container}
        >
          <ReviewSearchBox
            title="Review a place you've visited"
            onListingSearchChange={(e) => {
              setListingSearchResult([e]);
            }}
            onInputChange={(e) => setSearchKey(e)}
            onLocationChange={(e) => setLocation(e.value)}
            listingOptions={listingOptions}
          />
        </SectionLayout>
      </div>
      <SectionLayout
        childrenClassName={styles.section_children_reviews}
        containerClassName={styles.section_children_reviews_container}
      >
        <div className={styles.main_content}>
          <div className="font-semibold text-sm sm:text-base mb-8">
            Share your experiences with the Tribes community!
          </div>
          <div className="review-list">
            {listingSearchResult?.map((review) => (
              <ReviewCard
                slug={get(review, "attributes.slug")}
                key={review.id}
                id={review.id}
                title={get(review, "attributes.name")}
                imgUrl={
                  get(review, "attributes.images[0]") ||
                  "https://picsum.photos/200/300"
                }
                isVerified={get(review, "attributes.is_verified")}
                rateNumber={calcRateNumber(get(review, "attributes.reviews"))}
                location={get(review, "attributes.address")}
                onSubmit={handleSubmit}
              />
            ))}
          </div>
        </div>
        <div className={`${styles.advertisement} mt-8`}>
          <Image
            src="https://picsum.photos/300/600"
            height={600}
            width={300}
            alt=""
          />
        </div>
      </SectionLayout>

      <SectionLayout
        className={styles.top_search}
        containerClassName={styles.top_search_container}
      >
        <TopSearches />
      </SectionLayout>

      <ResultModal
        resultType={resultType}
        visible={isShowResultModal}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ReviewsPage;
