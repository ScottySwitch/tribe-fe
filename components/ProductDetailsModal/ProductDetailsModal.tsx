import Modal, { ModalProps } from "components/Modal/Modal"
import { useEffect } from "react"
import styles from "./ProductDetailsModal.module.scss"

interface IProduct {
  id: number
  title: string
  imgUrl: string
  gallery?: any[]
  price?: string | number
  priceSale?: string | number
  discount?: string | number
  description?: string
  type: "paid" | "klook" | "free" | ""
}

interface ProductDetailsModalProps extends ModalProps {

}

const ProductDetailsModal = (props: ProductDetailsModalProps) => {
  const {
    visible,
    onClose
  } = props

  useEffect

  return (
    <Modal
      visible={visible}
    >
      <div>
        <h2>ProductDetailsModal</h2>
      </div>
    </Modal>
  )
}

export default ProductDetailsModal