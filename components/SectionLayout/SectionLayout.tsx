import classNames from "classnames";
import React, { ReactElement } from "react";

import styles from "./SectionLayout.module.scss";

export interface SectionLayoutProps {
  title?: string;
  className?: string;
  children: any;
  subTitle?: string;
  backgroundColor?: boolean;
}
const SectionLayout = (props: SectionLayoutProps) => {
  const { title, className, subTitle, backgroundColor, children } = props;

  const sectionlayoutClassName = classNames(styles.section_layout, className, {
    [styles.colored_background]: backgroundColor,
  });
  return (
    <div className={sectionlayoutClassName}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          {title && <div className={styles.title}>{title}</div>}
          {subTitle && <div className={styles.sub_title}>{subTitle}</div>}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default SectionLayout;
