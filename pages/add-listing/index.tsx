import React, { useEffect, useState } from "react";

import AddListingPageOne from "components/AddListingPages/PageOne/AddListingPageOne";
import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor";
import AddListingPageTwo from "components/AddListingPages/PageTwo/AddListingPageTwo";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { Categories } from "enums";

import styles from "styles/AddListing.module.scss";

const defaultAddlistingForm: IAddListingForm = {
  category: "",
  relationship: "",
  listing: "",
  role: "",
  isOpen: "",
  openDate: "",
  businessName: "",
  description: "",
  isOnline: "",
  city: "",
  country: "",
  address: "",
  additionalAddress: "",
  contact: "",
  email: "",
  socialMedia: "",
  currency: "",
  minPrice: "",
  maxPrice: "",
};
export interface IAddListingForm {
  category: string;
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
  currency: string;
  minPrice: string;
  maxPrice: string;
}

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = useState<IAddListingForm>(
    defaultAddlistingForm
  );
  const [showSubmitResult, setShowSubmitResult] = useState(false);

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleUpdateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmitFormData = (data) => {
    console.log("data", data);
    setShowSubmitResult(true);
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
      <React.Fragment>
        <AddEatInfor
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.EAT}
          onPrevPage={handlePrevPage}
          onSubmitFormData={handleSubmitFormData}
          onUpdateFormData={handleUpdateFormData}
        />
      </React.Fragment>
      <Modal
        visible={showSubmitResult}
        width={500}
        onClose={() => setShowSubmitResult(false)}
      >
        <div className="p-5 flex flex-col items-center gap-5">
          <div>
            <strong>Thank you</strong>
          </div>
          <p>Thank you for helping to improve this listing!</p>
          <Button
            text="Continue"
            size="small"
            width={270}
            onClick={() => setShowSubmitResult(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddListing;
