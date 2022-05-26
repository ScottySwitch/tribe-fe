import classNames from "classnames";
import { MouseEventHandler, ReactElement, useEffect } from "react";
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

  const modalClassName = classNames(styles.modal, {
    [styles.show]: visible,
  });

  const handleOnBlurModal: MouseEventHandler<HTMLDivElement> = (e) => {
    e.target === e.currentTarget && onClose?.();
  };

  return (
    <div className={modalClassName} onClick={handleOnBlurModal}>
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
