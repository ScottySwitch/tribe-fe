import AddListingPageOne from "components/AddListingPageComponents/PageOne/AddListingPageOne";
import AddListingPageTwo from "components/AddListingPageComponents/PageTwo/AddListingPageTwo";
import { useState } from "react";
import styles from "styles/AddListing.module.scss";

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  return (
    <div className={styles.add_listing}>
      <AddListingPageOne
        show={pageNumber === 1}
        onNextPage={(data) => {
          setFormData({ ...formData, data });
          setPageNumber(2);
        }}
      />
      <AddListingPageTwo
        data={formData}
        show={pageNumber === 2}
        onPrevPage={(data) => {
          console.log(data);
          setFormData({ ...formData, data });
          setPageNumber(1);
        }}
        onNextPage={(data) => {
          setFormData({ ...formData, data });
          setPageNumber(3);
        }}
      />
    </div>
  );
};

export default AddListing;
