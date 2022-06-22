import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import Popover from "components/Popover/Popover"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { bizInformationDefaultFormData, getAddItemsFields } from "constant"
import React, { useState } from "react"
import { randomId } from "utils"
import AddItems from "./AddItems/AddItems"
import styles from "./TabContent.module.scss"
import ProductApi from "../../../services/product";

interface ProductListingProps {
  bizListingId: number,
  products: any,
  isPaid: boolean
}

enum ProductListingScreens {
  LIST = "list",
  ADD = "add",
  EDIT = "edit",
}

const ProductListing = (props: ProductListingProps) => {
  let { isPaid, bizListingId, products } = props
  const [formData, setFormData] = useState(bizInformationDefaultFormData)
  const [selectedItem, setSelectedItem] = useState<any[]>([])
  const [screen, setScreen] = useState<ProductListingScreens>(ProductListingScreens.LIST)
  const { category } = formData

  const [productList, setProductList] = useState(products)

  const submitProduct = async (e: any) => {
    // console.log('newProduct', e[0]);
    const newProduct = e[0];
    const dataSend = {
      biz_listing: bizListingId,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      tags: newProduct.tags,
      images: [newProduct.imgUrl],
    }
    await ProductApi.createProduct(dataSend).then(result => {
      setProductList([...productList, result.data.data])
    });
  }

  const handleDelete = async (e) => {
    const newProductList = productList.filter(product => {
      return product.id !== e
    })
    setProductList(newProductList)
    await ProductApi.deleteProduct(e);
  }

  const handlePinToTop = (e) => {
    console.log(e)
  }

  const PopoverContent = ({ item }) => (
    <React.Fragment>
      <div
        onClick={() => {
          setSelectedItem([item])
          setScreen(ProductListingScreens.EDIT)
        }}
      >
        Edit
      </div>
      <div className={styles.delete_action} onClick={() => handleDelete(item.id)}>
        Delete
      </div>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <SectionLayout
        title="Product listing"
        className={styles.product_listing}
        containerClassName="w-full"
        show={screen === ProductListingScreens.LIST}
      >
        <div className={styles.tips_button}>
          <div className={styles.tips}>
            <strong>Tips:</strong> Click the pin icon to put 5 products on the top.
          </div>
          <div className="flex gap-2">
            {!isPaid && productList.length > 2 && (
              <Button
                prefix={<Icon icon="star-2" color="#653fff" />}
                variant="secondary"
                text="Update to use full feature"
                width="fit-content"
                onClick={() => null}
              />
            )}
            <Button
              disabled={!isPaid && Array.isArray(productList) && productList.length > 2}
              text="Add new"
              width={200}
              onClick={() => {
                setSelectedItem([{}])
                setScreen(ProductListingScreens.ADD)
              }}
            />
          </div>
        </div>
        <Break />
        <div className={styles.product_container}>
          {productList && productList.map((item: any, index) => {
            return (
              <div key={item.id} className={styles.info_card_container}>
                <InforCard
                  imgUrl={item.attributes.images ? item.attributes.images[0] : "https://picsum.photos/200/300"}
                  title={item.attributes.name}
                  price={item.attributes.price}
                  description={item.attributes.description}
                />
                <div className={styles.toolbar}>
                  <Popover content={<PopoverContent item={item} />}>
                    <Icon icon="toolbar" color="white" />
                  </Popover>
                </div>
                <div className={styles.pin} onClick={() => handlePinToTop(item)}>
                  <Icon icon="pin" color={index < 6 ? undefined : "white"} />
                </div>
              </div>
            )
          })}
        </div>
        <Break />
      </SectionLayout>
      <SectionLayout
        show={screen !== ProductListingScreens.LIST}
        title={screen === ProductListingScreens.EDIT ? "Edit product" : "Add deal"}
      >
        <AddItems
          isPaid={isPaid}
          itemList={selectedItem}
          placeholders={getAddItemsFields(category).placeholder}
          onCancel={() => setScreen(ProductListingScreens.LIST)}
          onSubmit={(e) => {
            setScreen(ProductListingScreens.LIST)
            submitProduct(e)
          }}
        />
      </SectionLayout>
    </React.Fragment>
  )
}

export default ProductListing
