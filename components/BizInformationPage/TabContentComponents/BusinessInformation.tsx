import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Question from "components/Question/Question";
import Radio from "components/Radio/Radio";
import SectionLayout from "components/SectionLayout/SectionLayout";
import SelectInput from "components/SelectInput/SelectInput";
import Upload from "components/Upload/Upload";
import { formattedAreaCodes, phoneAreaCodes } from "constant";
import { get } from "lodash";
import { IAddListingForm } from "pages/add-listing";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatSelectInputValue, removeZeroInPhoneNumber } from "utils";

import styles from "./TabContent.module.scss";

export const socialMedias = [
  { label: <Icon icon="twitter-logo" />, value: "twitter" },
  { label: <Icon icon="facebook-color" />, value: "facebook" },
  { label: <Icon icon="instagram-outlined" />, value: "instagram" },
];

interface BusinessInformationProps {
  listing: any;
  loading?: boolean;
  onSubmit: (data: any) => void;
}

const BusinessInformation = (props: BusinessInformationProps) => {
  const { listing: formData, loading, onSubmit } = props;
  const [isEdit, setIsEdit] = useState(false);
  const isPaid = get(formData, "biz_invoices.length") > 0;

  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  useEffect(() => {
    reset({ ...formData, contact: formData.phone_number });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleCancel = () => {
    setIsEdit(false);
  };

  const onSubmitForm = (data) => {
    onSubmit({
      name: data.name,
      description: data.description,
      phone_number: data.contact,
      logo: data.logo,
      email: data.email,
      address: data.address,
      city: data.city,
      country: data.country,
      social_info: data.socialInfo,
    });
    setIsEdit(false);
  };

  const updateShowSocialMedia = ({ type, value }) => {
    return;
  };

  const SocialRadio = ({ type, value }) =>
    !isPaid ? (
      <Radio
        name="social-media"
        onClick={() => updateShowSocialMedia({ type, value })}
      />
    ) : null;

  const UpgradeNow = () =>
    isPaid ? null : (
      <div className="flex justify-between">
        <div>
          Chooose which social media to show on store page. Upgrade to Basic
          Tier to show all.
        </div>
        <div className={styles.upgrade_now}>Upgrade now</div>
      </div>
    );

  return (
    <React.Fragment>
      <SectionLayout
        loading={loading}
        show={!isEdit}
        title="Business information"
        className={styles.information}
        containerClassName="w-full"
      >
        <Break />
        <Upload
          type="avatar"
          className="justify-start"
          disabled
          fileList={getValues("logo")}
        />
        <br />
        <div className={styles.name}>{formData.name}</div>
        <p>{formData.description}</p>
        <Question question="Address" childrenClassName="flex gap-3">
          <Icon icon="map" />
          {formData.address}
        </Question>
        <Question question="Official contact" childrenClassName="flex gap-3">
          <Icon icon="phone-color" />
          {formData.phone_number}
        </Question>
        <Question
          question="Social media"
          childrenClassName="flex flex-col gap-3"
        >
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
        <Button
          text="Edit information"
          width={300}
          onClick={() => setIsEdit(true)}
        />
      </SectionLayout>

      <SectionLayout
        title="Business information"
        className={styles.information}
        containerClassName="w-full"
        show={isEdit}
      >
        <Break />
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <Upload
              type="avatar"
              className="justify-start"
              fileList={getValues("logo")}
              onChange={(imgs) => setValue("logo", imgs)}
            />
          </div>
          <Question question="Name & Desccription">
            <Input label="Business name" register={register("name")} readOnly />
            <br />
            <Input
              label="Description of property"
              register={register("description")}
            />
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
          <Question
            show
            question="Contact"
            childrenClassName="flex flex-col gap-3"
          >
            <SelectInput
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              defaultValue={formatSelectInputValue(
                getValues("contact"),
                phoneAreaCodes
              )}
              onChange={(e) => setValue("contact", removeZeroInPhoneNumber(e))}
            />
            <Input
              register={register("email")}
              size="large"
              placeholder="Email (optional)"
            />
          </Question>
          <Question
            show
            question="Social media"
            childrenClassName="flex flex-col gap-3"
          >
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
            <Button
              text="Cancel"
              variant="secondary"
              width={200}
              onClick={handleCancel}
            />
            <Button text="Apply change" width={300} type="submit" />
          </div>
        </form>
      </SectionLayout>
    </React.Fragment>
  );
};

export default BusinessInformation;
