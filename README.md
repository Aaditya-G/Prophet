# Prophet - Backend

**AI-Powered DAO Governance Analysis System with Multi-Agent Architecture**

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)
![Flask](https://img.shields.io/badge/Flask-2.3+-000000?logo=flask)
![Rust](https://img.shields.io/badge/Rust-1.70+-000000?logo=rust)
![Hedera](https://img.shields.io/badge/Hedera-Consensus-00D4AA)

## Overview

The Prophet backend serves as a comprehensive solution to the DAO participation problem, where the incredible amount of data, sheer speed of progress, and complexity effectively centralizes power, defeating a DAO's fundamental purpose. Through a sophisticated combination of 4 on-chain micro-agents powered by ASI (Artificial Superintelligence), our system creates a unified intelligence layer that browser-based frontends can query for deep DAO proposal analysis.

Our multi-agent architecture analyzes DAO proposals across multiple dimensions and recommends voting decisions based on comprehensive on-chain and off-chain factors. The system clearly portrays risk factors, statistical patterns, and incorporates user constitutional preferences to tailor personalized recommendations. For complete transparency and auditability, it enables direct chat communication with agents about specific proposals while logging all AI reasoning and discussions immutably on Hedera's consensus service.

The platform combines governance forum discussions, historically similar proposals, comprehensive statistical analysis, and real-time on-chain data through both established Subgraphs and our custom-deployed Substreams via The Graph Protocol. This ensures the freshest and most comprehensive dataset is available for training our recommendation models, ultimately enabling all stakeholders to meaningfully participate in shaping their DAO's future and achieving true decentralization.

## Key Features

### Intelligent Multi-Agent Analysis
The system employs four specialized AI agents working in concert to provide comprehensive proposal analysis. Each agent handles distinct aspects of the decision-making process, from historical context retrieval to final strategic recommendations, ensuring no critical factor is overlooked in the governance evaluation.

### Constitutional Alignment
Our recommendation engine incorporates user-defined constitutional principles and values, tailoring voting suggestions to align with individual stakeholder beliefs while maintaining objective analysis of proposal merits and risks.

### Comprehensive Data Integration
The platform aggregates data from multiple sources including blockchain events via custom Substreams, governance forum discussions through Discourse API integration, historical proposal patterns, and real-time statistical analysis to provide the most complete picture possible.

### Transparent Audit Trail
Every AI decision, inter-agent communication, and analysis step is immutably logged on Hedera's consensus service, providing complete transparency and auditability for all stakeholders to verify the integrity of recommendations.

### Interactive Agent Communication
Users can engage in natural language conversations with the AI agents, asking clarifying questions about specific proposals, exploring alternative scenarios, and understanding the reasoning behind recommendations.

## System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Frontend Dashboard] --> B[REST API]
        C[CLI Client] --> B
    end
    
    subgraph "Flask API Server"
        B --> D[Controllers]
        D --> E[Services Layer]
        E --> F[Database Models]
        E --> G[Agent Orchestrator]
    end
    
    subgraph "Multi-Agent System"
        G --> H[Concierge Agent]
        H --> I[Archivist Agent]
        H --> J[Analyst Agent] 
        H --> K[Strategist Agent]
    end
    
    subgraph "Data Sources"
        L[Substreams Pipeline] --> M[Ethereum Mainnet]
        N[GraphQL Subgraph] --> O[The Graph Network]
        P[Discourse API] --> Q[Governance Forums]
    end
    
    subgraph "External Services"
        R[Gemini AI] --> S[LLM Analysis]
        T[Hedera Consensus] --> U[Audit Trail]
        V[Vector Database] --> W[Historical Context]
    end
    
    subgraph "Storage Layer"
        X[SQLite/PostgreSQL] --> Y[Proposals]
        X --> Z[Analysis Results]
        AA[File System] --> BB[Cached Data]
    end
    
    L --> F
    N --> F
    P --> I
    J --> R
    H --> T
    I --> V
    F --> X
    E --> AA
    
    style H fill:#c77dff,stroke:#10002b,stroke-width:3px
    style B fill:#5a189a,stroke:#10002b,stroke-width:2px
    style M fill:#627EEA,stroke:#ffffff,stroke-width:2px
    style T fill:#00D4AA,stroke:#10002b,stroke-width:2px
```

## Agent Communication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant CO as Concierge
    participant AR as Archivist
    participant AN as Analyst
    participant ST as Strategist
    participant H as Hedera
    
    C->>CO: Analysis Request
    CO->>H: Log Request Event
    CO->>AR: Context Request
    AR->>AR: Query Historical Data
    AR->>CO: Historical Context
    CO->>H: Log Context Delivery
    
    CO->>AN: Analysis Task + Context
    AN->>AN: AI Analysis
    AN->>CO: Analysis Report
    CO->>H: Log Analysis Complete
    
    CO->>ST: Recommendation Task
    ST->>ST: Generate Strategy
    ST->>CO: Final Recommendation
    CO->>H: Log Final Result
    CO->>C: Complete Analysis
```
<img width="1269" height="1740" alt="diagram-export-28-9-2025-8_21_18-am" src="https://github.com/user-attachments/assets/2a8abe17-4de8-4c0c-9fec-14f30388bbe4" />

This multi-agent system built using the Fetch.ai uagents framework analyzes DAO governance proposals. It demonstrates how specialized, autonomous agents can collaborate to perform a complex task that requires context, analysis, and strategic decision-making. The system is designed to be transparent and auditable by logging key interactions to the Hedera Consensus Service.

The workflow begins when a user submits a proposal to analyze. A central ConciergeAgent receives the request and orchestrates the process. It first tasks an ArchivistAgent with retrieving relevant historical proposals from a local ChromaDB vector store. This context is then passed, along with the original proposal, to an AnalystAgent which uses Google's Gemini AI to produce a neutral summary and identify potential risks.

Finally, the StrategistAgent receives this neutral analysis and a user-defined "constitution" (a set of voting principles). It uses the Gemini AI to weigh the analysis against these principles and generates a final recommendation of FOR, AGAINST, or ABSTAIN. The entire process is tracked by the Concierge, which logs cryptographic hashes of the data exchanged between agents to Hedera, creating a verifiable, immutable audit trail of the workflow. The final, comprehensive result is then returned to the user.



## Data Pipeline Architecture

```mermaid
flowchart LR
    subgraph "Blockchain Data"
        A[Ethereum Mainnet] --> B[Substreams Processor]
        B --> C[Event Extraction]
        C --> D[Data Transformation]
    end
    
    subgraph "Off-Chain Data"
        E[Governance Forums] --> F[Discourse Scraper]
        F --> G[Content Processing]
        G --> H[Sentiment Analysis]
    end
    
    subgraph "Processing Layer"
        D --> I[Data Normalization]
        H --> I
        I --> J[Schema Validation]
        J --> K[Database Storage]
    end
    
    subgraph "AI Enhancement"
        K --> L[Vector Embedding]
        L --> M[Context Enrichment]
        M --> N[Analysis Pipeline]
    end
    
    subgraph "API Layer"
        N --> O[REST Endpoints]
        O --> P[Response Formatting]
        P --> Q[Client Delivery]
    end
    
    style B fill:#e0aaff,stroke:#10002b
    style I fill:#c77dff,stroke:#10002b
    style N fill:#00ff9f,stroke:#10002b
```

## Agent Responsibilities

```mermaid
graph TD
    A[Concierge Agent] --> B[Request Orchestration]
    A --> C[Workflow Management]
    A --> D[Audit Logging]
    
    E[Archivist Agent] --> F[Historical Context]
    E --> G[Data Retrieval]
    E --> H[Pattern Recognition]
    
    I[Analyst Agent] --> J[Proposal Analysis]
    I --> K[Risk Assessment]
    I --> L[Impact Evaluation]
    
    M[Strategist Agent] --> N[Recommendations]
    M --> O[Strategy Formation]
    M --> P[Constitutional Alignment]
    
    style A fill:#10002b,stroke:#c77dff,color:#ffffff
    style E fill:#5a189a,stroke:#c77dff,color:#ffffff
    style I fill:#240046,stroke:#e0aaff,color:#ffffff
    style M fill:#7209b7,stroke:#e0aaff,color:#ffffff
```

## Database Schema

```mermaid
erDiagram
    PROPOSAL ||--o{ VOTE : has
    PROPOSAL ||--|| PROPOSER : created_by
    VOTE ||--|| VOTER : cast_by
    PROPOSAL ||--o{ ANALYSIS_RESULT : analyzed_in
    
    PROPOSAL {
        string id PK
        string description
        string state
        bigint creation_time
        bigint for_delegate_votes
        bigint against_delegate_votes
        bigint abstain_delegate_votes
        bigint quorum_votes
    }
    
    PROPOSER {
        string id PK
        bigint delegated_votes_raw
        int number_votes
        int token_holders_represented
    }
    
    VOTER {
        string id PK
        bigint delegated_votes_raw
    }
    
    VOTE {
        string id PK
        string choice
        bigint weight
        string reason
    }
    
    ANALYSIS_RESULT {
        string id PK
        string agent_type
        json analysis_data
        timestamp created_at
        float confidence_score
    }
```

## API Endpoints

```mermaid
graph LR
    A["/api"] --> B["/proposals"]
    A --> C["/dao-metrics"]
    
    B --> E["GET /"]
    B --> F["GET /{id}"]
    B --> G["POST /{id}/analyze"]
    
    C --> H["GET /"]
    C --> I["GET /foundation"]
    
    
    style A fill:#10002b,stroke:#c77dff,color:#ffffff
    style B fill:#5a189a,stroke:#c77dff,color:#ffffff
    style C fill:#240046,stroke:#e0aaff,color:#ffffff
```

## Core Problem & Solution

### The DAO Participation Challenge
Modern DAOs face a critical paradox: while designed for decentralized decision-making, the overwhelming complexity of governance proposals, rapid pace of development, and sheer volume of relevant data effectively centralizes decision-making power among a small group of highly informed participants. This concentration defeats the fundamental purpose of decentralized autonomous organizations.

### Prophet's Approach
Prophet addresses this challenge through a sophisticated multi-agent AI system that democratizes access to comprehensive governance analysis. By processing vast amounts of on-chain data, forum discussions, historical patterns, and constitutional frameworks, the system enables every stakeholder to make informed decisions regardless of their technical expertise or available time for research.

The platform combines cutting-edge blockchain data processing through Substreams, natural language processing for forum analysis, machine learning for pattern recognition, and transparent audit trails via Hedera consensus service to create a trustworthy, comprehensive governance assistant.

## Technology Stack Distribution

```mermaid
pie title Data Sources
    "On-Chain Events" : 45
    "Forum Discussions" : 30
    "Historical Analysis" : 15
    "External APIs" : 10
```

```mermaid
pie title Agent Workload
    "Analysis Tasks" : 40
    "Context Retrieval" : 25
    "Orchestration" : 20
    "Strategy Generation" : 15
```

## Performance Metrics

```mermaid
xychart-beta
    title "API Response Times (ms)"
    x-axis [Proposals, Analysis, Metrics, Agents]
    y-axis "Response Time" 0 --> 2000
    bar [150, 1200, 300, 800]
```

```mermaid
xychart-beta
    title "Agent Processing Times (seconds)"
    x-axis [Archivist, Analyst, Strategist, Total]
    y-axis "Processing Time" 0 --> 60
    bar [8, 25, 15, 48]
```

## Substreams Data Flow

```mermaid
flowchart TD
    A[Ethereum Block] --> B{Event Filter}
    B -->|ProposalCreated| C[Map Proposals]
    B -->|VoteCast| D[Map Votes]
    
    C --> E[Decode ABI Data]
    D --> F[Decode Vote Data]
    
    E --> G[Extract Proposal Info]
    F --> H[Extract Vote Info]
    
    G --> I[Database Changes]
    H --> I
    
    I --> J[Entity Updates]
    J --> K[GraphQL Subgraph]
    K --> L[API Consumption]
    
    style B fill:#627EEA,stroke:#ffffff
    style I fill:#e0aaff,stroke:#10002b
    style K fill:#c77dff,stroke:#10002b
```

## Agent State Machine

```mermaid
stateDiagram-v2
    [*] --> Idle
    
    Idle --> Processing : Request Received
    Processing --> Context_Retrieval : Archivist Query
    Context_Retrieval --> Analysis : Context Retrieved
    Analysis --> Strategy : Analysis Complete
    Strategy --> Logging : Strategy Generated
    Logging --> Response : Audit Logged
    Response --> Idle : Response Sent
    
    Processing --> Error : Request Failed
    Context_Retrieval --> Error : Context Failed
    Analysis --> Error : Analysis Failed
    Strategy --> Error : Strategy Failed
    
    Error --> Idle : Error Handled
    
    note right of Logging
        Hedera Consensus Service
        logs all major events
    end note
```

## Error Handling Flow

```mermaid
graph TB
    A[Request] --> B{Input Valid?}
    B -->|No| C[Validation Error]
    B -->|Yes| D[Process Request]
    
    D --> E{Service Available?}
    E -->|No| F[Service Error]
    E -->|Yes| G[Execute Logic]
    
    G --> H{Operation Success?}
    H -->|No| I[Processing Error]
    H -->|Yes| J[Return Result]
    
    C --> K[Error Response]
    F --> L[Retry Logic]
    I --> M[Fallback Strategy]
    
    L --> N{Retry Count < 3?}
    N -->|Yes| D
    N -->|No| K
    
    M --> O{Fallback Available?}
    O -->|Yes| P[Use Cached Data]
    O -->|No| K
    
    P --> J
    
    style K fill:#ef4444,stroke:#10002b
    style L fill:#f59e0b,stroke:#10002b
    style P fill:#06b6d4,stroke:#10002b
```

## Configuration Management

```mermaid
graph LR
    A[Environment Variables] --> B[Config Loader]
    C[.env Files] --> B
    D[CLI Arguments] --> B
    
    B --> E{Environment}
    E -->|Development| F[Dev Config]
    E -->|Production| G[Prod Config]
    E -->|Testing| H[Test Config]
    
    F --> I[Application Instance]
    G --> I
    H --> I
    
    I --> J[Database Connection]
    I --> K[Agent Network]
    I --> L[External APIs]
    
    style B fill:#10002b,stroke:#c77dff,color:#ffffff
    style I fill:#c77dff,stroke:#10002b
```

## Security Architecture

```mermaid
graph TB
    subgraph "Input Validation"
        A[Request] --> B[Schema Validation]
        B --> C[SQL Injection Prevention]
        C --> D[XSS Protection]
    end
    
    subgraph "Authentication"
        E[API Keys] --> F[Rate Limiting]
        F --> G[Access Control]
    end
    
    subgraph "Data Protection"
        H[Encrypted Storage] --> I[Secure Transmission]
        I --> J[Audit Logging]
    end
    
    subgraph "Infrastructure"
        K[Network Security] --> L[Container Isolation]
        L --> M[Environment Separation]
    end
    
    D --> E
    G --> H
    J --> K
    
    style B fill:#22c55e,stroke:#10002b
    style F fill:#f59e0b,stroke:#10002b
    style I fill:#06b6d4,stroke:#10002b
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Load Balancer"
        A[Nginx] --> B[Flask App 1]
        A --> C[Flask App 2]
        A --> D[Flask App N]
    end
    
    subgraph "Application Layer"
        B --> E[Agent Network]
        C --> E
        D --> E
    end
    
    subgraph "Data Layer"
        F[PostgreSQL Primary] --> G[PostgreSQL Replica]
        H[Redis Cache] --> I[File Storage]
    end
    
    subgraph "External Services"
        J[Hedera Network]
        K[Ethereum RPC]
        L[AI Services]
    end
    
    E --> F
    E --> H
    E --> J
    E --> K
    E --> L
    
    style A fill:#10002b,stroke:#c77dff,color:#ffffff
    style E fill:#c77dff,stroke:#10002b
    style F fill:#5a189a,stroke:#c77dff,color:#ffffff
```

## Installation & Setup

### Prerequisites

| Component | Version | Purpose |
|-----------|---------|---------|
| Python | 3.9+ | Backend Runtime |
| Rust | 1.70+ | Substreams Processing |
| PostgreSQL | 13+ | Data Storage |
| Redis | 6+ | Caching Layer |

### Environment Configuration

```bash
# Core Services
FLASK_ENV=development
DATABASE_URL=postgresql://user:pass@localhost/prophet
REDIS_URL=redis://localhost:6379

# AI Services  
GEMINI_API_KEY=your_gemini_key
GEMINI_TEXT_MODEL=gemini-2.5-flash

# Blockchain
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your_key
SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/uniswap/governance

# Hedera Consensus
HEDERA_ACCOUNT_ID=0.0.123456
HEDERA_PRIVATE_KEY=your_private_key
HEDERA_TOPIC_ID=0.0.789012

# Agent Configuration
CONCIERGE_SEED=your_concierge_seed
ARCHIVIST_SEED=your_archivist_seed
ANALYST_SEED=your_analyst_seed
STRATEGIST_SEED=your_strategist_seed
```

### Quick Start

```bash
# Clone and setup
git clone https://github.com/your-org/prophet-backend.git
cd prophet-backend

# Install dependencies
pip install -r requirements.txt

# Database setup
flask db upgrade

# Start services
python run_agents.py &  # Start agent network
python run.py          # Start Flask API
```

## API Usage Examples

### Get All Proposals
```bash
curl -X GET http://localhost:5000/api/proposals
```

### Analyze Specific Proposal
```bash
curl -X POST http://localhost:5000/api/agents/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "proposal_data_json": "...",
    "constitution": "..."
  }'
```

### Get DAO Metrics
```bash
curl -X GET http://localhost:5000/api/dao-metrics
```

## Testing Strategy

```mermaid
graph LR
    A[Unit Tests] --> B[Integration Tests]
    B --> C[Agent Tests]
    C --> D[E2E Tests]
    
    A --> E[Models & Utils]
    B --> F[API Endpoints]
    C --> G[Agent Communication]
    D --> H[Full Workflow]
    
    style A fill:#22c55e,stroke:#10002b
    style B fill:#f59e0b,stroke:#10002b
    style C fill:#06b6d4,stroke:#10002b
    style D fill:#ef4444,stroke:#10002b
```

### Test Coverage Distribution

```mermaid
pie title Test Coverage by Component
    "Core Logic" : 85
    "API Endpoints" : 78
    "Agent System" : 65
    "Database Layer" : 92
```

## Monitoring & Observability

```mermaid
graph TB
    A[Application Metrics] --> B[Prometheus]
    C[Log Aggregation] --> D[ELK Stack]
    E[Distributed Tracing] --> F[Jaeger]
    G[Health Checks] --> H[Custom Dashboard]
    
    B --> I[Grafana]
    D --> I
    F --> I
    H --> I
    
    I --> J[Alert Manager]
    J --> K[Notification Channels]
    
    style I fill:#c77dff,stroke:#10002b
    style J fill:#ef4444,stroke:#10002b
```

## Performance Optimization

### Database Optimization
- Connection pooling with SQLAlchemy
- Query optimization and indexing
- Read replica for analytical queries
- Caching layer with Redis

### Agent Network Optimization
- Asynchronous message passing
- Request batching and queuing
- Circuit breaker pattern
- Graceful degradation

### API Optimization
- Response compression
- Pagination for large datasets
- Background task processing
- CDN for static assets

## Security Measures

### Data Protection
- Encryption at rest and in transit
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Access Control
- API key authentication
- Rate limiting per client
- IP whitelisting for admin endpoints
- Audit logging for all operations

### Infrastructure Security
- Container isolation
- Network segmentation
- Regular security updates
- Vulnerability scanning

## Contributing Guidelines

1. **Development Setup**: Follow installation guide
2. **Code Standards**: Use Black formatter, follow PEP 8
3. **Testing**: Maintain >80% coverage
4. **Documentation**: Update README for API changes
5. **Pull Requests**: Include tests and documentation

## Troubleshooting

### Common Issues

#### Agent Communication Failures
```
Error: Agent timeout
Solution: Check agent network status and restart if needed
```

#### Database Connection Issues
```
Error: Connection refused
Solution: Verify PostgreSQL is running and credentials are correct
```

#### High Memory Usage
```
Error: Out of memory
Solution: Implement pagination and optimize query patterns
```

## License

ISC License - see LICENSE file for details.
