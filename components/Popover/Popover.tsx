import classNames from "classnames";
import { ReactElement, useState } from "react";
import styles from "./Popover.module.scss";

interface PopoverProps {
  children: ReactElement | ReactElement[];
  content?: ReactElement;
  contentClassName?: string;
  onBeforePopUp?: () => boolean;
  position?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
}

const Popover = (props: PopoverProps) => {
  const {
    children,
    contentClassName,
    content,
    onBeforePopUp = () => true,
    position = "bottom-right",
  } = props;
  const [isPoppedUp, setIsPoppedUp] = useState(false);

  const contentClassNames = classNames(
    styles.content_container,
    styles[position],
    contentClassName,
    {
      [styles.show]: isPoppedUp,
    }
  );
  return (
    <div
      className={styles.popover}
      tabIndex={1}
      onBlur={() => setIsPoppedUp(false)}
    >
      <div
        onClick={() => onBeforePopUp() && setIsPoppedUp(!isPoppedUp)}
        className={styles.children}
      >
        {children}
      </div>
      <div className={contentClassNames} onClick={() => setIsPoppedUp(false)}>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default Popover;
