import classNames from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./HamModal.module.scss";

const hamItems = [
  { icon: "categories-color", label: "Categories" },
  { icon: "categories-color", label: "Saved deals" },
  { icon: "heart-color", label: "Favorited", borderBottom: true },
  { icon: "comment-color", label: "Edit profile" },
  { icon: "settings-color", label: "Settings", borderBottom: true },
  { icon: "like-color-2", label: "Referral code" },
  { icon: "business", label: "Tribes for Businesses" },
  { icon: "support-color", label: "Support" },
  { icon: "eng-flag", label: "Languages" },
];

const HamModalHeader = ({
  isLoggedIn,
  gotoLogin,
  gotoSignup,
}: {
  isLoggedIn: boolean;
  gotoLogin: () => void;
  gotoSignup: () => void;
}) => {
  return isLoggedIn ? (
    <div className={styles.user_profile}>
      <Image
        src={require("public/images/avatar.png")}
        alt=""
        layout="fixed"
        width={50}
        height={50}
      />
      <div className={styles.user_infor}>
        <div className={styles.name}>Anna Nhun</div>
        <div className={styles.see_profile}>See profile</div>
      </div>
    </div>
  ) : (
    <>
      <div className={styles.banner} />
      <div className={styles.button_container}>
        <Button text="Sign up" variant="outlined" onClick={gotoSignup} />
        <Button text="Login" onClick={gotoLogin} />
      </div>
    </>
  );
};

export interface HamModalProps {
  isLoggedIn: boolean;
  showHamModal: boolean;
  onSetShowHamModal: (e: boolean) => void;
}

const HamModal = (props: HamModalProps) => {
  const { onSetShowHamModal, isLoggedIn, showHamModal } = props;
  const router = useRouter();

  const gotoLogin = () => {
    onSetShowHamModal(false);
    router.push("/login");
  };

  const gotoSignup = () => {
    onSetShowHamModal(false);
    router.push("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <Modal
      visible={showHamModal}
      mobileFullHeight
      mobilePosition="right"
      onClose={() => onSetShowHamModal(false)}
    >
      <div className={styles.ham_modal}>
        <HamModalHeader
          isLoggedIn={isLoggedIn}
          gotoLogin={gotoLogin}
          gotoSignup={gotoSignup}
        />
        {hamItems.map((item) => {
          const itemClassName = classNames(styles.ham_modal_item, {
            [styles.border_bottom]: item.borderBottom,
          });
          return (
            <div key={item.label} className={itemClassName}>
              <Icon icon={item.icon} size={20} />
              <div>{item.label}</div>
            </div>
          );
        })}
        <div
          className={classNames(styles.logout, { [styles.show]: isLoggedIn })}
          onClick={handleLogout}
        >
          <Icon icon="logout" size={20} />
          <div>Logout</div>
        </div>
      </div>
    </Modal>
  );
};

export default HamModal;
