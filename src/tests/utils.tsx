import { render, RenderOptions } from '@testing-library/react'

import { AppBase } from 'src/AppBase'

type Props = {
  children: React.ReactNode
}

export const TestAppWrapper: React.FC<Props> = ({ children }) => (
  <AppBase>{children}</AppBase>
)

const customRender = (
  target: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(target, {
    wrapper: (props) => <TestAppWrapper {...props} />,
    ...options,
  })
}

export { customRender as render }
