import { proposalAPI } from '../services/api';
import type { Proposal, AIAnalysisData } from '../services/api';

interface DataStoreState {
  allProposals: Proposal[];
  activeProposal: Proposal | null;
  aiAnalysis: AIAnalysisData[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  isInitialized: boolean;
}

class DataStore {
  private state: DataStoreState = {
    allProposals: [],
    activeProposal: null,
    aiAnalysis: [],
    loading: false,
    error: null,
    lastFetched: null,
    isInitialized: false
  };

  private listeners: Set<() => void> = new Set();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly LOCAL_STORAGE_KEY = 'ethglobal_proposals_data';

  // Subscribe to state changes
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners of state changes
  private notify() {
    this.listeners.forEach(listener => listener());
  }

  // Get current state
  getState(): DataStoreState {
    return { ...this.state };
  }

  // Check if data is fresh (less than 5 minutes old)
  isDataFresh(): boolean {
    if (!this.state.lastFetched) return false;
    return Date.now() - this.state.lastFetched < this.CACHE_DURATION;
  }

  // Save data to local storage
  private saveToLocalStorage(data: { allProposals: Proposal[], activeProposal: Proposal | null, timestamp: number }) {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
      console.log('Data saved to local storage');
    } catch (error) {
      console.warn('Failed to save to local storage:', error);
    }
  }

  // Load data from local storage
  private loadFromLocalStorage(): { allProposals: Proposal[], activeProposal: Proposal | null, timestamp: number } | null {
    try {
      const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        console.log('Data loaded from local storage');
        return data;
      }
    } catch (error) {
      console.warn('Failed to load from local storage:', error);
    }
    return null;
  }

  // Check if local storage data is available and recent (less than 2 minutes old)
  private isLocalDataRecent(): boolean {
    const localData = this.loadFromLocalStorage();
    if (!localData) return false;
    
    const twoMinutesAgo = Date.now() - (2 * 60 * 1000);
    return localData.timestamp > twoMinutesAgo;
  }

  // Get mock data for fallback
  private getMockData() {
    const mockActiveProposal: Proposal = {
      id: "10",
      description: "# Uniswap V4 Protocol Upgrade\n\nThis proposal aims to upgrade the Uniswap protocol to version 4, introducing new features and improvements to the decentralized exchange.\n\nThe upgrade includes:\n- Enhanced liquidity management\n- Improved gas efficiency\n- New trading features\n- Better user experience",
      proposer: {
        id: "0xabc123...",
        delegatedVotesRaw: 1000000,
        numberVotes: 5,
        tokenHoldersRepresentedAmount: 50
      },
      state: "ACTIVE",
      creationTime: 1672531200,
      votes: [
        {
          id: "vote_001",
          weight: 50000,
          choice: "FOR",
          reason: "This is a great upgrade for the protocol."
        }
      ],
      abstainDelegateVotes: 10000,
      againstDelegateVotes: 50000,
      forDelegateVotes: 940000,
      quorumVotes: 400000,
      totalDelegateVotes: 1000000
    };

    const mockAllProposals: Proposal[] = [
      mockActiveProposal,
      {
        id: "9",
        description: "# Governance Token Distribution\n\nProposal to distribute additional governance tokens to active community members.",
        proposer: {
          id: "0xdef456...",
          delegatedVotesRaw: 800000,
          numberVotes: 3,
          tokenHoldersRepresentedAmount: 40
        },
        state: "EXECUTED",
        creationTime: 1672444800,
        votes: [],
        abstainDelegateVotes: 5000,
        againstDelegateVotes: 20000,
        forDelegateVotes: 775000,
        quorumVotes: 400000,
        totalDelegateVotes: 800000
      },
      {
        id: "8",
        description: "# Fee Structure Update\n\nUpdate the fee structure for better protocol sustainability.",
        proposer: {
          id: "0xghi789...",
          delegatedVotesRaw: 600000,
          numberVotes: 2,
          tokenHoldersRepresentedAmount: 30
        },
        state: "DEFEATED",
        creationTime: 1672358400,
        votes: [],
        abstainDelegateVotes: 15000,
        againstDelegateVotes: 350000,
        forDelegateVotes: 235000,
        quorumVotes: 400000,
        totalDelegateVotes: 600000
      }
    ];

    return {
      allProposals: mockAllProposals,
      activeProposal: mockActiveProposal
    };
  }

  // Initialize data store
  async initialize(): Promise<void> {
    if (this.state.isInitialized && this.isDataFresh()) {
      console.log('Data store already initialized with fresh data');
      return;
    }

    if (this.state.loading) {
      console.log('Data store already initializing, skipping...');
      return;
    }

    this.state.loading = true;
    this.state.error = null;
    this.notify();

    // Always show loading for at least 5 seconds for natural feel
    const loadingStartTime = Date.now();
    const minLoadingTime = 5000; // 5 seconds

    try {
      console.log('Initializing data store...');
      
      // First, try to load from local storage if available and recent (within 2 minutes)
      if (this.isLocalDataRecent()) {
        console.log('Using recent local storage data...');
        const localData = this.loadFromLocalStorage()!;
        this.state.allProposals = localData.allProposals;
        this.state.activeProposal = localData.activeProposal;
        this.state.aiAnalysis = [];
        this.state.lastFetched = localData.timestamp;
        this.state.isInitialized = true;
        
        // Wait for minimum loading time before showing data
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          this.state.loading = false;
          this.notify();
        }, remainingTime);
        
        // Still try to fetch fresh data in background
        this.fetchFreshDataInBackground();
        return;
      }
      
      // Test backend connection first
      console.log('Testing backend connection...');
      const isConnected = await proposalAPI.testConnection();
      console.log('Backend connection result:', isConnected);
      if (!isConnected) {
        console.log('Backend connection failed, checking local storage...');
        
        // Try local storage as fallback
        const localData = this.loadFromLocalStorage();
        if (localData) {
          console.log('Using local storage as fallback...');
          this.state.allProposals = localData.allProposals;
          this.state.activeProposal = localData.activeProposal;
          this.state.aiAnalysis = [];
          this.state.lastFetched = localData.timestamp;
          this.state.isInitialized = true;
          
          // Wait for minimum loading time before showing data
          const elapsedTime = Date.now() - loadingStartTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
          
          setTimeout(() => {
            this.state.loading = false;
            this.notify();
          }, remainingTime);
          return;
        }
        
        // No local data, use mock data
        console.log('No local data available, using mock data...');
        const mockData = this.getMockData();
        this.state.allProposals = mockData.allProposals;
        this.state.activeProposal = mockData.activeProposal;
        this.state.aiAnalysis = [];
        this.state.lastFetched = Date.now();
        this.state.isInitialized = true;
        
        // Wait for minimum loading time before showing data
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          this.state.loading = false;
          this.notify();
        }, remainingTime);
        return;
      }

      console.log('Backend connection successful, fetching data...');
      
      // Fetch all proposals
      const allProposalsRes = await proposalAPI.getAllProposals();
      
      if (allProposalsRes && allProposalsRes.length > 0) {
        console.log('Real data received, updating store and saving to local storage...');
        
        // Find proposal with ID 10 for active proposal, or use first one
        const proposal10 = allProposalsRes.find(p => p.id === '10') || allProposalsRes[0];
        
        this.state.allProposals = allProposalsRes;
        this.state.activeProposal = proposal10;
        this.state.aiAnalysis = [];
        this.state.lastFetched = Date.now();
        this.state.isInitialized = true;
        this.state.error = null;
        
        // Save to local storage
        this.saveToLocalStorage({
          allProposals: allProposalsRes,
          activeProposal: proposal10,
          timestamp: Date.now()
        });
      } else {
        console.log('No real data received, using mock data...');
        const mockData = this.getMockData();
        this.state.allProposals = mockData.allProposals;
        this.state.activeProposal = mockData.activeProposal;
        this.state.aiAnalysis = [];
        this.state.lastFetched = Date.now();
        this.state.isInitialized = true;
      }
    } catch (error) {
      console.error('Error initializing data store:', error);
      
      // Try local storage as fallback
      const localData = this.loadFromLocalStorage();
      if (localData) {
        console.log('Using local storage as fallback due to error...');
        this.state.allProposals = localData.allProposals;
        this.state.activeProposal = localData.activeProposal;
        this.state.aiAnalysis = [];
        this.state.lastFetched = localData.timestamp;
        this.state.isInitialized = true;
        this.state.error = null; // Clear error since we have local data
        
        // Wait for minimum loading time before showing data
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          this.state.loading = false;
          this.notify();
        }, remainingTime);
      } else if (this.state.allProposals.length === 0) {
        console.log('No local data available, using mock data...');
        const mockData = this.getMockData();
        this.state.allProposals = mockData.allProposals;
        this.state.activeProposal = mockData.activeProposal;
        this.state.aiAnalysis = [];
        this.state.lastFetched = Date.now();
        this.state.isInitialized = true;
        
        // Wait for minimum loading time before showing data
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          this.state.loading = false;
          this.notify();
        }, remainingTime);
      } else {
        console.log('Error occurred but keeping existing real data...');
        this.state.error = 'Failed to refresh data, but keeping existing data';
        
        // Wait for minimum loading time before showing data
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          this.state.loading = false;
          this.notify();
        }, remainingTime);
      }
    } finally {
      // Don't set loading to false here, let the setTimeout handle it
    }
  }

  // Fetch fresh data in background without blocking UI
  private async fetchFreshDataInBackground(): Promise<void> {
    try {
      console.log('Fetching fresh data in background...');
      const allProposalsRes = await proposalAPI.getAllProposals();
      
      if (allProposalsRes && allProposalsRes.length > 0) {
        console.log('Fresh data received, updating store...');
        const proposal10 = allProposalsRes.find(p => p.id === '10') || allProposalsRes[0];
        
        this.state.allProposals = allProposalsRes;
        this.state.activeProposal = proposal10;
        this.state.lastFetched = Date.now();
        
        // Save to local storage
        this.saveToLocalStorage({
          allProposals: allProposalsRes,
          activeProposal: proposal10,
          timestamp: Date.now()
        });
        
        this.notify();
      }
    } catch (error) {
      console.log('Background fetch failed, keeping existing data:', error);
    }
  }

  // Refresh data (force fetch from backend)
  async refresh(): Promise<void> {
    console.log('Refreshing data store...');
    this.state.lastFetched = null; // Force refresh
    await this.initialize();
  }

  // Get all proposals
  getAllProposals(): Proposal[] {
    return this.state.allProposals;
  }

  // Get active proposal
  getActiveProposal(): Proposal | null {
    return this.state.activeProposal;
  }

  // Get AI analysis
  getAIAnalysis(): AIAnalysisData[] {
    return this.state.aiAnalysis;
  }

  // Get loading state
  isLoading(): boolean {
    return this.state.loading;
  }

  // Get error state
  getError(): string | null {
    return this.state.error;
  }

  // Check if data is initialized
  isInitialized(): boolean {
    return this.state.isInitialized;
  }
}

// Create singleton instance
export const dataStore = new DataStore();
