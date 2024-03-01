import { categoriesPagination } from '@/constants/categories/pagination'
import { Pagination, SortOrder } from '@/types'
import {
  Category,
  CategoryAddData,
  CategoryEditData,
  SimpleCategory,
} from '@/types/category'
import { api } from '@/utils/api'
import debounce from '@/utils/debounce'
import paginationFromResponse from '@/utils/paginationFromResponse'
import { Row } from '@tanstack/react-table'
import { ChangeEvent } from 'react'
import { create } from 'zustand'

type CategoriesStore = {
  pagination: Pagination
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void

  sort: string | null
  setSort: (field: string) => void

  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void

  categories: Category[]
  simpleCategories: SimpleCategory[]

  search: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void

  isLoading: boolean

  onDelete: (row: Row<Category>) => void
  onEdit: (categoryId: number, data: CategoryEditData) => void
  onAdd: (data: CategoryAddData) => void

  fetchCategories: () => void
}

const fetchCategories = () => {
  useCategories.setState({
    isLoading: true,
  })

  api
    .get('categories' + window.location.search)
    .then((res) => {
      useCategories.setState({
        categories: res.data.data,
        pagination: paginationFromResponse(res),
      })

      window.scroll({ top: 0 })
    })
    .catch(console.log)
    .finally(() => {
      useCategories.setState({
        isLoading: false,
      })
    })

  api
    .get('categories/list')
    .then((res) => {
      useCategories.setState({
        simpleCategories: res.data,
      })
    })
    .catch(console.log)
}

const fetchCategoriesWithDebounce = debounce(fetchCategories, 200)

export const useCategories = create<CategoriesStore>((set) => ({
  pagination: categoriesPagination,
  setPage: (page: number) => {
    set((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: page,
      },
    }))
  },
  setPerPage: (perPage: number) => {
    set((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        perPage,
      },
    }))
  },

  sort: null,
  setSort: (field: string) => {
    set({ sort: field })
  },

  sortOrder: 'asc',
  setSortOrder: (order: SortOrder) => {
    set({ sortOrder: order })
  },

  categories: [],
  simpleCategories: [],

  search: '',
  onSearch: (e: ChangeEvent<HTMLInputElement>) => {
    set({ search: e.target.value })
  },

  isLoading: false,

  onDelete: (row: Row<Category>) => {
    set({ isLoading: true })

    api
      .delete(`categories/${row.getValue('id')}`)
      .then(fetchCategoriesWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },
  onEdit: (categoryId: number, data: CategoryEditData) => {
    const formData = new FormData()

    formData.append('image', data.image!)

    const updateImage = api.post(`categories/${categoryId}/image`, formData, {
      headers: { Accept: 'multipart/form-data' },
    })

    const updateBody = api.patch(`categories/${categoryId}`, data)

    set({ isLoading: true })

    Promise.all([updateImage, updateBody])
      .then(fetchCategoriesWithDebounce)
      .catch(console.log)
  },
  onAdd: (data: CategoryAddData) => {
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
      .then(fetchCategoriesWithDebounce)
      .catch(console.log)
  },
  fetchCategories: fetchCategoriesWithDebounce,
}))
