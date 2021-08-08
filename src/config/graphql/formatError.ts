import { GraphQLError, GraphQLFormattedError } from 'graphql';

export function formatError(error: GraphQLError) {
  const { extensions } = error;
  const graphQLFormattedError: GraphQLFormattedError = {
    message: extensions?.exception?.response?.message || error.message,
    extensions: {
      code: extensions?.exception?.response?.code || 'INTERNAL_SERVER_ERROR',
      keys: extensions?.exception?.response?.keys || [],
    },
  };
  return graphQLFormattedError;
}
