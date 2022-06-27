import { educationLevels, formattedAreaCodes, industryList } from "constant"
import DatePicker from "components/DatePicker/DatePicker"
import Input from "components/Input/Input"
import Radio from "components/Radio/Radio"
import Select from "components/Select/Select"
import SelectInput from "components/SelectInput/SelectInput"
import Upload from "components/Upload/Upload"
import Button from "components/Button/Button"
import React, { useState } from "react"
import Modal, { ModalFooter, ModalHeader } from "components/Modal/Modal"
import styles from "./TabContent.module.scss"

const ModalNewPhone = (props) => {
  const {visible, onClose, onNext} = props
  return (
    <Modal visible={visible} width={579}>
      <div className="p-7">
        <div className={styles.modal_title}>
          <span>Enter new phone number</span>
          <span className={styles.modal_close} onClick={onClose}>&#x2715;</span>
        </div>
        <div className={`${styles.form_group} px-4`}>
          <SelectInput
            size="large"
            placeholder="Phone number"
            selectPlaceholder="Area code"
            options={formattedAreaCodes}
            shouldControlShowValue
          />
        </div>
        <ModalFooter>
          <Button className="text-sm" text="Next" onClick={onNext}/>
        </ModalFooter>
      </div>
    </Modal>
  )
}

const ModalOTP = (props) => {
  const {visible, onClose, onSubmit} = props
  return (
    <Modal visible={visible} width={579}>
      <div className="p-7">
        <div className={styles.modal_title}>
          <span>Enter OTP</span>
          <span className={styles.modal_close} onClick={onClose}>&#x2715;</span>
        </div>
        <div className="text-sm max-w-sm mx-auto text-center mb-7">
          <p>An OTP have send to the number <span className="font-bold">+84 0335 478 699</span></p>
          <p>Please enter the OTP to complete the registration.</p>
        </div>
        <div className={`${styles.form_group} px-4`}>
          <Input placeholder="Enter OTP" size="large"/>
        </div>
        <div className="flex items-center justify-between text-xs px-4 mb-2">
          <div>00:39</div>
          <div className={styles.modal_btn_resend}>Resend</div>
        </div>
        <ModalFooter>
          <Button className="text-sm" text="Confirm" onClick={onSubmit}/>
        </ModalFooter>
      </div>
    </Modal>
  )
}

const UserInformation = () => {
  const [showModalNew, setShowModalNew] = useState<boolean>(false)
  const [showModalOTP, setShowModalOTP] = useState<boolean>(false)

  const handleNext = () => {
    setShowModalNew(false)
    setShowModalOTP(true)
  }
  
  const handleSubmit = () => {
    setShowModalOTP(false)
  }

  return (
    <React.Fragment>
      <div className={styles.tab_content_container}>
        <h2 className={styles.title}>User information</h2>
        <form>
          <div className={styles.form_group}>
            <Upload
              className="rounded-full max-w-max mx-auto"
              type="avatar"
              fileList={["https://picsum.photos/109"]}
            />
          </div>
          <div className={styles.form_group}>
            <Input label="Name*" size="small"/>
          </div>
          <div className={styles.form_group}>
            <Input label="Your country*" size="small" />
          </div>
          <div className={styles.form_group}>
            <SelectInput
              size="small"
              label="Phone number"
              placeholder="Phone number"
              selectPlaceholder="Area code"
              options={formattedAreaCodes}
              shouldControlShowValue
            />
            <div className={styles.cta_change} onClick={() => setShowModalNew(true)}>Change phone number</div>
          </div>
          <div className={styles.form_group}>
            <Input label="Email" size="small" type="email"/>
            <div className={styles.cta_change}>Change email</div>
          </div>
          <div className={styles.form_group}>
            <div className={styles.form_label}>Gender</div>
            <div className="flex gap-[30px]">
              <Radio name="gender" label="Male" value="male" className="text-sm"/>
              <Radio name="gender" label="Female" value="female" className="text-sm"/>
              <Radio name="gender" label="Others" value="others" className="text-sm"/>
            </div>
          </div>
          <div className={styles.form_group}>
            <DatePicker size="large" placeholder="Birthday"/>
          </div>
          <div className={styles.form_group}>
            <Select
              size="large"
              placeholder="Education level"
              options={educationLevels}
              />
          </div>
          <div className={styles.form_group}>
            <Select
              size="large"
              placeholder="Industry"
              options={industryList}
            />
          </div>
          <Button text="Save" size="large" className="max-w-max ml-auto text-sm"/>
        </form>
      </div>
      
      <ModalNewPhone
        visible={showModalNew}
        onClose={() => setShowModalNew(false)}
        onNext={handleNext}  
      />
      <ModalOTP
        visible={showModalOTP}
        onSubmit={handleSubmit}
        onClose={() => setShowModalOTP(false)}
      />
    </React.Fragment>
  )
}

export default UserInformation