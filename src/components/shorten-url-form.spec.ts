import '@testing-library/jest-dom'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import ShortUrlApi, { ShortUrl } from '@/api/short-url'
import ShortenUrlForm from './shorten-url-form.vue'
import { nextTick } from 'vue'

jest.mock('@/api/short-url')
const mockedShortUrlApi = ShortUrlApi as jest.Mocked<typeof ShortUrlApi>

const fakeShortUrl: ShortUrl = {
  key: 'r@nd0mStr1ng',
  url: 'http://localhost:3000/r@nd0mStr1ng',
  original: 'http://www.some.com/other/long/string/url/to/go/to',
  created: new Date().toISOString(),
}

describe('shorten-url-form.vue', () => {
  it('does not submit form when invalid url is entered', async () => {
    // TODO: Cannot test browser input validation until this bug is fixed in JSDOM: https://github.com/jsdom/jsdom/issues/2898

    // mockedShortUrlApi.saveShortUrl.mockResolvedValue(Promise.resolve(fakeShortUrl))
    // const { getByRole } = render(ShortenUrlForm)
    //
    // userEvent.type(getByRole('textbox'), 'notAnUrl')
    // userEvent.click(getByRole('button', { name: 'Shorten URL!' }))
    //
    // await nextTick()
    //
    // expect(mockedShortUrlApi.saveShortUrl).toHaveBeenCalledTimes(0)
  })

  it('submits form and successfully displays result', async () => {
    mockedShortUrlApi.saveShortUrl.mockResolvedValue(Promise.resolve(fakeShortUrl))

    const { queryByRole, getByRole, findByRole } = render(ShortenUrlForm)

    expect(mockedShortUrlApi.saveShortUrl).toHaveBeenCalledTimes(0)
    expect(queryByRole('heading', { name: /Here is your short url/ })).toBeNull()

    userEvent.type(getByRole('textbox'), 'https://a.test.url')
    userEvent.click(getByRole('button', { name: 'Shorten URL!' }))

    await nextTick()

    expect(mockedShortUrlApi.saveShortUrl).toHaveBeenCalledTimes(1)
    expect(await findByRole('heading', { name: /Here is your short url/ })).toBeInTheDocument()
    expect(getByRole('link', { name: fakeShortUrl.url }).getAttribute('href')).toEqual(fakeShortUrl.url)
  })

  it('submits form and successfully displays result with message for urls already shortened', async () => {
    mockedShortUrlApi.saveShortUrl.mockResolvedValue(Promise.resolve(fakeShortUrl))

    const { queryByRole, getByRole, findByRole } = render(ShortenUrlForm)

    expect(mockedShortUrlApi.saveShortUrl).toHaveBeenCalledTimes(0)
    expect(queryByRole('heading', { name: /Here is your short url/ })).toBeNull()

    userEvent.type(getByRole('textbox'), 'https://a.test.url')
    userEvent.click(getByRole('button', { name: 'Shorten URL!' }))

    await nextTick()

    expect(mockedShortUrlApi.saveShortUrl).toHaveBeenCalledTimes(1)
    expect(await findByRole('heading', { name: /Here is your short url/ })).toBeInTheDocument()
    expect(getByRole('link', { name: fakeShortUrl.url }).getAttribute('href')).toEqual(fakeShortUrl.url)

    // clicking submit again should make the warning message that the url has already been shortened appear
    expect(queryByRole('heading', { name: /This url was already shortened!/ })).toBeNull()
    userEvent.click(getByRole('button', { name: 'Shorten URL!' }))
    await nextTick()
    expect(mockedShortUrlApi.saveShortUrl).toHaveBeenCalledTimes(2)
    expect(await findByRole('heading', { name: /This url was already shortened!/ })).toBeInTheDocument()
  })
})
