import Image from "next/image";
import { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";

import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import Filter from "components/Filter/Filter";
import CollectionApi from "services/collection";

import styles from "styles/Home.module.scss";
import useTrans from "hooks/useTrans";
import { useRouter } from "next/router";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import { Categories, CategoryText } from "enums";
import { categories } from "constant";

type Object = {
  [key: string]: any;
};

const allTab = [{ label: "All", value: undefined }];
const categoryTabList: any[] = categories.map((item) => ({
  label: item.slug,
  value: item.slug,
}));
const tabList: any[] = allTab.concat(categoryTabList);

const Collection = (props) => {
  const { collectionSlug } = props;
  const trans = useTrans();
  const router = useRouter();

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<CategoryText | undefined>();
  const [pagination, setPagination] = useState(defaultPagination);
  const [collection, setCollection] = useState<Object[]>([]);
  const [collectionDetail, setCollectionDetail] = useState<Object>({});

  useEffect(() => {
    const getCollection = async () => {
      const response = await CollectionApi.getAllCollectionByCollectionSlug(
        collectionSlug,
        selectedTab
      );
      const listingsOfCollection = get(
        response,
        "data.data[0].attributes.biz_listings.data"
      );
      const banner = get(
        response,
        "data.data[0].attributes.banner.data.attributes.url"
      );
      const collectionName = get(response, "data.data[0].attributes.name");
      const description = get(response, "data.data[0].attributes.description");

      const collectionDetailObject = {
        collectionName,
        description,
        banner,
      };

      const mappedListings = Array.isArray(listingsOfCollection)
        ? listingsOfCollection.map((item) => ({
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
            price: get(item, "attributes.price_range.min") || "",
            currency: get(item, "attributes.price_range.currency") || "",
            // rate: get(item, "attributes.rate"),
            // rateNumber: get(item, "attributes.rate_number"),
          }))
        : [];

      setCollection(mappedListings);
      setLoading(false);
      if (collectionName && description && banner) {
        setCollectionDetail(collectionDetailObject);
      }
    };

    getCollection();
  }, [pagination, collectionSlug, selectedTab]);

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  return (
    <div>
      <SectionLayout className="py-0 pb-3">
        <div className={styles.breadcrumbs}>
          Home <Icon icon="carret-right" size={14} color="#7F859F" />
          Collection
        </div>
      </SectionLayout>
      <SectionLayout className={styles.collection_banner}>
        {collectionDetail.banner && (
          <Image
            src={collectionDetail.banner}
            alt=""
            layout="fill"
            objectFit="cover"
            className={styles.collection_banner_img}
          />
        )}
        <div className={styles.collection_context_container}>
          <div className={styles.collection_name}>
            {collectionDetail.collectionName}
          </div>
          <div className={styles.collection_description}>
            {collectionDetail.description}
          </div>
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="flex">
          <TabsHorizontal
            tablist={tabList}
            type="secondary-no-outline"
            selectedTab={selectedTab}
            className="pt-[6px]"
            onChangeTab={(e: CategoryText) => setSelectedTab(e)}
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="flex flex-wrap gap-3 md:gap-2 lg:gap-5">
          {Array.isArray(collection) &&
            collection.map((item) => (
              <div key={item?.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  imgUrl={item.images[0]}
                  title={item.title}
                  rate={item.rate}
                  rateNumber={item.rateNumber}
                  followerNumber={item.followerNumber}
                  price={item.price}
                  currency={item.currency}
                  categories={item.categories}
                  tags={item.tags}
                  isVerified={item.isVerified}
                  description={item.description}
                  onClick={() => router.push(`/biz/home/${item.slug}`)}
                />
              </div>
            ))}
        </div>
        <TopSearches />
      </SectionLayout>
      <SectionLayout show={pagination.page > 1}>
        <Pagination
          limit={30}
          total={pagination.total}
          onPageChange={(selected) =>
            setPagination({ ...pagination, page: selected.selected })
          }
        />
      </SectionLayout>
      {/* <Filter onClose={() => setShowFilter(false)} visible={showFilter} /> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  const { collectionSlug } = context.query;
  return { props: { collectionSlug: collectionSlug } };
}

export default Collection;
