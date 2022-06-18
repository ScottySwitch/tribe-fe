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
import { ChangeEvent, FormEvent, useState, useCallback, useEffect } from "react"
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

  useEffect(() => {
    const sessionId = router.query.sessionId;
    console.log(router.query);
    if (sessionId) {
      setVerifyStep(VerifySteps.ADD_PAYMENT)
      setShowResultModal(true);
    }
  }, [])

  const handleSubmit = () => {
    const ssProduct = document.getElementById("SS_ProductCheckout");
    console.log(ssProduct);
    if (ssProduct) {
      ssProduct.addEventListener("click", () => {
        SS_ProductCheckout();
      });
    }
  
    // for storing product payment order in strapi
    const params = new URLSearchParams(document.location.search);
    const checkoutSessionId = params.get("sessionId");
    if (checkoutSessionId) {
      SS_GetProductPaymentDetails(checkoutSessionId);
    }
  }

  function SS_ProductCheckout() {
    const strapiStripe = document.querySelector("#SS_ProductCheckout");
    const productId = strapiStripe?.dataset.id;
  
    const baseUrl = strapiStripe?.dataset.url;
    localStorage.setItem("strapiStripeUrl", baseUrl);
    const getProductApi = baseUrl + "/strapi-stripe/getProduct/" + productId;
    const checkoutSessionUrl = baseUrl + "/strapi-stripe/createCheckoutSession/";
  
    fetch(getProductApi, {
      method: "get",
      // mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        fetch(checkoutSessionUrl, {
          method: "post",
          body: JSON.stringify({
            stripePriceId: response.stripePriceId,
            stripePlanId: response.stripePlanId,
            isSubscription: response.isSubscription,
            productId: response.id,
            productName: response.title,
          }),
          // mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.id) {
              window.location.replace(response.url);
            }
          });
      });
  }
  
  //  storing product payment order in strapi logic
  
  function SS_GetProductPaymentDetails(checkoutSessionId) {
    const baseUrl = localStorage.getItem("strapiStripeUrl");
    const retrieveCheckoutSessionUrl =
      baseUrl + "/strapi-stripe/retrieveCheckoutSession/" + checkoutSessionId;
    fetch(retrieveCheckoutSessionUrl, {
      method: "get",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.payment_status === "paid") {
          if (
            window.performance
              .getEntriesByType("navigation")
              .map((nav) => nav.type)
              .includes("reload")
          ) {
            console.info("website reloded");
          } else {
            // store payment in strapi
            const stripePaymentUrl = baseUrl + "/strapi-stripe/stripePayment";
            fetch(stripePaymentUrl, {
              method: "post",
              body: JSON.stringify({
                txnDate: new Date(),
                transactionId: response.id,
                isTxnSuccessful: true,
                txnMessage: response,
                txnAmount: response.amount_total / 100,
                customerName: response.customer_details.name,
                customerEmail: response.customer_details.email,
                stripeProduct: response.metadata.productId,
              }),
              mode: "cors",
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            });
          }
        }
      });
  }
  

  
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
    if (srcImages) {
      const userId = localStorage.getItem('user_id');
      console.log(userId);
      if (userId) {
        const result = UserApi.updateUser(parseInt(userId), {
          front_papers_identity: srcImages
        })
        console.log(result);
      }
    }
  }, [])

  const handleUploadBackImagesIdentity = useCallback((srcImages) => {
    console.log('srcImages', srcImages)
    if (srcImages) {
      const userId = localStorage.getItem('user_id');
      console.log(userId);
      if (userId) {
        const result = UserApi.updateUser(parseInt(userId), {
          back_papers_identity: srcImages
        })
        console.log(result);
      }
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
            <button 
              onClick={handleSubmit}
              className="css style" type="button" id="SS_ProductCheckout" data-id="1" data-url="http://localhost:1337"> Subscribe </button>
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
