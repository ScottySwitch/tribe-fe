import Image from "next/image";
import styles from "./AuthPopup.module.scss";
import authModal from "public/icons/authModal.svg";
import like from "public/icons/like.svg";
import camera from "public/icons/camera.svg";
import Button from "components/Button/Button";
import Link from "next/link";

export interface AuthPopupProps {
  onClose: () => void;
}

const AuthPopup = (props: AuthPopupProps) => {
  const { onClose } = props;
  return (
    <div className={styles.auth_popup}>
      <div className={styles.modal_container}>
        <div className={styles.camera}>
          <Image src={camera} layout="intrinsic" alt="" />
        </div>
        <div className={styles.close} onClick={onClose}>
          &#x2715;
        </div>
        <Image src={authModal} layout="fill" alt="" />
        <div className={styles.button_container}>
          <Link href="/login" passHref>
            <Button text="Log in" className={styles.login} />
          </Link>
          <Link href="/signup" passHref>
            <Button
              text="Sign up"
              variant="no-outlined"
              className={styles.sign_up}
            />
          </Link>
        </div>
        <div className={styles.like}>
          <Image src={like} layout="intrinsic" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
