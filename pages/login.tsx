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
import { loginInforItem } from "constant"
import { UsersTypes } from "enums"
import AuthApi from "../services/auth"
import BizApi from "services/biz-listing"
import BizInvoice from "services/biz-invoice"
import { formattedAreaCodes, phoneAreaCodes } from "constant"
import SelectInput from "components/SelectInput/SelectInput"
import { get } from "lodash"

export enum LoginMethod {
  PHONE_NUMBER = "phone-number",
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
  { label: "Phone number", value: LoginMethod.PHONE_NUMBER },
  { label: "Email", value: LoginMethod.EMAIL },
]

const LoginPage = () => {
  const [method, setMethod] = useState(LoginMethod.EMAIL)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [valueEmail, setValueEmail] = useState("")
  const [valuePhoneNumber, setValuePhoneNumber] = useState("")
  const [valuePassword, setValuePassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // localStorage.setItem(
    //   loginInforItem,
    //   JSON.stringify({ token: "sometoken", type: UsersTypes.NORMAL_USER })
    // )
    // Email
    if (method === LoginMethod.EMAIL) {
      let result: any = null
      try {
        result = await AuthApi.loginByEmail({
          email: valueEmail,
          password: valuePassword,
        })
      } catch (err: any) {
        // TODO: notify error (missing template)
        console.log(get(err, "response.data.error"))
        setIsLoading(false)
        return false
      }

      if (result.data) {
        let { jwt } = result.data
        localStorage.setItem("token", jwt)
        await AuthApi.getMe()
      }
    } else {
      let result: any = null
      try {
        result = await AuthApi.loginByPhone({
          phone_number: valuePhoneNumber,
          password: valuePassword,
        })
      } catch (err: any) {
        // TODO: notify error (missing template)
        console.log(err.response.data.error)
        setIsLoading(false)
        return false
      }

      if (result.data) {
        let { jwt } = result.data
        localStorage.setItem("token", jwt)
        await AuthApi.getMe()
      }
    }

    window.location.href = "/"
  }

  const routeFacebookLogin = process.env.NEXT_PUBLIC_API_URL + "/api/connect/facebook"
  const routeGoogleLogin = process.env.NEXT_PUBLIC_API_URL + "/api/connect/google"

  return (
    <div className={styles.auth}>
      <div className={styles.form_container}>
        <ModalHeader alignTitle="center">Log in</ModalHeader>
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
        <div className={styles.body}>
          {method === LoginMethod.PHONE_NUMBER ? (
            <SelectInput
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              onChange={(e) =>
                setValuePhoneNumber(`${e.select.value}${e.input.substr(1, e.input.length - 1)}`)
              }
            />
          ) : (
            <Input
              label="Email"
              placeholder="Your email"
              onChange={(e: any) => setValueEmail(e.target.value)}
            />
          )}
          <Input
            size="large"
            placeholder="Password"
            type={showPassword ? "default" : "password"}
            suffix={<PasswordEye onClick={() => setShowPassword(!showPassword)} />}
            onChange={(e: any) => setValuePassword(e.target.value)}
          />
          <div className={styles.actions}>
            <div className="w-[150px]">
              <Checkbox label="Remember me" />
            </div>
            <Link href="/forgot-password" passHref>
              Forgot password?
            </Link>
          </div>
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
          <Button text="Log in" onClick={handleLogin} isLoading={isLoading} />
          <div className={styles.sign_up}>
            No account yet?
            <span>
              <Link href="/signup"> Sign up now</Link>
            </span>
          </div>
        </div>
        <div className={styles.footer} onClick={() => router.push("/claim")}>
          <Icon icon="business" size={20} />
          <div>Grow your business with Tribes now! </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
