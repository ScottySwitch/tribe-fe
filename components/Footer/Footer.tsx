import SectionLayout from "components/SectionLayout/SectionLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import CategoryApi from "services/category";
import CategoryLinkApi from "services/category-link";
import { get } from "lodash";

const Footer = (props: {
  backgroundColor?: boolean;
  visible: boolean;
  navList: { [key: string]: any }[];
}) => {
  const { visible, backgroundColor = true, navList } = props;

  if (!visible) return null;
  return (
    <SectionLayout backgroundColor={backgroundColor}>
      <div className={styles.footer}>
        <div className={styles.left_col}>
          <div>
            <Image src={require("public/logo.svg")} alt="logo" />
          </div>
          <div>
            <Image
              src={require("public/icons/socials.svg")}
              alt=""
              width={100}
            />
          </div>
        </div>
        <div className={styles.right_col}>
          {navList.map((nav) => {
            return (
              <div key={nav.category} className={styles.nav}>
                <div className={styles.header}>{nav.category}</div>
                <div className={styles.item_container}>
                  {nav.items.map((item: any) => (
                    <div key={item.label} className={styles.label}>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.rights}>
        <div>© 2022 Hello Travel Pte Ltd.All Rights Reserved</div>
        <div>End User License Agreement | Privacy</div>
      </div>
    </SectionLayout>
  );
};

export default Footer;
