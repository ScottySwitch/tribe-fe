import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Popover from "components/Popover/Popover";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { bizInformationDefaultFormData, getAddItemsFields } from "constant";
import React, { useEffect, useState } from "react";
import { randomId } from "utils";
import AddItems from "./AddItems/AddItems";
import styles from "./TabContent.module.scss";
import ProductApi from "../../../services/product";
import { get } from "lodash";
import Modal, { ModalFooter } from "../../Modal/Modal";

interface ProductListingProps {
  bizListingId?: number | string;
  isPaid: boolean;
}

enum ProductListingScreens {
  LIST = "list",
  ADD = "add",
  EDIT = "edit",
}

const ProductListing = (props: ProductListingProps) => {
  const { isPaid, bizListingId } = props;
  const [formData, setFormData] = useState(bizInformationDefaultFormData);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [screen, setScreen] = useState<ProductListingScreens>(
    ProductListingScreens.LIST
  );
  const { category } = formData;
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteModalProductId, setDeleteModalProductId] = useState<number>(0);
  const [productList, setProductList] = useState<any>();

  const getProductsByBizListingId = async (
    bizListingId: number | string | undefined
  ) => {
    const result = await ProductApi.getProductsByBizListingId(
      bizListingId,
      "is_pinned:desc"
    );
    console.log('result', result)
    if (get(result, 'data.data')) {
      let rawListing = get(result, 'data.data') || [];
      const listingArray = rawListing.map((item) => ({
        name: get(item,'attributes.name'),
        is_revision: get(item,'attributes.is_revision'),
        parent_id: get(item,'attributes.parent_id'),
        price: get(item,'attributes.price'),
        id: get(item,'attributes.id'),
        description: get(item,'attributes.description'),
        images: get(item,'attributes.images'),
        imgUrl: get(item,'attributes, "images[0]")') || "https://picsum.photos/200/300",
        discount: get(item,'attributes.discount_percent'),
        tags: get(item,'attributes.tags'),
        websiteUrl: get(item,'attributes.website_url'),
        klookUrl: get(item,'attributes.klook_url'),
        isEdited: false,
      }));
      console.log('listingArray', listingArray)
      setProductList(listingArray);
    }
  };

  useEffect(() => {
    getProductsByBizListingId(bizListingId);
  }, [bizListingId]);

  const submitProduct = async (e: any) => {
    console.log(e)
    if (e[0].isEdited) {
      const dataSend = { ...e[0] };
      await ProductApi.updateProduct(e[0].id, dataSend);
    } else {
      const newProduct = e[0];
      const dataSend = {
        biz_listing: bizListingId,
        ...newProduct,
      };
      await ProductApi.createProduct(dataSend).then((result) => {
        const newProudct = {
          name: get(result,'data.data.attributes.name'),
          is_revision: get(result,'data.data.attributes.is_revision'),
          parent_id: get(result,'data.data.attributes.parent_id'),
          price: get(result,'data.data.attributes.price'),
          id: get(result,'data.data.attributes.id'),
          description: get(result,'data.data.attributes.description'),
          images: get(result,'data.data.attributes.images'),
          imgUrl: get(result,'data.data.attributes, "images[0]")') || "https://picsum.photos/200/300",
          discount: get(result,'data.data.attributes.discount_percent'),
          tags: get(result,'data.data.attributes.tags'),
          websiteUrl: get(result,'data.data.attributes.website_url'),
          klookUrl: get(result,'data.data.attributes.klook_url'),
          isEdited: false,
        }
        setProductList([...productList, newProudct]);
      });
    }
  };

  const handleDelete = async () => {
    const newProductList = productList.filter((product) => {
      return product.id !== deleteModalProductId;
    });
    await ProductApi.deleteProduct(deleteModalProductId);
    setProductList(newProductList);
    setIsShowDeleteModal(false);
  };

  const handlePinToTop = async (e) => {
    await ProductApi.updateProduct(e.id, {
      is_pinned: e.is_pinned || false,
    });
    await getProductsByBizListingId(bizListingId);
  };

  const PopoverContent = ({ item }) => (
    <React.Fragment>
      <div
        onClick={() => {
          setSelectedItem([item]);
          setScreen(ProductListingScreens.EDIT);
        }}
      >
        Edit
      </div>
      <div
        className={styles.delete_action}
        onClick={() => {
          setDeleteModalProductId(item.id);
          setIsShowDeleteModal(true);
        }}
      >
        Delete
      </div>
    </React.Fragment>
  );

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
            <strong>Tips:</strong> Click the pin icon to put 5 products on the
            top.
          </div>
          <div className="flex gap-2">
            {!isPaid &&
              Array.isArray(productList) &&
              productList.length > 2 && (
                <Button
                  prefix={<Icon icon="star-2" color="#653fff" />}
                  variant="secondary"
                  text="Update to use full feature"
                  width="fit-content"
                  onClick={() => null}
                />
              )}
            <Button
              disabled={
                !isPaid && Array.isArray(productList) && productList.length > 2
              }
              text="Add new"
              width={200}
              onClick={() => {
                setSelectedItem([{}]);
                setScreen(ProductListingScreens.ADD);
              }}
            />
          </div>
        </div>
        <Break />
        <div className={styles.product_container}>
          {productList &&
            productList.map((item: any, index) => {
              const imgUrl =
                get(item, "images[0]") ||
                require("public/images/avatar.svg");
              return (
                <div key={item.id} className={styles.info_card_container}>
                  <InforCard
                    imgUrl={imgUrl}
                    title={item.name}
                    price={item.price}
                    description={item.description}
                  />
                  <div className={styles.toolbar}>
                    <Popover content={<PopoverContent item={item} />}>
                      <Icon icon="toolbar" color="white" />
                    </Popover>
                  </div>
                  <div
                    className={styles.pin}
                    onClick={() => handlePinToTop(item)}
                  >
                    <Icon
                      icon="pin"
                      color={item.is_pinned || "white"}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <Break />
      </SectionLayout>
      <SectionLayout
        show={screen !== ProductListingScreens.LIST}
        title={
          screen === ProductListingScreens.EDIT ? "Edit product" : "Add product"
        }
      >
        <AddItems
          isEdit={screen === ProductListingScreens.EDIT}
          isPaid={isPaid}
          itemList={selectedItem}
          placeholders={getAddItemsFields(category).placeholder}
          onCancel={() => setScreen(ProductListingScreens.LIST)}
          onSubmit={(e) => {
            setScreen(ProductListingScreens.LIST);
            submitProduct(e);
          }}
        />
      </SectionLayout>
      <DeleteModal
        visible={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onSubmit={handleDelete}
      />
    </React.Fragment>
  );
};

const DeleteModal = (props) => {
  const { visible, onClose, onSubmit } = props;
  return (
    <Modal
      visible={visible}
      width={579}
      title="Delete Product?"
      onClose={onClose}
    >
      <div className="p-7">
        <div className="text-sm max-w-sm mx-auto text-center mb-7">
          <p>You are about to delete this product.</p>
          <p>
            This action <span className="font-bold">cannot</span> be undone. Are
            you sure?
          </p>
        </div>
        <ModalFooter>
          <Button
            className="text-sm bg-transparent text-black border mr-2"
            text="Do not delete"
            onClick={onClose}
          />
          <Button className="text-sm" text="Delete" onClick={onSubmit} />
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default ProductListing;
