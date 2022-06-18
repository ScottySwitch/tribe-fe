import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Select from "components/Select/Select"
import Upload from "components/Upload/Upload"
import { loginInforItem } from "constant"
import { Tiers, UsersTypes, VerifySteps } from "enums"
import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState, useCallback } from "react"
import styles from "styles/BizUserVerify.module.scss"
import { randomId } from "utils"
import AuthApi from '../../../services/auth'
import UserApi from "../../../services/user"

interface BizUserVerifyProps {
  tier: string
}

const BizUserVerify = (props: BizUserVerifyProps) => {
  const { tier } = props
  const [verifyStep, setVerifyStep] = useState(VerifySteps.REQUEST_OTP)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)
  const router = useRouter()

  console.log(tier);
  
  const handleRequestOTP = async () => {
    //send OPT
    await AuthApi.otpPhoneGenerate(phoneNumber);
    console.log(phoneNumber)
    setVerifyStep(VerifySteps.CONFIRM_OTP)
  }

  const handleConfirmOTP = async () => {
    //submit otp to check
    if (tier === Tiers.FREE) {
      const result = await AuthApi.otpPhoneConfirm({otp});
      if (result.data.success) {
        setShowResultModal(true);
      } else {
        alert('Wrong OTP')
      }
    } else {
      const result = await AuthApi.otpPhoneConfirm({otp});
      if (result.data.success) {
        setVerifyStep(VerifySteps.ADD_ID_CARD)
      } else {
        alert('Wrong OTP')
      }
    }
  }

  const handleDirectToStorePage = () => {
    const localLoginInfo = { tier: tier, token: "asd", type: UsersTypes.BIZ_USER }
    localStorage.setItem(loginInforItem, JSON.stringify(localLoginInfo))
    window.location.href = `/biz/home/edit/${randomId()}`
  }

  const handleAddIdCard = () => {
    setVerifyStep(VerifySteps.ADD_PAYMENT)
  }

  const handleFinishVerifying = () => {
    setShowResultModal(true)
  }

  const handleUploadFrontImagesIdentity = useCallback((srcImages) => {
    console.log('srcImages', srcImages)
    const userId = localStorage.getItem('user_id');
    console.log(userId);
    if (userId) {
      const result = UserApi.updateUser(parseInt(userId), {
        front_papers_identity: srcImages
      })
      console.log(result);
    }
  }, [])

  const handleUploadBackImagesIdentity = useCallback((srcImages) => {
    console.log('srcImages', srcImages)
    const userId = localStorage.getItem('user_id');
    console.log(userId);
    if (userId) {
      const result = UserApi.updateUser(parseInt(userId), {
        back_papers_identity: srcImages
      })
      console.log(result);
    }
  }, [])

  return (
    <div className={styles.biz_verify}>
      {verifyStep === VerifySteps.REQUEST_OTP && (
        <div className={styles.form}>
          <div className={styles.header}>Enter phone number</div>
          <Input
            placeholder="your phone number"
            width="100%"
            prefix="+84"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          />
          <Button text="Receive OTP" onClick={handleRequestOTP} />
        </div>
      )}
      {verifyStep === VerifySteps.CONFIRM_OTP && (
        <div className={styles.form}>
          <div className={styles.header}>Confirm number</div>
          <p>
            An OTP has been sent to the number {phoneNumber} Please enter the OTP to complete the
            registration.
          </p>
          <Input
            placeholder="Enter OTP"
            width="100%"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
          />
          <div className="flex justify-between w-full">
            <p className={styles.time}>00:39</p>
            <p className="cursor-pointer" onClick={() => setVerifyStep(VerifySteps.REQUEST_OTP)}>
              Resend
            </p>
          </div>
          <Button text="Receive OTP" onClick={handleConfirmOTP} disabled={!otp} />
        </div>
      )}
      {verifyStep === VerifySteps.ADD_ID_CARD && (
        <div className={styles.form}>
          <div className={styles.header}>Add ID Card / Driving Licence photo</div>
          <p>We need this to verify the information you’ve provided.</p>
          <div className={styles.field_group}>
            <label>ID Type</label>
            <Select
              placeholder="Driving Licence"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
            />
          </div>
          <div className={styles.field_group}>
            <label>Upload ID card or driver liciense photos</label>
            <div className="w-full flex justify-between gap-5">
              <Upload
                onChange={handleUploadFrontImagesIdentity}
                className={styles.upload_id}
                centerIcon={
                  <div className="flex gap-1 items-center flex-col">
                    <Icon icon="plus" size={20} />
                    <p>Front</p>
                  </div>
                }
              />
              <Upload
                onChange={handleUploadBackImagesIdentity}
                className={styles.upload_id}
                centerIcon={
                  <div className="flex gap-1 items-center flex-col">
                    <Icon icon="plus" size={20} />
                    <p>Back</p>
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <Button width="30%" variant="no-outlined" text="Skip" />
            <Button width="80%" text="Next" onClick={handleAddIdCard} />
          </div>
        </div>
      )}
      {verifyStep === VerifySteps.ADD_PAYMENT && (
        <div className={styles.form}>
          <div className={styles.header}>Payment</div>
          <p>Cancel anytime. Auto renewal.</p>
          <div className={styles.field_group}>
            <div className={styles.price_container}>
              <div className={styles.amount}>Amount</div>
              <div className={styles.price}>
                SGD 150 <p>per quarter</p>
              </div>
            </div>
          </div>
          <div className={styles.field_group}>
            <label>Payment method</label>
            <div className={styles.payment_container}>
              <div
                className={`${styles.payment} ${paymentMethod === "xendit" ? styles.selected : ""}`}
                onClick={() => setPaymentMethod("xendit")}
              >
                <Image src={require("public/images/xendit.svg")} width="60px" alt="" />
                Xendit
              </div>
              <div
                className={`${styles.payment} ${paymentMethod === "stripe" ? styles.selected : ""}`}
                onClick={() => setPaymentMethod("stripe")}
              >
                <Image src={require("public/images/stripe.svg")} width="60px" alt="" />
                Stripe
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <Button width="30%" variant="no-outlined" text="Change tier" />
            <Button width="80%" text="Next" onClick={handleFinishVerifying} />
          </div>
        </div>
      )}
      <Modal transparent width={400} mobilePosition="center" visible={showResultModal}>
        <div className={styles.modal}>
          <Image
            src={require("public/images/success-submit.svg")}
            width={100}
            height={100}
            alt=""
          />
          <div className={styles.header}>First step success!</div>
          <div>
            <p>Your awesome brand is successfully registered.</p>
            <p> Let&rsquo;s fill in some info and get the ball rolling.</p>
          </div>
          <Button
            text="View store page"
            size="small"
            width="70%"
            onClick={handleDirectToStorePage}
          />
        </div>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return { props: { tier: context.query.tier || Tiers.FREE } }
}

export default BizUserVerify
