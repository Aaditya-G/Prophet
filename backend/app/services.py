from .db.models import Proposal
from .schemas import ProposalSchema

def get_all_proposals():
    proposals = Proposal.query.all()
    result = [ProposalSchema.from_orm(p).dict() for p in proposals]
    return result

def get_proposal_by_id(proposal_id: int):
    proposal = Proposal.query.get(proposal_id)
    if proposal:
        return ProposalSchema.from_orm(proposal).dict()
    return None