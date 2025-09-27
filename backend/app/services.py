from .db.models import Proposal
from .schemas import ProposalSchema
from .utils.offchain import offchain_service
from .utils.foundation_data.foundation import DaoMetricsUtil
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
    discussion_posts = offchain_service.get_filtered_discussion(on_chain_data["description"])

    return {
        "on_chain_data": on_chain_data,
        "off_chain_discussion": discussion_posts
    }

def get_foundational_data():
    data = DaoMetricsUtil.get_all_dao_metrics()
    return data