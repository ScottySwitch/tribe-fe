import Image from "next/image"
import { useState } from "react"
import classNames from "classnames"

import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Upload from "components/Upload/Upload"

import styles from "./ListingInforCard.module.scss"
import { get } from "lodash"

interface ListingInforCardProps {
  isViewPage?: boolean
  bizListing: { [key: string]: any }
  priceRange: { min: string; max: string; currency: string }
  socialInfo: string
  phoneNumber: string
  logo?: any
  handleChangeLogo?: (srcImages: string[]) => void
  onSetPriceRange?: (value: { min: string; max: string; currency: string }) => void
  onSetSocialInfo?: (value: string) => void
  onSetPhoneNumber?: (value: string | number) => void
}

const ReviewsFollowers = (props: { isViewPage?: boolean; className?: string; bizListing: any }) => {
  const { isViewPage, className, bizListing } = props
  const reviewsFollowersClassName = classNames(styles.reviews_followers_container, className)

  const bizListingReviewCount = get(bizListing, "reviews.data.length") || 0
  const bizListingFollowerCount = get(bizListing, "user_listing_follows.data.length") || 0
  return (
    <div>
      {isViewPage && (
        <div className="flex gap-3 mb-2">
          <Button text="Follow" size="small" width={130} />
          <Button
            prefix={<Icon icon="like-stroke" color="#e60112" />}
            text="Add to favourite "
            size="small"
            variant="secondary"
          />
        </div>
      )}
      <div className={reviewsFollowersClassName}>
        <div className={styles.reviews}>
          {/*// TODO: currently review star is image*/}
          <Image src={require("public/images/no-review-star.svg")} width={80} height={40} alt="" />
          <p>
            ({bizListingReviewCount} review{bizListingReviewCount > 1 ? "s" : ""})
          </p>
        </div>
        <div className={styles.followers}>
          <div className="h-[40px] flex items-center">{bizListingFollowerCount}</div>
          <p>follower{bizListingFollowerCount > 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  )
}

const Price = ({ isViewPage, newPriceRange, onSetShowPriceRangeModal }) => {
  const isDataAvailable = newPriceRange?.currency && newPriceRange.min && newPriceRange.max
  if (isViewPage) {
    return isDataAvailable ? (
      <div>{`${newPriceRange.min} ${newPriceRange?.currency} - ${newPriceRange.max}  ${newPriceRange?.currency}`}</div>
    ) : (
      <div>Not provided</div>
    )
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
  )
}

const SocialInfo = ({ isViewPage, newSocialInfo, onSetShowSocialInfoModal }) => {
  if (isViewPage) {
    return newSocialInfo ? (
      <a target="_blank" rel="noreferrer" href={newSocialInfo}>
        {newSocialInfo}
      </a>
    ) : (
      <div>Not provided</div>
    )
  }
  return newSocialInfo ? (
    <div className="flex gap-5">
      <a target="_blank" rel="noreferrer" href={newSocialInfo}>
        {newSocialInfo}
      </a>
      <div>
        <a onClick={() => onSetShowSocialInfoModal(true)}>Edit</a>
      </div>
    </div>
  ) : (
    <a onClick={() => onSetShowSocialInfoModal(true)}>Add social media</a>
  )
}

const PhoneNumber = ({ isViewPage, phoneNumber, onSetPhoneNumberModal }) => {
  if (isViewPage) {
    return phoneNumber ? (
      <a target="_blank" rel="noreferrer" href={phoneNumber}>
        {phoneNumber}
      </a>
    ) : (
      <div>Not provided</div>
    )
  }
  return phoneNumber ? (
    <div className="flex gap-5">
      <a target="_blank" rel="noreferrer" href={phoneNumber}>
        {phoneNumber}
      </a>
      <div>
        <a onClick={() => onSetPhoneNumberModal(true)}>Edit</a>
      </div>
    </div>
  ) : (
    <a onClick={() => onSetPhoneNumberModal(true)}>Add phone number</a>
  )
}

const ListingInforCard = (props: ListingInforCardProps) => {
  const {
    isViewPage,
    bizListing,
    priceRange,
    phoneNumber,
    socialInfo,
    logo,
    handleChangeLogo,
    onSetSocialInfo,
    onSetPhoneNumber,
    onSetPriceRange,
  } = props
  const [newPriceRange, setNewPriceRange] = useState<{
    min: string
    max: string
    currency: string
  }>(priceRange || {})
  const [newPhoneNumber, setNewPhoneNumber] = useState<string | number>(phoneNumber)
  const [newSocialInfo, setNewSocialInfo] = useState<string>(socialInfo)

  const [showPriceRangeModal, setShowPriceRangeModal] = useState(false)
  const [showSocialInfoModal, setShowSocialInfoModal] = useState(false)
  const [showPhoneNumberModal, setPhoneNumberModal] = useState(false)

  const CenterIcon = () => (
    <div className="flex flex-col justify-center items-center gap-1">
      <Icon icon="camera-color" size={40} />
    </div>
  )
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
            <ReviewsFollowers className={styles.reviews_followers_mobile} bizListing={bizListing} />
          )}
        </div>
        <div className={styles.detail}>
          <div className={styles.name}>{bizListing.name}</div>
          <div className={styles.contact}>
            <div className={styles.contact_left}>
              <Icon icon="map" size={20} />
              {isViewPage ? bizListing.address : <div>{bizListing.address}</div>}
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
          setNewPriceRange(priceRange)
          setShowPriceRangeModal(false)
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
              onSetPriceRange?.(newPriceRange)
              setShowPriceRangeModal(false)
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
          setNewSocialInfo(socialInfo)
          setShowSocialInfoModal(false)
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
              onSetSocialInfo?.(newSocialInfo)
              setShowSocialInfoModal(false)
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
          setNewPhoneNumber(phoneNumber)
          setPhoneNumberModal(false)
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
              onSetPhoneNumber?.(newPhoneNumber)
              setPhoneNumberModal(false)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ListingInforCard
