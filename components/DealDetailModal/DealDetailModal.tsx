import Image from "next/image"

import Modal, { ModalProps } from "components/Modal/Modal"
import Icon from "components/Icon/Icon"
import Button from "components/Button/Button"

import styles from "./DealDetailModal.module.scss"
import get from "lodash/get";

export interface IDealsDetails {
  name: string
  imgUrl: string
  offers?: string
  valid?: string
  conditions?: string
}
interface DealDetailModalProps extends ModalProps {
  data: any
  onShare?: () => void
  onFavourite?: () => void
}

const DealDetailModal = (props: DealDetailModalProps) => {
  const { data, visible, onClose, onShare, onFavourite } = props
  return (
    <Modal visible={visible} width="100%" maxWidth={678} mobilePosition="center" onClose={onClose}>
      <div className={styles.header}>
        <div className="flex items-center min-w-0">
          <div className={styles.icon}>
            <Icon icon="deals-color" size={22} />
          </div>
          <div className={`${styles.title} truncate`}>{get(data, "attributes.name")}</div>
        </div>
        <div className={styles.close} onClick={onClose}>
          <Icon icon="cancel-mobile" />
        </div>
      </div>
      <div className={styles.cover_image}>
        <Image
          src={get(data, "attributes.images") ? data.attributes.images[0] : "https://picsum.photos/678/169"}
          alt={get(data, "attributes.name")}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </div>
      <div className={styles.content}>
        {get(data, "attributes.description") && (
          <div className={styles.item}>
            <h6 className={styles.label}>Offers</h6>
            <p>{get(data, "attributes.description")}</p>
          </div>
        )}
        {get(data, "attributes.end_date") && (
          <div className={styles.item}>
            <h6 className={styles.label}>Valid</h6>
            <p>{`${get(data, "attributes.start_date")} - ${get(data, "attributes.end_date")}`}</p>
          </div>
        )}
        {get(data, "attributes.terms_conditions") && (
          <div className={styles.item}>
            <h6 className={styles.label}>Terms & Conditions</h6>
            <p>{get(data, "attributes.terms_conditions")}</p>
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
            onClick={onShare}
          />
          <Button
            variant="primary"
            text="Add to favourite"
            className="text-sm	font-bold"
            width="max-content"
            prefix={<Icon icon="like-stroke" color="#ffffff" />}
            onClick={onFavourite}
          />
        </div>
        <Button
          variant="underlined"
          text="Cancel"
          className={`${styles.btn_cancel} text-sm font-medium no-underline`}
          width="max-content"
          onClick={onClose}
        />
      </div>
    </Modal>
  )
}

export default DealDetailModal
