import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";

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
import useLocation from "hooks/useLocation";
import { Ilisting } from "type";
import { formatListingArray } from "utils";

const Home: NextPage = (props: any) => {
  const { listingExclusiveDeal, listBanners, listCollections, listCategories } =
    props;

  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(16);
  const [listingForYou, setListingForYou] = useState<Ilisting[]>([]);
  const [listings, setListings] = useState<{
    buy: Ilisting[];
    eat: Ilisting[];
    seeAndDo: Ilisting[];
    stay: Ilisting[];
    transport: Ilisting[];
  }>();

  const router = useRouter();
  const { location } = useLocation();

  useEffect(() => {
    const getListings = async () => {
      const data = await BizListingApi.getAllBizlitingPinnedByCategory(
        location
      );
      const buyListingArray = formatListingArray(get(data, "data.data[0]"));
      const seeListingArray = formatListingArray(get(data, "data.data[1]"));
      const eatListingArray = formatListingArray(get(data, "data.data[2]"));
      const stayListingArray = formatListingArray(get(data, "data.data[4]"));
      const transportListingArray = formatListingArray(
        get(data, "data.data[3]")
      );

      setListings({
        buy: buyListingArray,
        eat: eatListingArray,
        seeAndDo: seeListingArray,
        stay: stayListingArray,
        transport: transportListingArray,
      });
    };

    if (location) {
      getListings();
      getBizListingForYou();
    }
  }, [location]);

  const getBizListingForYou = async () => {
    setLoading(true);

    const dataListing = await BizListingApi.getBizListingForYou(limit);
    const rawForYouListing = get(dataListing, "data.data");
    const listingArray = listingForYou.concat(
      formatListingArray(rawForYouListing)
    );

    setListingForYou(listingArray);
    setLimit(limit + 16);
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
                  layout="intrinsic"
                  src={img.imgUrl}
                  objectFit="contain"
                  width={500}
                  height={200}
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
              <div key={index}>
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
          {Array.isArray(listings?.buy) ? (
            listings?.buy.map((card) => (
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
          {Array.isArray(listings?.seeAndDo) ? (
            listings?.seeAndDo.map((card) => (
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
          {listHomeArticles?.map((item, index) => (
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
          {Array.isArray(listings?.eat) ? (
            listings?.eat.map((card) => (
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
      <SectionLayout title="What to TRANSPORT">
        <Carousel responsive={infoCardResponsive}>
          {Array.isArray(listings?.transport) ? (
            listings?.transport.map((card) => (
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
                  onClick={() => {
                    window.location.href = `/biz/home/${card.slug}`;
                  }}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to STAY">
        <Carousel responsive={infoCardResponsive}>
          {Array.isArray(listings?.stay) ? (
            listings?.stay.map((card) => (
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
                  onClick={() => {
                    window.location.href = `/biz/home/${card.slug}`;
                  }}
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
              isLoading={loading}
              variant={loading ? "primary" : "outlined"}
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
  const dataExclusiveDeal =
    await BizListingApi.getAllBizListingsHaveExclusiveDeal();
  const dataBanners = await BannerApi.getBanner();
  const dataCollections = await CollectionApi.getCollection();
  const dataCategories = await CategoryApi.getCategories();

  // const dataArticlesPinHome = await ArticleApi.getArticlesPinHome();
  const rawListBanners = get(dataBanners, "data.data");
  const rawListCollections = get(dataCollections, "data.data");
  const rawCategories = get(dataCategories, "data.data");

  // const rawArticlesPinHome = get(dataArticlesPinHome, "data.data");
  const exclusiveDealListingArray = formatListingArray(
    get(dataExclusiveDeal, "data.data")
  );

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
  // const homeArticleArray =
  //   Array.isArray(rawArticlesPinHome) &&
  //   rawArticlesPinHome.map((item) => ({
  //     title: get(item, "attributes.name") || null,
  //     imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
  //     time: get(item, "attributes.createdAt"),
  //     slug: get(item, "attributes.slug"),
  //   }));

  return {
    props: {
      listingExclusiveDeal: exclusiveDealListingArray,
      listBanners: bannerArray,
      listCollections: collectionArray,
      listCategories: categoryArray,
      // listHomeArticles: homeArticleArray,
    },
  };
}

export default Home;
