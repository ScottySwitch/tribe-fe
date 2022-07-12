import { get } from "lodash";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "components/Button/Button";
import Carousel from "components/Carousel/Carousel";
import CollectionCard from "components/CollectionCard/CollectionCard";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import BizListingApi from "services/biz-listing";
import CollectionApi from "services/collection";
import BannerApi from "services/banner";
import CategoryApi from "services/category";
import Loader from "components/Loader/Loader";
import {
  curatedList,
  homeBannerResponsive,
  homeCuratedResponsive,
  infoCardResponsive,
} from "constant";

import styles from "styles/Home.module.scss";

const Home: NextPage = (props: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listingForYou, setListingForYou] = useState<{ [key: string]: any }[]>(
    []
  );
  const {
    listingBuy,
    listingSee,
    listingEat,
    listingExclusiveDeal,
    listBanners,
    listCollections,
    listCategories,
  } = props;
  const [limit, setLimit] = useState<number>(16);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBizListingForYou();
  }, []);

  const getBizListingForYou = async () => {
    setIsLoading(true);
    const dataListing = await BizListingApi.getBizListingForYou(limit);
    if (
      get(dataListing, "data.data") &&
      Array.isArray(get(dataListing, "data.data"))
    ) {
      const rawDataListing = get(dataListing, "data.data");
      const listingArray = listingForYou.concat(
        rawDataListing.map((item) => ({
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
          price: get(item, "price_range.min") || "",
          currency: get(item, "price_range.currency") || "",
          rate: item.rate,
          rateNumber: item.rate_number,
        }))
      );
      setListingForYou(listingArray);
      setLimit(limit + 16);
      setIsLoading(false);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  return (
    <div>
      <SectionLayout>
        <Carousel responsive={homeBannerResponsive}>
          {Array.isArray(listBanners) ? (
            listBanners?.map((img, index) => (
              <div
                key={index}
                className={styles.banner_card}
                onClick={() => router.push(`${img.linkActive}`)}
              >
                <Image
                  alt=""
                  layout="fill"
                  src={img.imgUrl}
                  objectFit="cover"
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Explore BESTS" childrenClassName={styles.bests}>
        {Array.isArray(listCategories) &&
          listCategories.map((item, index) => (
            <div
              key={index}
              className={styles.category}
              onClick={() => router.push(item.slug)}
            >
              <div className={styles.category_icon}>
                <Icon size={60} icon={item.icon} />
              </div>
              <div className={styles.category_label}>{item.label}</div>
            </div>
          ))}
      </SectionLayout>
      {Array.isArray(listingExclusiveDeal) && listingExclusiveDeal.length > 0 && (
        <SectionLayout title="Brands With Exclusive Deals For You">
          <Carousel responsive={infoCardResponsive}>
            {listingExclusiveDeal?.map((card) => (
              <div key={card.name} className="pb-5">
                <InforCard
                  imgUrl={get(card, "images[0]")}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card.currency}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {Array.isArray(listCollections) && listCollections.length > 0 && (
        <SectionLayout backgroundColor title="Specially Curated For You">
          <Carousel responsive={homeCuratedResponsive}>
            {listCollections?.map((item, index) => (
              <div key={index} className="pb-5">
                <CollectionCard
                  slug={item.slug}
                  title={item.title}
                  imgUrl={item.imgUrl}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      <SectionLayout title="Where to BUY">
        <Carousel responsive={infoCardResponsive}>
          {Array.isArray(listingBuy) ? (
            listingBuy?.map((card) => (
              <div key={card.title} className="pb-5">
                <InforCard
                  imgUrl={get(card, "images[0]")}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card.currency}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to SEE">
        <Carousel responsive={infoCardResponsive}>
          {Array.isArray(listingSee) ? (
            listingSee?.map((card) => (
              <div key={card.title} className="pb-5">
                <InforCard
                  imgUrl={get(card, "images[0]")}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card.currency}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Carousel>
      </SectionLayout>
      {/* <SectionLayout backgroundColor title="Featured Articles">
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
      </SectionLayout> */}
      <SectionLayout title="What to EAT">
        <Carousel responsive={infoCardResponsive}>
          {Array.isArray(listingEat) ? (
            listingEat?.map((card) => (
              <div key={card.title} className="pb-5">
                <InforCard
                  imgUrl={get(card, "images[0]")}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card.currency}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Carousel>
      </SectionLayout>
      {Array.isArray(listingForYou) && listingForYou.length > 0 && (
        <div>
          <SectionLayout className={styles.for_you}>
            <div className={styles.for_you_tag}>
              <Icon
                icon="user-fill-1"
                size={30}
                className={styles.for_you_icon}
              />
              <div>For you</div>
            </div>
          </SectionLayout>
          <SectionLayout childrenClassName={styles.for_you_container}>
            {listingForYou?.map((card) => (
              <div key={card.title} className="pb-5">
                <InforCard
                  imgUrl={card.images[0]}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card.currency}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))}
          </SectionLayout>
          <SectionLayout childrenClassName="flex justify-center">
            <Button
              isLoading={isLoading}
              variant={isLoading ? "primary" : "outlined"}
              text="Load more"
              width={400}
              onClick={getBizListingForYou}
            />
          </SectionLayout>
        </div>
      )}
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
  const category = context.query.category;
  const data = await BizListingApi.getAllBizListingsByCategory();
  const dataExclusiveDeal =
    await BizListingApi.getAllBizListingsHaveExclusiveDeal();
  const dataBanners = await BannerApi.getBanner();
  const dataCollections = await CollectionApi.getCollection();
  const dataCategories = await CategoryApi.getCategories();
  const rawListingBuyArray = get(data, "data.data[0]");
  const rawListingSeeArray = get(data, "data.data[1]");
  const rawListingEatAray = get(data, "data.data[2]");
  const rawListingExclusiveArray = get(dataExclusiveDeal, "data.data");
  const rawListBanners = get(dataBanners, "data.data");
  const rawListCollections = get(dataCollections, "data.data");
  const rawCategories = get(dataCategories, "data.data");
  const buyListingArray =
    Array.isArray(rawListingBuyArray) &&
    rawListingBuyArray.map((item) => ({
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
      price: get(item, "price_range.min") || "",
      currency: get(item, "price_range.currency") || "",
      rate: item.rate,
      rateNumber: item.rate_number,
    }));
  const seeListingArray =
    Array.isArray(rawListingSeeArray) &&
    rawListingSeeArray.map((item) => ({
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
      price: get(item, "price_range.min") || "",
      currency: get(item, "price_range.currency") || "",
      rate: item.rate,
      rateNumber: item.rate_number,
    }));
  const eatListingArray =
    Array.isArray(rawListingEatAray) &&
    rawListingEatAray.map((item) => ({
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
      price: get(item, "price_range.min") || "",
      currency: get(item, "price_range.currency") || "",
      rate: item.rate,
      rateNumber: item.rate_number,
    }));
  const exclusiveDealListingArray =
    Array.isArray(rawListingExclusiveArray) &&
    rawListingExclusiveArray.map((item) => ({
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
      price: get(item, "price_range.min") || "",
      currency: get(item, "price_range.currency") || "",
      rate: item.rate,
      rateNumber: item.rate_number,
    }));
  const bannerArray =
    Array.isArray(rawListBanners) &&
    rawListBanners.map((item) => ({
      imgUrl: item.image_url,
      linkActive: item.link_active,
    }));
  const collectionArray =
    Array.isArray(rawListCollections) &&
    rawListCollections.map((item) => ({
      imgUrl: item.thumbnail || null,
      slug: item.slug,
      title: item.name,
    }));
  const categoryArray =
    Array.isArray(rawCategories) &&
    rawCategories.map((item) => ({
      label: get(item, "attributes.name"),
      slug: get(item, "attributes.slug"),
      icon: get(item, "attributes.icon"),
    }));
  return {
    props: {
      listingBuy: buyListingArray,
      listingEat: eatListingArray,
      listingSee: seeListingArray,
      listingExclusiveDeal: exclusiveDealListingArray,
      listBanners: bannerArray,
      listCollections: collectionArray,
      listCategories: categoryArray,
    },
  };
}

export default Home;
