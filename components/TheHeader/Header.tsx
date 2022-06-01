import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { locations } from "constant";
import { Categories, UserInfor } from "./HeaderSubComponents";

import styles from "./Header.module.scss";
import useTrans from "hooks/useTrans";

export const languages = [
  { label: <Icon icon="eng-flag" size={30} />, value: "en" },
  { label: <Icon icon="sing-flag" size={30} />, value: "sg" },
];

export interface HeaderProps {
  isLoggedIn: boolean;
  id: string;
  onOpenHamModal: () => void;
}

const Header = (props: HeaderProps) => {
  const { id, onOpenHamModal, isLoggedIn } = props;
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const router = useRouter();
  const { locale } = router;
  const trans = useTrans();
  const { pathname } = useRouter();

  const changeLang = (lang: string) => {
    router.push(pathname, pathname, { locale: lang });
  };

  const getDefaultLang = () => {
    return languages.filter((item) => item.value === locale);
  };

  return (
    <div id={id} className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.content}>
          <div className={styles.left_col}>
            <Icon icon="map" size={20} />
            <Select
              className={styles.location}
              variant="no-outlined"
              placeholder={trans.location}
              options={locations}
            />
            <Select
              className={styles.language}
              options={languages}
              isSearchable={false}
              variant="no-outlined"
              closeMenuOnSelect
              onChange={(e) => changeLang(e.value)}
              defaultValue={getDefaultLang()}
            />
          </div>
          <div className={styles.right_col}>
            <Icon icon="business" size={20} />
            <div>Business</div>
            <UserInfor isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <div className={styles.content}>
          <Image
            style={{ cursor: "pointer" }}
            src={require("public/logo.svg")}
            alt="logo"
            onClick={() => router.push("/")}
          />
          <Input
            className={styles.search}
            prefix={<Icon icon="search" size={20} />}
            variant="filled"
            placeholder="Search"
          />
          <div
            className={styles.categories}
            tabIndex={1}
            onBlur={() => setCurrentCategory(undefined)}
          >
            <Categories
              currentCategory={currentCategory}
              onSetCurrentCategory={(e) => setCurrentCategory(e)}
            />
          </div>
          <div className={styles.mobile}>
            <Icon className={styles.mobile_searchr} icon="search" size={25} />
            <div onClick={onOpenHamModal}>
              <Icon
                className={styles.mobile_hamburger}
                icon="ham-menu"
                size={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
