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
import { formatListingArray } from "utils";
import { UserInforContext } from "Context/UserInforContext";
import Button from "components/Button/Button";
import Filter, { IFilter } from "components/Filter/Filter";

import styles from "styles/Home.module.scss";

const SubCategoryPage = (context) => {
  const { listingBanners, category, categoryLink } = context;

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

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [listings, setListings] = useState<{ [key: string]: any }[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState(defaultFilterOptions);

  const finalTabLabel = categories.find(
    (cat) => cat.slug === category
  )?.finalTabLabel;

  useEffect(() => {
    const getBizListings = async () => {
      const params = {
        category,
        categoryLinks: [categoryLink],
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
  }, [filter, location, pagination.page]);

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  const handleFilter = (e?: IFilter) => {
    console.log({ ...filter, ...e });
    e && setFilter({ ...filter, ...e });
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
        <Carousel responsive={homeBannerResponsive}>
          {listingBanners?.map((img, index) => (
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
          <Button
            width={180}
            size="small"
            text="Filter & Sort"
            variant="secondary"
            prefix={<Icon icon="filter-1" />}
            onClick={() => setShowFilter(true)}
          />
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
  console.log(listBannerArray);
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
      category: category,
      categoryLink: categoryLink,
      listingBanners: listBannerArray,
      listCategoryLink: categoryLinkArray,
    },
  };
}

export default SubCategoryPage;
