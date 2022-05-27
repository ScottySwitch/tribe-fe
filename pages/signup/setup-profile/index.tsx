import { useRouter } from "next/router";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Select from "components/Select/Select";

import styles from "styles/Auth.module.scss";

const SetupProfilePage = () => {
  const router = useRouter();

  return (
    <div className={styles.auth}>
      <Modal visible={true} backdrop={false} width={580}>
        <div className={styles.form_container}>
          <ModalHeader alignTitle="center">
            Almost there... set up your profile
          </ModalHeader>
          <div className={styles.body}>
            <Input placeholder="Your name" label="Name" />
            <Select placeholder="Your country" />
            <div>
              Gender
              <div className="flex gap-[30px] mt-2">
                <Radio label="Male" name="gender" />
                <Radio label="Female" name="gender" />
                <Radio label="Others" name="gender" />
              </div>
            </div>
            <Input placeholder="Birthday" />
            <Select placeholder="Education level" />
            <Select placeholder="Industry" />

            <div className={styles.actions}>
              <div
                className={styles.skip}
                onClick={() => router.push("/signup/setup-profile")}
              >
                Skip
              </div>
              <Button
                className="w-1/2"
                text="Next"
                onClick={() => router.push("/signup/setup-profile")}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SetupProfilePage;
