import * as Types from '../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetExpensesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ExpenseWhereInput>;
  stage: Types.Stage;
}>;


export type GetExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', amount: number, memo?: string | null, id: string, date: string, category?: { __typename?: 'Category', id: string, name: string, color?: { __typename?: 'Color', hex: any } | null } | null }> };


export const GetExpensesDocument = gql`
    query GetExpenses($where: ExpenseWhereInput, $stage: Stage!) {
  expenses(where: $where, stage: $stage, first: 1000, orderBy: date_DESC) {
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
 * __useGetExpensesQuery__
 *
 * To run a query within a React component, call `useGetExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpensesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      stage: // value for 'stage'
 *   },
 * });
 */
export function useGetExpensesQuery(baseOptions: Apollo.QueryHookOptions<GetExpensesQuery, GetExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpensesQuery, GetExpensesQueryVariables>(GetExpensesDocument, options);
      }
export function useGetExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpensesQuery, GetExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpensesQuery, GetExpensesQueryVariables>(GetExpensesDocument, options);
        }
export type GetExpensesQueryHookResult = ReturnType<typeof useGetExpensesQuery>;
export type GetExpensesLazyQueryHookResult = ReturnType<typeof useGetExpensesLazyQuery>;
export type GetExpensesQueryResult = Apollo.QueryResult<GetExpensesQuery, GetExpensesQueryVariables>;