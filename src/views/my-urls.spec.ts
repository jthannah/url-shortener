import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import MyUrls from '@/views/my-urls.vue'
import ShortUrlApi, { ShortUrl } from '../api/short-url'

jest.mock('../api/short-url')
const mockedShortUrlApi = ShortUrlApi as jest.Mocked<typeof ShortUrlApi>

const fakeShortUrls: ShortUrl[] = [
  {
    key: 'r@nd0mStr1ng1',
    url: 'http://localhost:3000/r@nd0mStr1ng1',
    original: 'http://www.some.com/other/long/string/url/to/go/to1',
    created: new Date().toISOString(),
  },
  {
    key: 'r@nd0mStr1ng2',
    url: 'http://localhost:3000/r@nd0mStr1ng2',
    original: 'http://www.some.com/other/long/string/url/to/go/to2',
    created: new Date().toISOString(),
  },
  {
    key: 'r@nd0mStr1ng3',
    url: 'http://localhost:3000/r@nd0mStr1ng3',
    original: 'http://www.some.com/other/long/string/url/to/go/to3',
    created: new Date().toISOString(),
  },
]

describe('my-urls.vue', () => {
  it('should display list of urls', async () => {
    mockedShortUrlApi.getAllShortUrls.mockResolvedValue(Promise.resolve(fakeShortUrls))

    const { findAllByRole } = render(MyUrls, {
      global: {
        stubs: ['router-link'],
      },
    })

    expect(await findAllByRole('listitem')).toHaveLength(3)
  })

  it('should display a message that no urls have been shortened yet', async () => {
    mockedShortUrlApi.getAllShortUrls.mockResolvedValue(Promise.resolve([]))

    const { queryAllByRole, getByText } = render(MyUrls, {
      global: {
        stubs: ['router-link'],
      },
    })

    expect(await queryAllByRole('listitem')).toHaveLength(0)
    expect(getByText(/You haven't shortened any URL's yet!/)).toBeInTheDocument()
  })
})
