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

import BizListingApi from "services/biz-listing"
import BannerApi from "services/banner"
import CollectionApi from "services/collection"
import CategoryLinkApi from "services/category-link"
import styles from "styles/Home.module.scss";
import {get} from "lodash"
import { getEnvironmentData } from "worker_threads";

const Category = (props: any) => {
  const trans = useTrans();
  const router = useRouter();
  const {
    query: { category },
  } = router;

  const [subCategories, setSubCategories] = useState<
    { [key: string]: string }[]
  >([]);
  const {
    listingBuy,
    listingSee,
    listingEat,
    listingExclusiveDeal,
    listingBanners,
    listCollections,
    listCategoryLink
  } 
  = props

  console.log('listCategoryLink', listCategoryLink)

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
          {listingBanners?.map((img, index) => (
            <div 
              key={index} 
              className={styles.banner_card}
              onClick={() => {
                window.location.href = `${img.linkActive}`
              }}
            >
              <Image alt="" layout="fill" src={img.imgUrl} objectFit="cover" />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout
        title="Explore by Top Categories"
        childrenClassName="flex gap-[100px] flex-wrap"
      >
        {listCategoryLink.map((item, index) => (
          <div
            key={index}
            className={styles.sub_category}
            onClick={() => handleSelectSubCategory(item.slug)}
          >
            <div className={styles.sub_category_icon}>
              <Image src={item.icon || 'https://picsum.photos/200/300'} alt="" layout="fill" />
            </div>
            <div className={styles.sub_category_label}>{item.label}</div>
          </div>
        ))}
      </SectionLayout>
      <SectionLayout title="Exclusive deals">
        <Carousel responsive={infoCardResponsive}>
          {listingExclusiveDeal?.map((card) => (
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
                onClick={() => {
                  window.location.href = `/biz/home/${card.slug}`
                }}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout backgroundColor title="Specially Curated For You">
        <Carousel responsive={homeCuratedResponsive}>
          {listCollections?.map((item, index) => (
            <div key={index} className="pb-5">
              <CollectionCard title={item.title} imgUrl={item.imgUrl} />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Where to BUY">
        <Carousel responsive={infoCardResponsive}>
          {listingBuy?.map((card) => (
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
                onClick={() => {
                  window.location.href = `/biz/home/${card.slug}`
                }}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to SEE">
        <Carousel responsive={infoCardResponsive}>
          {listingSee?.map((card) => (
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
                onClick={() => {
                  window.location.href = `/biz/home/${card.slug}`
                }}
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
          {listingEat?.map((card) => (
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
                onClick={() => {
                  window.location.href = `/biz/home/${card.slug}`
                }}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      {/* <SectionLayout childrenClassName="flex justify-center">
        <Button variant="outlined" text="Load more" width={400} />
      </SectionLayout> */}
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

export async function getServerSideProps(context) {
  // Pass data to the page via props
    const category = context.query.category
    const data = await BizListingApi.getAllBizListingsByCategory()
    const dataExclusiveDeal = await BizListingApi.getExclusiveDealByCategory(category)
    const dataBanners = await BannerApi.getBannerByCategory(category)
    const dataCollections = await CollectionApi.getCollectionByCategory(category)
    const dataCategoryLinks = await CategoryLinkApi.getCategoryLinksByCategorySlug(category)
    let listingBuyArray: any = []
    let listingSeeArray: any = []
    let listingEatArray: any = []
    let listBannerArray: any = []
    let listingExclusiveDealArray: any = []
    let listCollectionArray: any = []
    let ListCategoryLinkArray: any = []
    if(get(data, 'data.data')) {
      const rawListingBuyArray = get(data, 'data.data[0]')
      const rawListingSeeArray = get(data, 'data.data[1]')
      const rawListingEatAray = get(data, 'data.data[2]')
      listingBuyArray = rawListingBuyArray.map((item) => ({
        images: item.images || [],
        title: item.name,
        slug: item.slug,
        isVerified: item.is_verified,
        address: item.address,
        country: item.country,
        description: item.description,
        followerNumber: item.user_listing_follows.length,
        tags: item.tags,
        categories: item.categories,
        price: get(item, 'price_range.min') || '',
        rate: item.rate,
        rateNumber: item.rate_number,
      }))
      listingSeeArray = rawListingSeeArray.map((item) => ({
        images: item.images || [],
        title: item.name,
        slug: item.slug,
        isVerified: item.is_verified,
        address: item.address,
        country: item.country,
        description: item.description,
        followerNumber: item.user_listing_follows.length,
        tags: item.tags,
        categories: item.categories,
        price: get(item, 'price_range.min') || '',
        rate: item.rate,
        rateNumber: item.rate_number,
      }))
      listingEatArray = rawListingEatAray.map((item) => ({
        images: item.images || [],
        title: item.name,
        slug: item.slug,
        isVerified: item.is_verified,
        address: item.address,
        country: item.country,
        description: item.description,
        followerNumber: item.user_listing_follows.length,
        tags: item.tags,
        categories: item.categories,
        price: get(item, 'price_range.min') || '',
        rate: item.rate,
        rateNumber: item.rate_number,
      }))
    }
    if (get(dataExclusiveDeal, 'data.data')) {
      const rawListingExclusiveDealAray = get(dataExclusiveDeal, 'data.data')
      listingExclusiveDealArray = rawListingExclusiveDealAray.map((item) => ({
        images: item.images || [],
        title: item.name,
        slug: item.slug,
        isVerified: item.is_verified,
        address: item.address,
        country: item.country,
        description: item.description,
        followerNumber: item.user_listing_follows.length,
        tags: item.tags,
        categories: item.categories,
        price: get(item, 'price_range.min') || '',
        rate: item.rate,
        rateNumber: item.rate_number,
      }))
    }
    if (get(dataBanners, 'data.data')) {
      const rawListBanners = get(dataBanners, 'data.data')
      listBannerArray = rawListBanners.map((item) => ({
        imgUrl: item.image_url,
        linkActive: item.link_active
      }))
    }
    if (get(dataCollections, 'data.data')) {
      const rawListCollections = get(dataCollections, 'data.data')
      listCollectionArray = rawListCollections.map((item) => ({
        imgUrl: item.thumbnail || null,
        slug: item.slug,
        title: item.name
      }))
    }
    if (get(dataCategoryLinks, 'data.data')) {
      const rawListCategory = get(dataCategoryLinks, 'data.data')
      ListCategoryLinkArray = rawListCategory.map((item) => ({
        icon: get(item, 'attributes.logo.url') || null,
        label: get(item, 'attributes.label'),
        slug: get(item, 'attributes.value')
      }))
    }
  return {
    props: {
      listingBuy: listingBuyArray,
      listingEat: listingEatArray,
      listingSee: listingSeeArray,
      listingExclusiveDeal: listingExclusiveDealArray,
      listingBanners: listBannerArray,
      listCollections: listCollectionArray,
      listCategoryLink: ListCategoryLinkArray
    },
  };
}

export default Category;
