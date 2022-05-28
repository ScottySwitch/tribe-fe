import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "styles/Auth.module.scss";

const OtpPage = () => {
  const router = useRouter();

  return (
    <div className={styles.auth}>
      <Modal
        visible
        backdrop={false}
        width={580}
        mobileFullHeight
        mobilePosition="bottom"
      >
        <div className={styles.form_container}>
          <ModalHeader alignTitle="center">Sign up</ModalHeader>
          <div className={styles.body}>
            <div className={styles.instruction}>
              <div>
                An OTP have send to the number <strong>+84 0335 478 699</strong>
              </div>
              <div>Please check and enter your OTP</div>
            </div>
            <Input size="large" placeholder="Enter OTP" />
            <div className="flex justify-between">
              <div>00:39</div>
              <div>Resend</div>
            </div>
            <Button
              text="Sign up"
              onClick={() => router.push("/signup/setup-profile")}
            />
            <div className={styles.sign_up}>
              Already have account?
              <span>
                <Link href="/login"> Log in now</Link>
              </span>
            </div>
          </div>
          <div className={styles.footer}>
            <Icon icon="business" size={20} />
            <div>Login / Sign up for Business</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OtpPage;
