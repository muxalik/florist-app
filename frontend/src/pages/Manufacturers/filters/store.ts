import { defaultManufacturerFilters } from '@/constants/manufacturers/filters'
import { IdFilter } from '@/types'
import {
  ManufacturerFilterFormats,
  ManufacturerFilterImage,
  ManufacturerFilters,
} from '@/types/manufacturer'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

type ManufacturerFiltersStore = {
  filters: ManufacturerFilters
  setFilters: (filters: Partial<ManufacturerFilters>) => void
  clearFilters: () => void

  clearImageFilters: () => void
  clearIdFilters: () => void
  clearNameFilters: () => void
  clearProductCountFilters: () => void
  clearUpdatedFilters: () => void
  clearCreatedFilters: () => void

  onIdSelect: (value: string) => void
  onImageSelect: (value: string) => void
  onFormatsSelect: (value: string) => void
  onNameChange: (key: string, value: number) => void
  onProductCountChange: (key: string, value: number) => void
  onUpdatedChange: (range: DateRange | undefined) => void
  onCreatedChange: (range: DateRange | undefined) => void
}

const filtersFromUrl = (): ManufacturerFilters => {
  const searchParams = new URLSearchParams(window.location.search)

  const id = searchParams.get('id') || defaultManufacturerFilters.id

  const has_image =
    searchParams.get('has_image') || defaultManufacturerFilters.has_image

  let formats =
    searchParams.getAll('formats') || defaultManufacturerFilters.formats
  formats = formats.length > 0 ? formats : defaultManufacturerFilters.formats

  const min_name = +(
    searchParams.get('min_name') || defaultManufacturerFilters.min_name
  )

  const max_name = +(
    searchParams.get('max_name') || defaultManufacturerFilters.max_name
  )

  const min_products = +(
    searchParams.get('min_products') || defaultManufacturerFilters.min_products
  )

  const max_products = +(
    searchParams.get('max_products') || defaultManufacturerFilters.max_products
  )

  const updated_from =
    searchParams.get('updated_from') || defaultManufacturerFilters.updated_from

  const updated_to =
    searchParams.get('updated_to') || defaultManufacturerFilters.updated_to

  const created_from =
    searchParams.get('created_from') || defaultManufacturerFilters.created_from

  const created_to =
    searchParams.get('created_to') || defaultManufacturerFilters.created_to

  return {
    id,
    has_image,
    formats,
    min_name,
    max_name,
    min_products,
    max_products,
    updated_from,
    updated_to,
    created_from,
    created_to,
  } as ManufacturerFilters
}

export const useManufacturerFilters = create<ManufacturerFiltersStore>(
  (set) => ({
    filters: (() => {
      return filtersFromUrl()
    })(),

    setFilters: (filters: Partial<ManufacturerFilters>) => {
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      }))
    },

    clearFilters: () => set({ filters: defaultManufacturerFilters }),

    clearIdFilters: () => {
      set((state) => ({
        filters: {
          ...state.filters,
          id: defaultManufacturerFilters.id,
        },
      }))
    },

    clearImageFilters: () => {
      set((state) => ({
        filters: {
          ...state.filters,
          has_image: defaultManufacturerFilters.has_image,
          formats: defaultManufacturerFilters.formats,
        },
      }))
    },

    clearNameFilters: () => {
      set((state) => ({
        filters: {
          ...state.filters,
          min_name: defaultManufacturerFilters.min_name,
          max_name: defaultManufacturerFilters.max_name,
        },
      }))
    },

    clearProductCountFilters: () => {
      set((state) => ({
        filters: {
          ...state.filters,
          min_products: defaultManufacturerFilters.min_products,
          max_products: defaultManufacturerFilters.max_products,
        },
      }))
    },

    clearUpdatedFilters: () => {
      set((state) => ({
        filters: {
          ...state.filters,
          updated_from: defaultManufacturerFilters.updated_from,
          updated_to: defaultManufacturerFilters.updated_to,
        },
      }))
    },

    clearCreatedFilters: () => {
      set((state) => ({
        filters: {
          ...state.filters,
          created_from: defaultManufacturerFilters.created_from,
          created_to: defaultManufacturerFilters.created_to,
        },
      }))
    },

    onIdSelect: (value: string) => {
      set((state) => ({
        filters: {
          ...state.filters,
          id: value as IdFilter,
        },
      }))
    },

    onImageSelect: (value: string) => {
      set((state) => ({
        filters: {
          ...state.filters,
          has_image: value as ManufacturerFilterImage,
        },
      }))
    },

    onFormatsSelect: (value: string) => {
      const castedValue = value as ManufacturerFilterFormats

      set((state) => ({
        filters: {
          ...state.filters,
          formats: state.filters.formats.includes(castedValue)
            ? state.filters.formats.filter((filter) => filter !== value)
            : [...state.filters.formats, castedValue],
        },
      }))
    },

    onNameChange: (key: string, value: number) => {
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      }))
    },

    onProductCountChange: (key: string, value: number) => {
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      }))
    },

    onUpdatedChange: (range: DateRange | undefined) => {
      set((state) => ({
        filters: {
          ...state.filters,
          updated_from: range?.from ? format(range?.from, 'MM-dd-yyyy') : '',
          updated_to: range?.to ? format(range?.to, 'MM-dd-yyyy') : '',
        },
      }))
    },

    onCreatedChange: (range: DateRange | undefined) => {
      set((state) => ({
        filters: {
          ...state.filters,
          created_from: range?.from ? format(range?.from, 'MM-dd-yyyy') : '',
          created_to: range?.to ? format(range?.to, 'MM-dd-yyyy') : '',
        },
      }))
    },
  })
)
