import useDebounce from '@/hooks/useDebounce'
import {
  Category,
  CategoryAddData,
  CategoryEditData,
  CategoryFilters,
  SimpleCategory,
} from '@/types'
import { api } from '@/utils/api'
import paginationFromResponse from '@/utils/paginationFromResponse'
import { Row } from '@tanstack/react-table'
import { ChangeEvent, useEffect, useState } from 'react'
import usePagination from './usePagination'
import useSort from './useSort'
import { defaultCategoryFilters } from '@/constants/categories/filters'

const useCategories = () => {
  const { pagination, setPagination, setPage, setPerPage } = usePagination()

  const [categories, setCategories] = useState<Category[]>([])

  const [categoryList, setCategoryList] = useState<SimpleCategory[]>([])

  const [filters, setFilters] = useState<CategoryFilters>(
    defaultCategoryFilters
  )

  const [search, setSearch] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const { sort, setSort, sortOrder, setSortOrder } = useSort()

  const fetchCategories = useDebounce(() => {
    setIsLoading(true)

    api
      .get('categories?' + window.location.search)
      .then((res) => {
        setCategories(res.data.data)

        setPagination(paginationFromResponse(res))

        window.scroll({ top: 0 })
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))

    api
      .get('categories/list')
      .then((res) => {
        setCategoryList(res.data)
      })
      .catch(console.log)
  }, 200)

  useEffect(fetchCategories, [
    filters,
    sort,
    sortOrder,
    pagination.currentPage,
    pagination.perPage,
  ])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onRowDelete = (row: Row<Category>) => {
    setIsLoading(true)

    api
      .delete(`categories/${row.getValue('id')}`)
      .then(fetchCategories)
      .catch(console.log)
  }

  const onRowEdit = async (categoryId: number, data: CategoryEditData) => {
    const formData = new FormData()

    formData.append('image', data.image!)

    const updateImage = api.post(`categories/${categoryId}/image`, formData, {
      headers: { Accept: 'multipart/form-data' },
    })

    const updateBody = api.patch(`categories/${categoryId}`, data)

    Promise.all([updateImage, updateBody])
      .then(fetchCategories)
      .catch(console.log)
  }

  const onAdd = (data: CategoryAddData) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('parentId', data.parentId + '')
    formData.append('image', data.image!)

    api
      .post('categories', formData, {
        headers: {
          Accept: 'multipart/form-data',
        },
      })
      .then(fetchCategories)
      .catch(console.log)
  }

  return {
    categories,
    filters,
    setFilters,
    pagination,
    onSearch,
    search,
    setPage,
    setPerPage,
    isLoading,
    sort,
    setSort,
    sortOrder,
    setSortOrder,
    onRowDelete,
    onRowEdit,
    categoryList,
    onAdd,
  }
}

export default useCategories
