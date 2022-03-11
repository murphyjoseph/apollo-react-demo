import { GraphQLError } from 'graphql';

interface ErrorResponse {
  code: string;
  message: string;
  errorText?: string;
}

export const formatErrorResponse = (
  errors: readonly GraphQLError[]
): ErrorResponse[] => errors
  .map((e: GraphQLError) => ({
    code: e.extensions?.code,
    message: e.message,
    errorText: e.extensions?.detailed_errors,
  }));

export const saveCredentials = (creds: any) => {
  Object.keys(creds).forEach((k) => {
    localStorage.setItem(k, creds[k]);
  });
};

export const clearCredentials = () => {
  const clear = ['accessToken', 'tokenType', 'expiry', 'uid', 'client'];
  clear.forEach((c) => {
    localStorage.removeItem(c);
  });
};
