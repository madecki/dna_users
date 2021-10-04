import ReactPaginate from "react-paginate";

const DEFAULT_PAGE_RANGE = 2;
const DEFAULT_MARGIN_PAGES = 3;
const DEFAULT_INITIAL_PAGE = 0;

export default function Pagination({
  pageCount,
  initialPage,
  onPageChange,
}: {
  pageCount: number;
  initialPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={DEFAULT_PAGE_RANGE}
      marginPagesDisplayed={DEFAULT_MARGIN_PAGES}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      initialPage={initialPage ? initialPage : DEFAULT_INITIAL_PAGE}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="page-item active"
      previousClassName="page-link"
      nextClassName="page-link"
      disableInitialCallback={true}
    />
  );
}
