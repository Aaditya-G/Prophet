from flask import Blueprint, jsonify
from .services import get_all_proposals

main = Blueprint('main', __name__)

@main.route('/api/proposals', methods=['GET'])
def fetch_proposals():
    proposals_data = get_all_proposals()
    return jsonify(proposals_data)