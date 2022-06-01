import classNames from "classnames";
import { ReactElement, useState } from "react";
import styles from "./Popover.module.scss";

interface PopoverProps {
  children: ReactElement;
  content?: ReactElement;
  position?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
}

const Popover = (props: PopoverProps) => {
  const { children, content, position = "bottom-right" } = props;
  const [isPoppedUp, setIsPoppedUp] = useState(false);

  const contentClassName = classNames(styles.content, styles[position], {
    [styles.show]: isPoppedUp,
  });
  return (
    <div
      className={styles.popover}
      tabIndex={1}
      onBlur={() => setIsPoppedUp(false)}
    >
      <div
        onClick={() => setIsPoppedUp(!isPoppedUp)}
        style={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        {children}
      </div>
      <div className={contentClassName}>{content}</div>
    </div>
  );
};

export default Popover;
