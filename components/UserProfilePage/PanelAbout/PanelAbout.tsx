import classNames from "classnames"
import styles from "./PanelAbout.module.scss"

const dummyInfo = {
  email: "annabae@gmail.com",
  phone: "",
  country: "Singapore",
  gender: "Other",
  educationLevel: "",
  industry: "",
  birthday: "",
}

const PanelAbout = () => {
  const containerClassName = classNames("grid grid-cols-3", styles.container)
  const col2ClassName = classNames("col-start-2 col-span-4", styles.field)

  return (
    <div className={styles.about_panel}>
      <div className={containerClassName}>
        <div className={styles.field}>
          <h6 className={styles.label}>Email</h6>
          {
            dummyInfo.email
            ? (<span className={styles.value}>{dummyInfo.email}</span>)
            : (<span className={styles.empty}>Add email</span>)
          }
        </div>
        <div className={col2ClassName}>
          <h6 className={styles.label}>Phone number</h6>
          {
            dummyInfo.phone
            ? (<span className={styles.value}>{dummyInfo.phone}</span>)
            : (<span className={styles.empty}>Add phone number</span>)
          }
        </div>
        <div className={styles.field}>
          <h6 className={styles.label}>Country</h6>
          {
            dummyInfo.country
            ? (<span className={styles.value}>{dummyInfo.country}</span>)
            : (<span className={styles.empty}>Add country</span>)
          }
        </div>
        <div className={col2ClassName}>
          <h6 className={styles.label}>Gender</h6>
          {
            dummyInfo.gender
            ? (<span className={styles.value}>{dummyInfo.gender}</span>)
            : (<span className={styles.empty}>Add gender</span>)
          }
        </div>
        <div className={styles.field}>
          <h6 className={styles.label}>Education Level</h6>
          {
            dummyInfo.educationLevel
            ? (<span className={styles.value}>{dummyInfo.educationLevel}</span>)
            : (<span className={styles.empty}>Add Education level</span>)
          }
        </div>
        <div className={styles.field}>
          <h6 className={styles.label}>Industry</h6>
          {
            dummyInfo.industry
            ? (<span className={styles.value}>{dummyInfo.industry}</span>)
            : (<span className={styles.empty}>Add industry</span>)
          }
        </div>
        <div className={styles.field}>
          <h6 className={styles.label}>Birthday</h6>
          {
            dummyInfo.birthday
            ? (<span className={styles.value}>{dummyInfo.birthday}</span>)
            : (<span className={styles.empty}>Add birthday</span>)
          }
        </div>
      </div>
    </div>
  )
}

export default PanelAbout