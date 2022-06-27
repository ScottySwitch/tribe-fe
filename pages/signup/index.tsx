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
import { get } from "lodash"
import { useForm } from "react-hook-form"

export enum LoginMethod {
  PHONE = "phone",
  EMAIL = "email",
}

const PasswordEye = (props: {
  showPassword: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}) => {
  const { showPassword, onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Icon icon={showPassword ? "eye" : "eye-closed"} size={20} color="#A4A8B7" />
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
  const [otpReceiver, setOtpReceiver] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange" })

  const onSubmit = async (form: any) => {
    setIsLoading(true)
    const formData = {
      method: method,
      [method]: otpReceiver,
      receive_promotions: form.receivePromotions,
      agree_policies: form.agreePolicies,
    }
    console.log(formData)
    if (method === LoginMethod.EMAIL) {
      try {
        const result = await AuthApi.signUpByEmail({
          email: formData.email,
          password: form.password,
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
        console.log(get(err, "response.data.error"))
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
          password: form.password,
        })
        const { jwt } = result.data
        if (jwt) {
          localStorage.setItem("phone_number", formData.phone);
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
        console.log(get(err, "response.data.error"))
        setIsLoading(false)
      }
    }
    setIsLoading(false)
  }

  const routeFacebookLogin = process.env.NEXT_PUBLIC_API_URL + "/api/connect/facebook"
  const routeGoogleLogin = process.env.NEXT_PUBLIC_API_URL + "/api/connect/google"

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
          {method === LoginMethod.PHONE ? (
            <SelectInput
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              onChange={(e) =>
                [console.log(e),
                console.log(e.input.substring(1)),
                setOtpReceiver(`${e.select.value}${e.input.substring(1)}`)]
              }
            />
          ) : (
            <Input
              label="Email"
              placeholder="Your email"
              onChange={(e: any) => setOtpReceiver(e.target.value)}
            />
          )}
          <Input
            size="large"
            placeholder="Password"
            type={showPassword ? "default" : "password"}
            suffix={
              <PasswordEye
                showPassword={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            }
            register={register("password", { required: true })}
          />
          <Checkbox
            label="I have read and agree to the T&C of Tribes"
            register={register("agreePolicies", { required: true })}
          />
          <Checkbox
            label="I would like to recieve offers, promotion and other informations"
            register={register("receivePromotions", { required: true })}
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
          <Button
            text="Sign up"
            type="submit"
            isLoading={isLoading}
            disabled={!(isValid && otpReceiver)}
          />
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
