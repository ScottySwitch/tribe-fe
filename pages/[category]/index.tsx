import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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
import {
  formatListingArray,
  formatBizlistingArray,
  isArray,
  formatBanner,
  formatCollections,
  formatArticle,
  formatCategoryLink
} from "utils";
import { UserInforContext } from "Context/UserInforContext";
import ProductApi from "services/product-type"

const Category = (props: any) => {
  const trans = useTrans();
  const router = useRouter();
  const {
    query: { category },
  } = router;
  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [categoryInfor, setCategoryInfor] = useState<Ilisting>({});
  const [listingArray, setListingArray] = useState<{ [key: string]: any }[]>([]);
  const [bannerArray, setBannergArray] = useState<{ [key: string]: any }[]>([]);
  const [collectionArray, setCollectionArray] = useState<{ [key: string]: any }[]>([]);
  const [articleArray, setArticleArray] = useState<{ [key: string]: any }[]>([]);
  const [dealArray, setDealArray] = useState<{ [key: string]: any }[]>([]);
  const [categoryLinkArray, setCategoryLinkArray] = useState<{ [key: string]: any }[]>([]);
  const { user } = useContext(UserInforContext);
  const { location } = user;

  useEffect(() => {
    const getData = async (categoryId, page) => {
      const data = await ProductApi.getProductTypeByCategoryLinkSlug('dessert')

      const dataQuery = await BizListingApi.getListingCustom({
        country: location,
        categories: categoryId,
        page: page,
        limit: 28,
      });
      const listings = formatBizlistingArray(get(dataQuery, "data.data"));
      setListingArray(listings);
      setPagination({
        ...pagination,
        total: get(dataQuery, "data.meta.pagination.total"),
      });

      const dataExclusiveDeal = await BizListingApi.getListingCustom({
        categories: categoryId,
        isExclusive: true,
        limit: 12,
        page: 1,
      });
      const rawListingExclusiveDealAray = formatBizlistingArray(
        get(dataExclusiveDeal, "data.data")
      );
      setDealArray(rawListingExclusiveDealAray)

      const dataBanners = await BannerApi.getBannerCustom({
        categories: categoryId,
        limit: 12,
        page: 1,
      });
      const rawListBanners = formatBanner(get(dataBanners, "data.data"));
      setBannergArray(rawListBanners)

      const dataCollections = await CollectionApi.getCollectionCustom({
        categories: category,
        page: 1,
        limit: 12,
      });
      const rawListCollections = formatCollections(
        get(dataCollections, "data.data")
      );
      setCollectionArray(rawListCollections)

      const dataCategoryLinks = await CategoryLinkApi.getCategoryLinksByCategorySlug(category);
      const rawListCategoryLink = formatCategoryLink(get(dataCategoryLinks, "data.data"));
      setCategoryLinkArray(rawListCategoryLink)

      const dataArticles = await ArticleApi.getArticleCustomer({
        categories: category,
        page: 1,
        limit: 16,
      });
      const rawArticle = formatArticle(get(dataArticles, "data.data"))
      setArticleArray(rawArticle)
      // setLoading(false)
    };

    let defaultCategoryInfor = {};
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
    location && getData(category, pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, category, location]);

  const handleSelectSubCategory = (slug) =>
    router.push({
      pathname: `${category}/${slug}`,
    });

  return (
    <div>
      <SectionLayout className={styles.collection_banner}>
        {categoryInfor.bannerSrc && (
          <Image
            src={categoryInfor.bannerSrc}
            alt=""
            layout="fill"
            objectFit="cover"
            className={styles.collection_banner_img}
          />
        )}
        <div className={styles.collection_context_container}>
          <div className={styles.collection_name}>
            {categoryInfor.categoryName}
          </div>
          <div className={styles.collection_description}>
            {categoryInfor.categoryDescription}
          </div>
        </div>
      </SectionLayout>
      <SectionLayout show={isArray(bannerArray)}>
        <Carousel responsive={homeBannerResponsive}>
          {bannerArray.map((img, index) => (
            <div key={index} className={styles.banner_card}>
              <Image
                layout="intrinsic"
                src={img.imgUrl}
                objectFit="contain"
                width={500}
                height={200}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout
        title="Explore by Top Categories"
        childrenClassName="flex gap-y-[20px] gap-x-[50px] flex-wrap"
      >
        {Array.isArray(categoryLinkArray) &&
          categoryLinkArray.map((item, index) => (
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
      {isArray(dealArray) && (
        <SectionLayout title="Brands With Exclusive Deals For You">
          <Carousel responsive={infoCardResponsive}>
            {dealArray?.map((card) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  imgUrl={card.images[0]}
                  description={card.description}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card.currency?.toUpperCase()}
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
      {Array.isArray(collectionArray) && collectionArray.length > 0 && (
        <SectionLayout backgroundColor title="Specially Curated For You">
          <Carousel responsive={homeCuratedResponsive}>
            {collectionArray?.map((item, index) => (
              <div key={index} className="pb-5 pt-3 pl-3">
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
            <div key={card.title} className="pb-5 pt-3 pl-3">
              <InforCard
                imgUrl={card.images[0]}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                currency={card.currency?.toUpperCase()}
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
      {Array.isArray(articleArray) && articleArray.length > 0 && (
        <SectionLayout backgroundColor title="Articles">
          <Carousel responsive={homeCuratedResponsive}>
            {articleArray?.map((item, index) => (
              <Link href={`/articles/${item.slug}`} passHref key={index}>
                <div className="pb-5 pt-3 pl-3">
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

export default Category;
