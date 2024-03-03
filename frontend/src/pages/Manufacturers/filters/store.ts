import { defaultTagFilters } from '@/constants/tags/filters'
import { IdFilter } from '@/types'
import { TagFilters } from '@/types/tag'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

type TagFiltersStore = {
  filters: TagFilters
  setFilters: (filters: Partial<TagFilters>) => void
  clearFilters: () => void

  clearIdFilters: () => void
  clearNameFilters: () => void
  clearColorsFilters: () => void
  clearProductsFilters: () => void
  clearUpdatedFilters: () => void
  clearCreatedFilters: () => void

  onIdSelect: (value: string) => void
  onNameChange: (key: string, value: number) => void
  onColorsChange: (colorId: number) => void
  onWithoutColorChange: (include: boolean) => void
  onProductsChange: (key: string, value: number) => void
  onUpdatedChange: (range: DateRange | undefined) => void
  onCreatedChange: (range: DateRange | undefined) => void
}

const filtersFromUrl = (): TagFilters => {
  const searchParams = new URLSearchParams(window.location.search)

  const id = searchParams.get('id') || defaultTagFilters.id

  const min_name = +(searchParams.get('min_name') || defaultTagFilters.min_name)

  const max_name = +(searchParams.get('max_name') || defaultTagFilters.max_name)

  let colors =
    searchParams.getAll('colors')?.map((color) => +color) ||
    defaultTagFilters.colors

  colors = colors.length > 0 ? colors : defaultTagFilters.colors

  const without_color = !!(
    searchParams.get('without_color') || defaultTagFilters.without_color
  )

  const min_products = +(
    searchParams.get('min_products') || defaultTagFilters.min_products
  )

  const max_products = +(
    searchParams.get('max_products') || defaultTagFilters.max_products
  )

  const updated_from =
    searchParams.get('updated_from') || defaultTagFilters.updated_from

  const updated_to =
    searchParams.get('updated_to') || defaultTagFilters.updated_to

  const created_from =
    searchParams.get('created_from') || defaultTagFilters.created_from

  const created_to =
    searchParams.get('created_to') || defaultTagFilters.created_to

  return {
    id,
    min_name,
    max_name,
    colors,
    without_color,
    min_products,
    max_products,
    updated_from,
    updated_to,
    created_from,
    created_to,
  } as TagFilters
}

export const useTagFilters = create<TagFiltersStore>((set) => ({
  filters: (() => {
    return filtersFromUrl()
  })(),

  setFilters: (filters: Partial<TagFilters>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }))
  },

  clearFilters: () => set({ filters: defaultTagFilters }),

  clearIdFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        id: defaultTagFilters.id,
      },
    }))
  },

  clearNameFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        min_name: defaultTagFilters.min_name,
        max_name: defaultTagFilters.max_name,
      },
    }))
  },

  clearColorsFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        colors: defaultTagFilters.colors,
        without_color: defaultTagFilters.without_color,
      },
    }))
  },

  clearProductsFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        min_products: defaultTagFilters.min_products,
        max_products: defaultTagFilters.max_products,
      },
    }))
  },

  clearUpdatedFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        updated_from: defaultTagFilters.updated_from,
        updated_to: defaultTagFilters.updated_to,
      },
    }))
  },

  clearCreatedFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        created_from: defaultTagFilters.created_from,
        created_to: defaultTagFilters.created_to,
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

  onNameChange: (key: string, value: number) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }))
  },

  onColorsChange(colorId: number) {
    set((state) => ({
      filters: {
        ...state.filters,
        colors: state.filters.colors.includes(colorId)
          ? state.filters.colors.filter((filter) => filter !== colorId)
          : [...state.filters.colors, colorId],
      },
    }))
  },

  onWithoutColorChange: (include: boolean) => {
    set((state) => ({
      filters: {
        ...state.filters,
        without_color: include,
      },
    }))
  },

  onProductsChange: (key: string, value: number) => {
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
