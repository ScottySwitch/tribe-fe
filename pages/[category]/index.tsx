import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { get } from "lodash";

import ArticleCard from "components/ArticleCard/ArticleCard";
import Carousel from "components/Carousel/Carousel";
import CollectionCard from "components/CollectionCard/CollectionCard";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import {
  curatedList,
  homeBannerResponsive,
  homeCuratedResponsive,
  infoCardResponsive,
} from "constant";
import { Categories, CategoryText } from "enums";
import BizListingApi from "services/biz-listing";
import BannerApi from "services/banner";
import CollectionApi from "services/collection";
import CategoryLinkApi from "services/category-link";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";
import styles from "styles/Home.module.scss";
import useTrans from "hooks/useTrans";
import ArticleApi from "../../services/article";
import useLocation from "hooks/useLocation";
import { Ilisting } from "type";
import { formatListingArray } from "utils";

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
    listCategoryArticles,
  } = props;

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [categoryInfor, setCategoryInfor] = useState<Ilisting>({});
  const [listingArray, setListingArray] = useState<{ [key: string]: any }[]>(
    []
  );

  const { location } = useLocation();

  useEffect(() => {
    const getData = async (categoryId, page) => {
      const data = await BizListingApi.getAllBizlitingByCategorySlug(
        location,
        categoryId,
        page
      );
      const rawListingArray = get(data, "data.data");
      let listingArray = formatListingArray(rawListingArray);

      setListingArray(listingArray);
      setPagination({
        ...pagination,
        total: get(data, "data.meta.pagination.total"),
      });
    };

    let defaultCategoryInfor;
    switch (category) {
      case CategoryText.BUY:
        defaultCategoryInfor = {
          bannerSrc: "/images/buy-banner.svg",
          categoryName: "Buy",
          categoryDescription: "Explore a range of items.",
        };
        break;
      case CategoryText.EAT:
        defaultCategoryInfor = {
          bannerSrc: "/images/eat-banner.svg",
          categoryName: "Eat",
          categoryDescription:
            "Explore a wide array of cuisine types across different cultures.",
        };
        break;
      case CategoryText.SEE_AND_DO:
        defaultCategoryInfor = {
          bannerSrc: "/images/see-and-do-banner.svg",
          categoryName: "See and Do",
          categoryDescription:
            "Explore a wide array of cuisine types across different cultures.",
        };
        break;
      case CategoryText.STAY:
        defaultCategoryInfor = {
          bannerSrc: "/images/stay-banner.svg",
          categoryName: "Stay",
          categoryDescription:
            "Explore famous attractions, key landmarks and experience localized activities. ",
        };
        break;
      case CategoryText.TRANSPORT:
        defaultCategoryInfor = {
          bannerSrc: "/images/transport-banner.svg",
          categoryName: "Transport",
          categoryDescription: "Find the best way to get around.",
        };
        break;
    }

    setCategoryInfor(defaultCategoryInfor);
    setLoading(false);
    location && getData(category, pagination.page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, category, location]);

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
      <SectionLayout className={styles.collection_banner}>
        <Image
          src={categoryInfor.bannerSrc}
          alt=""
          layout="fill"
          objectFit="cover"
          className={styles.collection_banner_img}
        />
        <div className={styles.collection_context_container}>
          <div className={styles.collection_name}>
            {categoryInfor.categoryName}
          </div>
          <div className={styles.collection_description}>
            {categoryInfor.categoryDescription}
          </div>
        </div>
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
        childrenClassName="flex gap-y-[20px] gap-x-[50px] flex-wrap"
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
                  currency={card.currency}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
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
                currency={card.currency}
                categories={card.categories}
                description={card.description}
                tags={card.tags}
                isVerified={card.isVerified}
                onClick={() => router.push(`/biz/home/${card.slug}`)}
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
      {Array.isArray(listCategoryArticles) && listCategoryArticles.length > 0 && (
        <SectionLayout backgroundColor title="Articles">
          <Carousel responsive={homeCuratedResponsive}>
            {listCategoryArticles?.map((item, index) => (
              <Link href={`/articles/${item.slug}`} passHref key={index}>
                <div className="pb-5">
                  <ArticleCard
                    title={item.title}
                    imgUrl={item.imgUrl}
                    time={item.time}
                  />
                </div>
              </Link>
            ))}
          </Carousel>
        </SectionLayout>
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
  // const dataCategoryArticles = await ArticleApi.getArticlesByCategoryId(categoryId);
  const rawListingExclusiveDealAray = get(dataExclusiveDeal, "data.data");
  const rawListBanners = get(dataBanners, "data.data");
  const rawListCollections = get(dataCollections, "data.data");
  const rawListCategory = get(dataCategoryLinks, "data.data");
  // const rawCategoryArticles = get(dataCategoryArticles, "data.data");

  const exclusiveDealListingArray = formatListingArray(
    rawListingExclusiveDealAray
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
  const categoryLinkArray =
    Array.isArray(rawListCategory) &&
    rawListCategory.map((item) => ({
      icon: get(item, "attributes.logo.data.attributes.url") || null,
      label: get(item, "attributes.label"),
      slug: get(item, "attributes.value"),
    }));
  // const categoryArticleArray =
  //   Array.isArray(rawCategoryArticles) &&
  //   rawCategoryArticles.map((item) => ({
  //     title: get(item, "attributes.name") || null,
  //     imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
  //     time: get(item, "attributes.createdAt"),
  //     slug: get(item, "attributes.slug"),
  //   }));
  return {
    props: {
      listingExclusiveDeal: exclusiveDealListingArray,
      listingBanners: bannerArray,
      listCollections: collectionArray,
      listCategoryLink: categoryLinkArray,
      listCategoryArticles: [],
    },
  };
}

export default Category;
