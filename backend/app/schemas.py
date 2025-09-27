from pydantic import BaseModel
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