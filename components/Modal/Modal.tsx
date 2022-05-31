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
  mobilePosition?: "center" | "bottom" | "top" | "left" | "right";
  backdrop?: boolean;
  mobileFullHeight?: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const {
    children,
    visible,
    title,
    transparent,
    width,
    closable = true,
    mobilePosition = "bottom",
    mobileFullHeight,
    backdrop = true,
    onClose,
  } = props;

  const modalClassName = classNames(styles.modal, styles[mobilePosition], {
    [styles.show]: visible,
    [styles.no_backdrop]: backdrop === false,
    [styles.transparent]: transparent,
    [styles.full_height]: mobileFullHeight,
  });

  const handleOnBlurModal: MouseEventHandler<HTMLDivElement> = (e) => {
    e.target === e.currentTarget && onClose?.();
  };

  return (
    <div className={modalClassName} onClick={handleOnBlurModal}>
      <div style={{ width }} className={styles.container}>
        {title && (
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            {closable && (
              <div className={styles.close} onClick={onClose}>
                &#x2715;
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = (props: {
  children: ReactElement | ReactElement[] | string;
  className?: string;
  alignTitle?: "center" | "left";
}) => {
  const { children, alignTitle = "left", className } = props;
  const headerClassName = classNames(styles.header, className, {
    [styles.center]: alignTitle === "center",
  });
  return <div className={headerClassName}>{children}</div>;
};

export const ModalBody = (props: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => {
  const { children, className } = props;
  return <div className={`${styles.body} ${className}`}>{children}</div>;
};

export const ModalFooter = (props: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => {
  const { children, className } = props;
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

export default Modal;
