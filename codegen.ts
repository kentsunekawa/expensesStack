import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.VITE_API_URL,
  documents: ['src/**/*.tsx'],
  generates: {
    './src/operations/types.d.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        scalars: {
          Date: 'string',
          DateTime: 'string',
        },
      },
    },
    './src/operations/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.ts',
        folder: '__generated__',
        baseTypesPath: './types.d.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        scalars: {
          Date: 'string',
          DateTime: 'string',
        },
      },
    },
    './src/operations/fragments/fragmentTypes.json': {
      plugins: ['fragment-matcher'],
    },
  },
}

export default config
