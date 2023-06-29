import * as Types from '../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetExpenseQueryVariables = Types.Exact<{
  where: Types.ExpenseWhereUniqueInput;
  stage: Types.Stage;
}>;


export type GetExpenseQuery = { __typename?: 'Query', expense?: { __typename?: 'Expense', amount: number, memo?: string | null, id: string, date: string, category?: { __typename?: 'Category', id: string, name: string, color?: { __typename?: 'Color', hex: any } | null } | null } | null };


export const GetExpenseDocument = gql`
    query GetExpense($where: ExpenseWhereUniqueInput!, $stage: Stage!) {
  expense(where: $where, stage: $stage) {
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
 * __useGetExpenseQuery__
 *
 * To run a query within a React component, call `useGetExpenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseQuery({
 *   variables: {
 *      where: // value for 'where'
 *      stage: // value for 'stage'
 *   },
 * });
 */
export function useGetExpenseQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseQuery, GetExpenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseQuery, GetExpenseQueryVariables>(GetExpenseDocument, options);
      }
export function useGetExpenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseQuery, GetExpenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseQuery, GetExpenseQueryVariables>(GetExpenseDocument, options);
        }
export type GetExpenseQueryHookResult = ReturnType<typeof useGetExpenseQuery>;
export type GetExpenseLazyQueryHookResult = ReturnType<typeof useGetExpenseLazyQuery>;
export type GetExpenseQueryResult = Apollo.QueryResult<GetExpenseQuery, GetExpenseQueryVariables>;