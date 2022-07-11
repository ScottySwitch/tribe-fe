import { dummyTopSearchKeywords } from "constant";
import React, { useState } from "react";
import styles from "./TopSearches.module.scss";

interface ITopSearchesProp {
  className?: string;
}

const TopSearches = (props: ITopSearchesProp) => {
  const { className } = props;
  const [keywords, setKeyWords] = useState(dummyTopSearchKeywords);
  return (
    <React.Fragment>
      {keywords && (
        <div className={`${styles.top_search} ${className}`}>
          <div className={styles.top_search_label}>Top searches</div>
          <ul className={styles.top_search_list}>
            {keywords?.map((keyword, index) => (
              <li className={styles.top_search_item} key={index}>
                <span className={styles.top_search_keyword}>{keyword}</span>
                <span className={styles.divider}>|</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopSearches;
