import { render, screen } from '@testing-library/react'

import { CategoryBox } from '../index'

describe('CategoryBox', () => {
  it('テキストが正しく表示される', () => {
    const name = 'category name'
    render(<CategoryBox name={name} />)
    expect(screen.getByText(name))
  })
})
