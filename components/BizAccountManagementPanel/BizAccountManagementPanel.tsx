import React, { useContext } from "react";
import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import { InformationList } from "enums";
import { UserInforContext } from "Context/UserInforContext";
import { freeInformationList, paidInformationList } from "constant";

interface BizAccountManagementPanelProps {
  selectedTab?: string;
  onShowSwitchModal?: () => void;
  onSelectTab?: (e: InformationList) => void;
}

const BizAccountManagementPanel = (props: BizAccountManagementPanelProps) => {
  const { selectedTab, onShowSwitchModal, onSelectTab } = props;

  const { logout, user } = useContext(UserInforContext);

  const informationList = user.is_paid
    ? paidInformationList
    : freeInformationList;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <React.Fragment>
      {informationList.map((item) => (
        <div
          key={item.label}
          className="flex gap-3 justify-between"
          onClick={() => onSelectTab?.(item.label)}
        >
          <Heading
            icon={item.icon}
            text={item.label}
            type="tab"
            selected={selectedTab === item.label}
          />
          {item.star && <Icon icon="star-2" color="#653fff" />}
        </div>
      ))}
      <div onClick={onShowSwitchModal} className="flex gap-3 justify-between">
        <Heading type="tab" text="Switch account" selected={false} />
      </div>
      <div className="flex gap-3 justify-between" onClick={handleLogout}>
        <Heading
          icon="logout"
          type="tab"
          text="Log out"
          selected={false}
          color="#e60112"
        />
      </div>
    </React.Fragment>
  );
};

export default BizAccountManagementPanel;
