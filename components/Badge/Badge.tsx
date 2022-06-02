import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Badge.module.scss";

export interface BadgeProps {
  selected?: boolean;
  text?: string;
  value?: string;
  children?: ReactNode;
  onClick?: (e?: string) => void;
}

const Badge = (props: BadgeProps) => {
  const { text, selected, value, children, onClick } = props;
  const badgeClassName = classNames(styles.badge, {
    [styles.selected]: selected,
  });
  return (
    <div className={badgeClassName} onClick={() => onClick?.(value)}>
      {text || children}
    </div>
  );
};

export default Badge;
