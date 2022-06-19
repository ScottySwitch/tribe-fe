import classNames from "classnames"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Upload from "components/Upload/Upload"
import Image from "next/image"
import {useEffect, useState} from "react"
import { Value } from "sass"
import styles from "./ListingInforCard.module.scss"

interface ListingInforCardProps {
  bizListing: any,
  priceRange: { min: string; max: string; currency: string },
  socialInfo: any,
  phoneNumber: any,
  logo: any,
  handleChangeLogo: (srcImages: any) => void
  onSetPriceRange: (value: { min: string; max: string; currency: string }) => void
  onSetSocialInfo: (value: any) => void
  onSetPhoneNumber: (value: any) => void
}

const ReviewsFollowers = (props: { className?: string, bizListing: any }) => {
  const { className } = props
  const { bizListing } = props
  const reviewsFollowersClassName = classNames(styles.reviews_followers_container, className)

  const bizListingReviewCount = bizListing.reviews.data.length;
  const bizListingFollowerCount = bizListing.user_listing_follows.data.length;
  return (
    <div className={reviewsFollowersClassName}>
      <div className={styles.reviews}>
        {/*// TODO: currently review star is image*/}
        <Image src={require("public/images/no-review-star.svg")} width={80} height={40} alt="" />
        <p>({bizListingReviewCount} review{bizListingReviewCount > 1 ? 's' : ''})</p>
      </div>
      <div className={styles.followers}>
        <div className="h-[40px] flex items-center">{bizListingFollowerCount}</div>
        <p>follower{bizListingFollowerCount > 1 ? 's': ''}</p>
      </div>
    </div>
  )
}

const ListingInforCard = (props: ListingInforCardProps) => {
  const { priceRange, onSetPriceRange } = props
  const {socialInfo, onSetSocialInfo} = props
  const {phoneNumber, onSetPhoneNumber} = props
  const { bizListing } = props
  const {logo, handleChangeLogo} = props
  const [showPriceRangeModal, setShowPriceRangeModal] = useState(false)
  const [newPriceRange, setNewPriceRange] = useState({ min: "", max: "", currency: "" })
  const [newSocialInfo, setNewSocialInfo] = useState<any>()
  const [showSocialInfoModal, setShowSocialInfoModal] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState<any>('');
  const [showPhoneNumberModal, setPhoneNumberModal] = useState<boolean>(false);

  const CenterIcon = () => (
    <div className="flex flex-col justify-center items-center gap-1">
      <Icon icon="camera-color" size={40} />
    </div>
  )

  useEffect(() => {
    if (priceRange) {
      setNewPriceRange(priceRange)
    }
    if (socialInfo) {
      setNewSocialInfo(socialInfo)
    }
    if (phoneNumber) {
      setNewPhoneNumber(phoneNumber)
    }
  }, [priceRange, socialInfo, phoneNumber])

  return (
    <div className={styles.listing_infor_card}>
      <div className={styles.listing_infor_container}>
        <div className="flex justify-between items-center">
          <div className={styles.box_avatar}>
            {/* <Image src={require("public/logo.svg")} layout="fill" alt="" /> */}
            <Upload
              type="avatar"
              className={styles.small_avatar}
              centerIcon={<CenterIcon />}
              fileList={logo}
              onChange={handleChangeLogo}
            />
          </div>
          {bizListing && <ReviewsFollowers className={styles.reviews_followers_mobile} bizListing={bizListing} />}
        </div>
        <div className={styles.detail}>
          <div className={styles.name}>{bizListing.name}</div>
          <div className={styles.contact}>
            <div className={styles.contact_left}>
              <Icon icon="map" size={20} />
              {bizListing.address}
            </div>
            <div className={styles.contact_right}>
              <Icon icon="call" size={20} />
              {phoneNumber ? (
                <div className="flex gap-5">
                    <a target="_blank" href={phoneNumber} onClick={() => setPhoneNumberModal(true)}>
                      {phoneNumber}
                    </a><div>
                    <a onClick={() => setPhoneNumberModal(true)}>Edit</a>
                  </div>
                </div>
              ) : (
                  <a onClick={() => setPhoneNumberModal(true)}>Add phone number</a>
                )}
            </div>
            <div className={styles.contact_left}>
              <Icon icon="tags-color" size={20} />
              {newPriceRange?.currency && newPriceRange.min && newPriceRange.max ? (
                <div className="flex gap-5">
                  <div>{`${newPriceRange.min} ${newPriceRange?.currency} - ${newPriceRange.max}  ${newPriceRange?.currency}`}</div>
                  <div>
                    <a onClick={() => setShowPriceRangeModal(true)}>Edit</a>
                  </div>
                </div>
              ) : (
                <a onClick={() => setShowPriceRangeModal(true)}>Add price range</a>
              )}
            </div>
            <div className={styles.contact_right}>
              <Icon icon="web-color" size={20} />
              {newSocialInfo ? (
                <div className="flex gap-5">
                    <a target="_blank" href={newSocialInfo} onClick={() => setShowSocialInfoModal(true)}>{newSocialInfo}</a>                  <div>
                    <a onClick={() => setShowSocialInfoModal(true)}>Edit</a>
                  </div>
                </div>
              ) : (
                  <a onClick={() => setShowSocialInfoModal(true)}>Add social media</a>
                )}
            </div>
          </div>
        </div>
      </div>
      {bizListing && <ReviewsFollowers className={styles.reviews_followers_desktop} bizListing={bizListing} />}
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
              onSetPriceRange(newPriceRange)
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
              onSetSocialInfo(newSocialInfo)
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
              onSetPhoneNumber(newPhoneNumber)
              setPhoneNumberModal(false)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ListingInforCard
