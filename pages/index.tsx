import ArticleCard from "components/ArticleCard/ArticleCard";
import Button from "components/Button/Button";
import Carousel from "components/Carousel/Carousel";
import CollectionCard from "components/CollectionCard/CollectionCard";
import Filter from "components/Filter/Filter";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import {get} from "lodash"
import {
  categories,
  curatedList,
  dummyTopSearchKeywords,
  homeArticleCarousel,
  homeBannerResponsive,
  homeCarousel,
  homeCuratedCarousel,
  homeCuratedResponsive,
  infoCardResponsive,
  inforCardList,
} from "constant";
import { getCipherInfo } from "crypto";
import useTrans from "hooks/useTrans";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BizListingApi from "services/biz-listing"
import styles from "styles/Home.module.scss";

const Home: NextPage = (props: any) => {
  const [showFilter, setShowFilter] = useState(false);
  const trans = useTrans()
  const router = useRouter()
  const [listingForYou, setListingForYou] = useState<{[key: string]: any} []>([])
  const {
    listingBuy,
    listingSee,
    listingEat
  } 
  = props
  const [limit, setLimit] = useState<number>(16)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getBizListingForYou()
  }, [])

  const getBizListingForYou = async () => {
    setIsLoading(true)
    const dataListing = await BizListingApi.getBizListingForYou(limit)
    if (get(dataListing, 'data.data')) {
      const rawDataListing = get(dataListing, 'data.data')
      const listingArray = listingForYou.concat(rawDataListing.map((item) => ({
        images: item.images || [],
        title: item.name,
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
      })))
      setListingForYou(listingArray)
      setLimit(limit + 16)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Filter onClose={() => setShowFilter(false)} visible={showFilter} />
      <SectionLayout>
        <Carousel responsive={homeBannerResponsive}>
          {homeCarousel?.map((img, index) => (
            <div key={index} className={styles.banner_card}>
              <Image alt="" layout="fill" src={img.imgUrl} objectFit="cover" />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Explore BESTS" childrenClassName={styles.bests}>
        {categories.map((item, index) => (
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
      <SectionLayout title="Exclusive deals">
        <Button
          size="small"
          text={trans.filter}
          variant="secondary"
          onClick={() => setShowFilter(true)}
          className="w-[50px] mb-5"
        />
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
          {listingBuy?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={get(card, 'images[0]')}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
                description={card.description}
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
                imgUrl={get(card, 'images[0]')}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
                description={card.description}
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
                imgUrl={get(card, 'images[0]')}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                isVerified={card.isVerified}
                description={card.description}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      {listingForYou.length > 0 && 
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
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                />
              </div>
            ))}
          </SectionLayout>
          <SectionLayout childrenClassName="flex justify-center">
            <Button 
              isLoading={isLoading}
              variant={isLoading ? 'primary' : 'outlined'} 
              text="Load more" 
              width={400} 
              onClick={getBizListingForYou}  
            />
          </SectionLayout>
        </div>
      }
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
    const data = await BizListingApi.getAllBizListingsByCategory()
    let listingBuyArray: any = []
    let listingSeeArray: any = []
    let listingEatArray: any = []
    if(get(data, 'data.data')) {
      const rawListingBuyArray = get(data, 'data.data[0]')
      const rawListingSeeArray = get(data, 'data.data[1]')
      const rawListingEatAray = get(data, 'data.data[2]')
      listingBuyArray = rawListingBuyArray.map((item) => ({
        images: item.images || [],
        title: item.name,
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
  return {
    props: {
      listingBuy: listingBuyArray,
      listingEat: listingEatArray,
      listingSee: listingSeeArray
    },
  };
}

export default Home;
