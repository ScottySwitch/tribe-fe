import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { filter, get, shuffle } from "lodash";

import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import {
  categories,
  getFilterLabels,
  homeBannerResponsive,
  inforCardList,
  sortOptions,
} from "constant";
import BizlistingApi from "services/biz-listing";
import CategoryLinkApi from "services/category-link";
import BannerApi from "services/banner";
import Loader from "components/Loader/Loader";
import useTrans from "hooks/useTrans";
import { formatBanner, formatCategoryLink, formatListingArray } from "utils";
import { UserInforContext } from "Context/UserInforContext";
import Button from "components/Button/Button";
import Filter, { IFilter } from "components/Filter/Filter";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import { isArray } from "utils";
import styles from "styles/Home.module.scss";
import Badge from "components/Badge/Badge";
import useGetCountry from "hooks/useGetCountry";
import Select from "components/Select/Select";
interface IType {
  [key: string]: any;
}
[];

const SubCategoryPage = (context) => {
  const { category, categoryLink } = context;

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

  const { currency } = useGetCountry();

  const [isMobile, setIsMobile] = useState(false);
  const [bannerArray, setBannergArray] = useState<IType[]>([]);
  const [categoryLinkArray, setCategoryLinkArray] = useState<ITab[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [listings, setListings] = useState<{ [key: string]: any }[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<IFilter | {}>(defaultFilterOptions);

  useEffect(() => {
    const getData = async () => {
      const dataBanners = await BannerApi.getBannerCustom({
        // categories: category,
        categoryLinks: categoryLink,
        limit: 12,
        page: 1,
      });
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

      const rawListBanners = formatBanner(get(dataBanners, "data.data"));
      const rawListCategory = formatCategoryLink(
        get(dataCategoryLinks, "data.data") || []
      );

      setBannergArray(rawListBanners);
      setCategoryLinkArray(categoryLinkArray.concat(rawListCategory));
    };

    setIsMobile(window.innerWidth < 500);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryLink]);

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
      let listingArray = shuffle(formatListingArray(rawBizlistingArray));

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
  }, [filter, location, categoryLink, pagination.page]);

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  const handleFilter = (e?: IFilter | {}) => {
    e ? setFilter({ ...filter, ...e }) : setFilter({});
  };

  const handleChangeSubCategory = (e) => {
    router.replace(`/${category}/${e}`);
    // getDataBizlisting(category, e, page)
  };

  const handleRemoveFilter = (keyLabel) => {
    switch (keyLabel) {
      case "Sort":
        return setFilter({ ...filter, sort: undefined });
      case "Rating":
        return setFilter({ ...filter, minRating: 0, maxRating: undefined });
      case "Price":
        return setFilter({ ...filter, minPrice: 0, maxPrice: undefined });
    }
  };

  const FilterBadge = ({ item }) =>
    item.isShow && (
      <Badge size="small" className={styles.filter_badge}>
        <div className="flex gap-2">
          {item.label}: {item.value}
          <div onClick={() => handleRemoveFilter(item.label)}>&#x2715;</div>
        </div>
      </Badge>
    );

  const filterLabels = getFilterLabels(filter, currency);
  const filterNumber = filterLabels.filter((item) => item.isShow).length;

  const FilterButton = ({ className }) => (
    <Button
      width="fit-content"
      size="small"
      variant="secondary"
      prefix={<Icon icon="filter-1" />}
      className={className}
      onClick={() => setShowFilter(true)}
    >
      Filter & Sort
      {!!filterNumber && (
        <span className={styles.filter_number}>{filterNumber}</span>
      )}
    </Button>
  );

  const showSubCategoryNumber = isMobile ? 1 : 5;

  const moreSubCategoryStyles = {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#a4a8b7",
  };

  const moreSubCategoryOptions = Array.isArray(categoryLinkArray)
    ? categoryLinkArray.slice(showSubCategoryNumber)
    : [];

  const subCategoryOptions = Array.isArray(categoryLinkArray)
    ? categoryLinkArray.slice(0, showSubCategoryNumber)
    : [];

  return (
    <div>
      <SectionLayout className="pt-0">
        <div className={styles.breadcrumbs}>
          Home <Icon icon="carret-right" size={14} color="#7F859F" />
          {category}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          {categoryLink}
        </div>
        {isArray(bannerArray) && (
          <Carousel responsive={homeBannerResponsive}>
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
        )}
      </SectionLayout>
      <SectionLayout className={styles.tab_filter}>
        <div className={styles.tab_filter_container}>
          <div
            id="sub-cat-quick-filter"
            className={styles.quick_filter_container}
          >
            <div className={styles.scroll_box}>
              <TabsHorizontal
                tablist={subCategoryOptions}
                type="secondary-no-outline"
                selectedTab={categoryLink}
                className="pt-[6px]"
                onChangeTab={handleChangeSubCategory}
              />
              <Select
                placeholder="More"
                isSearchable={false}
                width={250}
                className={styles.sub_category_more}
                variant="outlined"
                size="small"
                key={categoryLink}
                menuPortalTarget={document.querySelector("body")}
                value={categoryLink}
                onChange={(e) => handleChangeSubCategory(e.value)}
                controlStyle={{ fontWeight: "bold", fontSize: "16px" }}
                placeholderStyle={moreSubCategoryStyles}
                options={moreSubCategoryOptions}
              />
            </div>
            <FilterButton className={styles.desktop_filter_button} />
          </div>
          <div className={styles.quick_filter_container}>
            <div className={styles.scroll_box}>
              <FilterButton className={styles.mobile_filter_button} />
              {filterLabels.map((item) => (
                <FilterBadge key={item.label} item={item} />
              ))}
            </div>
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
      </SectionLayout>
      <Filter
        // make Filter rerender when filter state change
        key={JSON.stringify(filter)}
        visible={showFilter}
        filter={filter}
        onClose={() => setShowFilter(false)}
        onSubmitFilter={handleFilter}
      />
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
