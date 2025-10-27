import { MINUTE } from '@/constants/time';
import { retry, throwOnError } from '@/hooks/query/CONFIG';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * MINUTE,
      retry,
      throwOnError,
    },
  },
});

const isDevEnvironment = import.meta.env.DEV;

const TanstackQuery = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevEnvironment && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default TanstackQuery;
