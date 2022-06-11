import classNames from "classnames";
import Icon from "components/Icon/Icon";
import styles from "./Heading.module.scss";

interface HeadingProps {
  text?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
  type?: "default" | "tab";
}

const Heading = (props: HeadingProps) => {
  const { text, icon, onClick, className, selected = true, type = "default" } = props;
  const headingCLassName = classNames(styles.heading, className, {
    [styles.un_selected]: selected === false,
    [styles.tab]: type === "tab",
  });
  return (
    <div
      style={{ cursor: onClick ? "pointer" : "default" }}
      className={headingCLassName}
      onClick={onClick}
    >
      {selected && <Icon icon={icon || ""} />}
      {text}
    </div>
  );
};

export default Heading;
