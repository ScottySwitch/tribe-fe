import Break from "components/Break/Break"
import Input from "components/Input/Input"
import SectionLayout from "components/SectionLayout/SectionLayout"
import styles from "./TabContent.module.scss"

interface VerificationProps {
  submitFormData?: (form: { [key: string]: any }[]) => void
  formData?: { [key: string]: any }
}

const Verification = (props: VerificationProps) => {
  const { formData, submitFormData } = props
  const isPaidUser = true
  return (
    <SectionLayout
      title="Verification"
      subTitle="You need to verify your info in order to publish your business."
      className={styles.verification}
      containerClassName="w-full"
    >
      <Break />
      <Input label="Verify Personal phone number" value="*********992" size="large" width={300} />
      <div className={styles.change_link}>Change phone number</div>
      <br />
      <Input label="Verify Personal phone number" value="*********992" size="large" width={300} />
      <div className={styles.change_link}>Resend ID Card</div>
    </SectionLayout>
  )
}

export default Verification
