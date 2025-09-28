import json
import os
import asyncio
import httpx
from dotenv import load_dotenv
from flask import Flask, request, jsonify

load_dotenv()

BUREAU_URL = os.getenv("BUREAU_URL")
DAO_API_BASE_URL = os.getenv("DAO_API_BASE_URL")
DAO_INFO_ENDPOINT = os.getenv("DAO_INFO_ENDPOINT")
SERVER_PORT = 5001


app = Flask(__name__)

@app.route("/analyze_proposal", methods=["POST"])
async def analyze_proposal_endpoint():
    """
    Receives a proposal ID, fetches proposal details and DAO-wide health metrics,
    sends the combined data to the agent bureau for analysis, and returns the result.
    """
    data = request.get_json()
    if not data or "proposal_id" not in data:
        return jsonify({"error": "Missing 'proposal_id' in request body"}), 400

    proposal_id = data["proposal_id"]
    constitution = data.get("constitution", "Be objective.")

    print(f"Received analysis request for proposal ID: {proposal_id}")

    try:
        async with httpx.AsyncClient() as client:

            print(f"Fetching data for proposal {proposal_id} and DAO-wide metrics...")

            proposal_details_url = f"{DAO_API_BASE_URL}/proposals/{proposal_id}"
            specific_proposal_task = client.get(proposal_details_url, timeout=30.0)     #onchain and offchain data


            dao_metrics = client.get(DAO_INFO_ENDPOINT, timeout=30.0)


            responses = await asyncio.gather(specific_proposal_task, dao_metrics, return_exceptions=True)


            if isinstance(responses[0], Exception):
                raise responses[0]
            if isinstance(responses[1], Exception):
                raise responses[1]

            responses[0].raise_for_status()
            responses[1].raise_for_status()

            specific_proposal_data = responses[0].json()
            dao_info_data = responses[1].json()


            combined_data = specific_proposal_data.get("on_chain_data", {})


            combined_data["off_chain_discussion"] = specific_proposal_data.get("off_chain_discussion", [])


            combined_data["dao_health_metrics"] = dao_info_data


            payload = {
                "proposal_data_json": json.dumps(combined_data),
                "constitution": constitution
            }


            analysis_endpoint_url = f"{BUREAU_URL}/analyze"
            print(f"Sending combined data to agent bureau at {analysis_endpoint_url}...")

            bureau_response = await client.post(analysis_endpoint_url, json=payload, timeout=300.0)
            bureau_response.raise_for_status()
            final_result = bureau_response.json()

            print("Successfully received analysis from agent bureau.")

            return jsonify(final_result)

    except httpx.HTTPStatusError as e:
        error_message = f"Error communicating with a service: {e.response.status_code} on URL {e.request.url}"
        print(error_message)
        return jsonify({"error": error_message, "details": e.response.text}), 502
    except httpx.RequestError as e:
        error_message = f"Could not connect to a service: {e.request.url}"
        print(error_message)
        return jsonify({"error": error_message}), 504
    except Exception as e:
        error_message = f"An unexpected error occurred: {type(e).__name__} - {e}"
        print(error_message)
        return jsonify({"error": error_message}), 500


if __name__ == "__main__":
    print(f"API Gateway for DAO Analysis starting on http://0.0.0.0:{SERVER_PORT}")
    app.run(host="0.0.0.0", port=SERVER_PORT, debug=True)