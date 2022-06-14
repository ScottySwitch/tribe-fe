import { MouseEventHandler, useState } from "react"
import classNames from "classnames"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal, { ModalHeader } from "components/Modal/Modal"

import styles from "styles/Auth.module.scss"
import { useRouter } from "next/router"

export enum LoginMethod {
  PHONE_NUMBER = "phone",
  EMAIL = "email",
}

const tabList = [
  { label: "Phone number", value: LoginMethod.PHONE_NUMBER },
  { label: "Email", value: LoginMethod.EMAIL },
]

const ForgotPasswordPage = () => {
  const [method, setMethod] = useState(LoginMethod.EMAIL)
  const router = useRouter()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const otpReceiver =
      method === LoginMethod.EMAIL ? event.target.email.value : event.target.phone.value
    const formData = {
      method: method,
      [method]: otpReceiver,
    }
    console.log(formData)
    //do submit things
    router.push({
      pathname: "/forgot-password/otp",
      //help otp page detect method and otp receiver
      query: {
        method: method,
        otpReceiver: otpReceiver,
      },
    })
  }

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Forgot password</ModalHeader>
        <div className={styles.tabs}>
          {tabList.map((tab) => {
            const tabClassNames = classNames(styles.tab, {
              [styles.selected]: method === tab.value,
            })
            return (
              <div key={tab.value} onClick={() => setMethod(tab.value)} className={tabClassNames}>
                {tab.label}
              </div>
            )
          })}
        </div>
        <form className={styles.body} onSubmit={handleSubmit}>
          {method === LoginMethod.PHONE_NUMBER ? (
            <Input size="large" placeholder="Phone number" name="phone" />
          ) : (
            <Input label="Email" placeholder="Your email" name="email" />
          )}
          <Button text="Next" type="submit" />
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
