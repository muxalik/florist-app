import useDebounce from '@/hooks/useDebounce'
import { Category, CategoryFilters, Pagination } from '@/types'
import { api } from '@/utils/api'
import {
  ChangeEvent,
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'

interface ICategoriesContext {
  categories: Category[]
  pagination: Pagination
  filters: CategoryFilters
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  isLoading: boolean
}

const initialPagination: Pagination = {
  currentPage: 1,
  from: 0,
  lastPage: 0,
  perPage: 10,
  to: 0,
  total: 0,
}

const initialData: ICategoriesContext = {
  categories: [],
  pagination: initialPagination,
  filters: {},
  onSearch: () => {},
  setPage: () => {},
  setPerPage: () => {},
  isLoading: false,
}

const CategoriesContext = createContext<ICategoriesContext>(initialData)

interface props {
  children: ReactNode
}

const CategoriesProvider: FC<props> = ({ children }) => {
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

  const fetchCategories = useDebounce(() => {
    api
      .get('categories?' + searchParams.toString())
      .then((res) => {
        setCategories(res.data.data)

        setPagination({
          currentPage: res.data.meta.current_page,
          from: res.data.meta.from,
          lastPage: res.data.meta.last_page,
          perPage: res.data.meta.per_page,
          to: res.data.meta.to,
          total: res.data.meta.total,
        })
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, 200)

  const fetchWithLoader = () => {
    setIsLoading(true)
    fetchCategories()
  }

  useEffect(fetchWithLoader, [filters])

  // Update filters
  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set(key, value.toString())
        } else {
          prev.delete(key)
        }

        return prev
      })
    })
  }, [filters])

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

      return prev
    })
  }, [pagination.currentPage, pagination.perPage])

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

  console.log(categories.length);
  

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        filters,
        pagination,
        onSearch,
        setPage,
        setPerPage,
        isLoading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

const useCategories = () => useContext(CategoriesContext)

export { CategoriesProvider, useCategories }
