const url_base = window.location.origin

export interface ShortUrl {
  key: string
  url: string
  original: string
  created: string
}

function generateRandomString(): string {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let array = new Uint8Array(6)
  window.crypto.getRandomValues(array)
  const charCodeArray = array.map((x) => validChars.charCodeAt(x % validChars.length)) as unknown as number[]
  return String.fromCharCode.apply(null, charCodeArray)
}

export default {
  getAllShortUrls(): Promise<ShortUrl[]> {
    return new Promise<ShortUrl[]>((resolve, reject) => {
      const shortUrlDb = JSON.parse(localStorage.getItem('shortUrlDb') ?? '[]')
      resolve(shortUrlDb)
    })
  },

  getShortUrl(longUrl: string): Promise<ShortUrl> {
    return new Promise<ShortUrl>((resolve, reject) => {
      const shortUrlDb = JSON.parse(localStorage.getItem('shortUrlDb') ?? '[]')
      resolve(shortUrlDb.find((record: ShortUrl) => record.original === longUrl))
    })
  },

  getLongUrl(shortUrlKey: string): Promise<ShortUrl> {
    return new Promise<ShortUrl>((resolve, reject) => {
      const shortUrlDb = JSON.parse(localStorage.getItem('shortUrlDb') ?? '[]')
      resolve(shortUrlDb.find((record: ShortUrl) => record.key === shortUrlKey))
    })
  },

  deleteShortUrl(shortUrlKey: string): Promise<ShortUrl[]> {
    return new Promise<ShortUrl[]>((resolve, reject) => {
      const shortUrlDb = JSON.parse(localStorage.getItem('shortUrlDb') ?? '[]')
      const filteredShortUrlDb = shortUrlDb.filter((record: ShortUrl) => record.key !== shortUrlKey)

      localStorage.setItem('shortUrlDb', JSON.stringify(filteredShortUrlDb))
      resolve(filteredShortUrlDb)
    })
  },

  saveShortUrl(longUrl: string): Promise<ShortUrl> {
    return new Promise((resolve, reject) => {
      const key = generateRandomString()

      const shortUrl = {
        key: key,
        original: longUrl,
        url: url_base + '/' + key,
        created: new Date().toISOString(),
      }

      const shortUrlDb = JSON.parse(localStorage.getItem('shortUrlDb') ?? '[]')
      shortUrlDb.push(shortUrl)
      localStorage.setItem('shortUrlDb', JSON.stringify(shortUrlDb))

      resolve(shortUrl)
    })
  },
}
