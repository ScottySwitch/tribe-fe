import { useRouter } from "next/router"
import React, {FormEvent, useCallback, useState} from "react"
import Image from "next/image"
import classNames from "classnames"

import Upload from "components/Upload/Upload"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal, { ModalHeader } from "components/Modal/Modal"
import Radio from "components/Radio/Radio"
import Select from "components/Select/Select"
import { countryList, educationLevels, industryList, interestingList } from "constant"

import styles from "styles/Auth.module.scss"
import DatePicker from "components/DatePicker/DatePicker"
import { useForm } from "react-hook-form"
import UserApi from "../../../services/user"

export enum ProfileSteps {
  STEP_ONE = "step_one",
  STEP_TWO = "step_two",
}

const StepOne = ({
  formData,
  onNextStep,
}: {
  formData: any
  onNextStep: (e: FormEvent<HTMLFormElement>) => void
}) => {
  const router = useRouter()
  const [uploadAvatar, setUploadAvatar] = useState('');

  const { setValue, getValues, register, handleSubmit } = useForm({
    defaultValues: {
      name: formData.name,
      country: formData.country,
      education: formData.education,
      gender: formData.gender,
      birthday: formData.birthday,
      industry: formData.industry,
    },
  })

  const handleUploadAvatar = useCallback((srcAvatar) => {
    setUploadAvatar(srcAvatar[1]);
  }, []);

  const onSubmit = async (data) => {
    console.log('data', data);
    try {
      const userId = parseInt(localStorage.getItem('user_id') || '0');
      await UserApi.updateUser(userId, {
        first_name: data.name,
        gender: data.gender,
        birthday: data.birthday,
        country: data.country?.value || null,
        avatar: uploadAvatar
      })
    } catch (err) {
      // TODO: notify error (missing template)
      console.log(err);
      return false;
    }
    onNextStep(data)
  }
  return (
    <div>
      <ModalHeader alignTitle="center">
        <div>Almost there... set up your profile</div>
      </ModalHeader>
      <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
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
            onChange={handleUploadAvatar}
          />
        </div>
        <Input placeholder="Your name" label="Name" register={register("name")} />
        <Select
          placeholder="Your country"
          options={countryList}
          value={getValues("country")}
          onChange={(e) => setValue("country", e)}
        />
        <div>
          Gender
          <div className="flex gap-[30px] mt-2">
            <Radio label="Male" value="male" register={register("gender")} />
            <Radio label="Female" value="female" register={register("gender")} />
            <Radio label="Others" value="others" register={register("gender")} />
          </div>
        </div>
        <DatePicker
          placeholder="Birthday"
          onChange={(e) => setValue("birthday", e)}
          value={getValues("birthday")}
        />
        <Select
          placeholder="Education level"
          options={educationLevels}
          value={getValues("education")}
          onChange={(e) => setValue("education", e)}
        />
        <Select
          placeholder="Industry"
          options={industryList}
          value={getValues("industry")}
          onChange={(e) => setValue("industry", e)}
        />
        <div className="flex justify-end">
          {/* <div className={styles.skip} onClick={() => router.push("/signup/setup-profile")}>
            Skip
          </div> */}
          <Button className="w-1/2" text="Next" type="submit" />
        </div>
      </form>
    </div>
  )
}

const StepTwo = ({ onBackStep, onSubmit }: any) => {
  const [interest, setInterest] = useState<string[]>([])
  const handleSubmit = () => {
    onSubmit(interest)
  }
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
          We would love to recommend categories and content especially for you! You can choose more
          than 1.
        </p>
        <p>
          Selected: {interest?.length} / {interestingList.length}
        </p>
        <div className={styles.interesting}>
          {interestingList.map((item: any) => {
            const itemClass = classNames(styles.interesting_item, {
              [styles.selected]: interest.includes(item.label),
            })
            return (
              <div
                key={item.value}
                className={itemClass}
                onClick={() => setInterest([...interest, item.label])}
              >
                <div className={styles.avatar}>
                  <Image src={item.avatar} alt="" layout="fixed" width={50} height={50} />
                </div>
                <div>{item.label}</div>
              </div>
            )
          })}
        </div>
        <div className={styles.actions}>
          <Button variant="secondary-no-outlined" text="Back" onClick={onBackStep} width={50} />
          <Button className="w-1/2" text="Next" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

const SetupProfilePage = () => {
  const [step, setStep] = useState(ProfileSteps.STEP_ONE)
  const [formData, setFormData] = useState({})

  const router = useRouter()

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data })
    console.log({ ...formData, ...data })
    setStep(ProfileSteps.STEP_TWO)
  }

  const handleSubmit = (form) => {
    console.log({ ...formData, ...form })
    router.push("/login")
  }

  const handleBackStep = () => {
    setStep(ProfileSteps.STEP_ONE)
  }

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        {step === ProfileSteps.STEP_ONE ? (
          <StepOne onNextStep={handleNextStep} formData={formData} />
        ) : (
          <StepTwo onSubmit={handleSubmit} onBackStep={handleBackStep} />
        )}
      </div>
    </div>
  )
}

export default SetupProfilePage
