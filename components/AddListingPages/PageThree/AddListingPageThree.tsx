import AddBuyInfor from "./AddBuyInfor";
import AddSeeAndDoInfor from "./AddSeeAndDoInfor";
import AddStayInfor from "./AddStayInfor";
import AddTransportInfor from "./AddTransportInfor";

interface AddListingPageThreeProps {
  onPrevPage: (data: { [key: string]: any }) => void;
  onNextPage: (data: { [key: string]: any }) => void;
  show: boolean;
  data: { [key: string]: string };
}

const AddListingPageThree = (props: AddListingPageThreeProps) => {
  return (
    <div>
      {/* <AddEatInfor /> */}
      {/* <AddTransportInfor /> */}
      {/* <AddStayInfor /> */}
      {/* <AddSeeAndDoInfor /> */}
      <AddBuyInfor />
    </div>
  );
};

export default AddListingPageThree;
