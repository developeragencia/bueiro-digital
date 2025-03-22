import { useQuery } from '@tanstack/react-query';

export const defaultQueryOptions = {
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 60, // 1 hour
  retry: 1,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
};

export function useQueryClient<T>(key: string[], queryFn: () => Promise<T>) {
  return useQuery({
    queryKey: key,
    queryFn,
    ...defaultQueryOptions,
  });
}