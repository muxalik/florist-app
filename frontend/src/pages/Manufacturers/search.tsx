import TableSearch from '@/components/TableSearch'
import { useManufacturers } from './store'

const ManfuacturerSearch = () => {
  const search = useManufacturers((state) => state.search)
  const onSearch = useManufacturers((state) => state.onSearch)
  const resetSearch = useManufacturers((state) => state.resetSearch)

  return <TableSearch search={search} onSearch={onSearch} reset={resetSearch} />
}

export default ManfuacturerSearch
