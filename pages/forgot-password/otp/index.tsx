import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal, { ModalHeader } from "components/Modal/Modal"
import { useRouter } from "next/router"

import styles from "styles/Auth.module.scss"

const OtpPage = (context) => {
  const { method, otpReceiver } = context
  const router = useRouter()
  const [valueOTP, setValueOTP] = useState<any>('');

  const verifyOtp = async () => {
    let result: any = null;
    try {
      result = await AuthApi.otpEmailConfirmForgetPassword({
        otp: valueOTP,
        idUser: localStorage.getItem('idUser')
      });
    } catch (err) {
      // TODO: notify error (missing template)
      console.log(err);
      return false;
    }
    let { success } = result.data;
    if (success) {
      await router.push("/forgot-password/reset")
    } else {
      setValueOTP('')
      // TODO: notify error (missing template)
      alert('Wrong OTP');
    }
}


  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Forgot password</ModalHeader>
        <div className={styles.body}>
          <div className={styles.instruction}>
            <div>
              An OTP have send to the {method} <strong>{otpReceiver}</strong>
            </div>
            <div>Please check and enter your OTP</div>
          </div>
          <Input size="large" placeholder="Enter OTP" />
          <div className="flex justify-between">
            <div>00:39</div>
            <div>Resend</div>
          </div>
          <Button text="Next" onClick={() => router.push("/forgot-password/reset")} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: { method: context.query.method || "", otpReceiver: context.query.otpReceiver || "" },
  }
}

export default OtpPage
