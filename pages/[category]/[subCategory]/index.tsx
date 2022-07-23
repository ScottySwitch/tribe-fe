import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { filter, get, isArray } from "lodash";

import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import { categories, homeBannerResponsive, inforCardList } from "constant";
import BizlistingApi from "services/biz-listing";
import CategoryLinkApi from "services/category-link";
import BannerApi from "services/banner";
import Loader from "components/Loader/Loader";
import useTrans from "hooks/useTrans";
import { formatBanner, formatCategoryLink, formatListingArray } from "utils";
import { UserInforContext } from "Context/UserInforContext";
import Button from "components/Button/Button";
import Filter, { IFilter } from "components/Filter/Filter";

import styles from "styles/Home.module.scss";
import Select from "components/Select/Select";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
interface IType {
  [key: string]: any;
}
[];

const SubCategoryPage = (context) => {
  const { category, categoryLink } = context;

  const trans = useTrans();
  const router = useRouter();
  const { user } = useContext(UserInforContext);
  const { location } = user;

  const defaultPagination = { page: 1, total: 0, limit: 28 };
  const defaultFilterOptions: IFilter = {
    productTypes: [],
    productBrands: [],
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined,
    minRating: undefined,
    maxRating: undefined,
  };

  const [bannerArray, setBannergArray] = useState<IType[]>([]);
  const [categoryLinkArray, setCategoryLinkArray] = useState<ITab[]>([]);
  const [currentSubCategory, setCurrentSubCategory] = useState(categoryLink);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [listings, setListings] = useState<{ [key: string]: any }[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState(defaultFilterOptions);

  const finalTabLabel = categories.find(
    (cat) => cat.slug === category
  )?.finalTabLabel;

  useEffect(() => {
    const getData = async () => {
      const dataBanners = await BannerApi.getBannerCustom({
        categories: category,
        limit: 12,
        page: 1,
      });
      const rawListBanners = formatBanner(get(dataBanners, "data.data"));
      setBannergArray(rawListBanners);

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
      // const rawListBanners = get(dataBanners, "data.data");
      const rawListCategory = formatCategoryLink(
        get(dataCategoryLinks, "data.data")
      );
      categoryLinkArray =
        isArray(rawListCategory) && categoryLinkArray.concat(rawListCategory);
      setCategoryLinkArray(categoryLinkArray);
    };
    getData();
  }, []);

  useEffect(() => {
    const getBizListings = async () => {
      const params = {
        category,
        categoryLinks: categoryLink,
        page: pagination.page,
        location,
        ...filter,
      };
      const dataBizlisting = await BizlistingApi.getBizlistingByCategoryLink(
        params
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
    location && getBizListings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, location, pagination.page, currentSubCategory]);

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  const handleFilter = (e?: IFilter) => {
    e && setFilter({ ...filter, ...e });
  };

  const handleChangeSubCategory = (e) => {
    setCurrentSubCategory(e);
    router.replace(`/${category}/${e}`);
    // getDataBizlisting(category, e, page)
  };

  return (
    <div>
      <SectionLayout className="pt-0">
        <div className={styles.breadcrumbs}>
          Home <Icon icon="carret-right" size={14} color="#7F859F" />
          {category}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          {categoryLink}
        </div>
        <Carousel
          responsive={homeBannerResponsive}
          isShow={isArray(bannerArray) && !!bannerArray.length}
        >
          {bannerArray.map((img, index) => (
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
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout className={styles.tab_filter}>
        <div className={styles.tab_filter_container}>
          <div className="flex flex-wrap justify-between pt-3">
            <TabsHorizontal
              tablist={
                Array.isArray(categoryLinkArray)
                  ? categoryLinkArray.slice(0, 5)
                  : []
              }
              type="secondary-no-outline"
              selectedTab={currentSubCategory}
              className="pt-[6px]"
              onChangeTab={handleChangeSubCategory}
            />
            {/* <Select
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
            /> */}
            <Button
              width={150}
              size="small"
              text="Filter & Sort"
              variant="secondary"
              prefix={<Icon icon="filter-1" />}
              onClick={() => setShowFilter(true)}
            />
          </div>
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
                currency={item.currency?.toUpperCase()}
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
            limit={24}
            total={pagination.total}
            onPageChange={(selected) =>
              setPagination({ ...pagination, page: selected.selected })
            }
          />
        )}
        <TopSearches />
        <Filter
          visible={showFilter}
          categoryLink={categoryLink}
          finalTabLabel={finalTabLabel}
          filter={filter}
          onClose={() => setShowFilter(false)}
          onSubmitFilter={handleFilter}
        />
      </SectionLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const category = context.query.category;
  const categoryLink = context.query.subCategory;
  // const dataBanners = await BannerApi.getBannerByCategory(category);
  // const dataCategoryLinks =
  //   await CategoryLinkApi.getCategoryLinksByCategorySlug(category);
  // let categoryLinkArray: any = [
  //   {
  //     label: "All",
  //     value: "all",
  //     slug: "all",
  //     icon: "https://picsum.photos/200/300",
  //   },
  // ];
  // const rawListBanners = get(dataBanners, "data.data");
  // const rawListCategory = get(dataCategoryLinks, "data.data");
  // const listBannerArray =
  //   Array.isArray(rawListBanners) &&
  //   rawListBanners.map((item) => ({
  //     imgUrl: item.image_url,
  //     linkActive: item.link_active,
  //   }));
  // let arrayRawListCategoryLink =
  //   Array.isArray(rawListCategory) &&
  //   rawListCategory.map((item) => ({
  //     icon: get(item, "attributes.logo.url") || null,
  //     label: get(item, "attributes.label"),
  //     value: get(item, "attributes.value"),
  //     slug: get(item, "attributes.value"),
  //   }));
  // categoryLinkArray =
  //   Array.isArray(arrayRawListCategoryLink) &&
  //   categoryLinkArray.concat(arrayRawListCategoryLink);
  return {
    props: {
      // bizListings: listingArray,
      category: category,
      categoryLink: categoryLink,
      // listingBanners: listBannerArray,
      // listCategoryLink: categoryLinkArray,
    },
  };
}

export default SubCategoryPage;
