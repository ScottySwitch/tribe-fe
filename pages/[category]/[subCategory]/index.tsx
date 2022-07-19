import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { get, isArray } from "lodash";

import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Select from "components/Select/Select";
import TabsHorizontal from "components/TabsHorizontal/TabsHorizontal";
import TopSearches from "components/TopSearches/TopSearches";
import { homeBannerResponsive, inforCardList } from "constant";
import BizlistingApi from "services/biz-listing";
import CategoryLinkApi from "services/category-link";
import BannerApi from "services/banner";
import Loader from "components/Loader/Loader";
import useLocation from "hooks/useLocation";
import useTrans from "hooks/useTrans";
import { formatListingArray } from "utils";

import styles from "styles/Home.module.scss";

const SubCategoryPage = (props: any) => {
  const { bizListings, listingBanners, listCategoryLink } = props;

  const trans = useTrans();
  const router = useRouter();
  const { location } = useLocation();

  const { query } = router;
  const { category, subCategory }: any = query;

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [currentSubCategory, setCurrentSubCategory] = useState(subCategory);
  const [listings, setListings] = useState<{ [key: string]: any }[]>([]);
  const [currenCategoryLink, setCurrentCategoryLink] = useState(subCategory);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const getBizListings = async (category, subCategory, page) => {
      const dataBizlisting = await BizlistingApi.getBizlistingByCategoryLink(
        category,
        subCategory,
        page,
        location
      );

      const rawBizlistingArray = get(dataBizlisting, "data.data");
      let listingArray = formatListingArray(rawBizlistingArray);

      setListings(listingArray);
      setPagination({
        ...pagination,
        total: get(dataBizlisting, "data.total"),
      });
      setLoading(false);
    };

    //get subCategory data
    location && getBizListings(category, currenCategoryLink, pagination.page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSubCategory, currenCategoryLink, location, pagination.page]);

  const handleChangeSubCategory = (e) => {
    setCurrentCategoryLink(e);
    setCurrentSubCategory(e);
    router.replace(
      {
        pathname: `/${category}/${e}`,
      },
      undefined,
      { shallow: true }
    );
    // getDataBizlisting(category, e, page)
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
      <SectionLayout className="pt-0">
        <div className={styles.breadcrumbs}>
          Home <Icon icon="carret-right" size={14} color="#7F859F" />
          {category}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          {subCategory}
        </div>
        {isArray(listingBanners) && (
          <Carousel responsive={homeBannerResponsive}>
            {listingBanners.map((img, index) => (
              <div key={index} className={styles.banner_card}>
                <Image
                  alt=""
                  layout="intrinsic"
                  src={img.imgUrl}
                  objectFit="contain"
                  width={500}
                  height={200}
                />
              </div>
            ))}
          </Carousel>
        )}
      </SectionLayout>
      <SectionLayout className={styles.tab_filter}>
        <div className={styles.tab_filter_container}>
          <div className="flex flex-wrap">
            <TabsHorizontal
              tablist={
                Array.isArray(listCategoryLink)
                  ? listCategoryLink.slice(0, 5)
                  : []
              }
              type="secondary-no-outline"
              selectedTab={currentSubCategory}
              className="pt-[6px]"
              onCurrentTab={handleChangeSubCategory}
            />
            <Select
              placeholder="More"
              isSearchable={false}
              width={50}
              className={styles.sub_category_more}
              variant="no-outlined"
              size="small"
              options={
                Array.isArray(listCategoryLink) ? listCategoryLink.slice(5) : []
              }
              controlStyle={{ fontWeight: "bold", fontSize: "16px" }}
              placeholderStyle={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "#a4a8b7",
              }}
              onChange={(e) => handleChangeSubCategory(e.value)}
            />
          </div>
          {/* <Button
            width={180}
            size="small"
            text="Filter & Sort"
            variant="secondary"
            prefix={<Icon icon="filter-1" />}
            onClick={() => setShowFilter(true)}
          /> */}
        </div>
      </SectionLayout>
      <SectionLayout show={isArray(listings)}>
        <div className="flex flex-wrap gap-5 sm:gap-2 lg:gap-8">
          {listings.map((item) => (
            <div key={item.title} className="pb-5 pt-3">
              <InforCard
                imgUrl={item.images[0]}
                title={item.title}
                rate={item.rate}
                rateNumber={item.rateNumber}
                followerNumber={item.followerNumber}
                price={item.price}
                currency={(item.currency).toUpperCase()}
                categories={item.categories}
                tags={item.tags}
                isVerified={item.isVerified}
                description={item.description}
                onClick={() => router.push(`/biz/home/${item.slug}`)}
              />
            </div>
          ))}
        </div>
        {pagination.total > 0 && (
          <Pagination
            limit={30}
            total={pagination.total}
            onPageChange={(selected) =>
              setPagination({ ...pagination, page: selected.selected })
            }
          />
        )}
        <TopSearches />
        {/* <Filter onClose={() => setShowFilter(false)} visible={true} /> */}
      </SectionLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const category = context.query.category;
  const dataBanners = await BannerApi.getBannerByCategory(category);
  const dataCategoryLinks =
    await CategoryLinkApi.getCategoryLinksByCategorySlug(category);
  let categoryLinkArray: any = [
    {
      label: "All",
      value: "all",
      slug: "all",
      icon: "https://picsum.photos/200/300",
    },
  ];
  const rawListBanners = get(dataBanners, "data.data");
  const rawListCategory = get(dataCategoryLinks, "data.data");
  const listBannerArray =
    Array.isArray(rawListBanners) &&
    rawListBanners.map((item) => ({
      imgUrl: item.image_url,
      linkActive: item.link_active,
    }));
  let arrayRawListCategoryLink =
    Array.isArray(rawListCategory) &&
    rawListCategory.map((item) => ({
      icon: get(item, "attributes.logo.url") || null,
      label: get(item, "attributes.label"),
      value: get(item, "attributes.value"),
      slug: get(item, "attributes.value"),
    }));
  categoryLinkArray =
    Array.isArray(arrayRawListCategoryLink) &&
    categoryLinkArray.concat(arrayRawListCategoryLink);
  return {
    props: {
      // bizListings: listingArray,
      listingBanners: listBannerArray,
      listCategoryLink: categoryLinkArray,
    },
  };
}

export default SubCategoryPage;
