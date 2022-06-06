import AddListingPageOne from "components/AddListingPages/PageOne/AddListingPageOne";
import AddListingPageThree from "components/AddListingPages/PageThree/AddListingPageThree";
import AddListingPageTwo from "components/AddListingPages/PageTwo/AddListingPageTwo";
import { Categories } from "enums";
import { useState } from "react";
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
}

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = useState<IAddListingForm>(
    defaultAddlistingForm
  );

  const handlePrevPage = (data) => {
    console.log(data);
    setFormData({ ...formData, ...data });
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = (data) => {
    console.log(data);
    setFormData({ ...formData, ...data });
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className={styles.add_listing}>
      <AddListingPageOne show={pageNumber === 1} onNextPage={handleNextPage} />
      <AddListingPageTwo
        data={formData}
        show={pageNumber === 2}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
      <AddListingPageThree
        data={formData}
        show={pageNumber === 3}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default AddListing;
