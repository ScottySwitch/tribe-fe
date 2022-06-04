import AddListingPageOne from "components/AddListingPages/PageOne/AddListingPageOne";
import AddListingPageThree from "components/AddListingPages/PageThree/AddListingPageThree";
import AddListingPageTwo from "components/AddListingPages/PageTwo/AddListingPageTwo";
import { useState } from "react";
import styles from "styles/AddListing.module.scss";

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(3);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handlePrevPage = (data) => {
    console.log(data);
    setFormData({ ...formData, data });
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = (data) => {
    setFormData({ ...formData, data });
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
