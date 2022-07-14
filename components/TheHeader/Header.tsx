import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useTrans from "hooks/useTrans";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { Categories, UserInfor } from "./HeaderComponents";

import styles from "./Header.module.scss";
import { languages, locations } from "constant";
import useLocation from "hooks/useLocation";

export interface HeaderProps {
  id: string;
  loginInfor: any;
  navList: { [key: string]: any }[];
  onOpenHamModal: () => void;
}

const Header = (props: HeaderProps) => {
  const { id, loginInfor = {}, onOpenHamModal, navList } = props;
  const trans = useTrans();
  const router = useRouter();
  const { locale, pathname, asPath } = router;

  const [currentCategory, setCurrentCategory] = useState<string | undefined>();

  const { location } = useLocation();

  const formatLanguages = () => {
    return languages.map((lang) => ({
      label: (
        <div className="flex gap-2 items-center">
          <Icon icon={lang.icon} size={30} /> {lang.label}
        </div>
      ),
      value: lang.value,
    }));
  };

  const changeLanguage = (language) => {
    router.isReady && router.push(pathname, asPath, { locale: language.value });
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
              value={location}
              menuWidth={150}
            />
            <Select
              className={styles.language}
              options={formatLanguages()}
              isSearchable={false}
              variant="no-outlined"
              menuWidth={150}
              closeMenuOnSelect
              onChange={changeLanguage}
              value={locale}
            />
          </div>
          <div className={styles.right_col}>
            <UserInfor loginInfor={loginInfor} />
          </div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <div className={styles.content}>
          <Image
            className="cursor-pointer"
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
              navList={navList}
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
