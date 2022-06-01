import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { hamItems } from "constant";

import styles from "./HamMenu.module.scss";

interface HamMenuProps {
  isLoggedIn: boolean;
  mobile?: boolean;
}

const HamMenu = (props: HamMenuProps) => {
  const { isLoggedIn, mobile } = props;
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <>
      {hamItems.map((item) => {
        const hamItemClassName = classNames(styles.ham_menu_item, {
          [styles.border_bottom]: mobile && item.borderBottom,
        });
        return (
          <div key={item.label} className={hamItemClassName}>
            <Icon icon={item.icon} size={20} />
            <div>{item.label}</div>
          </div>
        );
      })}
      {isLoggedIn && (
        <div onClick={handleLogout} className={styles.logout}>
          <Icon icon="log-out" size={20} color="#e60112" />
          <div>Logout</div>
        </div>
      )}
    </>
  );
};

export default HamMenu;
