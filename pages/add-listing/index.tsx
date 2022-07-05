import Image from "next/image";
import get from "lodash/get";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import map from "lodash/map";

import AddListingPageOne from "components/AddListingPages/PageOne/AddListingPageOne";
import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor";
import AddListingPageTwo from "components/AddListingPages/PageTwo/AddListingPageTwo";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { Categories, ClaimStep, YesNo } from "enums";
import AddBuyInfor from "components/AddListingPages/PageThree/AddInforSections/AddBuyInfor";
import AddSeeAndDoInfor from "components/AddListingPages/PageThree/AddInforSections/AddSeeAndDoInfor";
import AddStayInfor from "components/AddListingPages/PageThree/AddInforSections/AddStayInfor";
import AddTransportInfor from "components/AddListingPages/PageThree/AddInforSections/AddTransportInfor";
import { IOpenHours } from "components/OpenHours/OpenHours";

import styles from "styles/AddListing.module.scss";
import { defaultAddlistingForm, fakeSubCateList, previewInfo } from "constant";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";
import BizListingApi from "../../services/biz-listing"
import BizListingRevisionApi from "services/biz-listing-revision"
export interface IAddListingForm {
  category: Categories;
  categoryLinks?: string;
  relationship: string;
  listing: string;
  role: string;
  isOpen: string;
  openDate: string;
  businessName: string;
  description: string;
  isOnline: string;
  city: string;
  country: string;
  address: string;
  additionalAddress: string;
  contact: string;
  email: string;
  socialMedia: string;
  currency?: { label: string; value: string };
  minPrice: string;
  maxPrice: string;

  describePlace?: any[];

  foodOptions?: any[];
  paryerFacilities?: any[];
  foodOptionsRamadan?: any[];
  nonHalalActivities?: any[];

  images?: string[];
  productBrands?: any[];
  mealsKind?: any[];
  openHours?: IOpenHours;
  payment?: any[];
  additionalServices?: any[];
  media?: any[];
  agreePolicies: string;
  productTypes?: any[];
  atmosphere?: any[];
  parking?: any[];
  describeTags?: any[];

  categoryKind?: string;
  tags?: any[];
  placeGoodFor?: string[];
}

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(1); // TODO: remove
  const [formData, setFormData] = useState(defaultAddlistingForm);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSubmitResult, setShowSubmitResult] = useState(false);

  const router = useRouter();

  useEffect(() => {
    //call api
  }, []);

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleUpdateFormData = (data) => {
    console.log("handleUpdateFormData", data);
    setFormData({ ...formData, ...data });
  };

  const handleSubmitFormData = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}")
    ///do CRUD things here
    console.log("data", formData);
    let address = "Online Business";
    if (!formData.isOnline) {
      address = ` ${formData.additionalAddress} - ${formData.address} - ${formData.city} - ${formData.country}`;
    }
    let dataSend = {
      user: userInfo.id,
      is_verified: false,
      is_online_store: !!formData.isOnline,
      categories: [formData.category],
      name: formData.businessName,
      description: formData.description,
      address,
      country: formData.country,
      social_info: formData.socialMedia,
      phone_number: formData.contact,
      email: formData.email === "" ? null : formData.email,
      price_range: {
        currency: formData.currency?.value,
        min: formData.minPrice,
        max: formData.maxPrice,
      },
      images: formData.images,
      open_hours: formData.openHours,
      category_links: formData.categoryLinks,
      product_types: formData.category === 1 ? formData.productTypes : map(formData.productTypes, "value"),
      product_brands: formData.category === 1 ? map(formData.productBrands, "value") : null,
      tags: formData.describeTags || [],
      facilities_data: {
        additionalServices: formData.additionalServices,
        atmosphere: formData.atmosphere,
        foodOptions: formData.foodOptions,
        foodOptionsRamadan: formData.foodOptionsRamadan,
        mealsKind: formData.mealsKind,
        nonHalalActivities: formData.nonHalalActivities,
        parking: formData.parking,
        paryerFacilities: formData.paryerFacilities,
        payment: formData.payment,
        placeGoodFor: formData.placeGoodFor,
      },
      is_accepted: false
    }
    const result = get(formData, "role.label") === 'Owner' ? await BizListingApi.createBizListing(dataSend) : await BizListingRevisionApi.createBizListingRevision(dataSend)
    if (get(formData, "role.label") === 'Owner') {
      const roleCreate = await BizListingApi.createListingRole({
        bizListingId: get(result, "data.data.id"),
        name: get(formData, "role.label")
      })
    }
    userInfo = {
      ...userInfo,
      pay_price: "600",
      biz_id: get(result, "data.data.id"),
      biz_slug: get(result, "data.data.attributes.slug"),
      role_choose: get(formData, "role.label") === 'Owner' ? 'Owner' : ''
    }
    localStorage.setItem("user", JSON.stringify(userInfo))
    // const random = Math.floor(Math.random() * 10000)
    if (formData.relationship === YesNo.NO) {
      setShowSubmitResult(true);
    } else {
      const listingId = result.data?.data?.id;
      router.push({
        pathname: `/claim/${listingId}`,
        query: { firstStep: ClaimStep.CHOOSE_TIER },
      });
    }
  };

  const handlePreview = (data) => {
    setFormData({ ...formData, ...data });
    setShowPreviewModal(true);
  };

  return (
    <div className={styles.add_listing}>
      <AddListingPageOne
        show={pageNumber === 1}
        onUpdateFormData={handleUpdateFormData}
        onNextPage={handleNextPage}
      />
      <AddListingPageTwo
        data={formData}
        show={pageNumber === 2}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onUpdateFormData={handleUpdateFormData}
      />
      {/* page three */}
      <div className="page-three">
        <AddBuyInfor
          subCateList={fakeSubCateList}
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.BUY}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddEatInfor
          subCateList={fakeSubCateList}
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.EAT}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddSeeAndDoInfor
          subCateList={fakeSubCateList}
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.SEE_AND_DO}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddStayInfor
          subCateList={fakeSubCateList}
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.STAY}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddTransportInfor
          subCateList={fakeSubCateList}
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.TRANSPORT}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
      </div>
      <Modal
        visible={showPreviewModal}
        title="Does everything look correct?"
        subTitle="Please review this information before submitting!"
        width={780}
        mobileFullHeight
        onClose={() => setShowPreviewModal(false)}
      >
        <div className="px-[30px] gap-6 flex flex-col">
          {previewInfo.map((row) => {
            return (
              <div key={row.question} className="flex gap-20">
                <div className="flex flex-wrap w-3/5">{row.question}</div>
                <div className="w-2/5">
                  <PreviewValue
                    valueKey={row.valueKey}
                    value={get(formData, row.valueKey)}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-end px-[30px] py-3">
            <Button
              text="Cancel"
              size="small"
              variant="underlined"
              width="fit-content"
              onClick={() => setShowPreviewModal(false)}
            />
            <Button
              text="Continue"
              size="small"
              width={270}
              onClick={handleSubmitFormData}
            />
          </div>
        </div>
      </Modal>
      <Modal visible={showSubmitResult} width={350} mobilePosition="center">
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
          <p>Thank you for contributing to our listings!</p>
          <Button
            className="mt-5"
            text="Continue"
            size="small"
            width={270}
            onClick={() => router.push("/")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddListing;
