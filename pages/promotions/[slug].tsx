import { inforCardList } from "constant";
import DealsDetailsModal, {
  IDealsDetails,
} from "components/DealDetailModal/DealDetailModal";
import ProductDetailsModal, {
  IProduct,
} from "components/ProductDetailModal/ProductDetailModal";
import InforCard from "components/InforCard/InforCard";
import PromotionCard from "components/PromotionCard/PromotionCard";
import Image from "next/image";
import CarouselBanner from "components/CarouselBanner/CarouselBanner";
import SectionLayout from "components/SectionLayout/SectionLayout";
import DividerSection from "components/DividerSection/DividerSection";
import ScrollingBox from "components/ScrollingBox/ScrollingBox";
import styles from "styles/Promotions.module.scss";
import { useEffect, useState } from "react";
import PromotionApi from "services/promotion";
import get from "lodash/get";
import { useRouter } from "next/router";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { calcRateNumber } from "utils";
import Link from "next/link";

const dummyPromotion = [
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 17, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 30, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 24, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    images: ["https://picsum.photos/130"],
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
];

const dummyBanner = [
  "https://picsum.photos/1185/255",
  "https://picsum.photos/1185/255//",
  "https://picsum.photos/1185/255/",
];

const dummyDealsDetails: IDealsDetails = {
  name: "Evertop Hainanese Boneless Chicken",
  imgUrl: "https://picsum.photos/678/169",
  offers:
    "Complimentary top up set (mushroom soup with garlic bread) with every main purchased.",
  valid: "April 17, 2022 - April 17, 2022",
  conditions:
    "A valid tribe listing pass must be presented upon payment to enjoy the offer.",
};

const dummyProductDetails: IProduct = {
  id: 678,
  name: "Evertop Hainanese Boneless Chicken / Evertop Hainanese Boneless Chicken Evertop Hainanese Boneless Chicken ",
  images: [
    "https://picsum.photos/300/301",
    "https://picsum.photos/200/311",
    "https://picsum.photos/200/299",
    "https://picsum.photos/200/312",
    "https://picsum.photos/300/301",
    "https://picsum.photos/200/311",
    "https://picsum.photos/201/302",
    "https://picsum.photos/202/310",
    "https://picsum.photos/221/302",
    "https://picsum.photos/252/310",
  ],
  price: 40.35,
  priceSale: 37.35,
  discount: 40,
  description: `
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
    <p>Please allow us to choose one for you. We cannot guarantee a specific color. The KONG Puppy toy is customized for a growing puppy’s baby teeth, the unique, natural rubber formula is the most gentle within the KONG rubber toy line. Designed to meet the needs of a puppy’s 28-baby teeth, it helps teach appropriate chewing behavior while offering enrichment and satisfying a younger pup’s instinctual needs. Meanwhile, the erratic bounces make it ideal for those pups that just want to play.</p>
  `,
  type: "paid",
};

const PromotionsPage = () => {
  const [showModalDealsDetails, setShowModalDealsDetails] = useState<boolean>();
  const [dealsDetails, setDealsDetails] = useState<IDealsDetails>(
    {} as IDealsDetails
  );
  const [showModalProductDetails, setShowModalProductDetails] =
    useState<boolean>();

  const router = useRouter();

  const handleDealsDetails = (value: boolean, dealInfo?: any) => {
    setShowModalDealsDetails(value);
    if (dealInfo) {
      setDealsDetails(dealInfo);
    }
  };

  const handleShare = () => {
    console.log("handleShare");
  };

  const handleFavourite = () => {
    console.log("handleFavourite");
  };

  const [bizListings, setBizListings] = useState<any>([]);

  const {
    query: { slug },
  } = useRouter();

  const [promotion, setPromotion] = useState<any>([]);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const getPromotionBySlug = async (slug) => {
      const data = await PromotionApi.getPromotionBySlug(slug);
      const promotionData = get(data, "data.data");
      if (promotionData.length === 0) {
        router.push("/");
      }
      setPromotion(get(promotionData, "[0].attributes"));
      setBizListings(
        get(promotionData, "[0].attributes.microsite_biz_listings")
      );
    };
    if (slug) {
      getPromotionBySlug(slug).catch((e) => console.log(e));
    }
  }, [slug]);

  const checkLogin = () => {
    console.log('check login')
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.token) {
      handleDealsDetails(true, promotion)
    }
    else {
      setShowAuthPopup(true)
    }
  }

  return (
    <div className={styles.wrapper_promotions}>
      <SectionLayout
        className={`${styles.section_layout_background_color} pt-0 pb-8 md:pb-12`}
      >
        <div>
          <Image
            src={
              get(promotion, "main_banner.data.attributes.url") ||
              "https://picsum.photos/1188/400"
            }
            width={1188}
            height={400}
            layout="responsive"
            alt="alt"
          />
        </div>
      </SectionLayout>

      {/* Start FEATURED VOUCHERS */}
      {Array.isArray(get(promotion, "deals.data")) &&
        get(promotion, "deals.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_background_color} pt-0 pb-10`}
          >
            <DividerSection
              title="FEATURED VOUCHERS"
              className="mb-5 md:mb-8"
            />
            <ScrollingBox
              className={styles.scrolling_box_custom}
              maxHeight={475}
            >
              <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
                {get(promotion, "deals.data").map((promotion, index) => (
                  <PromotionCard
                    key={index}
                    title={get(promotion, "attributes.name")}
                    imgUrl={
                      get(promotion, "attributes.images")
                        ? promotion.attributes.images[0]
                        : "https://picsum.photos/200/300"
                    }
                    expiredAt={`${get(
                      promotion,
                      "attributes.start_date"
                    )} - ${get(promotion, "attributes.end_date")}`}
                    type={1}
                    favourite={false}
                    size="large"
                    onClick={checkLogin}
                  />
                ))}
              </div>
            </ScrollingBox>
          </SectionLayout>
        )}
      {/* End FEATURED VOUCHERS */}

      {/* Start BANNERS */}
      {Array.isArray(get(promotion, "banners.data")) &&
        get(promotion, "banners.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}
          >
            <DividerSection title="BANNERS" className="mb-5 md:mb-8" />
            <CarouselBanner>
              {get(promotion, "banners.data").map((banner: any) => (
                <Image
                  key={banner}
                  alt={banner}
                  src={get(banner, "attributes.url")}
                  width={1185}
                  height={225}
                  layout="responsive"
                  className="rounded-lg"
                />
              ))}
            </CarouselBanner>
          </SectionLayout>
        )}
      {/* End BANNERS */}

      {/* Start HOT DEALS */}
      {Array.isArray(get(promotion, "hot_deals.data")) &&
        get(promotion, "hot_deals.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_background_color} pt-0 pb-10`}
          >
            <DividerSection title="HOT DEALS" className="mb-5 md:mb-8" />
            <ScrollingBox
              className={styles.scrolling_box_custom}
              maxHeight={475}
            >
              <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
                {get(promotion, "hot_deals.data").map((promotion, index) => (
                  <PromotionCard
                    key={index}
                    title={get(promotion, "attributes.name")}
                    imgUrl={
                      get(promotion, "attributes.images")
                        ? promotion.attributes.images[0]
                        : "https://picsum.photos/200/300"
                    }
                    expiredAt={`${get(
                      promotion,
                      "attributes.start_date"
                    )} - ${get(promotion, "attributes.end_date")}`}
                    type={1}
                    favourite={false}
                    size="large"
                    onClick={checkLogin}
                  />
                ))}
              </div>
            </ScrollingBox>
          </SectionLayout>
        )}
      {/* End HOT DEALS */}

      {/* Start loop biz_listing components */}
      {bizListings.map(
        (bizListing, index) =>
          Array.isArray(get(bizListing, "biz_listings.data")) &&
          get(bizListing, "biz_listings.data").length > 0 && (
            <SectionLayout
              className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}
              key={index}
            >
              <DividerSection
                title={bizListing.title}
                className="mb-5 md:mb-8"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
                {Array.isArray(get(bizListing, "biz_listings.data")) &&
                  get(bizListing, "biz_listings.data")?.map((card, index) => (
                    <Link
                      href={`/biz/home/${get(card, "attributes.slug")}`}
                      key={index}
                    >
                      <InforCard
                        key={index}
                        imgUrl={
                          get(card, "attributes.images")
                            ? card.attributes.images[0]
                            : "https://picsum.photos/200/300"
                        }
                        title={get(card, "attributes.name")}
                        rate={calcRateNumber(
                          get(card, "attributes.reviews.data")
                        )}
                        rateNumber={
                          get(card, "attributes.reviews.data")
                            ? get(card, "attributes.reviews.data").length
                            : 0
                        }
                        followerNumber={
                          get(card, "attributes.user_listing_follows.data")
                            ? get(card, "attributes.user_listing_follows.data")
                                .length
                            : 0
                        }
                        description={get(card, "attributes.description")}
                        price={get(card, "attributes.min_price")}
                        currency={get(card, "attributes.currency").toUpperCase()}
                        categories={card.categories}
                        tags={get(card, "attributes.tags.data")}
                        iconTag={true}
                        isVerified={get(card, "attributes.is_verified")}
                        className="w-full"
                      />
                    </Link>
                  ))}
              </div>
            </SectionLayout>
          )
      )}

      {/* Start Shop more deals */}
      {Array.isArray(get(promotion, "more_deals.data")) &&
        get(promotion, "more_deals.data").length > 0 && (
          <SectionLayout
            className={`${styles.section_layout_background_color} pt-0 pb-10`}
          >
            <DividerSection title="Shop more deals" className="mb-5 md:mb-8" />
            <ScrollingBox
              className={styles.scrolling_box_custom}
              maxHeight={475}
            >
              <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
                {get(promotion, "more_deals.data").map((promotion, index) => (
                  <PromotionCard
                    key={index}
                    title={get(promotion, "attributes.name")}
                    imgUrl={
                      get(promotion, "attributes.images")
                        ? promotion.attributes.images[0]
                        : "https://picsum.photos/200/300"
                    }
                    expiredAt={`${get(
                      promotion,
                      "attributes.start_date"
                    )} - ${get(promotion, "attributes.end_date")}`}
                    type={1}
                    favourite={false}
                    size="large"
                    onClick={checkLogin}
                  />
                ))}
              </div>
            </ScrollingBox>
          </SectionLayout>
        )}

      <DealsDetailsModal
        visible={showModalDealsDetails}
        data={dealsDetails}
        onClose={() => handleDealsDetails(false)}
        onShare={() => handleShare()}
        onFavourite={() => handleFavourite()}
      />

      <ProductDetailsModal
        visible={showModalProductDetails}
        data={dummyProductDetails}
        onClose={() => setShowModalProductDetails(false)}
      />
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
    </div>
  );
};

export default PromotionsPage;
