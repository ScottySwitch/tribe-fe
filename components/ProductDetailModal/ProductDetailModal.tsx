import Modal, { ModalProps } from "components/Modal/Modal";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import ScrollingBox from "components/ScrollingBox/ScrollingBox";
import Album from "components/Album/Album";

import styles from "./ProductDetailModal.module.scss";
import React, { useState } from "react";
import { shareOptions } from "constant";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  LineIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export interface IProduct {
  id: number;
  name: string;
  images?: any[];
  price?: string | number;
  priceSale?: string | number;
  discount?: string | number;
  description?: string;
  type: "paid" | "klook" | "free" | "";
}

interface ProductDetailsModalProps extends ModalProps {
  data: IProduct;
  onShare?: () => void;
  onKlook?: () => void;
  onBookNow?: () => void;
}

const ProductDetailModal = (props: ProductDetailsModalProps) => {
  const { data, visible, onClose, onShare, onKlook, onBookNow } = props;
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();
  const { asPath } = router;

  const handleShare = () => {
    setShowShareModal(true);
    onShare?.();
  };

  const handleShareLink = (socialUrl) => {
    window
      .open(
        `https://www.${socialUrl}/sharer.php?u=${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`,
        "_blank"
      )
      ?.focus();
  };

  const handleCopyUrl = () =>
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${asPath.slice(1)}`)
      .then(() => {
        toast.success("Copied!", {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
        });
      });

  return (
    <React.Fragment>
      <Modal visible={visible} width="100%" maxWidth={1328} onClose={onClose}>
        <div className={styles.container}>
          <div className={styles.close} onClick={onClose}>
            <Icon icon="cancel-mobile" />
          </div>
          <div className={styles.container_gallery}>
            <Album
              //make rerender album when popup product detail modal
              key={data.images?.[0]}
              images={data.images}
              showedPicsNumber={{ slidesToShow: 6, slidesToScroll: 6 }}
            />
          </div>

          <div className={styles.container_info}>
            <h2 className={styles.title}>{data.name}</h2>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-[16px]">
                {data.priceSale ? (
                  <div>
                    <div className={styles.price_sale}>
                      <span>$</span>
                      <span>{data.priceSale}</span>
                    </div>
                    <div className={styles.price}>
                      <span>$</span>
                      <span>{data.price}</span>
                    </div>
                    <div className={styles.discount}>
                      <div
                        className={`${styles.badge} ${styles.badge_warning}`}
                      >
                        {data.discount}% OFF
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.price_sale}>
                    <span>$</span>
                    <span>{data.price}</span>
                  </div>
                )}
              </div>
              <Button
                className={styles.btn_share}
                variant="underlined"
                text="Share"
                prefix={<Icon icon="share" color="#7F859F" size={14} />}
                onClick={handleShare}
              />
            </div>
            {data?.description && (
              <ScrollingBox>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </ScrollingBox>
            )}
            <div className={styles.call_to_action}>
              {data?.type && data?.type !== "free" && (
                <Button
                  text="Book on KLOOK"
                  backgroundColor="#FF5B02"
                  className="text-sm"
                  onClick={onKlook}
                />
              )}
              {data?.type === "paid" && (
                <Button
                  text="Book now"
                  backgroundColor="#E60112"
                  className="text-sm"
                  onClick={onBookNow}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Share"
        mobilePosition="center"
        visible={showShareModal}
        width={600}
        onClose={() => setShowShareModal(false)}
      >
        <div className={styles.share_container}>
          <FacebookShareButton
            className={styles.social}
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`}
          >
            <FacebookIcon borderRadius={100} size={50} />
            Facebook
          </FacebookShareButton>
          <LineShareButton
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`}
            className={styles.social}
          >
            <LineIcon borderRadius={100} size={50} />
            Line
          </LineShareButton>
          <TelegramShareButton
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`}
            className={styles.social}
          >
            <TelegramIcon borderRadius={100} size={50} />
            Telegram
          </TelegramShareButton>
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`}
            className={styles.social}
          >
            <TwitterIcon borderRadius={100} size={50} />
            Twitter
          </TwitterShareButton>
          <WhatsappShareButton
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`}
            className={styles.social}
          >
            <WhatsappIcon borderRadius={100} size={50} />
            Whatsapp
          </WhatsappShareButton>
          <div className={styles.social} onClick={handleCopyUrl}>
            <Image
              src={require("public/icons/copy-link.svg")}
              alt=""
              layout="fixed"
            />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ProductDetailModal;
