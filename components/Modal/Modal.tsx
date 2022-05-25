import { ReactElement, useEffect } from "react";
import styles from "./Modal.module.scss";

export interface ModalProps {
  children?: ReactElement | ReactElement[];
  visible?: boolean;
  transparent?: boolean;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const { children, visible, title, transparent, closable, onClose } = props;

  return !visible ? null : (
    <div className={styles.modal}>
      <div
        style={{ background: transparent ? "" : "white" }}
        className={styles.container}
        tabIndex={1}
        onBlur={onClose}
      >
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          {closable && (
            <div className={styles.close} onClick={onClose}>
              &#x2715;
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export const ModalFooter = (props: {
  children: ReactElement | ReactElement[];
}) => {
  const { children } = props;
  return <div className={styles.footer}>{children}</div>;
};

export default Modal;
