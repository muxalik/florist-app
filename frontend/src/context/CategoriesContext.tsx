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
}

const CategoriesContext = createContext<ICategoriesContext>(initialData)

interface props {
  children: ReactNode
}

const CategoriesProvider: FC<props> = ({ children }) => {
  const [pagination, setPagination] = useState<Pagination>(initialPagination)

  const [categories, setCategories] = useState<Category[]>([])

  const [filters, setFilters] = useState<CategoryFilters>({})

  const [searchParams, setSearchParams] = useSearchParams()

  const fetchCategories = useDebounce(() => {
    api
      .get('categories?' + searchParams.toString())
      .then((res) => {
        setCategories(res.data.data)
        console.log(res.data)
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
  }, 100)

  useEffect(fetchCategories, [filters])

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
      if (currentPage === initialPagination.currentPage) {
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

    fetchCategories()
  }

  const setPerPage = (perPage: number) => {
    setPagination((prev) => ({
      ...prev,
      perPage,
    }))

    fetchCategories()
  }

  return (
    <CategoriesContext.Provider
      value={{ categories, filters, pagination, onSearch, setPage, setPerPage }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

const useCategories = () => useContext(CategoriesContext)

export { CategoriesProvider, useCategories }
