import Button from "components/Button/Button";
import Modal, { ModalFooter, ModalProps } from "components/Modal/Modal";
import styles from "./Filter.module.scss";

export interface FilterProps extends ModalProps {}

const tabList = [
  { label: "Sort" },
  { label: "Rating" },
  { label: "Price range" },
  { label: "Other" },
  { label: "Location" },
];

const Filter = (props: FilterProps) => {
  const { visible, onClose } = props;
  return (
    <Modal visible={visible} onClose={onClose} closable title="Filter & Sort">
      <div className={styles.filter}>
        <div className={styles.body}>
          <div className={styles.tab_container}>
            {tabList.map((tab) => (
              <div key={tab.label} className={styles.tab}>
                <div className={styles.left_border} />
                <div className={styles.tab_content}>{tab.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.panel}></div>
        </div>
        <ModalFooter>
          <Button text="Reset all" variant="no-outlined" />
          <Button text="Apply" />
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default Filter;
