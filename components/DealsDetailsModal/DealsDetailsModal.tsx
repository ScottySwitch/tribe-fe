import Modal, { ModalProps } from "components/Modal/Modal"
import Icon from "components/Icon/Icon"
import styles from "./DealsDetailsModal.module.scss"
import Button from "components/Button/Button"
import Image from "next/image"

export interface IDealsDetails {
  title: string
  imgUrl: string
  offers?: string
  valid?: string
  conditions?: string
}
interface DealsDetailsModalProps extends ModalProps {
  data: IDealsDetails
  onShare?: () => void
  onFavourite?: () => void
}

const DealsDetailsModal = (props: DealsDetailsModalProps) => {
  const {
    data,
    visible,
    onClose,
    onShare,
    onFavourite,
  } = props
  return (
    <Modal
      visible={visible}
      width="100%"
      maxWidth={678}
      mobilePosition="center"
    >
      <div className={styles.header}>
        <div className="flex items-center min-w-0">
          <div className={styles.icon}>
            <Icon icon="deals-color" size={22}/>
          </div>
          <div className={`${styles.title} truncate`}>{data.title}</div>
        </div>
        <div className={styles.close} onClick={onClose}>
          <Icon icon="cancel-mobile"/>
        </div>
      </div>
      <div className={styles.cover_image}>
        <Image src={data.imgUrl || "https://picsum.photos/678/169"} alt={data.title} width="100%" height="100%" layout="responsive"/>
      </div>
      <div className={styles.content}>
        {data.offers && (
          <div className={styles.item}>
            <h6 className={styles.label}>Offers</h6>
            <p>{data.offers}</p>
          </div>
        )}
        {data.valid && (
          <div className={styles.item}>
            <h6 className={styles.label}>Valid</h6>
            <p>{data.valid}</p>
          </div>
        )}
        {data.conditions && (
          <div className={styles.item}>
            <h6 className={styles.label}>Terms & Conditions</h6>
            <p>{data.conditions}</p>
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
            prefix={<Icon icon="share"/>}
            onClick={onShare}
          />
          <Button
            variant="primary" 
            text="Add to favourite" 
            className="text-sm	font-bold" 
            width="max-content" 
            prefix={<Icon icon="like-stroke" color="#ffffff"/>}
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

export default DealsDetailsModal