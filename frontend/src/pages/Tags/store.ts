import { tagsPagination } from '@/constants/tags/pagination'
import { Color, Pagination, SortOrder } from '@/types'
import { Tag, TagAddData, TagEditData } from '@/types/tag'
import { api } from '@/utils/api'
import debounce from '@/utils/debounce'
import paginationFromResponse from '@/utils/paginationFromResponse'
import { Row } from '@tanstack/react-table'
import { ChangeEvent } from 'react'
import { create } from 'zustand'

type TagsStore = {
  pagination: Pagination
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void

  sort: string | null
  setSort: (field: string) => void

  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void

  tags: Tag[]
  colors: Color[]

  search: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
  resetSearch: () => void

  isLoading: boolean

  onDelete: (row: Row<Tag>) => void
  onEdit: (tagId: number, data: TagEditData) => void
  onAdd: (data: TagAddData) => void

  fetchTags: () => void
  fetchColors: () => void
}

const fetchTags = () => {
  useTags.setState({
    isLoading: true,
  })

  api
    .get('tags' + window.location.search)
    .then((res) => {
      useTags.setState({
        tags: res.data.data,
        pagination: paginationFromResponse(res),
      })

      window.scroll({ top: 0 })
    })
    .catch(console.log)
    .finally(() => {
      useTags.setState({
        isLoading: false,
      })
    })
}

const fetchColors = () => {
  api
    .get('colors')
    .then((res) => {
      useTags.setState({
        colors: res.data,
      })
    })
    .catch(console.log)
}

const fetchTagsWithDebounce = debounce(fetchTags, 200)

export const useTags = create<TagsStore>((set) => ({
  pagination: tagsPagination,
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

  tags: [],
  colors: [],

  search: '',
  onSearch: (e: ChangeEvent<HTMLInputElement>) => {
    set({ search: e.target.value })
  },
  resetSearch: () => set({ search: '' }),

  isLoading: false,

  onDelete: (row: Row<Tag>) => {
    set({ isLoading: true })

    api
      .delete(`tags/${row.getValue('id')}`)
      .then(fetchTagsWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },
  onEdit: (tagId: number, data: TagEditData) => {
    set({ isLoading: true })

    api
      .patch(`tags/${tagId}`, data)
      .then(fetchTagsWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },
  onAdd: (data: TagAddData) => {
    set({ isLoading: true })

    api
      .post('tags', data)
      .then(fetchTagsWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },

  fetchTags: fetchTagsWithDebounce,
  fetchColors,
}))
