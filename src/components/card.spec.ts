import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Card from '@/components/card.vue'
import { ShortUrl } from '../api/short-url'

const fakeShortUrl: ShortUrl = {
  key: 'r@nd0mStr1ng',
  url: 'http://localhost:3000/r@nd0mStr1ng',
  original: 'http://www.some.com/other/long/string/url/to/go/to',
  created: new Date().toISOString()
}

describe('card.vue', () => {
  it('should emit when the delete button is clicked', () => {
    const { getByRole, emitted } = render(Card, {
      props: {
        shortUrl: fakeShortUrl,
      },
    })

    const deleteButton = getByRole('button', { name: 'Delete' })
    userEvent.click(deleteButton)

    expect(emitted().delete).toHaveLength(1)
  })
})
