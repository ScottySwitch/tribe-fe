import { ReactElement, useEffect } from "react";
import styles from "./Modal.module.scss";

export interface ModalProps {
  children?: ReactElement | ReactElement[];
  visible?: boolean;
  transparent?: boolean;
  title?: string;
  closable?: boolean;
  width?: string | number;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const {
    children,
    visible,
    title,
    transparent,
    width = "fit-content",
    closable,
    onClose,
  } = props;

  return !visible ? null : (
    <div className={styles.modal}>
      <div
        style={{ background: transparent ? "" : "white", width }}
        className={styles.container}
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
  className?: string;
}) => {
  const { children, className } = props;
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

export default Modal;
