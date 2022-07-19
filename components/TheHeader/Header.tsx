import { get } from "lodash";
import Image from "next/image";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useDebounce } from "usehooks-ts";

import useTrans from "hooks/useTrans";
import Icon from "components/Icon/Icon";
import Select from "components/Select/Select";
import { Categories, UserInfor } from "./HeaderComponents";

import styles from "./Header.module.scss";
import { categories, languages, locations } from "constant";
import useLocation from "hooks/useLocation";
import ListingSearch, {
  formatListingResultOption,
  ListingMenuFooter,
} from "components/ListingSearch/ListingSearch";
import bizListingApi from "services/biz-listing";
import { changeToSlugify } from "utils";
import { UserInforContext } from "Context/UserInforContext";

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
  const [bizListing, setBizListing] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchTerm = useDebounce(changeToSlugify(searchKey), 500);

  const { user, updateUser } = useContext(UserInforContext);
  const { location } = user;

  useEffect(() => {
    const getBizListing = async () => {
      const data = await bizListingApi.getListingBySlug(
        debouncedSearchTerm,
        location,
        2
      );
      setBizListing(get(data, "data.data"));
    };

    debouncedSearchTerm ? getBizListing() : setBizListing([]);
  }, [debouncedSearchTerm, location]);

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

  const HeaderSearchMenuFooter = () => (
    <div>
      {Array.isArray(categories) &&
        categories.map((item: any) => (
          <div
            className={styles.category_suggestion}
            key={item.value}
            onClick={() => router.push(`/${item.slug}`)}
          >
            <div>
              <Icon icon={item.icon} size={20} />
            </div>
            <div>
              <div className={styles.category_description}>
                {item.description}
              </div>
              <div>{item.label}</div>
            </div>
          </div>
        ))}
      <ListingMenuFooter onClick={() => router.push("/add-listing")} />
    </div>
  );
  const changeLanguage = (language) => {
    router.isReady && router.push(pathname, asPath, { locale: language.value });
  };

  const handleSearchChange = (e) => {
    setSearchKey(e);
  };

  const handleDirectToBizHome = (item) => {
    get(item, "attributes.slug") &&
      router.push(`/biz/home/${item.attributes.slug}`);
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
              onChange={(e) => updateUser({ location: e.value })}
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
          <div className={styles.logo}>
            <Image
              src={require("public/logo.svg")}
              alt="logo"
              onClick={() => router.push("/")}
            />
          </div>
          <div className={styles.search_container}>
            <ListingSearch
              ellipsis
              size="medium"
              isClearable
              listingOptions={bizListing}
              onChange={handleDirectToBizHome}
              onInputChange={handleSearchChange}
              closeMenuOnSelect
              menuFooter={<HeaderSearchMenuFooter />}
            />
          </div>
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
