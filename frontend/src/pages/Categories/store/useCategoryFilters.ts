import { defaultCategoryFilters } from '@/constants/categories/filters'
import {
  CategoryFilterFormats,
  CategoryFilterImage,
  CategoryFilters,
  CategoryIdFilter,
} from '@/types/category'
import { create } from 'zustand'

type CategoryFiltersStore = {
  filters: CategoryFilters
  setFilters: (filters: Partial<CategoryFilters>) => void
  clearFilters: () => void
  clearImageFilters: () => void
  clearIdFilters: () => void

  onIdSelect: (value: string) => void
  onImageSelect: (value: string) => void
  onFormatsSelect: (value: string) => void
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
  onIdSelect: (value: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        id: value as CategoryIdFilter,
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
}))
