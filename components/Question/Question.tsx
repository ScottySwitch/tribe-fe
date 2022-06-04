import styles from "./Question.module.scss";

const Question = (props) => {
  const { show = true, optional, question, children } = props;
  if (!show) {
    return null;
  }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.question}>{question}</div>
        {optional && <div className={styles.optional}>(optional)</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Question;
