import { manufacturersPagination } from '@/constants/manufacturers/pagination'
import { Pagination, SortOrder } from '@/types'
import {
  Manufacturer,
  ManufacturerAddData,
  ManufacturerEditData,
} from '@/types/manufacturer'
import { api } from '@/utils/api'
import debounce from '@/utils/debounce'
import paginationFromResponse from '@/utils/paginationFromResponse'
import { Row } from '@tanstack/react-table'
import { ChangeEvent } from 'react'
import { create } from 'zustand'

type ManufacturersStore = {
  pagination: Pagination
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void

  sort: string | null
  setSort: (field: string) => void

  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void

  manufacturers: Manufacturer[]

  search: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void

  isLoading: boolean

  onDelete: (row: Row<Manufacturer>) => void
  onEdit: (manufacturerId: number, data: ManufacturerEditData) => void
  onAdd: (data: ManufacturerAddData) => void

  fetchManufacturers: () => void
}

const fetchManufacturers = () => {
  useManufacturers.setState({
    isLoading: true,
  })

  api
    .get('manufacturers' + window.location.search)
    .then((res) => {
      useManufacturers.setState({
        manufacturers: res.data.data,
        pagination: paginationFromResponse(res),
      })

      window.scroll({ top: 0 })
    })
    .catch(console.log)
    .finally(() => {
      useManufacturers.setState({
        isLoading: false,
      })
    })
}

const fetchManufacturersWithDebounce = debounce(fetchManufacturers, 200)

export const useManufacturers = create<ManufacturersStore>((set) => ({
  pagination: manufacturersPagination,
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

  manufacturers: [],

  search: '',
  onSearch: (e: ChangeEvent<HTMLInputElement>) => {
    set({ search: e.target.value })
  },

  isLoading: false,

  onDelete: (row: Row<Manufacturer>) => {
    set({ isLoading: true })

    api
      .delete(`manufacturers/${row.getValue('id')}`)
      .then(fetchManufacturersWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },
  onEdit: (manufacturerId: number, data: ManufacturerEditData) => {
    set({ isLoading: true })

    const formData = new FormData()

    formData.append('image', data.image!)

    const updateImage = api.post(
      `manufacturers/${manufacturerId}/image`,
      formData,
      {
        headers: { Accept: 'multipart/form-data' },
      }
    )

    const updateBody = api.patch(`manufacturers/${manufacturerId}`, data)

    Promise.all([updateImage, updateBody])
      .then(fetchManufacturersWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },
  onAdd: (data: ManufacturerAddData) => {
    set({ isLoading: true })

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('image', data.image!)

    api
      .post('manufacturers', formData, {
        headers: {
          Accept: 'multipart/form-data',
        },
      })
      .then(fetchManufacturersWithDebounce)
      .catch(console.log)
      .finally(() => set({ isLoading: false }))
  },

  fetchManufacturers: fetchManufacturersWithDebounce,
}))
