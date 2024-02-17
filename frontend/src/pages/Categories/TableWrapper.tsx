import { useCategories } from '@/context/CategoriesContext'
import { DataTable } from './DataTable/DataTable'
import { columns } from './DataTable/columns'

const TableWrapper = () => {
  const { categories } = useCategories()

  return <DataTable data={categories} columns={columns} />
}

export default TableWrapper
