import Button from "components/Button/Button"
import Input from "components/Input/Input"
import styles from "./TabContent.module.scss"

const ChangePassword = () => {
  return (
    <div className={styles.tab_content_container}>
      <h2 className={styles.title}>Change password</h2>
      <form>
        <div className={styles.form_group}>
          <Input placeholder="Old password" type="password" size="large"/>
        </div>
        <div className={styles.form_group}>
          <Input placeholder="New password" type="password" size="large"/>
        </div>
        <div className={styles.form_group}>
          <Input placeholder="Confirm new password" type="password" size="large"/>
        </div>
        <Button text="Save" size="large" className="w-full lg:max-w-max ml-auto text-sm"/>
      </form>
    </div>
  )
}

export default ChangePassword