import Break from "components/Break/Break";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { bizInformationDefaultFormData } from "constant";
import React, { useState } from "react";
import styles from "./TabContent.module.scss";

interface VerificationProps {
  isPaid: boolean;
}

const Verification = (props: VerificationProps) => {
  const { isPaid } = props;
  const [formData, setFormData] = useState<any>(bizInformationDefaultFormData);
  const { idVerificationStatus = "processing" } = formData;

  const idCardStatusIcon = () => {
    let icon;
    switch (idVerificationStatus) {
      case "verified":
        icon = "verified-tag";
        break;
      case "processing":
        icon = "processing-tag";
        break;
      case "unverified":
        icon = "unverified-tag";
        break;
      default:
        icon = "";
        break;
    }
    return icon;
  };
  return (
    <SectionLayout
      title="Verification"
      subTitle="You need to verify your info in order to publish your business."
      className={styles.verification}
      containerClassName="w-full"
    >
      <Break />
      <Input
        label="Verify Personal phone number"
        value="*********992"
        size="large"
        width={300}
        suffix={<Icon icon="verified-tag" style={{ width: 70 }} />}
      />
      {isPaid && (
        <React.Fragment>
          <br />
          <Input
            label="Verify Personal phone number"
            value="ID Card"
            size="large"
            width={300}
            suffix={<Icon icon={idCardStatusIcon()} style={{ width: 70 }} />}
          />
        </React.Fragment>
      )}
    </SectionLayout>
  );
};

export default Verification;
