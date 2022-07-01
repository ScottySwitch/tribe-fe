import { useState } from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"

interface PaginationProps {
  onPageChange?: (selected?: { selected: number }) => void
}

const Pagination = (props: PaginationProps) => {
  const { onPageChange } = props

  const limit = 8
  const pageCount = Math.ceil(1000 / limit)

  return (
    <ReactPaginate
      activeClassName={styles.active}
      className={styles.pagination}
      nextLabel={">"}
      previousLabel={"<"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      pageClassName={styles.page}
    />
  )
}

export default Pagination
