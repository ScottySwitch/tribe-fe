import { Categories } from "enums";
import { IAddListingForm } from "pages/add-listing";
import AddBuyInfor from "./AddBuyInfor";
import AddEatInfor from "./AddEatInfor";
import AddSeeAndDoInfor from "./AddSeeAndDoInfor";
import AddStayInfor from "./AddStayInfor";
import AddTransportInfor from "./AddTransportInfor";

interface AddListingPageThreeProps {
  onPrevPage: (data: { [key: string]: any }) => void;
  onNextPage: (data: { [key: string]: any }) => void;
  show: boolean;
  data: IAddListingForm;
}

const AddListingPageThree = (props: AddListingPageThreeProps) => {
  const { data, show, onPrevPage, onNextPage } = props;

  const AddInfor = () => {
    switch (data.category) {
      case Categories.EAT:
        return <AddEatInfor data={data} />;
      case Categories.STAY:
        return <AddStayInfor />;
      case Categories.SEE:
        return <AddSeeAndDoInfor />;
      case Categories.BUY:
        return <AddBuyInfor />;
      case Categories.TRANSPORT:
        return <AddTransportInfor />;
      default:
        return null;
    }
  };
  return (
    <>
      <AddInfor />
    </>
  );
};

export default AddListingPageThree;
