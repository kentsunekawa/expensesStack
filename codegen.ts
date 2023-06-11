import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
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
