import classNames from "classnames";
import styles from "./Heading.module.scss";

const Heading = (props) => {
  const { text, onClick, className, selected = true } = props;
  const headingCLassName = classNames(styles.heading, className, {
    [styles.un_selected]: selected === false,
  });
  return (
    <div
      style={{ cursor: onClick ? "pointer" : "default" }}
      className={headingCLassName}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Heading;
