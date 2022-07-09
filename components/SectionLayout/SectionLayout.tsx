import classNames from "classnames";
import Loader from "components/Loader/Loader";
import React, { ReactElement } from "react";

import styles from "./SectionLayout.module.scss";

export interface SectionLayoutProps {
  title?: string;
  loading?: boolean;
  className?: string;
  childrenClassName?: string;
  children?: any;
  subTitle?: string;
  show?: boolean;
  backgroundColor?: boolean;
  containerClassName?: string;
  titleContainerClassName?: string;
  transparent?: boolean;
}
const SectionLayout = (props: SectionLayoutProps) => {
  const {
    loading,
    title,
    className,
    subTitle,
    show = true,
    childrenClassName,
    backgroundColor,
    children,
    transparent,
    containerClassName,
    titleContainerClassName,
  } = props;

  const sectionlayoutClassName = classNames(className, styles.section_layout, {
    [styles.colored_background]: backgroundColor,
    [styles.transparent]: transparent,
  });

  const titleContainerClassNames = classNames(
    styles.title_container,
    titleContainerClassName
  );

  const childrenClassNames = classNames(styles.children, childrenClassName);
  if (!show) {
    return null;
  }
  return (
    <div className={sectionlayoutClassName}>
      <div className={`${styles.container} ${containerClassName}`}>
        {title && (
          <div className={titleContainerClassNames}>
            <div className={styles.title}>{title}</div>
            {subTitle && <div className={styles.sub_title}>{subTitle}</div>}
          </div>
        )}
        <div className={childrenClassNames}>
          {loading ? <Loader /> : children}
        </div>
      </div>
    </div>
  );
};
export default SectionLayout;
