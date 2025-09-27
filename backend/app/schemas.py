from pydantic import BaseModel ,Field
from typing import List, Optional

class VoteSchema(BaseModel):
    id: str
    weight: int
    choice: str
    reason: Optional[str]

    class Config:
        orm_mode = True

class VoterSchema(BaseModel):
    id: str
    delegatedVotesRaw: int
    votes: List[VoteSchema] = []

    class Config:
        orm_mode = True

class ProposerSchema(BaseModel):
    id: str
    delegatedVotesRaw: int
    numberVotes: int
    tokenHoldersRepresentedAmount: int

    class Config:
        orm_mode = True

class ProposalSchema(BaseModel):
    id: str
    description: Optional[str]
    proposer: ProposerSchema
    state: str
    creationTime: int
    votes: List[VoteSchema] = []
    abstainDelegateVotes: int
    againstDelegateVotes: int
    forDelegateVotes: int
    quorumVotes: int
    totalDelegateVotes: int

    class Config:
        orm_mode = True

class OffChainPostSchema(BaseModel):
    cooked: Optional[str]
    reply_count: Optional[int]
    reads: Optional[int]
    score: Optional[float]
    trust_level: Optional[int]

class ProposalDetailSchema(BaseModel):
    on_chain_data: ProposalSchema
    off_chain_discussion: List[OffChainPostSchema] = Field(
        None, description="Discussion from the governance forum"
    )