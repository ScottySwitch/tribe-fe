import { get } from "lodash";
import { useEffect, useState } from "react";

import BusinessInformation from "components/BizInformationPage/TabContentComponents/BusinessInformation";
import ManageDeals from "components/BizInformationPage/TabContentComponents/ManageDeals";
import ProductListing from "components/BizInformationPage/TabContentComponents/ProductListing";
import Icon from "components/Icon/Icon";
import Heading from "components/Heading/Heading";
import BizListing from "services/biz-listing";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { InformationList } from "enums";
import BusinessDetail from "components/BizInformationPage/TabContentComponents/BusinessDetail";
import TierTable from "components/TierTable/TierTable";
import Verification from "components/BizInformationPage/TabContentComponents/Verification";
import PhotosVideos from "components/BizInformationPage/TabContentComponents/PhotosVideos";
import BizListingApi from "../../../../services/biz-listing";
import {
  paidInformationList,
  freeInformationList,
  defaultAddlistingForm,
} from "constant";

import styles from "styles/BizInformation.module.scss";

const BizInformation = (props) => {
  const { listingSlug } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaid, setIsPaid] = useState(true);
  const [listing, setListing] = useState(defaultAddlistingForm);
  const [isPayYearly, setIsPayYearly] = useState(false);

  const informationList = isPaid ? paidInformationList : freeInformationList;
  const [selectedTab, setSelectedTab] = useState(informationList[0].label);

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");

      const data = await BizListingApi.getInfoBizListingBySlug(
        listingSlug
      ).finally(() => setLoading(false));

      if (data.data.data.length > 0) {
        const listing = get(data, "data.data[0]") || {};
        console.log("business information", listing);
        userInfo.now_biz_listing = listing;
        localStorage.setItem("user", JSON.stringify(userInfo));
        const isPaidListing = get(listing, "biz_invoices.length") > 0;
        setIsPaid(isPaidListing);
        setListing(listing);
      }
    };

    listingSlug && getListingData(listingSlug);
  }, [listingSlug, loading]);

  const onSubmit = async (data) => {
    console.log("submitData", data);
    listing.id &&
      (await BizListing.updateBizListing(listing.id, {
        ...listing,
        ...data,
      }).then(() => setLoading(true)));
  };

  const tabContent = () => {
    switch (selectedTab) {
      case InformationList.BUSINESS_INFORMATION:
        return (
          <BusinessInformation
            listing={listing}
            loading={loading}
            onSubmit={onSubmit}
          />
        );
      case InformationList.BUSINESS_DETAIL:
        return (
          <BusinessDetail
            listing={listing}
            loading={loading}
            onSubmit={onSubmit}
          />
        );
      case InformationList.PRODUCT_LISTING:
        return <ProductListing isPaid={isPaid} bizListingId={listing.id} />;
      case InformationList.PHOTOS_VIDEOS:
        return <PhotosVideos isPaid={isPaid} />;
      case InformationList.MANAGE_DEALS:
        return <ManageDeals bizListingId={listing.id} />
      case InformationList.ANALYTICS:
        return (
          <SectionLayout
            title="Analytics"
            className="px-[30px]"
            containerClassName="w-full"
          >
            <div />
          </SectionLayout>
        );
      case InformationList.CHANGE_ACCOUNT_TIER:
        return (
          <TierTable
            isPaid={isPaid}
            isPayYearly={isPayYearly}
            onSetIsPayYearly={(e) => setIsPayYearly(e)}
          />
        );
      case InformationList.VERIFICATION:
        return <Verification isPaid={isPaid} />;

      default:
        return <div />;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <SectionLayout backgroundColor>
      <div className={styles.biz_information}>
        <div className={styles.left_col}>
          <div className={styles.left_col_top}>
            <div className={styles.progress_bar} />
            <div>60% to complete your profile!</div>
          </div>
          <div className={styles.left_col_bottom}>
            {informationList.map((item) => (
              <div
                className="flex gap-3 justify-between"
                key={item.label}
                onClick={() => setSelectedTab(item.label)}
              >
                <Heading
                  icon={item.icon}
                  type="tab"
                  text={item.label}
                  selected={selectedTab === item.label}
                />
                {item.star && <Icon icon="star-2" color="#653fff" />}
              </div>
            ))}
            <div className="flex gap-3 justify-between" onClick={handleLogout}>
              <Heading
                icon="logout"
                type="tab"
                text="Log out"
                selected={false}
              />
            </div>
          </div>
        </div>
        <div className={styles.right_col}>{tabContent()}</div>
      </div>
    </SectionLayout>
  );
};
export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  return { props: { listingSlug: slug } };
};

export default BizInformation;
