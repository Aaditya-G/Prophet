from flask import Blueprint, jsonify
from .services import get_all_proposals, get_proposal_details , get_foundational_data

main = Blueprint('main', __name__)

@main.route('/api/proposals', methods=['GET'])
def fetch_proposals():
    try:
        # proposals_data = get_all_proposals()
        print(get_foundational_data())
        return jsonify({"a":"b"})
    except Exception as e:
        return jsonify({'error': 'An internal server error occurred'}), 500

@main.route('/api/proposals/<string:proposal_id>', methods=['GET'])
def fetch_proposal(proposal_id):
    try:
        proposal_data = get_proposal_details(proposal_id)
        if proposal_data:
            return jsonify(proposal_data)
        else:
            return jsonify({'error': 'Proposal not found'}), 404
    except Exception:
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'An internal server error occurred'}), 500
