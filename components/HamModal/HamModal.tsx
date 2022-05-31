import classNames from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
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
  {
    icon: "eng-flag",
    label: "Log out",
    red: true,
  },
];

export interface HamModalProps {
  showHamModal: boolean;
  onSetShowHamModal: (e: boolean) => void;
}

const HamModal = (props: HamModalProps) => {
  const { onSetShowHamModal, showHamModal } = props;
  const router = useRouter();

  const gotoLogin = () => {
    onSetShowHamModal(false);
    router.push("/login");
  };

  const gotoSignup = () => {
    onSetShowHamModal(false);
    router.push("/signup");
  };

  return (
    <Modal
      visible={showHamModal}
      mobileFullHeight
      mobilePosition="right"
      onClose={() => onSetShowHamModal(false)}
    >
      <div className={styles.banner} />
      <div className={styles.ham_modal}>
        <div className={styles.button_container}>
          <Button text="Sign up" variant="outlined" onClick={gotoSignup} />
          <Button text="Login" onClick={gotoLogin} />
        </div>
        {hamItems.map((item) => {
          const itemClassName = classNames(styles.ham_modal_item, {
            [styles.border_bottom]: item.borderBottom,
            [styles.red]: item.red,
          });

          return (
            <div key={item.label} className={itemClassName}>
              <Icon icon={item.icon} size={20} />
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default HamModal;
