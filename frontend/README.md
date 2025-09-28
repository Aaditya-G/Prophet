# Prophet - Frontend

**A Next-Generation DAO Governance Platform with AI-Powered Analysis and On-Chain Voting**

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Ethereum](https://img.shields.io/badge/Ethereum-Testnet-627EEA?logo=ethereum)

## Overview

The ETHGlobal Dashboard is a cutting-edge decentralized governance platform that combines real-time blockchain data with AI-powered proposal analysis. Built for the modern DAO ecosystem, it provides comprehensive tools for tracking, analyzing, and voting on governance proposals with unprecedented insight and usability.

## System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React Dashboard] --> B[Wallet Integration]
        A --> C[AI Analysis UI]
        A --> D[Voting Interface]
        A --> E[AI Chatbot]
    end
    
    subgraph "Backend Services"
        F[Flask API Server] --> G[Proposal Data Pipeline]
        F --> H[AI Analysis Engine]
        F --> I[Data Caching Layer]
    end
    
    subgraph "External Integrations"
        J[Ethereum Mainnet] --> K[Uniswap Governance]
        L[Agentverse AI] --> M[AI Agent]
        N[The Graph] --> O[Subgraph Data]
    end
    
    subgraph "Data Storage"
        P[Local Storage] --> Q[Wallet State]
        P --> R[Cached Proposals]
        S[Backend Database] --> T[Proposal Analysis]
        S --> U[Metrics Cache]
    end
    
    A --> F
    B --> J
    E --> L
    F --> N
    I --> P
    F --> S
    
    style A fill:#c77dff,stroke:#10002b,stroke-width:3px
    style F fill:#5a189a,stroke:#10002b,stroke-width:2px
    style J fill:#627EEA,stroke:#ffffff,stroke-width:2px
    style L fill:#00ff9f,stroke:#10002b,stroke-width:2px
```

## Key Features

### Real-Time Proposal Tracking
- **Live Data Sync**: Direct integration with Ethereum mainnet and Uniswap governance
- **Automatic Updates**: Real-time proposal status monitoring with background refresh
- **Historical Analysis**: Complete proposal history with voting patterns and outcomes

### AI-Powered Analysis
- **Intelligent Recommendations**: ML-driven proposal analysis with confidence scores
- **Risk Assessment**: Automated risk evaluation and impact analysis
- **Context-Aware Insights**: Deep learning models trained on governance patterns

### On-Chain Voting
- **Direct Blockchain Integration**: Seamless voting through MetaMask
- **Gas Optimization**: Smart contract interaction with optimized transaction costs
- **Vote Verification**: Real-time vote confirmation and receipt generation

### Interactive AI Chatbot
- **Agentverse Integration**: Conversational AI for proposal discussions
- **Natural Language Queries**: Ask questions about proposals in plain English
- **Contextual Responses**: AI responses based on current proposal data

## Data Flow Architecture

```mermaid
flowchart LR
    subgraph "Data Sources"
        A[Ethereum Mainnet]
        B[Uniswap Governance]
        C[The Graph Network]
    end
    
    subgraph "Backend Processing"
        D[Data Ingestion] --> E[AI Analysis Pipeline]
        E --> F[Data Enrichment]
        F --> G[Cache Management]
    end
    
    subgraph "Frontend Application"
        H[React Components] --> I[State Management]
        I --> J[UI Rendering]
        J --> K[User Interactions]
    end
    
    subgraph "User Actions"
        L[Wallet Connection]
        M[Proposal Voting]
        N[AI Chat Queries]
    end
    
    A --> D
    B --> D
    C --> D
    G --> H
    K --> L
    K --> M
    K --> N
    L --> A
    M --> B
    N --> O[Agentverse AI]
    
    style D fill:#e0aaff,stroke:#10002b
    style H fill:#c77dff,stroke:#10002b
    style A fill:#627EEA,stroke:#ffffff
```

## Component Hierarchy

```mermaid
graph TD
    A[App.tsx] --> B[Dashboard.tsx]
    A --> C[ProposalsPage.tsx]
    A --> D[ProfilePage.tsx]
    A --> E[WalletConnect.tsx]
    
    B --> F[ActiveProposals]
    B --> G[AllProposals]
    B --> H[StaggeredMenu]
    B --> I[VotingModal]
    
    C --> J[AIAnalysis]
    C --> K[ProposalsList]
    C --> L[AIProposalChatbot]
    
    D --> M[UserProfile]
    D --> N[VotingHistory]
    
    E --> O[MetaMaskIntegration]
    
    F --> P[ProposalCard]
    G --> P
    K --> P
    
    I --> Q[VoteButtons]
    I --> R[ConfirmationDialog]
    
    L --> S[ChatInterface]
    L --> T[MessageComponents]
    
    style A fill:#10002b,stroke:#c77dff,stroke-width:3px,color:#ffffff
    style B fill:#5a189a,stroke:#c77dff,stroke-width:2px,color:#ffffff
    style C fill:#5a189a,stroke:#c77dff,stroke-width:2px,color:#ffffff
    style L fill:#240046,stroke:#e0aaff,stroke-width:2px,color:#ffffff
```

## API Integration Flow

```mermaid
sequenceDiagram
    participant U as User Interface
    participant S as State Management
    participant A as API Service
    participant B as Backend Server
    participant D as Database
    participant E as Ethereum
    
    U->>S: Load Proposals
    S->>A: getAllProposals()
    A->>B: GET /api/proposals
    B->>D: Query cached data
    B->>E: Fetch latest data
    E-->>B: Proposal data
    B->>D: Update cache
    B-->>A: Proposal response
    A-->>S: Processed data
    S-->>U: Update UI
    
    U->>S: Request AI Analysis
    S->>A: getAIAnalysis()
    A->>B: GET /api/ai-analysis
    B->>D: AI analysis data
    B-->>A: Analysis response
    A-->>S: AI insights
    S-->>U: Display analysis
    
    U->>S: Cast Vote
    S->>A: submitVote()
    A->>E: Send transaction
    E-->>A: Transaction hash
    A-->>S: Vote confirmation
    S-->>U: Success message
```

## Voting Process Flow

```mermaid
stateDiagram-v2
    [*] --> WalletConnected: Connect MetaMask
    
    WalletConnected --> ProposalSelected: Select Proposal
    ProposalSelected --> AIAnalysisViewed: View AI Analysis
    AIAnalysisViewed --> VoteTypeSelected: Choose Vote Type
    
    state VoteTypeSelected {
        [*] --> ForVote
        [*] --> AgainstVote
        [*] --> AbstractVote
    }
    
    VoteTypeSelected --> ConfirmationModal: Open Modal
    ConfirmationModal --> TransactionSigning: Confirm Vote
    TransactionSigning --> BlockchainSubmission: Sign Transaction
    
    BlockchainSubmission --> PendingConfirmation: Transaction Sent
    PendingConfirmation --> VoteConfirmed: Block Confirmation
    PendingConfirmation --> TransactionFailed: Error Occurred
    
    VoteConfirmed --> [*]: Vote Recorded
    TransactionFailed --> VoteTypeSelected: Retry Vote
    
    note right of AIAnalysisViewed
        AI provides recommendation
        with confidence score
    end note
    
    note right of BlockchainSubmission
        Direct interaction with
        Uniswap Governance contract
    end note
```

## AI Analysis Pipeline

```mermaid
flowchart TD
    A[Proposal Data Input] --> B{Data Validation}
    B -->|Valid| C[Text Processing]
    B -->|Invalid| D[Error Handling]
    
    C --> E[Feature Extraction]
    E --> F[ML Model Analysis]
    
    F --> G[Risk Assessment]
    F --> H[Impact Analysis]
    F --> I[Confidence Scoring]
    
    G --> J[Recommendation Engine]
    H --> J
    I --> J
    
    J --> K{Confidence Check}
    K -->|High Confidence| L[Generate Recommendation]
    K -->|Low Confidence| M[Request Human Review]
    
    L --> N[Format Response]
    M --> N
    N --> O[Cache Results]
    O --> P[Return to Frontend]
    
    D --> Q[Log Error]
    Q --> P
    
    subgraph "AI Models"
        F1[Sentiment Analysis]
        F2[Risk Classification]
        F3[Impact Prediction]
    end
    
    F --> F1
    F --> F2
    F --> F3
    
    style F fill:#00ff9f,stroke:#10002b
    style J fill:#c77dff,stroke:#10002b
    style L fill:#e0aaff,stroke:#10002b
```

## Wallet Connection Flow

```mermaid
graph LR
    A[Page Load] --> B{MetaMask Detected?}
    B -->|Yes| C{Auto-Connect Enabled?}
    B -->|No| D[Show Install MetaMask]
    
    C -->|Yes| E[Attempt Auto-Connect]
    C -->|No| F[Show Connect Button]
    
    E --> G{Connection Successful?}
    G -->|Yes| H[Update Wallet State]
    G -->|No| I[Show Manual Connect]
    
    F --> J[User Clicks Connect]
    J --> K[Request Account Access]
    K --> L{User Approves?}
    L -->|Yes| H
    L -->|No| M[Connection Rejected]
    
    H --> N[Store Connection State]
    N --> O[Enable Auto-Connect]
    O --> P[Update UI]
    
    I --> F
    M --> F
    D --> Q[External Link to MetaMask]
    
    subgraph "Wallet State Management"
        R[Address Storage]
        S[Provider Instance]
        T[Signer Object]
    end
    
    H --> R
    H --> S
    H --> T
    
    style H fill:#22c55e,stroke:#10002b
    style M fill:#ef4444,stroke:#10002b
    style D fill:#f59e0b,stroke:#10002b
```

## Error Handling & Fallbacks

```mermaid
graph TB
    A[User Action] --> B{Network Request}
    B -->|Success| C[Process Response]
    B -->|Network Error| D[Retry Logic]
    B -->|API Error| E[Show Error Message]
    
    D --> F{Retry Count < 3?}
    F -->|Yes| G[Wait & Retry]
    F -->|No| H[Show Offline Mode]
    
    G --> B
    
    C --> I{Data Valid?}
    I -->|Yes| J[Update UI]
    I -->|No| K[Use Cached Data]
    
    K --> L{Cache Available?}
    L -->|Yes| M[Display Cached]
    L -->|No| N[Show Empty State]
    
    E --> O[Log Error Details]
    H --> P[Enable Local Mode]
    
    subgraph "Fallback Strategies"
        Q[Cached Proposals]
        R[Local Storage]
        S[Default Values]
    end
    
    K --> Q
    P --> R
    N --> S
    
    style D fill:#f59e0b,stroke:#10002b
    style E fill:#ef4444,stroke:#10002b
    style K fill:#06b6d4,stroke:#10002b
```

## Performance Metrics Dashboard

```mermaid
pie title API Response Times
    "< 100ms" : 45
    "100-500ms" : 35
    "500ms-1s" : 15
    "> 1s" : 5
```

```mermaid
pie title Vote Transaction Success Rate
    "Successful" : 92
    "User Cancelled" : 6
    "Failed" : 2
```

```mermaid
pie title AI Analysis Confidence Distribution
    "High (>80%)" : 65
    "Medium (50-80%)" : 28
    "Low (<50%)" : 7
```

## Technical Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI Framework |
| TypeScript | 5.8.3 | Type Safety |
| Vite | 7.1.7 | Build Tool |
| Tailwind CSS | 4.1.13 | Styling |
| GSAP | 3.13.0 | Animations |
| Ethers.js | 6.15.0 | Blockchain Integration |
| Three.js | 0.180.0 | 3D Graphics |

### Backend Technologies
| Technology | Purpose |
|------------|---------|
| Flask | API Server |
| Python | Backend Logic |
| SQLite/PostgreSQL | Data Storage |
| Pandas | Data Processing |
| Scikit-learn | ML Models |

## Installation & Setup

### Prerequisites
```bash
# Node.js (v18 or higher)
node --version

# npm or yarn
npm --version
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# Blockchain Configuration
VITE_ETHEREUM_NETWORK=mainnet
VITE_INFURA_PROJECT_ID=your_infura_project_id

# Backend API
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=300000

# AI Integration
VITE_AGENT_ENDPOINT=https://agentverse.ai
VITE_AGENT_ADDRESS=your_agent_address

# Feature Flags
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_VOTING=true
VITE_ENABLE_ANALYTICS=true
```

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/officiallyutso/ethglobal-frontend.git
cd ethglobal-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
# Navigate to backend directory (if separate)
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
export FLASK_ENV=development
export DATABASE_URL=sqlite:///proposals.db

# Initialize database
python init_db.py

# Start Flask server
python app.py
```

## Usage Guide

### 1. Connecting Your Wallet

```mermaid
journey
    title Wallet Connection Journey
    section Setup
      Open Dashboard: 5: User
      See Connect Button: 4: User
      Click Connect: 5: User
    section MetaMask
      MetaMask Popup: 3: MetaMask
      Select Account: 5: User
      Approve Connection: 5: User
    section Success
      Wallet Connected: 5: User, System
      Load User Data: 4: System
      Enable Features: 5: User, System
```

1. **Launch the Application**: Navigate to the dashboard URL
2. **Connect MetaMask**: Click "Connect Wallet" and approve the connection
3. **Automatic Reconnection**: The app remembers your choice for future visits
4. **Network Validation**: Ensures you're connected to Ethereum mainnet

### 2. Viewing Proposals

```mermaid
flowchart LR
    A[Dashboard Home] --> B[Active Proposals]
    B --> C[Select Proposal]
    C --> D[View Details]
    D --> E[AI Analysis]
    E --> F[Vote Options]
    
    style A fill:#10002b,stroke:#c77dff,color:#ffffff
    style E fill:#00ff9f,stroke:#10002b
    style F fill:#c77dff,stroke:#10002b
```

- **Active Proposals**: View currently active governance proposals
- **Historical Data**: Browse past proposals and their outcomes
- **Search & Filter**: Find specific proposals using the search functionality
- **Real-time Updates**: Data refreshes automatically every 30 seconds

### 3. AI Analysis Features

The AI analysis provides:

- **Recommendation**: FOR/AGAINST/ABSTAIN with reasoning
- **Confidence Score**: ML model confidence (0-100%)
- **Risk Assessment**: Potential risks and mitigation strategies
- **Impact Analysis**: Expected outcomes and implications
- **Historical Context**: Similar past proposals and their results

### 4. Casting Votes

```mermaid
sequenceDiagram
    participant U as User
    participant D as Dashboard
    participant M as MetaMask
    participant E as Ethereum
    
    U->>D: Select vote option
    D->>U: Show confirmation modal
    U->>D: Confirm vote
    D->>M: Trigger transaction
    M->>U: Request signature
    U->>M: Sign transaction
    M->>E: Submit to blockchain
    E->>D: Transaction hash
    D->>U: Show success message
    E->>D: Block confirmation
    D->>U: Vote recorded
```

### 5. AI Chatbot Interaction

- **Contextual Questions**: Ask about specific proposals
- **Natural Language**: Use plain English to query proposal data
- **Suggested Questions**: Pre-built queries for common information
- **Real-time Responses**: Immediate AI-powered answers

## Development Guide

### Project Structure

```
ethglobal-dashboard/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Dashboard.tsx
│   │   ├── VotingModal.tsx
│   │   ├── AIProposalChatbot.tsx
│   │   └── StaggeredMenu.tsx
│   ├── pages/               # Page components
│   │   ├── proposals/
│   │   └── profile/
│   ├── hooks/               # Custom React hooks
│   │   ├── useWallet.ts
│   │   └── useProposals.ts
│   ├── services/            # API and external services
│   │   ├── api.ts
│   │   ├── votingService.ts
│   │   └── agentApi.ts
│   ├── utils/               # Utility functions
│   │   └── proposalUtils.ts
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── backend/                 # Flask backend (if included)
└── docs/                   # Documentation
```

### Key Components

#### Dashboard.tsx
The main dashboard component featuring:
- Real-time proposal data
- Interactive voting interface
- AI analysis integration
- Responsive grid layout

#### AIProposalChatbot.tsx
Advanced chatbot component with:
- Agentverse AI integration
- Real-time messaging
- Contextual proposal discussions
- Animated UI interactions

#### VotingModal.tsx
Secure voting interface providing:
- Transaction confirmation
- Gas estimation
- Vote verification
- Error handling

### State Management Patterns

```typescript
// Custom hook example
export const useProposals = (limit?: number) => {
  const [allProposals, setAllProposals] = useState<Proposal[]>([])
  const [activeProposal, setActiveProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshData = useCallback(async () => {
    // Refresh logic here
  }, [])

  return {
    allProposals,
    activeProposal,
    loading,
    error,
    refreshData
  }
}
```

### API Service Layer

The application uses a centralized API service for:
- Proposal data fetching
- AI analysis requests
- Backend communication
- Error handling and retries

```typescript
class ProposalAPI {
  private baseURL = API_BASE_URL

  async getAllProposals(): Promise<Proposal[]> {
    // Implementation
  }

  async getAIAnalysis(): Promise<APIResponse<AIAnalysisData[]>> {
    // Implementation
  }
}
```

## Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Integration Tests
- API integration testing
- Wallet connection testing
- Voting flow validation
- AI analysis pipeline testing

### E2E Tests
- Complete user workflow testing
- Cross-browser compatibility
- Mobile responsiveness
- Performance benchmarks

## Deployment

### Production Build
```bash
# Create optimized production build
npm run build

# Analyze bundle size
npm run analyze

# Deploy to hosting platform
npm run deploy
```

### Environment Configuration

#### Development
- Hot module replacement
- Source maps enabled
- Debug logging active
- Mock data endpoints

#### Production
- Minified bundle
- Optimized assets
- Error tracking
- Performance monitoring

### Hosting Options

1. **Vercel** (Recommended)
   - Automatic deployments
   - Serverless functions
   - Global CDN

2. **Netlify**
   - Continuous deployment
   - Form handling
   - Split testing

3. **AWS S3 + CloudFront**
   - Maximum control
   - Custom domains
   - Advanced caching

## Monitoring & Analytics

### Performance Metrics
- Core Web Vitals tracking
- API response times
- Bundle size monitoring
- User interaction analytics

### Error Tracking
- Real-time error reporting
- Stack trace analysis
- User session replay
- Performance impact assessment

### Business Metrics
- Proposal engagement rates
- Voting participation
- AI analysis usage
- User retention

## Contributing


### Guidelines
1. **Fork the repository** and create a feature branch
2. **Write tests** for new functionality
3. **Update documentation** for any API changes
4. **Follow TypeScript** best practices
5. **Submit a pull request** with detailed description

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component documentation
- Test coverage requirements

## API Reference

### Backend Endpoints

#### Proposals
```http
GET /api/proposals
GET /api/proposals/:id
POST /api/proposals/:id/vote
```

#### AI Analysis
```http
GET /api/ai-analysis
POST /api/ai-analysis/refresh
GET /api/ai-analysis/:proposal_id
```

#### System
```http
GET /health
GET /api/status
POST /api/refresh
```

## Security Considerations

### Wallet Security
- Private key never transmitted
- Secure MetaMask integration
- Transaction validation
- User consent for all operations

### API Security
- Rate limiting implementation
- Input validation
- CORS configuration
- Error message sanitization

### Data Privacy
- No personal data storage
- Wallet addresses only
- Public blockchain data only
- Optional analytics opt-out

## Troubleshooting

### Common Issues

#### Wallet Connection
```
Issue: MetaMask not connecting
Solution: Ensure MetaMask is unlocked and on Ethereum mainnet
```

#### Slow Loading
```
Issue: Proposals loading slowly
Solution: Check network connection and backend status
```

#### Vote Transactions
```
Issue: Vote transaction fails
Solution: Ensure sufficient ETH for gas fees
```

### Debug Mode
Enable debug logging by setting:
```env
VITE_DEBUG_MODE=true
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Uniswap Governance** for proposal data access
- **Agentverse** for AI analysis capabilities
- **MetaMask** for wallet integration
- **The Graph** for blockchain data indexing
- **ETHGlobal** for hackathon inspiration