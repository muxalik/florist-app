import TableSearch from '@/components/TableSearch'
import { useCategories } from './store'

const CategorySearch = () => {
  const search = useCategories((state) => state.search)
  const onSearch = useCategories((state) => state.onSearch)
  const resetSearch = useCategories((state) => state.resetSearch)

  return <TableSearch search={search} onSearch={onSearch} reset={resetSearch} />
}

export default CategorySearch
