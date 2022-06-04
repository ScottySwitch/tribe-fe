import Button from "components/Button/Button";
import { useState } from "react";
import AddEatInfo from "./AddEatInfo";

interface AddListingPageThreeProps {
  onPrevPage: (data: { [key: string]: any }) => void;
  onNextPage: (data: { [key: string]: any }) => void;
  show: boolean;
  data: { [key: string]: string };
}

const AddListingPageThree = (props: AddListingPageThreeProps) => {

  return (
    <div>
      <AddEatInfo />
    </div>
  );
};

export default AddListingPageThree;
