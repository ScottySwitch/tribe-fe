import classNames from "classnames"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Image from "next/image"
import {useEffect, useState} from "react"
import styles from "./ListingInforCard.module.scss"

interface ListingInforCardProps {
  bizListing: any,
  priceRange: { min: string; max: string; currency: string }
  onSetPriceRange: (value: { min: string; max: string; currency: string }) => void
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
  const { bizListing } = props
  const [showPriceRangeModal, setShowPriceRangeModal] = useState(false)
  const [newPriceRange, setNewPriceRange] = useState({ min: "", max: "", currency: "" })

  useEffect(() => {
    if (priceRange) {
      setNewPriceRange(priceRange)
    }
  }, [priceRange])

  return (
    <div className={styles.listing_infor_card}>
      <div className={styles.listing_infor_container}>
        <div className="flex justify-between items-center">
          <div className={styles.avatar}>
            <Image src={require("public/logo.svg")} layout="fill" alt="" />
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
              {bizListing.phone_number}
            </div>
            <div className={styles.contact_left}>
              <Icon icon="tags-color" size={20} />
              {newPriceRange.currency && newPriceRange.min && newPriceRange.max ? (
                <div className="flex gap-5">
                  <div>{`${newPriceRange.min} ${newPriceRange.currency} - ${newPriceRange.currency} ${newPriceRange.max}`}</div>
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
              <a>Add social media</a>
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
            value={newPriceRange.currency}
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
    </div>
  )
}

export default ListingInforCard
