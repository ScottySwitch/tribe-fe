import classNames from "classnames"
import React from "react"
import styles from "./PanelAbout.module.scss"
export interface UserProps {
  email: string,
  phoneNumber?: string,
  country?: string,
  gender: "male" | "female" | "others",
  educationLevel?: string,
  industry?: string,
  birthday?: string,
}

const AboutInfor = (props: {label: string, text?: string, blankText: string}) => {
  const { label, text, blankText } = props
  return (
    <React.Fragment>
      <h6 className={styles.label}>{label}</h6>
      {
        text
        ? (<span className={styles.value}>{text}</span>)
        : (<span className={styles.empty}>{blankText}</span>)
      }
    </React.Fragment>
  )
}

const PanelAbout = (props: {data: UserProps}) => {
  const {
    email,
    phoneNumber,
    country,
    gender = "others",
    educationLevel,
    industry,
    birthday,
  } = props.data
  const containerClassName = classNames("grid md:grid-cols-3", styles.container)
  const col2ClassName = classNames("md:col-start-2 md:col-span-4", styles.field)

  return (
    <div className={styles.about_panel}>
      <div className={containerClassName}>
        <div className={styles.field}>
          <AboutInfor label="Email" text={email} blankText="Add email"/>
        </div>
        <div className={col2ClassName}>
          <AboutInfor label="Phone number" text={phoneNumber} blankText="Add phone number"/>
        </div>
        <div className={styles.field}>
          <AboutInfor label="Country" text={country} blankText="Add country"/>
        </div>
        <div className={col2ClassName}>
          <AboutInfor label="Gender" text={gender} blankText="Add gender"/>
        </div>
        <div className={styles.field}>
          <AboutInfor label="Education Level" text={educationLevel} blankText="Add Education level"/>
        </div>
        <div className={styles.field}>
          <AboutInfor label="Industry" text={industry} blankText="Add industry"/>
        </div>
        <div className={styles.field}>
          <AboutInfor label="Birthday" text={birthday} blankText="Add birthday"/>
        </div>
      </div>
    </div>
  )
}

export default PanelAbout