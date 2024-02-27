import { api } from './api'

const downloadFromUrl = (url: string, filename: string) => {
  api({
    url: url,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const href = URL.createObjectURL(response.data)
    const link = document.createElement('a')

    console.log(response)

    link.href = href
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  })
}

export default downloadFromUrl
