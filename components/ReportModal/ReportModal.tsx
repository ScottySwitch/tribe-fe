import Modal, { ModalProps } from "components/Modal/Modal"
import Radio, { RadioProps } from "components/Radio/Radio"
import Break from "components/Break/Break"
import styles from "./ReportModal.module.scss"
import Button from "components/Button/Button"
import { useState } from "react"
import Input from "components/Input/Input"

interface ReportModalProps extends ModalProps{
  options: RadioProps[]
  onSubmit?: () => void
}

const ReportModal = (props: ReportModalProps) => {
  const {
    visible,
    title,
    options,
    onClose,
    onSubmit
  } = props

  const [currentOption, setCurrentOption] = useState<string>()

  return (
    <Modal
      visible={visible}
      width="100%"
      maxWidth={578}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.close} onClick={onClose}>&#x2715;</div>
      </div>
      <Break/>
      <div className={styles.options}>
        {options?.map((option, index) => (
          <div
            key={index}
            className={styles.option}
            onClick={() => setCurrentOption(option?.id)}
          >
            <Radio
              id={option.id}
              label={option.label}
              name="report"
              className="text-sm"
              />
          </div>
        ))}
        {currentOption === "other" && (
          <Input size="large" placeholder="Your reason"/>
        )}
      </div>
      <div className={styles.footer}>
        <Button variant="underlined" text="Cancel" width="max-content" className={styles.btn_cancel} onClick={onClose}/>
        <Button text="Submit" width={182} onClick={onSubmit} className={styles.btn_submit}/>
      </div>
    </Modal>
  )
}

export default ReportModal