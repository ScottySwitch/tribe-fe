import SectionLayout from "components/SectionLayout/SectionLayout";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./Footer.module.scss";
import CategoryApi from "services/category"
import {get} from "lodash"

const navList = [
  {
    category: "Buy",
    items: [
      { label: "Online business", value: "" },
      { label: "Restaurant", value: "" },
      { label: "Coffee", value: "" },
      { label: "Deserts", value: "" },
      { label: "Bakeries", value: "" },
    ],
  },
  {
    category: "Eat",
    items: [
      { label: "Online business", value: "" },
      { label: "Restaurant", value: "" },
      { label: "Coffee", value: "" },
      { label: "Deserts", value: "" },
      { label: "Bakeries", value: "" },
    ],
  },
  {
    category: "See & Do",
    items: [
      { label: "Online business", value: "" },
      { label: "Restaurant", value: "" },
      { label: "Coffee", value: "" },
      { label: "Deserts", value: "" },
      { label: "Bakeries", value: "" },
    ],
  },
  {
    category: "Transport",
    items: [
      { label: "Online business", value: "" },
      { label: "Restaurant", value: "" },
      { label: "Coffee", value: "" },
      { label: "Deserts", value: "" },
      { label: "Bakeries", value: "" },
    ],
  },
  {
    category: "Stay",
    items: [
      { label: "Online business", value: "" },
      { label: "Restaurant", value: "" },
      { label: "Coffee", value: "" },
      { label: "Deserts", value: "" },
      { label: "Bakeries", value: "" },
    ],
  },
  {
    category: "For Users",
    items: [
      { label: "Write review", value: "" },
      { label: "Add listing", value: "" },
    ],
  },
  {
    category: "Business owners",
    items: [{ label: "Claim yourself", value: "" }],
  },
  {
    category: "About",
    items: [
      { label: "About us", value: "" },
      { label: "FAQ", value: "" },
      { label: "Contact us", value: "" },
    ],
  },
];

const Footer = (props: { backgroundColor?: boolean; visible: boolean }) => {
  const { visible, backgroundColor = true } = props;
  
  // useEffect(() => {
  //   getMenuList()
  // }, [])
  
  // const getMenuList = async () => {
  //   const dataCategories = await CategoryApi.getCategories()
  //   console.log('data Category', dataCategories)
  //   const rawCategories = get(dataCategories, 'data.data')
  //   const categoryArray = rawCategories.map((item) => ({
  //     name: get(item, 'attributes.name'),
  //     slug: get(item, 'attributes.slug'),
  //     icon_url: get(item, 'attributes.icon_url')
  //   }))
  //   console.log(categoryArray);
  // }

  if (!visible) return null;
  return (
    <SectionLayout backgroundColor={backgroundColor}>
      <div className={styles.footer}>
        <div className={styles.left_col}>
          <div>
            <Image src={require("public/logo.svg")} alt="logo" />
          </div>
          <div>
            <Image src={require("public/icons/socials.svg")} alt="" width={100} />
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
