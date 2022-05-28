import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import classNames from "classnames";

import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";

import styles from "styles/Auth.module.scss";
import { useRouter } from "next/router";

export enum LoginMethod {
  PHONE_NUMBER = "phone-number",
  EMAIL = "email",
}

const PasswordEye = (props: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  const { onClick } = props;
  return (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      <Icon icon="eye" size={20} color="#A4A8B7" />
    </div>
  );
};

const tabList = [
  { label: "Phone number", value: LoginMethod.PHONE_NUMBER },
  { label: "Email address", value: LoginMethod.EMAIL },
];

const SignupPage = () => {
  const [method, setMethod] = useState(LoginMethod.EMAIL);
  const [showPassword, setShowPassword] = useState(false);
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
            <Input
              size="large"
              placeholder="Password"
              type={showPassword ? "default" : "password"}
              suffix={
                <PasswordEye onClick={() => setShowPassword(!showPassword)} />
              }
            />
            <Checkbox label="I have read and agree to the T&C of Tribes" />
            <Checkbox label="I would like to recieve offers, promotion and other informations" />
            <div className={styles.break}>
              <span>Or log in with</span>
            </div>
            <div className={styles.socials}>
              <Icon icon="google-logo" size={20} className={styles.icon} />
              <Icon icon="facebook-color" size={20} className={styles.icon} />
              <Icon icon="instagram-color" size={20} className={styles.icon} />
            </div>
            <Button text="Sign up" onClick={() => router.push("/signup/otp")} />
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

export default SignupPage;
