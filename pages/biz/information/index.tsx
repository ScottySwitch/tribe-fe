import SectionLayout from "components/SectionLayout/SectionLayout";
import styles from "styles/BizInformation.module.scss";

const BizInformation = () => {
  return (
    <SectionLayout backgroundColor>
      <div className={styles.biz_information}>
        <div className={styles.left_col}>asd</div>
        <div className={styles.right_col}>asd</div>
      </div>
    </SectionLayout>
  );
};

export default BizInformation;
