from .db.models import Proposal
from .schemas import ProposalSchema
from .utils.offchain import offchain_service

def get_all_proposals():
    proposals = Proposal.query.all()
    result = [ProposalSchema.from_orm(p).dict() for p in proposals]
    return result

def get_proposal_details(proposal_id: str):
    proposal = Proposal.query.get(proposal_id)
    if not proposal:
        return None

    on_chain_data = ProposalSchema.from_orm(proposal).dict()
    
    discussion_posts = None
    if proposal.description:
        discussion_posts = offchain_service.get_filtered_discussion(proposal.description)

    return {
        "on_chain_data": on_chain_data,
        "off_chain_discussion": discussion_posts
    }