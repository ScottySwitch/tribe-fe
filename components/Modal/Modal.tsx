import classNames from "classnames";
import { MouseEventHandler, ReactElement, useEffect } from "react";
import styles from "./Modal.module.scss";

export interface ModalProps {
  children?: ReactElement | ReactElement[];
  visible?: boolean;
  transparent?: boolean;
  title?: string;
  subTitle?: string;
  closable?: boolean;
  width?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
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
    maxHeight,
    maxWidth,
    closable = true,
    mobilePosition = "bottom",
    mobileFullHeight,
    backdrop = true,

    subTitle,
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
      <div style={{ width, maxHeight, maxWidth }} className={styles.container}>
        {title && (
          <div className={styles.header}>
            <div>
              <div className={styles.title}>{title}</div>
              {subTitle && <div className={styles.sub_title}>{subTitle}</div>}
            </div>
            {closable && (
              <div className={styles.close} onClick={onClose}>
                &#x2715;
              </div>
            )}
          </div>
        )}
        <div className={styles.content}>{children}</div>
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

export const ModalFooter = (props: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => {
  const { children, className } = props;
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

export default Modal;
