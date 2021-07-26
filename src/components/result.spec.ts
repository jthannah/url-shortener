import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import Result from '@/components/result.vue'
import { ShortUrl } from '../api/short-url'

const fakeShortUrl: ShortUrl = {
  key: 'r@nd0mStr1ng',
  url: 'http://localhost:3000/r@nd0mStr1ng',
  original: 'http://www.some.com/other/long/string/url/to/go/to',
  created: new Date().toISOString(),
}

describe('result.vue', () => {
  it('should show the shortened url when passed in props', () => {
    const { getByRole } = render(Result, {
      props: {
        result: fakeShortUrl,
      },
    })

    expect(getByRole('link').textContent).toEqual(fakeShortUrl.url)
  })

  it('should show the message about the given url already being shortened when newShortUrl prop is false', () => {
    const { getByRole } = render(Result, {
      props: {
        result: fakeShortUrl,
        newShortUrl: false,
      },
    })

    expect(
      getByRole('heading', { name: 'This url was already shortened! We went ahead and found it for you.' })
    ).toBeInTheDocument()
  })
})
