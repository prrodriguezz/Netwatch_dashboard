import { useQuery } from '@tanstack/react-query';
import { fetchNetworkData } from '../data/mockApi';

export function useNetworkData() {
  return useQuery({
    queryKey: ['networkData'],
    queryFn: fetchNetworkData,
    refetchInterval: 10000,
    staleTime: 5000,
  });
}
