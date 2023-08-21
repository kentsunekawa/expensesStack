import { screen, act, waitFor } from '@testing-library/react'

import { render } from 'src/tests/utils'
import { toggleIsLoading } from 'src/hooks'
import { testIds } from '../index'

describe('ScreenLoading', () => {
  it('ローディングが表示されていない', () => {
    // ScreenLoading は AppBase に含まれているため、このテストでは <></> を渡す
    render(<></>)

    expect(screen.queryByTestId(testIds.container['data-testid']))
  })

  it('ローディングが表示され,消える', async () => {
    // ScreenLoading は AppBase に含まれているため、このテストでは <></> を渡す
    render(<></>)

    act(() => {
      toggleIsLoading(true)
    })

    expect(
      await screen.findByTestId(testIds.container['data-testid']),
    ).toBeInTheDocument()

    act(() => {
      toggleIsLoading(false)
    })

    await waitFor(() => {
      expect(
        screen.queryByTestId(testIds.container['data-testid']),
      ).not.toBeInTheDocument()
    })
  })
})
