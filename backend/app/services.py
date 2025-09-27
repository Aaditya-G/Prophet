from .db.models import Proposal
from .schemas import ProposalSchema

def get_all_proposals():
    proposals = Proposal.query.all()
    result = [ProposalSchema.from_orm(p).dict() for p in proposals]
    return result