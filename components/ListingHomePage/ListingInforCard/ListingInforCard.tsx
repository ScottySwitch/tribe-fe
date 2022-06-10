import classNames from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Image from "next/image";
import { useState } from "react";
import styles from "./ListingInforCard.module.scss";

interface ListingInforCardProps {
  priceRange: { min: string; max: string; currency: string };
  onSetPriceRange: (value: { min: string; max: string; currency: string }) => void;
}

const ReviewsFollowers = (props: { className?: string }) => {
  const { className } = props;
  const reviewsFollowersClassName = classNames(styles.reviews_followers_container, className);
  return (
    <div className={reviewsFollowersClassName}>
      <div className={styles.reviews}>
        <Image src={require("public/images/no-review-star.svg")} width={80} height={40} alt="" />
        <p>(0 review)</p>
      </div>
      <div className={styles.followers}>
        <div className="h-[40px] flex items-center">0</div>
        <p>followers</p>
      </div>
    </div>
  );
};

const ListingInforCard = (props: ListingInforCardProps) => {
  const { priceRange, onSetPriceRange } = props;
  const [showPriceRangeModal, setShowPriceRangeModal] = useState(false);
  const [newPriceRange, setNewPriceRange] = useState({ min: "", max: "", currency: "" });
  return (
    <div className={styles.listing_infor_card}>
      <div className={styles.listing_infor_container}>
        <div className="flex justify-between items-center">
          <div className={styles.avatar}>
            <Image src={require("public/logo.svg")} layout="fill" alt="" />
          </div>
          <ReviewsFollowers className={styles.reviews_followers_mobile} />
        </div>
        <div className={styles.detail}>
          <div className={styles.name}>Evertop Hainanese Boneless Chicken</div>
          <div className={styles.contact}>
            <div className={styles.contact_left}>
              <Icon icon="map" size={20} />
              50 Bussorah St, Singapore 199466
            </div>
            <div className={styles.contact_right}>
              <Icon icon="call" size={20} />
              06-6777-9529
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
      <ReviewsFollowers className={styles.reviews_followers_desktop} />
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
              placeholder="Minimum price (optional)"
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
              placeholder="Maximum price (optional)"
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
              onSetPriceRange(newPriceRange);
              setShowPriceRangeModal(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ListingInforCard;
