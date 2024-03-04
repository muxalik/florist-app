import downloadFromUrl from '@/utils/downloadFromUrl'
import { Button } from './ui/button'
import Icons from './ui/icons'

interface ExportButtonProps {
  downloadUrl: string
  filename: string
}

const ExportButton = ({ downloadUrl, filename }: ExportButtonProps) => {
  return (
    <Button
      className='gap-2'
      variant={'outline'}
      size={'sm'}
      onClick={() => downloadFromUrl(downloadUrl, `${filename}.xlsx`)}
    >
      <Icons.donwload className='w-4 h-4' />
      <span>Скачать</span>
    </Button>
  )
}

export default ExportButton
