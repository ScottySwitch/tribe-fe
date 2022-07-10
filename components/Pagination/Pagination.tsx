import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss";

interface PaginationProps {
  onPageChange?: (selected: { selected: number }) => void;
  total?: number;
  limit?: number;
}

const Pagination = (props: PaginationProps) => {
  const { onPageChange, total = 1000, limit = 30, ...rest } = props;

  const pageCount = Math.ceil(total / limit);

  return (
    <ReactPaginate
      activeClassName={styles.active}
      className={styles.pagination}
      nextLabel={">"}
      previousLabel={"<"}
      pageCount={pageCount}
      onPageChange={(page) => onPageChange?.({...page, selected: page.selected + 1})}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      pageClassName={styles.page}
    />
  );
};

export default Pagination;
