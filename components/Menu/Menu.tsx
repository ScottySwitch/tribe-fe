import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { menuItems } from "constant";

import styles from "./Menu.module.scss";

interface MenuMenuProps {
  isLoggedIn: boolean;
  mobile?: boolean;
}

const Menu = (props: MenuMenuProps) => {
  const { isLoggedIn, mobile } = props;
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <>
      {menuItems.map((item) => {
        const menuItemClassName = classNames(styles.menu_item, {
          [styles.border_bottom]: mobile && item.borderBottom,
        });
        return (
          <div key={item.label} className={menuItemClassName}>
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

export default Menu;
