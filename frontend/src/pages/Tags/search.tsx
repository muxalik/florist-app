import TableSearch from '@/components/TableSearch'
import { useTags } from './store'

const TagSearch = () => {
  const search = useTags((state) => state.search)
  const onSearch = useTags((state) => state.onSearch)
  const resetSearch = useTags((state) => state.resetSearch)

  return <TableSearch search={search} onSearch={onSearch} reset={resetSearch} />
}

export default TagSearch
