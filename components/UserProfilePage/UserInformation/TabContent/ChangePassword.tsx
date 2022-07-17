import Button from "components/Button/Button"
import Input from "components/Input/Input"
import styles from "./TabContent.module.scss"
import { useState, useEffect } from "react"
import AuthApi from "services/auth"
import { useForm } from "react-hook-form";

const ChangePassword = () => {

  const { register, handleSubmit, setValue, getValues } = useForm({});
  const error = {
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  }
  const [isError, setIsError] = useState<any>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit = async (data) => {
    console.log('data',data)
    if (data.newPassword.length < 6) {
      setIsError('error with newPassword') 
      setIsSuccess(false)
      return
    }
    if (data.newPassword !== data.cofirmPassword) {
      setIsError('error with cofirmPassword') 
      setIsSuccess(false)
      return
    }
    const sendData = await AuthApi.resetPasswordByOldPassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    })
    if (sendData.data.error) {
      setIsError('error with oldPassword') 
      setIsSuccess(false)
      return
    }
    setIsSuccess(true)
    setIsError('')
  };

  return (
    <div className={styles.tab_content_container}>
      <h2 className={styles.title}>Change password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <Input 
            success={isSuccess ? 'Change password success' : ''}
            placeholder="Old password" type="password" size="large"
            register={register("oldPassword")}
            error={isError === 'error with oldPassword' ? 'Password is not true':''}
          />
        </div>
        <div className={styles.form_group}>
          <Input 
            placeholder="New password" type="password" size="large"
            register={register("newPassword")}
            error={isError === 'error with newPassword' ? 'New password must contain at least 6 characters':''}
          />
        </div>
        <div className={styles.form_group}>
          <Input 
            placeholder="Confirm new password" type="password" size="large"
            register={register("cofirmPassword")}
            error={isError === 'error with cofirmPassword' ? 'confirm password not true':''}
          />
        </div>
        <Button type="submit" text="Save" size="large" className="w-full lg:max-w-max ml-auto text-sm"/>
      </form>
    </div>
  )
}

export default ChangePassword