import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard";
import DealDetailModal from "components/DealDetailModal/DealDetailModal";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import MenuCard from "components/MenuCard/MenuCard";
import ProductDetailModal from "components/ProductDetailModal/ProductDetailModal";
import PromotionCard from "components/PromotionCard/PromotionCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import { CategoryText, ListingTabs } from "enums";
import { get, orderBy } from "lodash";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BizListingApi from "services/biz-listing";
import { calcRateNumber, censoredPhoneNumber } from "utils";

import styles from "styles/Property.module.scss";
import TabsHorizontal from "components/TabsHorizontal/TabsHorizontal";
import { UserInforContext } from "Context/UserInforContext";
import MenuDetailModal from "components/MenuDetailModal/MenuDetailModal";

interface PropertiesContainerProps {
  cardItem?: any;
  list?: any[];
  onShowDetailModal?: (item: { [key: string]: any }) => void;
}

const PropertiesContainer = ({
  cardItem,
  list,
  onShowDetailModal,
}: PropertiesContainerProps) => {
  const CardItem = cardItem;
  return (
    <div className="flex flex-wrap gap-10">
      {Array.isArray(list) && list.length > 0 ? (
        list.map((item) => {
          const formatItem = {
            id: get(item, "attributes.id") || item.id,
            images: item?.images || item.menu_file || [],
            firstImage:
              item.imgUrl ||
              get(item, "images[0]") ||
              get(item, "menu_file[0]"),
            name: get(item, "attributes.name") || item.name || "",
            price: get(item, "attributes.price") || item.price || "",
            description:
              get(item, "attributes.description") ||
              item.information ||
              item.description ||
              "",
            expiredAt:
              get(item, "attributes.expire_at") ||
              item.expireAt ||
              item?.start_date?.replaceAll("-", "/") ||
              "",
            endDate: get(item, "attributes.end_date") || item.end_date || "",
            startDate:
              get(item, "attributes.start_date") || item.start_date || "",
            termsConditions:
              get(item, "attributes.terms_conditions") ||
              item.terms_conditions ||
              item.conditions ||
              "",
          };

          return (
            <div
              key={formatItem.id}
              onClick={() => onShowDetailModal?.(formatItem)}
            >
              <CardItem
                imgUrl={
                  formatItem.firstImage || "https://picsum.photos/200/300"
                }
                title={formatItem.name}
                price={formatItem.price}
                description={formatItem.description}
                expiredAt={formatItem.expiredAt}
                termsConditions={formatItem.termsConditions}
                conditions={formatItem.termsConditions}
                endDate={formatItem.endDate}
                startDate={formatItem.startDate}
              />
            </div>
          );
        })
      ) : (
        <div>There is no data yet</div>
      )}
    </div>
  );
};

const Properties = (context) => {
  const { listingSlug, property } = context;
  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);

  const upperCaseTitle = property?.[0].toUpperCase() + property?.slice(1);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [listingInformation, setListingInformation] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isEatListing, setIsEatListing] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const TabList: any[] = [
    {
      label: "Deals",
      value: "deals",
    },
    {
      label: isEatListing ? "Dishes" : "Products",
      value: "products",
    },
    {
      label: "Menu",
      value: "menus",
    },
  ];

  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);
      let data = await BizListingApi.getInfoBizListingBySlug(listingSlug);

      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      const listingDetail = get(data, `data.data[0]`) || {};

      if (get(listingDetail, "categories[0].slug") === CategoryText.EAT) {
        setIsEatListing(true);
      }

      updateUser({ now_biz_listing: listingDetail });

      const bizInvoice = listingDetail.biz_invoices || [];
      const rawPhoneNumber = listingDetail.phone_number;
      const defaultPhone = censoredPhoneNumber(rawPhoneNumber);
      if (bizInvoice.length > 0) {
        setIsPaid(true);
        setPhoneNumber(rawPhoneNumber);
      } else {
        setPhoneNumber(defaultPhone);
      }
      setIsVerified(listingDetail.is_verified);
      setUserInfo(userInfo);

      setListingInformation(listingDetail);

      setLoading(false);
    };

    getProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingSlug]);

  const handleShowDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  let DetailModal: any = ProductDetailModal;
  const renderProperties = () => {
    switch (property) {
      case ListingTabs.DISH:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={listingInformation.products}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.PRODUCT:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={listingInformation.products}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.SERVICE:
        return (
          <PropertiesContainer
            cardItem={InforCard}
            list={listingInformation.products}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.DEAL:
        DetailModal = DealDetailModal;
        return (
          <PropertiesContainer
            cardItem={PromotionCard}
            list={listingInformation[property]}
            onShowDetailModal={handleShowDetailModal}
          />
        );
      case ListingTabs.MENU:
        DetailModal = MenuDetailModal;
        return (
          <PropertiesContainer
            cardItem={MenuCard}
            list={listingInformation[property]}
            onShowDetailModal={handleShowDetailModal}
          />
        );
    }
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
      <SectionLayout className={styles.listing_container}>
        <ListingInforCard
          isVerified={isVerified}
          isViewPage={true}
          logo={listingInformation.logo}
          isPaid={isPaid}
          phoneNumber={phoneNumber}
          socialInfo={listingInformation.website}
          priceRange={{
            min: listingInformation.min_price,
            max: listingInformation.max_price,
            currency: listingInformation.currecy,
          }}
          bizListing={listingInformation}
          userInfo={userInfo}
        />
      </SectionLayout>
      <SectionLayout>
        <div className="flex">
          <TabsHorizontal
            tablist={TabList}
            type="secondary-no-outline"
            selectedTab={property}
            className="pt-[6px]"
            onChangeTab={(e) => {
              router.push(`/biz/${e}/${listingSlug}`, undefined, {
                shallow: false,
              });
            }}
          />
        </div>
      </SectionLayout>
      <SectionLayout>{renderProperties()}</SectionLayout>
      <SectionLayout>
        <TopSearches />
      </SectionLayout>
      <DetailModal
        visible={showDetailModal}
        data={selectedItem}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export async function getServerSideProps(props) {
  // Pass data to the page via props
  return {
    props: {
      listingSlug: props.query.listingSlug || "",
      property: props.query.property || "",
    },
  };
}
export default Properties;
