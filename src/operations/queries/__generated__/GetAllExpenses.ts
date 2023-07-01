import * as Types from '../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllExpensesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', amount: number, memo?: string | null, id: string, date: string, category?: { __typename?: 'Category', id: string, name: string, color?: { __typename?: 'Color', hex: any } | null } | null }> };


export const GetAllExpensesDocument = gql`
    query GetAllExpenses {
  expenses {
    amount
    category {
      color {
        hex
      }
      id
      name
    }
    memo
    id
    date
  }
}
    `;

/**
 * __useGetAllExpensesQuery__
 *
 * To run a query within a React component, call `useGetAllExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExpensesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllExpensesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExpensesQuery, GetAllExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExpensesQuery, GetAllExpensesQueryVariables>(GetAllExpensesDocument, options);
      }
export function useGetAllExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExpensesQuery, GetAllExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExpensesQuery, GetAllExpensesQueryVariables>(GetAllExpensesDocument, options);
        }
export type GetAllExpensesQueryHookResult = ReturnType<typeof useGetAllExpensesQuery>;
export type GetAllExpensesLazyQueryHookResult = ReturnType<typeof useGetAllExpensesLazyQuery>;
export type GetAllExpensesQueryResult = Apollo.QueryResult<GetAllExpensesQuery, GetAllExpensesQueryVariables>;