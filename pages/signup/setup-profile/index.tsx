import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import Upload from "components/Upload/Upload";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal, { ModalHeader } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Select from "components/Select/Select";
import { interestingList } from "constant";

import styles from "styles/Auth.module.scss";

export enum ProfileSteps {
  STEP_ONE = "step_one",
  STEP_TWO = "step_two",
}

const StepOne = ({ setStep }: { setStep: Function }) => {
  const router = useRouter();
  return (
    <div>
      <ModalHeader alignTitle="center">
        <div>Almost there... set up your profile</div>
      </ModalHeader>
      <div className={styles.body}>
        <div className={styles.profile_imgs}>
          <Upload
            type="cover"
            className={styles.cover}
            fileList={["https://picsum.photos/200/300"]}
          />
          <Upload
            fileList={["https://picsum.photos/200"]}
            type="avatar"
            className={styles.avatar}
          />
        </div>
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
            onClick={() => {
              setStep(ProfileSteps.STEP_TWO);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const [interest, setInterest] = useState<string[]>([]);
  const router = useRouter();
  return (
    <div>
      <ModalHeader alignTitle="left">
        <div>
          <div>👋 &nbsp; Hello Anna Nhun,</div>
          <div>What are you most interested in lately?</div>
        </div>
      </ModalHeader>
      <div className={styles.body}>
        <p>
          We would love to recommend categories and content especially for you!
          You can choose more than 1.
        </p>
        <p>
          Selected: {interest?.length} / {interestingList.length}
        </p>
        <div className={styles.interesting}>
          {interestingList.map((item: any) => {
            const itemClass = classNames(styles.interesting_item, {
              [styles.selected]: interest.includes(item.label),
            });
            return (
              <div
                key={item.value}
                className={itemClass}
                onClick={() => setInterest([...interest, item.label])}
              >
                <div className={styles.avatar}>
                  <Image
                    src={item.avatar}
                    alt=""
                    layout="fixed"
                    width={50}
                    height={50}
                  />
                </div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
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
              router.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};

const SetupProfilePage = () => {
  const [step, setStep] = useState(ProfileSteps.STEP_ONE);

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        {step === ProfileSteps.STEP_ONE ? (
          <StepOne setStep={() => setStep(ProfileSteps.STEP_TWO)} />
        ) : (
          <StepTwo />
        )}
      </div>
    </div>
  );
};

export default SetupProfilePage;
