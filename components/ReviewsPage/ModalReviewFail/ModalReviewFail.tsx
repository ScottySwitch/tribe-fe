import { IModalReview } from "../ModalReviewSuccess/ModalReviewSuccess"
import Modal from "components/Modal/Modal"
import Image from "next/image"
import Button from "components/Button/Button"

const ModalReviewFail = (props: IModalReview) => {
  const {
    visible = false,
    onClose
  } = props

  return (
    <Modal visible={visible} width={578} mobilePosition="center">
			<div className="flex flex-col items-center justify-between mx-auto py-8" style={{maxWidth: "452px", minHeight: "468px"}}>
				<Image
					src={require("public/images/failed-submit.svg")}
					width={270}
					height={250}
					alt="failed-submit"
					className="mb-5"
				/>
				<div>
					<div className="text-center">
						<strong className="block text-2xl mb-4">Uh...oh...</strong>
						<p className="text-base px-11 mb-8">Something went wrong. Let’s give it another try!</p>
					</div>
					<Button
						className="mt-5"
						text="Try again"
						onClick={onClose}
					/>
				</div>
			</div>
      </Modal>
  )
}

export default ModalReviewFail