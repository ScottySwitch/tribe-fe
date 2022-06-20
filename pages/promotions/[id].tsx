import { inforCardList } from "constant"
import InforCard, { InforCardProps } from "components/InforCard/InforCard"
import PromotionCard, { IPromotionProp } from "components/PromotionCard/PromotionCard"
import Image from "next/image"
import CarouselBanner from "components/CarouselBanner/CarouselBanner"
import SectionLayout from "components/SectionLayout/SectionLayout"
import DividerSection from "components/DividerSection/DividerSection"
import ScrollingBox from "components/ScrollingBox/ScrollingBox"
import styles from "styles/Promotions.module.scss"

const dummyPromotion = [
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 17, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 30, 2022",
    type: 2,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 24, 2022",
    type: 1,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 2,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 2,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 2,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 2,
    link: "/",
    favourite: false,
  },
  {
    imgUrl: "https://picsum.photos/130/130",
    title: "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 28, 2022",
    type: 2,
    link: "/",
    favourite: false,
  }
]

const dummyBanner = [
  "https://picsum.photos/1185/255",
  "https://picsum.photos/1185/255//",
  "https://picsum.photos/1185/255/"
]

const Promotions = () => {
  return (
    <div className={styles.wrapper_promotions}>
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-8 md:pb-12`}>
        <div>
          <Image
            src="https://picsum.photos/1188/400"
            width={1188}
            height={400}
            layout="responsive"
            alt="alt"
          />
        </div>
      </SectionLayout>

      {/* Start FEATURED VOUCHERS */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-10`}>
        <DividerSection title="FEATURED VOUCHERS" className="mb-5 md:mb-8"/>
        <ScrollingBox
          className={styles.scrolling_box_custom}
          maxHeight={475}
        >
          <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
            {dummyPromotion?.map((promotion: IPromotionProp, index) => (
              <PromotionCard
                key={index}
                title={promotion.title}
                imgUrl={promotion.imgUrl}
                expiredAt={promotion.expiredAt}
                type={promotion.type}
                favourite={promotion.favourite}
                link={promotion.link}
              />
            ))}
          </div>
        </ScrollingBox>
      </SectionLayout>
      {/* End FEATURED VOUCHERS */}

      {/* Start BANNERS */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="BANNERS" className="mb-5 md:mb-8"/>
        <CarouselBanner>
          {dummyBanner?.map((banner: string) => (
            <Image
              key={banner}
              alt={banner}
              src={banner}
              width={1185}
              height={225}
              layout="responsive"
              className="rounded-lg"
            />
          ))}
        </CarouselBanner>
      </SectionLayout>
      {/* End BANNERS */}

      {/* Start HOT DEALS */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="HOT DEALS" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End HOT DEALS */}

      {/* Start POPULAR IN BUY */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="Popular in Buy" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End POPULAR IN BUY */}

      {/* Start POPULAR IN EAT */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="Popular in EAT" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End POPULAR IN EAT */}

      {/* Start Popular in SEE & DO */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="Popular in SEE & DO" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End Popular in SEE & DO */}

      {/* Start Popular in TRANSPORT */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="Popular in TRANSPORT" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End Popular in TRANSPORT */}

      {/* Start Popular in STAY */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="Popular in STAY" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End Popular in STAY */}

      {/* Start Shop more deals */}
      <SectionLayout className={`${styles.section_layout_background_color} pt-0 pb-12 md:pb-16`}>
        <DividerSection title="Shop more deals" className="mb-5 md:mb-8"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
          {
            inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
              />
            ))
          }
        </div>
      </SectionLayout>
      {/* End Shop more deals */}
    </div>
  )
}

export default Promotions