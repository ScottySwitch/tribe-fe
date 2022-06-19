import Break from "components/Break/Break"
import Button from "components/Button/Button"
import InforCard from "components/InforCard/InforCard"
import SectionLayout from "components/SectionLayout/SectionLayout"
import styles from "./TabContent.module.scss"

interface ProductListingProps {
  submitFormData?: (form: { [key: string]: any }) => void
  formData?: { [key: string]: any }
}

const ProductListing = (props: ProductListingProps) => {
  const { formData = {}, submitFormData } = props

  return (
    <SectionLayout
      title="Product listing"
      className={styles.product_listing}
      containerClassName="w-full"
    >
      <div className={styles.tips_button}>
        <div className={styles.tips}>
          <strong>Tips:</strong> Click the pin icon to put 5 products on the top.
        </div>
        <Button text="Edit products" width={200} />
      </div>
      <Break />
      <div className={styles.product_container}>
        {formData.productList.map((item) => (
          <InforCard
            key={item.id}
            imgUrl={item.imgUrl || "https://picsum.photos/200/300"}
            title={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
      <Break />
    </SectionLayout>
  )
}

export default ProductListing
