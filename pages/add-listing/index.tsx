import AddListingPageOne from "components/AddListingPageComponents/PageOne/AddListingPageOne";
import AddListingPageTwo from "components/AddListingPageComponents/PageTwo/AddListingPageTwo";
import { useState } from "react";
import styles from "styles/AddListing.module.scss";

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(2);
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
        show={pageNumber === 2}
        onPrevPage={() => setPageNumber(1)}
        onNextPage={(data) => {
          setFormData({ ...formData, data });
          setPageNumber(3);
        }}
      />
    </div>
  );
};

export default AddListing;
