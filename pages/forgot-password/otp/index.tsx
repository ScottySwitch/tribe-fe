import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import { useRouter } from "next/router";

import styles from "styles/Auth.module.scss";

const ForgotPasswordPage = () => {
  const router = useRouter();

  return (
    <div className={styles.auth}>
      <Modal visible={true} backdrop={false} width={580}>
        <div className={styles.form_container}>
          <ModalHeader alignTitle="center">Forgot password</ModalHeader>
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
              text="Next"
              onClick={() => router.push("/forgot-password/reset")}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPasswordPage;
