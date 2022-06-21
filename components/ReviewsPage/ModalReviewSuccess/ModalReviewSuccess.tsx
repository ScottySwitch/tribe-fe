import Modal from "components/Modal/Modal"
import Image from "next/image"
import Button from "components/Button/Button"

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
    <Modal visible={visible} width={578} mobilePosition="center">
        <div className="flex flex-col items-center justify-between mx-auto py-8" style={{maxWidth: "452px", minHeight: "468px"}}>
          <Image
            src={require("public/images/success-submit.svg")}
            width={270}
            height={250}
            alt="success-submit"
            className="mb-5"
          />
          <div>
            <div className="text-center text-xl">
              <strong className="block text-2xl mb-4">Thank you</strong>
              <p className="text-base px-11 mb-8">Thank you for sharing your experience and helping to improve this listing!</p>
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