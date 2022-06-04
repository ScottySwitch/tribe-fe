import styles from "./Question.module.scss";

const Question = (props) => {
  const { show = true, question, children } = props;
  if (!show) {
    return null;
  }
  return (
    <div>
      <div className={styles.question}>{question}</div>
      <div>{children}</div>
    </div>
  );
};

export default Question;
