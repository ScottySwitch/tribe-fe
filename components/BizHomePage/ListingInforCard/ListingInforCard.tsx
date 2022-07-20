import { get, isArray } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Upload from "components/Upload/Upload";
import AuthPopup from "components/AuthPopup/AuthPopup";

import UserFollowApi from "services/user-listing-follow";
import UserFavouriteApi from "services/user-listing-favourite";

import styles from "./ListingInforCard.module.scss";

interface ListingInforCardProps {
  isPaid?: boolean;
  isViewPage?: boolean;
  bizListing: { [key: string]: any };
  priceRange: { min: string; max: string; currency: string };
  socialInfo: string;
  phoneNumber: string;
  logo?: any;
  userInfo?: any;
  handleChangeLogo?: (srcImages: string[]) => void;
  onSetPriceRange?: (value: {
    min: string;
    max: string;
    currency: string;
  }) => void;
  onSetSocialInfo?: (value: string) => void;
  onSetPhoneNumber?: (value: string | number) => void;
}

const ReviewsFollowers = (props: {
  isViewPage?: boolean;
  className?: string;
  bizListing: any;
  userInfo?: any;
}) => {
  const { isViewPage, className, bizListing, userInfo } = props;
  const reviewsFollowersClassName = classNames(
    styles.reviews_followers_container,
    className
  );
  const bizListingReviewCount = get(bizListing, "reviews.length") || 0;
  const bizListingFollowerCount =
    get(bizListing, "user_listing_follows.length") || 0;
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const userFollowList = userInfo.listing_follow_ids;
      const userFavoriteList = userInfo.listing_favourite_ids;
      let checkIsFollow =
        Array.isArray(userFollowList) &&
        userFollowList.some((item) => item === bizListing.id);
      let checkIsFavourite =
        Array.isArray(userFavoriteList) &&
        userFavoriteList.some((item) => item === bizListing.id);
      setIsFollow(checkIsFollow);
      setIsFavourite(checkIsFavourite);
    }
  }, []);

  const handleAddFollow = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.token) {
      const data = await UserFollowApi.createFollowing(bizListing.id);
      if (get(data, "data")) {
        setIsFollow(true);
      }
    } else {
      setShowAuthPopup(true);
    }
  };

  const handleAddFavorite = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.token) {
      const data = await UserFavouriteApi.createFavourite(bizListing.id);
      if (get(data, "data")) {
        setIsFavourite(true);
      }
    } else {
      setShowAuthPopup(true);
    }
  };

  return (
    <div>
      {isViewPage && (
        <div className="flex gap-3 mb-2">
          <Button
            text="Follow"
            size="small"
            width={130}
            onClick={handleAddFollow}
            disabled={isFollow}
          />
          <Button
            prefix={<Icon icon="like-stroke" color="#e60112" />}
            text="Add to favourite "
            size="small"
            variant="secondary"
            disabled={isFavourite}
            onClick={handleAddFavorite}
          />
          <AuthPopup
            onClose={() => setShowAuthPopup(false)}
            visible={showAuthPopup}
          />
        </div>
      )}
      <div className={reviewsFollowersClassName}>
        <div className={styles.reviews}>
          {/*// TODO: currently review star is image*/}
          <Image
            src={require("public/images/no-review-star.svg")}
            width={80}
            height={40}
            alt=""
          />
          <p>
            ({bizListingReviewCount} review
            {bizListingReviewCount > 1 ? "s" : ""})
          </p>
        </div>
        <div className={styles.followers}>
          <div className="h-[40px] flex items-center">
            {bizListingFollowerCount}
          </div>
          <p>follower{bizListingFollowerCount > 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  );
};

const Price = ({ isViewPage, newPriceRange, onSetShowPriceRangeModal }) => {
  const isDataAvailable =
    newPriceRange?.currency && newPriceRange.min && newPriceRange.max;
  if (isViewPage) {
    return isDataAvailable ? (
      <div>{`${newPriceRange.min} ${newPriceRange?.currency} - ${newPriceRange.max}  ${newPriceRange?.currency}`}</div>
    ) : (
      <div>Not provided</div>
    );
  }
  return isDataAvailable ? (
    <div className="flex gap-5">
      <div>{`${newPriceRange.min} ${newPriceRange?.currency} - ${newPriceRange.max}  ${newPriceRange?.currency}`}</div>
      <div>
        <a onClick={() => onSetShowPriceRangeModal(true)}>Edit</a>
      </div>
    </div>
  ) : (
    <a onClick={() => onSetShowPriceRangeModal(true)}>Add price range</a>
  );
};

const SocialInfo = ({
  isPaid,
  isViewPage,
  newSocialInfo,
  onSetShowSocialInfoModal,
}) => {
  const socialArray = newSocialInfo ? Object.keys(newSocialInfo) : [];

  const contact = socialArray.map((item) => (
    <a
      key={item}
      target="_blank"
      rel="noreferrer"
      href={newSocialInfo[item]}
      className="mr-3"
    >
      {item}
    </a>
  ));

  if (isViewPage) {
    return <div>{!!socialArray.length ? contact : "Not provided"}</div>;
  }

  return (
    <div className="flex flex-wrap w-max">
      {contact}
      <a onClick={() => onSetShowSocialInfoModal(true)}>
        {newSocialInfo ? "Edit" : "Add social media"}
      </a>
    </div>
  );
};

const PhoneNumber = ({ isViewPage, phoneNumber, onSetPhoneNumberModal }) => {
  if (isViewPage) {
    return phoneNumber ? <div>{phoneNumber}</div> : <div>Not provided</div>;
  }

  return phoneNumber ? (
    <div className="flex gap-5">
      <div>{phoneNumber}</div>
      <div>
        <a onClick={() => onSetPhoneNumberModal(true)}>Edit</a>
      </div>
    </div>
  ) : (
    <a onClick={() => onSetPhoneNumberModal(true)}>Add phone number</a>
  );
};

const ListingInforCard = (props: ListingInforCardProps) => {
  const {
    isViewPage,
    bizListing,
    priceRange,
    phoneNumber,
    socialInfo,
    logo,
    userInfo,
    isPaid,
    handleChangeLogo,
    onSetSocialInfo,
    onSetPhoneNumber,
    onSetPriceRange,
  } = props;
  const [newPriceRange, setNewPriceRange] = useState<{
    min: string;
    max: string;
    currency: string;
  }>(priceRange || {});
  const [newPhoneNumber, setNewPhoneNumber] = useState<string | number>(
    phoneNumber
  );
  const [newSocialInfo, setNewSocialInfo] = useState<string>(socialInfo);

  const [showPriceRangeModal, setShowPriceRangeModal] = useState(false);
  const [showSocialInfoModal, setShowSocialInfoModal] = useState(false);
  const [showPhoneNumberModal, setPhoneNumberModal] = useState(false);

  const CenterIcon = () => (
    <div className="flex flex-col justify-center items-center gap-1">
      <Icon icon="camera-color" size={40} />
    </div>
  );
  return (
    <div className={styles.listing_infor_card}>
      <div className={styles.listing_infor_container}>
        <div className="flex justify-between items-center">
          <div className={styles.box_avatar}>
            <Upload
              type="avatar"
              className={styles.small_avatar}
              centerIcon={<CenterIcon />}
              fileList={logo}
              disabled={isViewPage}
              onChange={handleChangeLogo}
            />
          </div>
          {bizListing && (
            <ReviewsFollowers
              className={styles.reviews_followers_mobile}
              bizListing={bizListing}
            />
          )}
        </div>
        <div className={styles.detail}>
          <div className={styles.name}>{bizListing.name}</div>
          <div className={styles.contact}>
            <div className={styles.contact_left}>
              <Icon icon="map" size={20} />
              {isViewPage ? (
                bizListing.address
              ) : (
                <div>{bizListing.address}</div>
              )}
            </div>
            <div className={styles.contact_right}>
              <Icon icon="phone-color" size={20} />
              <PhoneNumber
                isViewPage={isViewPage}
                phoneNumber={phoneNumber}
                onSetPhoneNumberModal={(e) => setPhoneNumberModal(e)}
              />
            </div>
            <div className={styles.contact_left}>
              <Icon icon="price-color" size={20} />
              <Price
                isViewPage={isViewPage}
                newPriceRange={newPriceRange}
                onSetShowPriceRangeModal={(e) => setShowPriceRangeModal(e)}
              />
            </div>
            <div className={styles.contact_right}>
              <Icon icon="web-color" size={20} />
              <SocialInfo
                isPaid={isPaid}
                isViewPage={isViewPage}
                newSocialInfo={newSocialInfo}
                onSetShowSocialInfoModal={(e) => setShowSocialInfoModal(e)}
              />
            </div>
          </div>
        </div>
      </div>
      {bizListing && (
        <ReviewsFollowers
          userInfo={userInfo}
          isViewPage={isViewPage}
          className={styles.reviews_followers_desktop}
          bizListing={bizListing}
        />
      )}
      <Modal
        title="What’s the general price range of a meal?"
        visible={showPriceRangeModal}
        mobilePosition="center"
        width={600}
        onClose={() => {
          setNewPriceRange(priceRange);
          setShowPriceRangeModal(false);
        }}
      >
        <div className="px-[30px] py-5">
          <Input
            placeholder="Select a currency"
            value={newPriceRange?.currency}
            onChange={(e: any) =>
              setNewPriceRange({
                ...newPriceRange,
                currency: e.target.value,
              })
            }
          />
          <div className="flex gap-5 w-full mt-3">
            <Input
              width="50%"
              placeholder="Minimum Price"
              value={newPriceRange.min}
              onChange={(e: any) =>
                setNewPriceRange({
                  ...newPriceRange,
                  min: e.target.value,
                })
              }
            />
            <Input
              width="50%"
              placeholder="Maximum Price"
              value={newPriceRange.max}
              onChange={(e: any) =>
                setNewPriceRange({
                  ...newPriceRange,
                  max: e.target.value,
                })
              }
            />
          </div>
          <br />
          <Button
            text="Submit"
            size="small"
            onClick={() => {
              onSetPriceRange?.(newPriceRange);
              setShowPriceRangeModal(false);
            }}
          />
        </div>
      </Modal>
      <Modal
        title="Social Info"
        visible={showSocialInfoModal}
        mobilePosition="center"
        width={600}
        onClose={() => {
          setNewSocialInfo(socialInfo);
          setShowSocialInfoModal(false);
        }}
      >
        <div className="px-[30px] py-5">
          <Input
            placeholder="Type Social Info"
            value={newSocialInfo}
            onChange={(e: any) => setNewSocialInfo(e.target.value)}
          />
          <br />
          <Button
            text="Submit"
            size="small"
            onClick={() => {
              onSetSocialInfo?.(newSocialInfo);
              setShowSocialInfoModal(false);
            }}
          />
        </div>
      </Modal>
      <Modal
        title="Phone Number"
        visible={showPhoneNumberModal}
        mobilePosition="center"
        width={600}
        onClose={() => {
          setNewPhoneNumber(phoneNumber);
          setPhoneNumberModal(false);
        }}
      >
        <div className="px-[30px] py-5">
          <Input
            placeholder="Type Social Info"
            value={newPhoneNumber}
            onChange={(e: any) => setNewPhoneNumber(e.target.value)}
          />
          <br />
          <Button
            text="Submit"
            size="small"
            onClick={() => {
              onSetPhoneNumber?.(newPhoneNumber);
              setPhoneNumberModal(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ListingInforCard;
