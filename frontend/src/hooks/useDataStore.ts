import { useState, useEffect } from 'react';
import { dataStore } from '../store/dataStore';
import type { Proposal, AIAnalysisData } from '../services/api';

export const useDataStore = () => {
  const [state, setState] = useState(dataStore.getState());

  useEffect(() => {
    // Subscribe to data store changes
    const unsubscribe = dataStore.subscribe(() => {
      setState(dataStore.getState());
    });

    // Initialize data store if not already initialized and not currently loading
    const currentState = dataStore.getState();
    if (!currentState.isInitialized && !currentState.loading) {
      dataStore.initialize();
    }

    return unsubscribe;
  }, []);

  return {
    allProposals: state.allProposals,
    activeProposal: state.activeProposal,
    aiAnalysis: state.aiAnalysis,
    loading: state.loading,
    error: state.error,
    isInitialized: state.isInitialized,
    refresh: () => dataStore.refresh(),
    isDataFresh: () => dataStore.isDataFresh()
  };
};
