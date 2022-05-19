import classNames from "classnames";
import React, { ReactElement } from "react";

import styles from "./SectionLayout.module.scss";

export interface SectionLayoutProps {
  title?: string;
  className?: string;
  children: ReactElement | ReactElement[];
  backgroundColor?: string;
}
const SectionLayout = (props: SectionLayoutProps) => {
  const { title, className, backgroundColor, children } = props;

  const sectionlayoutClassName = classNames(styles.section_layout, className);
  return (
    <div className={sectionlayoutClassName}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default SectionLayout;
