import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import styles from "./TabContent.module.scss"

interface BusinessInformationProps {
  submitFormValue?: (form: { [key: string]: any }) => void
  formValue?: { [key: string]: any }
}

const BusinessInformation = (props: BusinessInformationProps) => {
  const { formValue = {}, submitFormValue } = props
  return (
    <SectionLayout title="Business information">
      <Break />
      <Question question="Address" childrenClassName="flex gap-3">
        <Icon icon="map" />
        {formValue.address}
      </Question>
      <Question question="Official contact" childrenClassName="flex gap-3">
        <Icon icon="map" />
        {formValue.phone}
      </Question>
      <Question question="Social media" childrenClassName="flex flex-col gap-3">
        <Input
          prefix={<Icon icon="twitter-logo" />}
          size="small"
          placeholder="https://www.twitter.com/YourTwitter"
        />
        <Input
          prefix={<Icon icon="facebook-color" />}
          placeholder="https://www.facebook.com/YourFacebook"
          size="small"
        />
        <Input
          prefix={<Icon icon="instagram-outlined" />}
          placeholder="https://www.instagram.com/YourInstagram"
          size="small"
        />
      </Question>
      <Break />
      <Button text="Edit information" width={300} />
    </SectionLayout>
  )
}

export default BusinessInformation
