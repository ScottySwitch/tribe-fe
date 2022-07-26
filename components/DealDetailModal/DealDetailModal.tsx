import Image from "next/image";

import Modal, { ModalProps } from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";
import React, { useState, useEffect } from "react";
import styles from "./DealDetailModal.module.scss";
import get from "lodash/get";
import DealFavouriteApi from "services/user-deal-favourite";
import ShareModal from "components/ShareModal/ShareModal";
import FavouriteDealApi from "services/user-deal-favourite";

export interface IDealsDetails {
  name: string;
  imgUrl: string;
  offers?: string;
  valid?: string;
  conditions?: string;
}
interface DealDetailModalProps extends ModalProps {
  data: any;
  onShare?: () => void;
  onFavourite?: () => void;
}

const DealDetailModal = (props: DealDetailModalProps) => {
  const { data, visible, onClose, onShare, onFavourite } = props;
  const [isFavourite, setIsFavourite] = useState<boolean>(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const checkFavouriteDeal = async () => {
      const dataFavouriteDeal = await FavouriteDealApi.checkIsFavourite(
        data.id
      );
      console.log("dataFavouriteDeal", dataFavouriteDeal);
      if (get(dataFavouriteDeal, "data.data.length") == 0) {
        setIsFavourite(false);
      }
    };
    checkFavouriteDeal();
  }, []);

  const handleAddFavouriteDeal = async (id) => {
    const data = await DealFavouriteApi.createDealFavourite(id);
    if (get(data, "data")) {
      setIsFavourite(true);
    }
  };

  const handleOpenShareModal = () => {
    onShare?.();
    setShowShareModal(true);
  };

  return (
    <React.Fragment>
      <Modal
        visible={visible}
        width="100%"
        maxWidth={678}
        mobilePosition="center"
        onClose={onClose}
      >
        <div className={styles.header}>
          <div className="flex items-center min-w-0">
            <div className={styles.icon}>
              <Icon icon="deals-color" size={22} />
            </div>
            <div className={`${styles.title} truncate`}>{data.name}</div>
          </div>
          <div className={styles.close} onClick={onClose}>
            <Icon icon="cancel-mobile" />
          </div>
        </div>
        <div className={styles.cover_image}>
          <Image
            src={data.images ? data.images[0] : "https://picsum.photos/678/169"}
            alt={data.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.content}>
          {data.description ||
            (data.information && (
              <div className={styles.item}>
                <h6 className={styles.label}>Offers</h6>
                <p className="text-left">
                  {data.description || data.information}
                </p>
              </div>
            ))}
          {(data.end_date || data.validUntil) && (
            <div className={styles.item}>
              <h6 className={styles.label}>Valid</h6>
              <p className="text-left">
                {data.start_date && data.start_date + " - "}
                {data.end_date}
                {new Date(data.validUntil).toLocaleString()}
              </p>
            </div>
          )}
          {(get(data, "attributes.terms_conditions") ||
            data.conditions ||
            data.terms_conditions ||
            data.termsConditions) && (
            <div className={styles.item}>
              <h6 className={styles.label}>Terms & Conditions</h6>
              <p className="text-left">
                {get(data, "attributes.terms_conditions") ||
                  data.terms_conditions ||
                  data.conditions ||
                  data.termsConditions}
              </p>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <div className="flex">
            <Button
              variant="secondary"
              text="Share"
              className="text-sm	font-bold mr-[17px]"
              width={115}
              prefix={<Icon icon="share" />}
              onClick={handleOpenShareModal}
            />
            <Button
              variant="primary"
              text="Add to favourite"
              className="text-sm	font-bold"
              width="max-content"
              prefix={<Icon icon="like-stroke" color="#ffffff" />}
              onClick={() => handleAddFavouriteDeal(data.id)}
              disabled={isFavourite}
            />
          </div>
          <Button
            variant="underlined"
            text="Cancel"
            className={`${styles.btn_cancel} text-sm font-medium no-underline`}
            width="max-content"
            onClick={() => {
              onClose && onClose();
              setIsFavourite(false);
            }}
          />
        </div>
      </Modal>
      <ShareModal
        url=""
        onClose={() => setShowShareModal(false)}
        visible={showShareModal}
      />
    </React.Fragment>
  );
};

export default DealDetailModal;
