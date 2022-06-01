import Icon from "components/Icon/Icon";
import Popover from "components/Popover/Popover";
import { contributePopOverList } from "constant";
import React, { useState } from "react";
import styles from "./ContributeTabBar.module.scss";

export interface ContributeProps {
  id?: string;
  visible: boolean;
}

const content = (
  <React.Fragment>
    {contributePopOverList.map((item) => (
      <div key={item.label} className={styles.popover_modal_item}>
        <Icon icon={item.icon} size={20} />
        {item.label}
      </div>
    ))}
  </React.Fragment>
);

const ContributeTabBar = (props: ContributeProps) => {
  const { id, visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <div id={id} className={styles.contribute}>
      <div>
        <Icon icon="home-stroke-1" size={20} />
        Home
      </div>
      <div>
        <Icon icon="deal-stroke" size={20} />
        Deals
      </div>
      <Popover content={content} position="top">
        <div className={styles.main_button} />
      </Popover>
      <div>
        <Icon icon="like-solid" size={20} />
        Favorited
      </div>
      <div>
        <Icon icon="user-stroke-1" size={20} />
        User
      </div>
    </div>
  );
};

export default ContributeTabBar;
