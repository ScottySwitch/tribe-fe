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
import { Categories, CategoryText } from "enums";
import useTrans from "hooks/useTrans";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BizListingApi from "services/biz-listing";
import BannerApi from "services/banner";
import CollectionApi from "services/collection";
import CategoryLinkApi from "services/category-link";
import styles from "styles/Home.module.scss";
import { get } from "lodash";
import { getEnvironmentData } from "worker_threads";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";
import { route } from "next/dist/server/router";

const Category = (props: any) => {
  const trans = useTrans();
  const router = useRouter();
  const {
    query: { category },
  } = router;
  const {
    // listingArray,
    listingExclusiveDeal,
    listingBanners,
    listCollections,
    listCategoryLink,
  } = props;

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [listingArray, setListingArray] = useState<{ [key: string]: any }[]>([]);
  const [categoryId, setCategoryId] = useState<number>(1)
  const [subCategories, setSubCategories] = useState<
    { [key: string]: string }[]
  >([]);

  useEffect(() => {
    let categoryId;
    switch (category) {
      case CategoryText.BUY:
        categoryId = Categories.BUY
        break;
      case CategoryText.EAT:
        categoryId = Categories.EAT
        break;
      case CategoryText.SEE_AND_DO:
        categoryId = Categories.SEE_AND_DO
        break;
      case CategoryText.STAY:
        categoryId = Categories.STAY
        break;
      case CategoryText.TRANSPORT:
        categoryId = Categories.TRANSPORT
        break;
    }
    setSubCategories(dummySubCategories);
    setLoading(false);
    getData(categoryId, pagination.page)
  }, [pagination.page])

  const getData = async (categoryId, page) => {
    const data = await BizListingApi.getBizListingsByCategoryId(categoryId, page)
    if (get(data, 'data.data')) {
      const rawListingArray = get(data, "data.data");
      let listingArray: any = [];
      listingArray =
      Array.isArray(rawListingArray) &&
      rawListingArray.map((item) => ({
        images: get(item, "attributes.images") || [],
        title: get(item, "attributes.name"),
        slug: get(item, "attributes.slug"),
        isVerified: get(item, "attributes.is_verified"),
        address: get(item, "attributes.address"),
        country: get(item, "attributes.country"),
        description: get(item, "attributes.description"),
        // followerNumber: get(item, "user_listing_follows.length"),
        // tags: get(item, "attributes.tags"),
        // categories: get(item, "attributes.categories"),
        price: get(item, "price_range.min") || "",
        // rate: get(item, "attributes.rate"),
        // rateNumber: get(item, "attributes.rate_number"),
      }));
      setListingArray(listingArray)
      // setTotal(get(data, 'data.meta.pagination.total'))
      setPagination({ ...pagination, total: get(data, 'data.meta.pagination.total') })

    }
  }

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

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  return (
    <div>
      <SectionLayout className={styles.banner}>
        {bannerSrc && <Image src={bannerSrc} alt="" layout="fill" />}
      </SectionLayout>
      <SectionLayout>
        {Array.isArray(listingBanners) && listingBanners.length > 0 && (
          <Carousel responsive={homeBannerResponsive}>
            {listingBanners.map((img, index) => (
              <div key={index} className={styles.banner_card}>
                <Image
                  alt=""
                  layout="fill"
                  src={img.imgUrl}
                  objectFit="cover"
                />
              </div>
            ))}
          </Carousel>
        )}
      </SectionLayout>
      <SectionLayout
        title="Explore by Top Categories"
        childrenClassName="flex gap-[100px] flex-wrap"
      >
        {Array.isArray(listCategoryLink) &&
          listCategoryLink.map((item, index) => (
            <div
              key={index}
              className={styles.sub_category}
              onClick={() => handleSelectSubCategory(item.slug)}
            >
              <div className={styles.sub_category_icon}>
                <Image
                  src={item.icon || "https://picsum.photos/200/300"}
                  alt=""
                  layout="fill"
                />
              </div>
              <div className={styles.sub_category_label}>{item.label}</div>
            </div>
          ))}
      </SectionLayout>
      {Array.isArray(listingExclusiveDeal) && listingExclusiveDeal.length > 0 && (
        <SectionLayout title="Brands With Exclusive Deals For You">
          <Carousel responsive={infoCardResponsive}>
            {listingExclusiveDeal?.map((card) => (
              <div key={card.title} className="pb-5">
                <InforCard
                  imgUrl={card.images[0]}
                  description={card.description}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  onClick={() => {
                    window.location.href = `/biz/home/${card.slug}`;
                  }}
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
                <CollectionCard title={item.title} imgUrl={item.imgUrl} />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      <SectionLayout childrenClassName="flex flex-wrap gap-5">
        {Array.isArray(listingArray) &&
          listingArray.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                description={card.description}
                tags={card.tags}
                isVerified={card.isVerified}
                onClick={() => {
                  window.location.href = `/biz/home/${card.slug}`;
                }}
              />
            </div>
          ))}
      </SectionLayout>
      <SectionLayout show={pagination.total > 0}>
        <Pagination
          limit={30}
          total={pagination.total}
          onPageChange={(selected) =>
            setPagination({ ...pagination, page: selected.selected })
          }
        />
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
  const category = context.query.category;

  let categoryId;
  switch (category) {
    case CategoryText.BUY:
      categoryId = Categories.BUY;
      break;
    case CategoryText.EAT:
      categoryId = Categories.EAT;
      break;
    case CategoryText.SEE_AND_DO:
      categoryId = Categories.SEE_AND_DO;
      break;
    case CategoryText.STAY:
      categoryId = Categories.STAY;
      break;
    case CategoryText.TRANSPORT:
      categoryId = Categories.TRANSPORT;
      break;
  }

  // const data = await BizListingApi.getBizListingsByCategoryId(categoryId);
  const dataExclusiveDeal = await BizListingApi.getExclusiveDealByCategory(
    category
  );
  const dataBanners = await BannerApi.getBannerByCategory(category);
  const dataCollections = await CollectionApi.getCollectionByCategory(category);
  const dataCategoryLinks =
    await CategoryLinkApi.getCategoryLinksByCategorySlug(category);
  const rawListingExclusiveDealAray = get(dataExclusiveDeal, "data.data");
  const rawListBanners = get(dataBanners, "data.data");
  const rawListCollections = get(dataCollections, "data.data");
  const rawListCategory = get(dataCategoryLinks, "data.data");
    
  const exclusiveDealListingArray =
    Array.isArray(rawListingExclusiveDealAray) &&
    rawListingExclusiveDealAray.map((item) => ({
      images: item.images || [],
      title: item.name,
      slug: item.slug,
      isVerified: item.is_verified,
      address: item.address,
      country: item.country,
      description: item.description,
      followerNumber: get(item, "user_listing_follows.length"),
      tags: item.tags,
      categories: item.categories,
      price: get(item, "price_range.min") || "",
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
  const categoryLinkArray =
    Array.isArray(rawListCategory) &&
    rawListCategory.map((item) => ({
      icon: get(item, "attributes.logo.data.attributes.url") || null,
      label: get(item, "attributes.label"),
      slug: get(item, "attributes.value"),
    }));
  return {
    props: {
      listingExclusiveDeal: exclusiveDealListingArray,
      listingBanners: bannerArray,
      listCollections: collectionArray,
      listCategoryLink: categoryLinkArray,
    },
  };
}

export default Category;
