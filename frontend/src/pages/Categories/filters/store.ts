import { defaultCategoryFilters } from '@/constants/categories/filters'
import { IdFilter } from '@/types'
import {
  CategoryFilterFormats,
  CategoryFilterImage,
  CategoryFilters,
} from '@/types/category'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

type CategoryFiltersStore = {
  filters: CategoryFilters
  setFilters: (filters: Partial<CategoryFilters>) => void
  clearFilters: () => void
  clearImageFilters: () => void
  clearIdFilters: () => void
  clearNameFilters: () => void
  clearParentFilters: () => void
  clearUpdatedFilters: () => void
  clearCreatedFilters: () => void

  onIdSelect: (value: string) => void
  onImageSelect: (value: string) => void
  onFormatsSelect: (value: string) => void
  onNameChange: (key: string, value: number) => void
  onParentChange: (key: string, value: number) => void
  onUpdatedChange: (range: DateRange | undefined) => void
  onCreatedChange: (range: DateRange | undefined) => void
}

const filtersFromUrl = (): CategoryFilters => {
  const searchParams = new URLSearchParams(window.location.search)

  const id = searchParams.get('id') || defaultCategoryFilters.id

  const has_image =
    searchParams.get('has_image') || defaultCategoryFilters.has_image

  let formats = searchParams.getAll('formats') || defaultCategoryFilters.formats
  formats = formats.length > 0 ? formats : defaultCategoryFilters.formats

  const min_name = +(
    searchParams.get('min_name') || defaultCategoryFilters.min_name
  )

  const max_name = +(
    searchParams.get('max_name') || defaultCategoryFilters.max_name
  )

  const parent_min = +(
    searchParams.get('parent_min') || defaultCategoryFilters.parent_min
  )
  const parent_max = +(
    searchParams.get('parent_max') || defaultCategoryFilters.parent_max
  )

  const updated_from =
    searchParams.get('updated_from') || defaultCategoryFilters.updated_from

  const updated_to =
    searchParams.get('updated_to') || defaultCategoryFilters.updated_to

  const created_from =
    searchParams.get('created_from') || defaultCategoryFilters.created_from

  const created_to =
    searchParams.get('created_to') || defaultCategoryFilters.created_to

  return {
    id,
    has_image,
    formats,
    min_name,
    max_name,
    parent_min,
    parent_max,
    updated_from,
    updated_to,
    created_from,
    created_to,
  } as CategoryFilters
}

export const useCategoryFilters = create<CategoryFiltersStore>((set) => ({
  filters: (() => {
    return filtersFromUrl()
  })(),

  setFilters: (filters: Partial<CategoryFilters>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }))
  },

  clearFilters: () => set({ filters: defaultCategoryFilters }),

  clearIdFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        id: defaultCategoryFilters.id,
      },
    }))
  },

  clearImageFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        has_image: defaultCategoryFilters.has_image,
        formats: defaultCategoryFilters.formats,
      },
    }))
  },

  clearNameFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        min_name: defaultCategoryFilters.min_name,
        max_name: defaultCategoryFilters.max_name,
      },
    }))
  },

  clearParentFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        parent_min: defaultCategoryFilters.parent_min,
        parent_max: defaultCategoryFilters.parent_max,
      },
    }))
  },

  clearUpdatedFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        updated_from: defaultCategoryFilters.updated_from,
        updated_to: defaultCategoryFilters.updated_to,
      },
    }))
  },

  clearCreatedFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        created_from: defaultCategoryFilters.created_from,
        created_to: defaultCategoryFilters.created_to,
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
        has_image: value as CategoryFilterImage,
      },
    }))
  },

  onFormatsSelect: (value: string) => {
    const castedValue = value as CategoryFilterFormats

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

  onParentChange: (key: string, value: number) => {
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
}))
