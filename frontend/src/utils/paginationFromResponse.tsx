import { PaginatedResponse, Pagination } from '@/types'

const paginationFromResponse = (res: PaginatedResponse): Pagination => {
  const {
    current_page: currentPage,
    from,
    last_page: lastPage,
    per_page: perPage,
    to,
    total,
  } = res.data.meta

  return {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
  }
}

export default paginationFromResponse
