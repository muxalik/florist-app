import { defaultCategoryFilters } from '@/constants/categories/filters'
import {
  CategoryFilterFormats,
  CategoryFilterImage,
  CategoryFilters,
} from '@/types/category'
import { create } from 'zustand'

type CategoryFiltersStore = {
  filters: CategoryFilters
  setFilters: (filters: Partial<CategoryFilters>) => void
  clearFilters: () => void
  clearImageFilters: () => void

  onFormatsSelect: (value: string) => void
  onImageSelect: (value: string) => void
}

export const useCategoryFilters = create<CategoryFiltersStore>((set) => ({
  filters: defaultCategoryFilters,
  setFilters: (filters: Partial<CategoryFilters>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }))
  },
  clearFilters: () => set({ filters: defaultCategoryFilters }),
  clearImageFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        has_image: defaultCategoryFilters.has_image,
        formats: defaultCategoryFilters.formats,
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
  onImageSelect: (value: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        has_image: value as CategoryFilterImage,
      },
    }))
  },
}))
