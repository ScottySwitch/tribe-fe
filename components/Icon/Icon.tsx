import IcomoonReact from "icomoon-react";
import React from "react";
import styles from "./Icon.module.scss";
import iconSet from "./selection.json";

export interface IconProps {
  color?: string;
  size?: number | string;
  icon: string;
  className?: string;
  stroke?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    style,
    color = `${styles.defaultColor}`,
    size = 28,
    icon = "",
    className = "",
  } = props;

  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
      style={style}
    />
  );
};

export default Icon;
