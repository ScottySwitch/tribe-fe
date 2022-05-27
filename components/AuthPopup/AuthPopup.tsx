import Image from "next/image";
import styles from "./AuthPopup.module.scss";
import authPopup from "public/icons/authPopup.svg";
import like from "public/icons/like.svg";
import camera from "public/icons/camera.svg";
import Button from "components/Button/Button";
import Link from "next/link";
import Modal, { ModalBody } from "components/Modal/Modal";
import { useRouter } from "next/router";

export interface AuthPopupProps {
  visible?: boolean;
  onClose: () => void;
}

const AuthPopup = (props: AuthPopupProps) => {
  const { onClose, visible } = props;
  const router = useRouter();
  const goToLogin = () => {
    onClose();
    router.push("/login");
  };
  const goToSignup = () => {
    onClose();
    router.push("/signup");
  };
  return (
    <Modal
      mobilePosition="center"
      transparent
      visible={visible}
      onClose={onClose}
      notBlur
    >
      <ModalBody>
        <div className={styles.auth_popup}>
          <div className={styles.close} onClick={onClose}>
            &#x2715;
          </div>
          <Image src={authPopup} layout="responsive" alt="" />
          <div className={styles.button_container}>
            <Button
              text="Log in"
              className={styles.login}
              onClick={goToLogin}
            />
            <Button
              text="Sign up"
              variant="no-outlined"
              onClick={goToSignup}
              className={styles.sign_up}
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AuthPopup;
