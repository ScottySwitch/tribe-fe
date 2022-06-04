import styles from "./Question.module.scss";

const Question = (props) => {
  const { show = true, optional, question, instruction, children } = props;
  if (!show) {
    return null;
  }
  return (
    <div>
      <div className={styles.header}>
        <div>
          <span className={styles.question}>{question}</span>
          {optional && (
            <span className={styles.optional}>&nbsp;(optional)</span>
          )}
        </div>
        <div className={styles.instruction}>{instruction}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Question;
