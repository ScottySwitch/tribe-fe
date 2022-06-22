import Modal from "components/Modal/Modal"
import Image from "next/image"
import Button from "components/Button/Button"
import styles from "./ModalReviewSuccess.module.scss"
export interface IModalReview {
  visible: boolean
  onClose?: () => void
}

const ModalReviewSuccess = (props: IModalReview) => {
  const {
    visible = false,
    onClose
  } = props


  return (
    <Modal visible={visible} width={452} mobilePosition="center">
      <div className="flex flex-col items-center justify-between mx-auto p-8">
        <div className={styles.image_container}>
          <Image
            className="mb-5"
            src={require("public/images/success-submit.svg")}
            width="100%"
            height="100%"
            layout="responsive"
            alt="success-submit"
          />
        </div>
        <div>
          <div className="text-center text-xl">
            <strong className="block text-2xl mb-4">Thank you</strong>
            <p className="text-base sm:px-11 mb-8">Thank you for sharing your experience and helping to improve this listing!</p>
          </div>
          <Button
            className="mt-5"
            text="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ModalReviewSuccess