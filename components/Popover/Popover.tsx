import classNames from "classnames";
import { ReactElement } from "react";
import styles from "./Popover.module.scss";

interface PopoverProps {
  children: ReactElement;
  visible: boolean;
  content?: ReactElement;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const Popover = (props: PopoverProps) => {
  const { children, content, position = "bottom-right", visible } = props;
  const contentClassName = classNames(styles.content, styles[position]);
  return (
    <div className={styles.popover}>
      {children}
      {visible && <div className={contentClassName}>{content}</div>}
    </div>
  );
};

export default Popover;
