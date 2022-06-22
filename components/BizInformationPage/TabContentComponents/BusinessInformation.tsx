import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Question from "components/Question/Question"
import Radio from "components/Radio/Radio"
import SectionLayout from "components/SectionLayout/SectionLayout"
import SelectInput from "components/SelectInput/SelectInput"
import Upload from "components/Upload/Upload"
import { bizInformationDefaultFormData, formattedAreaCodes } from "constant"
import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import styles from "./TabContent.module.scss"

export const socialMedias = [
  { label: <Icon icon="twitter-logo" />, value: "twitter" },
  { label: <Icon icon="facebook-color" />, value: "facebook" },
  { label: <Icon icon="instagram-outlined" />, value: "instagram" },
]

interface BusinessInformationProps {
  isPaid: boolean
}

const BusinessInformation = (props: BusinessInformationProps) => {
  const { isPaid } = props
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState<any>(bizInformationDefaultFormData)

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      avatar: formData.avatar,
      name: formData.name,
      city: formData.city,
      description: formData.description,
      address: formData.address,
      country: formData.country,
      additionalAddress: formData.additionalAddress,
      phone: formData.phone,
      email: formData.email,
      socialMedia: formData.socialMedia,
      twitter: formData.twitter,
      facebook: formData.facebook,
      instagram: formData.instagram,
    },
  })

  const handleCancel = () => {
    setIsEdit(false)
  }

  const onSubmit = (data) => {
    console.log(data)
    setIsEdit(false)
  }

  const updateShowSocialMedia = ({ type, value }) => {
    return
  }

  const SocialRadio = ({ type, value }) =>
    !isPaid ? (
      <Radio name="social-media" onClick={() => updateShowSocialMedia({ type, value })} />
    ) : null

  const UpgradeNow = () =>
    isPaid ? null : (
      <div className="flex justify-between">
        <div>
          Chooose which social media to show on store page. Upgrade to Basic Tier to show all.
        </div>
        <div className={styles.upgrade_now}>Upgrade now</div>
      </div>
    )

  return (
    <React.Fragment>
      <SectionLayout
        show={!isEdit}
        title="Business information"
        className={styles.information}
        containerClassName="w-full"
      >
        <Break />
        <div>
          <Upload type="avatar" className="justify-start" disabled />
        </div>
        <div className={styles.name}>{formData.name}</div>
        <p>{formData.description}</p>
        <Question question="Address" childrenClassName="flex gap-3">
          <Icon icon="map" />
          {formData.address}
        </Question>
        <Question question="Official contact" childrenClassName="flex gap-3">
          <Icon icon="map" />
          {formData.phone}
        </Question>
        <Question question="Social media" childrenClassName="flex flex-col gap-3">
          <UpgradeNow />
          <Input
            readOnly
            prefix={<Icon icon="twitter-logo" />}
            suffix={<SocialRadio type="" value="" />}
            placeholder="https://www.twitter.com/YourTwitter"
          />
          <Input
            readOnly
            prefix={<Icon icon="facebook-color" />}
            suffix={<SocialRadio type="facebook" value="" />}
            placeholder="https://www.facebook.com/YourFacebook"
          />
          <Input
            readOnly
            prefix={<Icon icon="instagram-outlined" />}
            suffix={<SocialRadio type="instagram" value="" />}
            placeholder="https://www.instagram.com/YourInstagram"
          />
        </Question>
        <Break />
        <Button text="Edit information" width={300} onClick={() => setIsEdit(true)} />
      </SectionLayout>
      <SectionLayout
        title="Business information"
        className={styles.information}
        containerClassName="w-full"
        show={isEdit}
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Upload
              type="avatar"
              className="justify-start"
              fileList={getValues("avatar")}
              onChange={(imgs) => setValue("avatar", imgs[0])}
            />
          </div>
          <Question question="Name & Desccription">
            <Input label="Business name" register={register("name")} />
            <br />
            <Input label="Description of property" register={register("description")} />
          </Question>
          <Question question="Address" childrenClassName="flex flex-col gap-3">
            <Input
              register={register("city")}
              label="City/Town, State/Province/Region"
              placeholder="City/Town, State/Province/Region of business"
            />
            <Input
              register={register("country")}
              label="Country"
              placeholder="Country of business"
            />
            <Input
              register={register("address")}
              label="Street address"
              placeholder="Address of business"
            />
            <Input
              register={register("additionalAddress")}
              placeholder="Additional address information (optional)"
            />
          </Question>
          <Question show question="Contact" childrenClassName="flex flex-col gap-3">
            <SelectInput
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              onChange={(e) => setValue("phone", `${e.select.value}${e.input}`)}
            />
            <Input register={register("email")} size="large" placeholder="Email (optional)" />
          </Question>
          <Question show question="Social media" childrenClassName="flex flex-col gap-3">
            <UpgradeNow />
            <Input
              prefix={<Icon icon="twitter-logo" />}
              placeholder="https://www.twitter.com/YourTwitter"
              register={register("twitter")}
            />
            <Input
              prefix={<Icon icon="facebook-color" />}
              placeholder="https://www.facebook.com/YourFacebook"
              register={register("facebook")}
            />
            <Input
              prefix={<Icon icon="instagram-outlined" />}
              placeholder="https://www.instagram.com/YourInstagram"
              register={register("instagram")}
            />
          </Question>
          <Break />
          <div className="flex gap-3">
            <Button text="Cancel" variant="secondary" width={200} onClick={handleCancel} />
            <Button text="Apply change" width={300} type="submit" />
          </div>
        </form>
      </SectionLayout>
    </React.Fragment>
  )
}

export default BusinessInformation
