import { useRouter } from "next/router";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Select from "components/Select/Select";

import styles from "styles/Auth.module.scss";
import { useState } from "react";
import Image from "next/image";

const Information = () => {
  return (
    <>
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
    </>
  );
};

const Interesting = () => {
  return (
    <div>
      <p>
        We would love to recommend categories and content especially for you!
        You can choose more than 1.
      </p>
      <br />
      <p>Selected: 0/50</p>
    </div>
  );
};

export enum ProfileStep {
  STEP_ONE = "step_one",
  STEP_TWO = "step_two",
}

const interestingList = [
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
];

const SetupProfilePage = () => {
  const [step, setStep] = useState<ProfileStep>(ProfileStep.STEP_ONE);
  const router = useRouter();

  return (
    <div className={styles.auth}>
      <Modal visible={true} backdrop={false} width={580}>
        <div className={styles.form_container}>
          <ModalHeader
            alignTitle={step === ProfileStep.STEP_ONE ? "center" : "left"}
          >
            {step === ProfileStep.STEP_ONE ? (
              <div>Almost there... set up your profile</div>
            ) : (
              <div>
                <div>Hello Anna Nhun,</div>
                <div>What are you most interested in lately?</div>
              </div>
            )}
          </ModalHeader>

          <div className={styles.body}>
            {step === ProfileStep.STEP_ONE && <Information />}
            {step === ProfileStep.STEP_TWO && (
              <>
                <Interesting />
                <div className={styles.interesting}>
                  {interestingList.map((item: any) => (
                    <div key={item.value} className={styles.interesting_item}>
                      <Image
                        src={item.avatar}
                        alt=""
                        layout="fixed"
                        width={50}
                        height={50}
                        className={styles.avatar}
                      />
                      <div>{item.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

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
                onClick={() => {
                  step === ProfileStep.STEP_ONE
                    ? setStep(ProfileStep.STEP_TWO)
                    : router.push("/");
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SetupProfilePage;
