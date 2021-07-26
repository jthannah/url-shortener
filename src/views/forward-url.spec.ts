import {render, waitFor} from '@testing-library/vue'
import '@testing-library/jest-dom'
import ForwardUrl from '@/views/forward-url.vue'
import ShortUrlApi, { ShortUrl } from '../api/short-url'
import {nextTick} from 'vue';

jest.mock('../api/short-url')
const mockedShortUrlApi = ShortUrlApi as jest.Mocked<typeof ShortUrlApi>

const fakeShortUrl: ShortUrl =
  {
    key: 'r@nd0mStr1ng1',
    url: 'http://localhost:3000/r@nd0mStr1ng1',
    original: 'http://www.some.com/other/long/string/url/to/go/to1',
    created: new Date().toISOString(),
  }


describe('forward-url.vue', () => {
  it('should display message that a match could not be found for the given short url', async () => {
    mockedShortUrlApi.getLongUrl.mockResolvedValue(Promise.reject())

    const { findByText } = render(ForwardUrl, {
      props: {
        shortUrlKey: fakeShortUrl.key
      },
      global: {
        stubs: ['router-link'],
      },
    })

    expect(await findByText('Sorry! We didn\'t find an entry matching this short url.')).toBeInTheDocument()
  })

  it('should display a message that no urls have been shortened yet', async () => {
    mockedShortUrlApi.getLongUrl.mockResolvedValue(Promise.resolve(fakeShortUrl))

    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: ''
      }
    });

    const { } = render(ForwardUrl, {
      props: {
        shortUrlKey: fakeShortUrl.key
      },
      global: {
        stubs: ['router-link'],
      },
    })

    await waitFor(() => expect(window.location.href).toEqual(fakeShortUrl.original))
  })
})
