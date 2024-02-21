import { Pagination } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const initialPagination: Pagination = {
  currentPage: 1,
  from: 0,
  lastPage: 0,
  perPage: 10,
  to: 0,
  total: 0,
}

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [pagination, setPagination] = useState<Pagination>(() => {
    const state = { ...initialPagination }

    const page = searchParams.get('page')
    const perPage = searchParams.get('per_page')

    if (page) state.currentPage = +page
    if (perPage) state.perPage = +perPage

    return state
  })

  useEffect(() => {
    setSearchParams((prev) => {
      const { currentPage, perPage } = pagination

      if (currentPage === initialPagination.currentPage) {
        prev.delete('page')
      } else {
        prev.set('page', currentPage.toString())
      }

      if (perPage === initialPagination.perPage) {
        prev.delete('per_page')
      } else {
        prev.set('per_page', perPage.toString())
      }

      return prev
    })
  }, [pagination.currentPage, pagination.perPage])

  const setPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }))
  }

  const setPerPage = (perPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      perPage,
    }))
  }

  return { pagination, setPagination, setPage, setPerPage }
}

export default usePagination
