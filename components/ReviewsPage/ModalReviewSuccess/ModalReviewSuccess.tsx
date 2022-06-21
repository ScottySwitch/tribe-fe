import { useState } from "react"
import Modal from "components/Modal/Modal"
import Image from "next/image"
import Button from "components/Button/Button"

interface IModalReview {
  visible: boolean
  onClose?: () => {}
}

const ModalReviewSuccess = (props: IModalReview) => {
  const {visible, onClose} = props

  return (
    <Modal visible={visible} width={578} mobilePosition="center">
        <div className="p-5 flex flex-col items-center">
          <Image
            src={require("public/images/success-submit.svg")}
            width={100}
            height={100}
            alt=""
          />
          <div>
            <strong>Thank you</strong>
          </div>
          <p className="text-center">Thank you for sharing your experience and helping to improve this listing!</p>
          <Button
            className="mt-5"
            text="Close"
            onClick={onClose}
          />
        </div>
      </Modal>
  )
}

export default ModalReviewSuccess