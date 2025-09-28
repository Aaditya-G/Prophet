// hooks/useProposals.ts
import { useQuery } from '@tanstack/react-query';
import { proposalAPI, type Proposal } from '../services/api';
// Import your mock data as the fallback
import { mockProposals } from '../const';

export const useProposals = () => {
  const {
    data: apiData, // Rename data to avoid shadowing
    isLoading,
    isError,
  } = useQuery<Proposal[], Error>({
    queryKey: ['proposals'],
    queryFn: proposalAPI.getAllProposals,
    retry: 0, // Optional: retry once on failure
  });

  // If the query is in an error state, use the mock data.
  // Otherwise, use the API data (or an empty array while loading).
  const allProposals = isError ? mockProposals : apiData || [];

  // Derive the active proposal from whichever data source is being used.
  const activeProposal = allProposals.find(p => p.state === 'ACTIVE') || null;

  // Return a consistent shape. The component consuming this hook
  // will receive mock data seamlessly if the API fails.
  return {
    allProposals,
    activeProposal,
    loading: isLoading,
    // You can still return isError if you want to conditionally show a message
    // in the UI (e.g., "Displaying cached data due to a network error").
    isError,
  };
};