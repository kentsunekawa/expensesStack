// import from libraries
import 'styled-components/macro'

// import from this project
import { Text } from 'src/components/parts/Texts'
import { Loading, Props as LoadingProps } from 'src/components/parts/Loading'

export { Loading }

export type Props = {
  isLoading?: boolean
  isError?: boolean
  errorContent?: React.ReactNode
  loadinngContent?: React.ReactNode
  loadingProps?: LoadingProps
  children: React.ReactNode
}

export const Suspense: React.FC<Props> = ({
  isLoading = false,
  isError = false,
  errorContent,
  loadinngContent,
  children,
  loadingProps,
}) => (
  <>
    {isError ? (
      <>{errorContent ?? <Text>エラーが発生しました</Text>}</>
    ) : (
      <>
        {isLoading ? (
          <>{loadinngContent ?? <Loading {...loadingProps} />}</>
        ) : (
          children
        )}
      </>
    )}
  </>
)
