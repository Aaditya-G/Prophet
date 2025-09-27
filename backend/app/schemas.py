from pydantic import BaseModel, Field
from typing import List, Optional

def to_camel(snake_str: str) -> str:
    parts = snake_str.split('_')
    return parts[0] + ''.join(x.title() for x in parts[1:])

class CamelCaseModel(BaseModel):
    class Config:
        from_attributes = True
        orm_mode = True
        alias_generator = to_camel
        allow_population_by_field_name = True

class VoteSchema(CamelCaseModel):
    id: str
    weight: int
    choice: str
    reason: Optional[str]

class VoterSchema(CamelCaseModel):
    id: str
    delegated_votes_raw: int
    votes: List[VoteSchema] = []

class ProposerSchema(CamelCaseModel):
    id: str
    delegated_votes_raw: Optional[int] = None
    number_votes: Optional[int] = None
    token_holders_represented_amount: Optional[int] = None

class ProposalSchema(CamelCaseModel):
    id: str
    description: Optional[str]
    proposer: ProposerSchema
    state: str
    creation_time: Optional[int] = None
    votes: List[VoteSchema] = []
    abstain_delegate_votes: Optional[int] = None
    against_delegate_votes: Optional[int] = None
    for_delegate_votes: Optional[int] = None
    quorum_votes: Optional[int] = None
    total_delegate_votes: Optional[int] = None

class OffChainPostSchema(CamelCaseModel):
    cooked: Optional[str]
    reply_count: Optional[int]
    reads: Optional[int]
    score: Optional[float]
    trust_level: Optional[int]

class ProposalDetailSchema(CamelCaseModel):
    on_chain_data: ProposalSchema
    off_chain_discussion: Optional[List[OffChainPostSchema]] = Field(
        None, description="Discussion from the governance forum"
    )