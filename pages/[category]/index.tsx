import ArticleCard from "components/ArticleCard/ArticleCard";
import Button from "components/Button/Button";
import Carousel from "components/Carousel/Carousel";
import CollectionCard from "components/CollectionCard/CollectionCard";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import {
  categories,
  curatedList,
  dummySubCategories,
  homeArticleCarousel,
  homeBannerResponsive,
  homeCarousel,
  homeCuratedCarousel,
  homeCuratedResponsive,
  infoCardResponsive,
  inforCardList,
} from "constant";
import { CategoryText } from "enums";
import useTrans from "hooks/useTrans";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "styles/Home.module.scss";

const Category = () => {
  const trans = useTrans();
  const router = useRouter();
  const {
    query: { category },
  } = router;

  const [subCategories, setSubCategories] = useState<
    { [key: string]: string }[]
  >([]);

  useEffect(() => {
    setSubCategories(dummySubCategories);
  }, []);

  let bannerSrc;
  switch (category) {
    case CategoryText.BUY:
      bannerSrc = "/images/buy-banner.svg";
      break;
    case CategoryText.EAT:
      bannerSrc = "/images/eat-banner.svg";
      break;
    case CategoryText.SEE_AND_DO:
      bannerSrc = "/images/see-and-do-banner.svg";
      break;
    case CategoryText.STAY:
      bannerSrc = "/images/stay-banner.svg";
      break;
    case CategoryText.TRANSPORT:
      bannerSrc = "/images/transport-banner.svg";
      break;
  }

  const handleSelectSubCategory = (slug) =>
    router.push({
      pathname: `${category}/${slug}`,
    });

  return (
    <div>
      <SectionLayout className={styles.banner}>
        {bannerSrc && <Image src={bannerSrc} alt="" layout="fill" />}
      </SectionLayout>
      <SectionLayout>
        <Carousel responsive={homeBannerResponsive}>
          {homeCarousel?.map((img, index) => (
            <div key={index} className={styles.banner_card}>
              <Image alt="" layout="fill" src={img.imgUrl} objectFit="cover" />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout
        title="Explore by Top Categories"
        childrenClassName="flex gap-[100px] flex-wrap"
      >
        {subCategories.map((item, index) => (
          <div
            key={index}
            className={styles.sub_category}
            onClick={() => handleSelectSubCategory(item.slug)}
          >
            <div className={styles.sub_category_icon}>
              <Image src={item.icon} alt="" layout="fill" />
            </div>
            <div className={styles.sub_category_label}>{item.label}</div>
          </div>
        ))}
      </SectionLayout>
      <SectionLayout title="Exclusive deals">
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout backgroundColor title="Specially Curated For You">
        <Carousel responsive={homeCuratedResponsive}>
          {homeCuratedCarousel?.map((item, index) => (
            <div key={index} className="pb-5">
              <CollectionCard title={item.title} imgUrl={item.imgUrl} />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Where to BUY">
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to SEE">
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout backgroundColor title="Featured Articles">
        <Carousel responsive={homeCuratedResponsive}>
          {homeArticleCarousel?.map((item, index) => (
            <div key={index} className="pb-5">
              <ArticleCard
                title={item.title}
                imgUrl={item.imgUrl}
                time={item.time}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to EAT">
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout childrenClassName="flex justify-center">
        <Button variant="outlined" text="Load more" width={400} />
      </SectionLayout>
      <div className={styles.introduction}>
        <SectionLayout transparent>
          <div className={styles.header}>
            A <span>Curated Platform & Experience</span>
            <p>For The Muslim Lifestyle</p>
          </div>
          {curatedList.map((item, index) => (
            <div key={index} className="flex gap-3 mt-5">
              <Icon icon="star-2" color="#e60112" />
              <div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          ))}
        </SectionLayout>
      </div>
      <SectionLayout>
        <TopSearches />
      </SectionLayout>
    </div>
  );
};

export default Category;
