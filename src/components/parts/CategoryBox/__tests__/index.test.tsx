import { render, screen } from '@testing-library/react'

import { CategoryBox } from '../index'

describe('CategoryBox', () => {
  it('テキストが正しく表示される', () => {
    const name = 'category name'
    render(<CategoryBox name={name} />)
    screen.getByText(name)
  })
  it('背景色が正しく設定される', () => {
    const color = '#ddd'
    const { container } = render(<CategoryBox name='hogehoge' color={color} />)
    expect(container.querySelector('span')).toHaveStyle(
      `background: '${color}'`,
    )
  })

  it('Snapshot', () => {
    const { container } = render(<CategoryBox name='hogehoge' color={'#f00'} />)
    expect(container).toMatchSnapshot()
  })
})
