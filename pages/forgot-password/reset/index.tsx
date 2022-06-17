import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useState } from "react";

import styles from "styles/Auth.module.scss";

const ResetPasswordPage = () => {
  const [status, setStatus] = useState<string>("in-progress");
  const router = useRouter();

  const Success = () => {
    return (
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Password changed</ModalHeader>
        <div className={styles.body}>
          <div className={styles.instruction}>
            Your password has been successfully changed
          </div>
          <Image
            src={"/icons/change-ps-success.svg"}
            alt=""
            width={120}
            height={120}
          />
          <Button text="Login" onClick={() => router.push("/login")} />
        </div>
      </div>
    );
  };

  const Failed = () => {
    return (
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Changing failed</ModalHeader>
        <div className={styles.body}>
          <div className={styles.instruction}>Changing password failed</div>
          <Button
            text="Try agin"
            onClick={() => router.push("/forgot-password")}
          />
        </div>
      </div>
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
    if ( data.newPasswordValue === data.confirmPasswordValue ) {
      let result: any = null;
      try {
        result = await AuthApi.resetPassword({
          password: data.newPasswordValue,
          passwordConfirm: data.confirmPasswordValue,
          idUser: localStorage.getItem("idUser")
        })
        console.log(result);
        if (result.data.ok) {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (err) {
        // TODO: notify error (missing template)
        console.log(err);
        return false;
        setStatus('failed');
      }
    }
  }

  const InProgress = () => {
    return (
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Reset password</ModalHeader>
        <div className={styles.body}>
          <Input size="large" placeholder="New password" />
          <Input size="large" placeholder="Confirm password" />
          <Button text="Next" onClick={() => setStatus("success")} />
        </div>
      </div>
    );
  };

  const renderStauts = () => {
    switch (status) {
      case "success":
        return <Success />;
      case "failed":
        return <Failed />;
      default:
        return <InProgress />;
    }
  };

  return <div className={styles.auth}>{renderStauts()}</div>;
};

export default ResetPasswordPage;
