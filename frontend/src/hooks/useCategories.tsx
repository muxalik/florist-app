import useDebounce from '@/hooks/useDebounce'
import { Category, CategoryFilters, Pagination, SortOrder } from '@/types'
import { api } from '@/utils/api'
import paginationFromResponse from '@/utils/paginationFromResponse'
import { Row } from '@tanstack/react-table'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const initialPagination: Pagination = {
  currentPage: 1,
  from: 0,
  lastPage: 0,
  perPage: 10,
  to: 0,
  total: 0,
}

const useCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [pagination, setPagination] = useState<Pagination>(() => {
    const state = { ...initialPagination }

    const page = searchParams.get('page')
    const perPage = searchParams.get('per_page')

    if (page) state.currentPage = +page
    if (perPage) state.perPage = +perPage

    return state
  })

  const [categories, setCategories] = useState<Category[]>([])

  const [filters, setFilters] = useState<CategoryFilters>({})

  const [isLoading, setIsLoading] = useState(false)

  const [sort, setSort] = useState<string | null>(null)

  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const fetchCategories = useDebounce(() => {
    api
      .get('categories?' + searchParams.toString())
      .then((res) => {
        setCategories(res.data.data)

        setPagination(paginationFromResponse(res))

        window.scroll({ top: 0 })
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, 200)

  const fetchWithLoader = () => {
    setIsLoading(true)
    fetchCategories()
  }

  useEffect(fetchWithLoader, [filters, sort, sortOrder])

  // // Update filters
  // useEffect(() => {
  //   Object.entries(filters).forEach(([key, value]) => {
  //     setSearchParams((prev) => {
  //       if (value) {
  //         prev.set(key, value.toString())
  //       } else {
  //         prev.delete(key)
  //       }

  //       return prev
  //     })
  //   })
  // }, [filters])

  // Update pagination & fetch new categories
  useEffect(() => {
    const { currentPage, perPage } = pagination

    setSearchParams((prev) => {
      if (currentPage === 1) {
        prev.delete('page')
      } else {
        prev.set('page', currentPage.toString())
      }

      if (perPage === initialPagination.perPage) {
        prev.delete('per_page')
      } else {
        prev.set('per_page', perPage.toString())
      }

      if (sort === null) {
        prev.delete('sort')
      } else {
        prev.set('sort', sort)
      }

      if (sortOrder === 'asc') {
        prev.delete('order')
      } else {
        prev.set('order', sortOrder)
      }

      return prev
    })
  }, [pagination.currentPage, pagination.perPage, sort, sortOrder])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      q: e.target.value,
    }))
  }

  const setPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }))

    fetchWithLoader()
  }

  const setPerPage = (perPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      perPage,
    }))

    fetchWithLoader()
  }

  const onSort = (columnId: string) => {
    setSort(columnId)
  }

  const onRowDelete = (row: Row<Category>) => {
    setIsLoading(true)

    api
      .delete(`categories/${row.getValue('id')}`)
      .then(() => {
        console.log('Succeefully deleted')

        fetchWithLoader()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  const onRowEdit = () => {}

  return {
    categories,
    filters,
    pagination,
    onSearch,
    setPage,
    setPerPage,
    isLoading,
    sort,
    onSort,
    sortOrder,
    setSortOrder,
    onRowDelete,
    onRowEdit,
  }
}

export default useCategories
