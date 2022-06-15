import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import { categories, contributePopOverList, loginInfoItem, switchAccountList } from "constant"
import Popover from "components/Popover/Popover"
import Icon from "components/Icon/Icon"
import Button from "components/Button/Button"
import Menu from "components/Menu/Menu"

import styles from "./Header.module.scss"
import { ILoginInfor } from "pages/_app"
import { UsersTypes } from "enums"
import Break from "components/Break/Break"

export const Categories = (props: {
  currentCategory?: string
  onSetCurrentCategory: (e: string) => void
}) => {
  const { onSetCurrentCategory, currentCategory } = props
  return (
    <React.Fragment>
      {categories.map((cat) => {
        const isSelected = currentCategory === cat.label
        const categoryContent = (
          <React.Fragment>
            {cat.options.map((value) => (
              <div key={value.value}>{value.value}</div>
            ))}
          </React.Fragment>
        )
        return (
          <Popover key={cat.label} content={categoryContent}>
            <div
              className={`${styles.category} ${isSelected && styles.selected}`}
              onClick={() => onSetCurrentCategory(cat.label)}
            >
              <Icon icon={cat.icon} size={20} className={styles.icon} />
              <div className={cat.width}>{cat.label}</div>
            </div>
          </Popover>
        )
      })}
    </React.Fragment>
  )
}

export const ContributeContent = () => {
  const router = useRouter()
  return (
    <React.Fragment>
      {contributePopOverList.map((item) => (
        <div key={item.label} onClick={() => router.push(item.href)}>
          <Icon icon={item.icon} size={20} />
          {item.label}
        </div>
      ))}
    </React.Fragment>
  )
}

export const SwitchAccountsContent = () => {
  const router = useRouter()
  const handleSwitchNormalUser = () => {
    const localLoginInfo = { token: "asd", type: UsersTypes.NORMAL_USER }
    localStorage.setItem(loginInfoItem, JSON.stringify(localLoginInfo))
    window.location.href = "/"
  }
  return (
    <React.Fragment>
      {switchAccountList.map((item) => (
        <div key={item.name} className="cursor-pointer">
          <Image
            src={require("public/images/page-avatar.png")}
            alt=""
            width={30}
            height={30}
            onClick={() => router.push("/biz/information")}
          />
          {item.name}
        </div>
      ))}
      <div className="cursor-pointer flex">
        <Image
          src={require("public/images/avatar.png")}
          alt=""
          width={30}
          height={30}
          onClick={() => router.push("/biz/information")}
        />
        <div onClick={handleSwitchNormalUser}>
          <strong>Anna Nhung</strong>
          <p className="text-xs">User account</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export const UserInfor = ({ loginInfor = {} }: { loginInfor: ILoginInfor }) => {
  const router = useRouter()

  const handleSwitchBizUser = () => {
    const localLoginInfo = { token: "asd", type: UsersTypes.BIZ_USER }
    localStorage.setItem(loginInfoItem, JSON.stringify(localLoginInfo))
    window.location.href = "/biz/home/edit"
  }

  if (!!loginInfor.token && loginInfor.type === UsersTypes.NORMAL_USER) {
    return (
      <>
        <div className="flex gap-2 cursor-pointer" onClick={handleSwitchBizUser}>
          <Icon icon="business" size={20} />
          Business
        </div>
        <Popover content={<ContributeContent />}>
          <Button
            prefix={<Icon icon="plus" size={20} />}
            size="small"
            text="Contribute"
            className={styles.contribute_button}
          />
        </Popover>
        <Icon icon="noti-color" size={20} />
        <Popover content={<Menu loginInfor={loginInfor} />} position="bottom-left">
          <Image src={require("public/images/avatar.png")} alt="" width={40} height={40} />
        </Popover>
      </>
    )
  }
  if (!!loginInfor.token && loginInfor.type === UsersTypes.BIZ_USER) {
    return (
      <>
        <Popover content={<SwitchAccountsContent />} position="bottom-left">
          <div className="flex gap-2">
            <Icon icon="user-color" size={20} />
            Switch accounts
          </div>
        </Popover>
        <Image
          src={require("public/images/page-avatar.png")}
          alt=""
          width={40}
          height={40}
          onClick={() => router.push("/biz/information")}
          className="cursor-pointer"
        />
      </>
    )
  }
  return (
    <>
      <Button
        text="Sign up"
        variant="outlined"
        onClick={() => router.push("/signup")}
        size="small"
      />
      <Button text="Login" onClick={() => router.push("/login")} size="small" />
    </>
  )
}
