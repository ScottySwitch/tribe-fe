import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";

import {
  countryList,
  educationLevels,
  formattedAreaCodes,
  genderOptions,
  industryList,
  phoneAreaCodes,
} from "constant";
import DatePicker from "components/DatePicker/DatePicker";
import Input from "components/Input/Input";
import Radio from "components/Radio/Radio";
import Select from "components/Select/Select";
import SelectInput from "components/SelectInput/SelectInput";
import Upload from "components/Upload/Upload";
import Button from "components/Button/Button";
import Modal, { ModalFooter } from "components/Modal/Modal";
import AuthApi from "services/auth";
import { formatSelectInputValue, removeZeroInPhoneNumber } from "utils";
import Loader from "components/Loader/Loader";
import UserApi from "services/user";
import { UserInforContext } from "Context/UserInforContext";

import styles from "./TabContent.module.scss";

const ModalNewPhone = (props) => {
  const { visible, onClose, onNext } = props;
  return (
    <Modal visible={visible} width={579}>
      <div className="p-7">
        <div className={styles.modal_title}>
          <span>Enter new phone number</span>
          <span className={styles.modal_close} onClick={onClose}>
            &#x2715;
          </span>
        </div>
        <div className={`${styles.form_group} px-4`}>
          <SelectInput
            defaultValue={{
              select: "+65",
              input: "",
            }}
            size="large"
            placeholder="Phone number"
            selectPlaceholder="Area code"
            options={formattedAreaCodes}
            shouldControlShowValue
          />
        </div>
        <ModalFooter>
          <Button className="text-sm" text="Next" onClick={onNext} />
        </ModalFooter>
      </div>
    </Modal>
  );
};

const ModalOTP = (props) => {
  const { visible, onClose, onSubmit } = props;
  return (
    <Modal visible={visible} width={579}>
      <div className="p-7">
        <div className={styles.modal_title}>
          <span>Enter OTP</span>
          <span className={styles.modal_close} onClick={onClose}>
            &#x2715;
          </span>
        </div>
        <div className="text-sm max-w-sm mx-auto text-center mb-7">
          <p>
            An OTP have send to the number{" "}
            <span className="font-bold">+84 0335 478 699</span>
          </p>
          <p>Please enter the OTP to complete the registration.</p>
        </div>
        <div className={`${styles.form_group} px-4`}>
          <Input placeholder="Enter OTP" size="large" />
        </div>
        <div className="flex items-center justify-between text-xs px-4 mb-2">
          <div>00:39</div>
          <div className={styles.modal_btn_resend}>Resend</div>
        </div>
        <ModalFooter>
          <Button className="text-sm" text="Confirm" onClick={onSubmit} />
        </ModalFooter>
      </div>
    </Modal>
  );
};

const UserInformation = () => {
  const [loading, setLoading] = useState(true);
  const [showModalNew, setShowModalNew] = useState<boolean>(false);
  const [showModalOTP, setShowModalOTP] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<{ [key: string]: any }>({});

  const { register, handleSubmit, setValue, getValues, formState, reset } =
    useForm({ mode: "onChange" });

  const { updateUser } = useContext(UserInforContext);

  useEffect(() => {
    const getUserData = async () => {
      const response = await AuthApi.getUserInformation();
      const userData = get(response, "data") || {};
      setUserInfor(userData);
      reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_number: formatSelectInputValue(
          userData.phone_number,
          phoneAreaCodes
        ),
        country: userData.country,
        educate_level: userData.educate_level,
        gender: userData.gender,
        birthday: Date.parse(userData.birthday)
          ? new Date(userData.birthday)
          : undefined,
        industry: userData.industry,
      });
      setLoading(false);
    };

    loading && getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleNext = () => {
    setShowModalNew(false);
    setShowModalOTP(true);
  };

  const handleSubmitOtp = () => {
    setShowModalOTP(false);
  };

  const onSubmit = async (formData) => {
    const submitData = {
      ...formData,
      phone_number:
        typeof formData.phone_number === "string"
          ? formData.phone_number
          : removeZeroInPhoneNumber(formData.phone_number)?.toString(),
    };

    UserApi.updateUser(userInfor.id, submitData)
      .then((res) => {
        const userData = get(res, "data") || {};
        toast.success("Update successfully!", {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
        });
        setLoading(true);
        updateUser({ ...userData });
        window.scrollTo(0, 0);
      })
      .catch((err) =>
        toast.error("Update failed!", {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
        })
      );
  };

  if (loading) {
    return (
      <div className="w-100 py-[30px] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.tab_content_container}>
        <h2 className={styles.title}>User information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_group}>
            <Upload
              type="avatar"
              className="rounded-full max-w-max mx-auto"
              fileList={[
                userInfor.avatar || require("public/images/default-avatar.svg"),
              ]}
              onChange={(imgs) => setValue("avatar", imgs[0])}
            />
          </div>
          <div className={styles.form_group}>
            <Input
              label="First name"
              size="small"
              register={register("first_name")}
            />
            <br />
            <Input
              label="Last name"
              size="small"
              register={register("last_name")}
            />
          </div>
          <div className={styles.form_group}>
            <Select
              required
              label="Country"
              placeholder="Singapore"
              options={countryList}
              value={getValues("country")}
              onChange={(e) => setValue("country", e.value)}
            />
          </div>
          <div className={styles.form_group}>
            <SelectInput
              isClearable
              key={getValues("phone_number")}
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
              onChange={(e) =>
                setValue("phone_number", removeZeroInPhoneNumber(e)?.toString())
              }
              defaultValue={getValues("phone_number")}
            />
            {/* <div
              className={styles.cta_change}
              onClick={() => setShowModalNew(true)}
            >
              Change phone number
            </div> */}
          </div>
          <div className={styles.form_group}>
            <Input
              register={register("email")}
              size="large"
              placeholder="Email"
            />
            {/* <div className={styles.cta_change}>Change email</div> */}
          </div>
          <div className={styles.form_group}>
            <div className={styles.form_label}>Gender</div>
            <div className="flex gap-5 flex-wrap">
              {genderOptions.map((item) => (
                <Radio
                  key={item.value}
                  name="gender"
                  label={item.label}
                  value={item.value}
                  register={register("gender")}
                />
              ))}
            </div>
          </div>
          <div className={styles.form_group}>
            <DatePicker
              key={getValues("birthday")}
              placeholder="Birthday"
              onChange={(e) => setValue("birthday", e)}
              value={getValues("birthday")}
            />
          </div>
          <div className={styles.form_group}>
            <Select
              placeholder="Education level"
              options={educationLevels}
              value={getValues("educate_level")}
              onChange={(e) => setValue("educate_level", e.value)}
            />
          </div>
          <div className={styles.form_group}>
            <Select
              placeholder="Industry"
              options={industryList}
              value={getValues("industry")}
              onChange={(e) => setValue("industry", e.value)}
            />
          </div>
          <Button
            text="Save"
            type="submit"
            className="w-full lg:max-w-max ml-auto text-sm"
          />
        </form>
      </div>

      <ModalNewPhone
        visible={showModalNew}
        onClose={() => setShowModalNew(false)}
        onNext={handleNext}
      />
      <ModalOTP
        visible={showModalOTP}
        onSubmit={handleSubmitOtp}
        onClose={() => setShowModalOTP(false)}
      />
    </React.Fragment>
  );
};

export default UserInformation;
