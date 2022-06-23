import Link from "next/link"
import { MouseEventHandler, useState } from "react"
import classNames from "classnames"

import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal, { ModalHeader } from "components/Modal/Modal"

import styles from "styles/Auth.module.scss"
import { useRouter } from "next/router"
import AuthApi from "../../services/auth"
import SelectInput from "components/SelectInput/SelectInput"
import { formattedAreaCodes, phoneAreaCodes } from "constant"

export enum LoginMethod {
  PHONE = "phone",
  EMAIL = "email",
}

const PasswordEye = (props: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Icon icon="eye" size={20} color="#A4A8B7" />
    </div>
  )
}

const tabList = [
  { label: "Phone number", value: LoginMethod.PHONE },
  { label: "Email address", value: LoginMethod.EMAIL },
]

const SignupPage = () => {
  const [method, setMethod] = useState(LoginMethod.PHONE)
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [localValue, setLocalValue] = useState("")
  const router = useRouter()

  const [valuePassword, setValuePassword] = useState("")

  const handleSubmit = async (event: any) => {
    setIsLoading(true)
    console.log(phoneNumber);
    event.preventDefault()
    const otpReceiver = method === LoginMethod.EMAIL ? event.target.email.value : phoneNumber
    const formData = {
      method: method,
      [method]: otpReceiver,
      receive_promotions: event.target.receive_promotions.value,
      agree_policies: event.target.agree_policies.value,
    }
    console.log(formData)
    if (method === LoginMethod.EMAIL) {
      try {
        const result = await AuthApi.signUpByEmail({
          email: formData.email,
          password: valuePassword,
        })
        const { jwt } = result.data
        if (jwt) {
          localStorage.setItem("token", jwt)
          // OTP flow
          await AuthApi.otpEmailGenerate()
          router.push({
            pathname: "/signup/otp",
            //help otp page detect method and otp receiver
            query: {
              method: method,
              otpReceiver: otpReceiver,
            },
          })
        }
      } catch (err: any) {
        // TODO: notify error (missing template)
        console.log(err.response.data.error)
        setIsLoading(false)
      }
    } else {
      try {
        const date = new Date().getTime()
        const randomString = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 2)
        const emailFake = date + "_" + randomString + "@tribes.com"
        console.log(emailFake)
        const result = await AuthApi.signUpByPhone({
          email: emailFake,
          phone_number: formData.phone,
          password: valuePassword,
        })
        const { jwt } = result.data
        if (jwt) {
          localStorage.setItem("token", jwt)
          // OTP flow
          await AuthApi.otpPhoneGenerate(formData.phone)
          router.push({
            pathname: "/signup/otp",
            //help otp page detect method and otp receiver
            query: {
              method: method,
              otpReceiver: otpReceiver,
            },
          })
        }
      } catch (err: any) {
        // TODO: notify error (missing template)
        console.log(err.response.data.error)
        setIsLoading(false)
      }
    }
    setIsLoading(false)
  }

  const routeFacebookLogin = process.env.NEXT_PUBLIC_API_URL + '/api/connect/facebook'
  const routeGoogleLogin = process.env.NEXT_PUBLIC_API_URL + '/api/connect/google'

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Sign up</ModalHeader>
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
        <form onSubmit={handleSubmit} className={styles.body}>
          {method === LoginMethod.PHONE ? (
            <SelectInput
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              onChange={(e) => setPhoneNumber(`${e.select.value}${(e.input).substr(1, e.input.length - 1)}`)}
            />
          ) : (
            <Input label="Email" placeholder="Your email" name="email" />
          )}
          <Input
            size="large"
            placeholder="Password"
            type={showPassword ? "default" : "password"}
            suffix={<PasswordEye onClick={() => setShowPassword(!showPassword)} />}
            name="password"
            onChange={(e: any) => setValuePassword(e.target.value)}
          />
          <Checkbox label="I have read and agree to the T&C of Tribes" name="agree_policies" />
          <Checkbox
            label="I would like to recieve offers, promotion and other informations"
            name="receive_promotions"
          />
          <div className={styles.break}>
            <span>Or log in with</span>
          </div>
          <div className={styles.socials}>
            <a rel="noopener noreferrer" href={routeGoogleLogin}>
              <Icon icon="google-logo" size={20} className={styles.icon} />
            </a>
            <a rel="noopener noreferrer" href={routeFacebookLogin}>
              <Icon icon="facebook-color" size={20} className={styles.icon} />
            </a>
          </div>
          <Button text="Sign up" type="submit" isLoading={isLoading} />
          <div className={styles.sign_up}>
            Already have account?
            <span>
              <Link href="/login"> Log in now</Link>
            </span>
          </div>
        </form>
        <div className={styles.footer} onClick={() => router.push("/claim")}>
          <Icon icon="business" size={20} />
          <div>Grow your business with Tribes now! </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
