import Icon from "components/Icon/Icon";
import { hamItems } from "constant";

import styles from "./HamMenu.module.scss";

interface HamMenuProps {
  isLoggedIn: boolean;
}

const HamMenu = (props: HamMenuProps) => {
  const { isLoggedIn } = props;
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <>
      {hamItems.map((item) => (
        <div key={item.label} className={styles.ham_menu_item}>
          <Icon icon={item.icon} size={20} />
          <div>{item.label}</div>
        </div>
      ))}
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
