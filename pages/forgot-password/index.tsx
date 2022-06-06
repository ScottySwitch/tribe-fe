import { MouseEventHandler, useState } from "react";
import classNames from "classnames";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";

import styles from "styles/Auth.module.scss";
import { useRouter } from "next/router";

export enum LoginMethod {
  PHONE_NUMBER = "phone-number",
  EMAIL = "email",
}

const tabList = [
  { label: "Phone number", value: LoginMethod.PHONE_NUMBER },
  { label: "Email", value: LoginMethod.EMAIL },
];

const ForgotPasswordPage = () => {
  const [method, setMethod] = useState(LoginMethod.EMAIL);
  const router = useRouter();

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Forgot password</ModalHeader>
        <div className={styles.tabs}>
          {tabList.map((tab) => {
            const tabClassNames = classNames(styles.tab, {
              [styles.selected]: method === tab.value,
            });
            return (
              <div
                key={tab.value}
                onClick={() => setMethod(tab.value)}
                className={tabClassNames}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
        <div className={styles.body}>
          {method === LoginMethod.PHONE_NUMBER ? (
            <Input size="large" placeholder="Phone number" />
          ) : (
            <Input label="Email" placeholder="Your email" />
          )}
          <Button
            text="Next"
            onClick={() => router.push("/forgot-password/otp")}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
