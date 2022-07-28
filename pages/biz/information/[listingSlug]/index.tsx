import { get, isArray } from "lodash";
import { useContext, useEffect, useState } from "react";

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
import { Router, useRouter } from "next/router";
import { UserInforContext } from "Context/UserInforContext";
import { isPaidUser } from "utils";
import moment from "moment";
import ConfirmModal from "components/ConfirmModal";
import EmailApi from "services/email";

const BizInformation = (props) => {
  const { listingSlug } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaid, setIsPaid] = useState(true);
  const [listing, setListing] = useState(defaultAddlistingForm);
  const [isPayYearly, setIsPayYearly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const informationList = isPaid ? paidInformationList : freeInformationList;
  const [selectedTab, setSelectedTab] = useState(informationList[0].label);

  const router = useRouter();
  const { user, deleteUser, updateUser } = useContext(UserInforContext);

  const Content = () => {
    return (
      <p className="text-sm mb-5">
        Basic plan will continue until{" "}
        <strong>{moment(listing.expiration_date).format("DD-MM-YYYY")}</strong>.
        After that, you will no longer have access to Basic Tier feature.Basic
        Tier information on your listing will be hidden.
      </p>
    );
  };

  useEffect(() => {
    const getListingData = async () => {
      const data = await BizListingApi.getInfoBizListingBySlug(listingSlug);

      //TODO: Check listing is owned by user before returning biz listing data on BE
      const listing = get(data, "data.data[0]") || {};
      const isPaidListing = get(listing, "biz_invoices.length") > 0;
      if (listing?.expiration_date) {
        setIsPaid(isPaidUser(listing.expiration_date));
      } else {
        setIsPaid(false);
      }
      // setIsPaid(isPaidListing);
      setListing(listing);
      setLoading(false);
    };

    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const ownedListingSlugs = isArray(userInfo.owner_listings)
      ? userInfo.owner_listings.map((item) => get(item, "attributes.slug"))
      : [];
    const isOwned = ownedListingSlugs.some((item) => item === listingSlug);

    if (listingSlug && isOwned) {
      getListingData();
    } else {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingSlug, loading]);

  const onSubmit = async (data) => {
    listing.id &&
      (await BizListing.updateBizListing(listing.id, {
        ...listing,
        ...data,
      }).then(() => setLoading(true)));
  };

  const handleHref = (e) => {
    if (e === "free") {
      setIsVisible(true);
    } else {
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      updateUser({
        type_handle: "Claim",
      });
      router.push(`/claim/${get(userInfo, "now_biz_listing.id_listing")}`);
    }
  };

  const handleDowngrade = () => {
    const data = EmailApi.downgrade(get(listing, "slug"));
    setIsVisible(true);
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
        return <PhotosVideos />;
      case InformationList.MANAGE_DEALS:
        return <ManageDeals bizListingId={listing.id} />;
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
            expirationDate={moment(listing?.expiration_date).format(
              "YYYY/MM/DD"
            )}
            isChangeTier
            isPaid={isPaid}
            isPayYearly={isPayYearly}
            onSetIsPayYearly={(e) => setIsPayYearly(e)}
            onDirectToVerification={handleHref}
          />
        );
      case InformationList.VERIFICATION:
        return <Verification isPaid={isPaid} />;

      default:
        return <div />;
    }
  };

  const handleLogout = () => {
    deleteUser();
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
      <ConfirmModal
        title="Are you sure?"
        visible={isVisible}
        onsubmit={handleDowngrade}
        onClose={() => setIsVisible(false)}
        content={<Content />}
      />
    </SectionLayout>
  );
};
export const getServerSideProps = async (context) => {
  const { listingSlug } = context.query;
  return { props: { listingSlug: listingSlug } };
};

export default BizInformation;
