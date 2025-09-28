import os
import json
import time
import asyncio
from typing import Dict, Any, Optional
from uagents import Agent, Context, Protocol, Model
from uagents.setup import fund_agent_if_low
import hedera_utils
from dotenv import load_dotenv

load_dotenv()


ARCHIVIST_AGENT_ADDRESS = os.getenv("ARCHIVIST_AGENT_ADDRESS")
ANALYST_AGENT_ADDRESS = os.getenv("ANALYST_AGENT_ADDRESS")
STRATEGIST_AGENT_ADDRESS = os.getenv("STRATEGIST_AGENT_ADDRESS")

CONCIERGE_SEED = os.getenv("CONCIERGE_SEED")
agent = Agent(name="ConciergeAgent", port=8000, seed=CONCIERGE_SEED)
fund_agent_if_low(agent.wallet.address())

concierge_protocol = Protocol("DAOAnalysis", version="1.0")

class AnalysisRequest(Model):
    proposal_data_json: str
    constitution: str

class FinalResult(Model):
    response_json: str

class ContextRequest(Model):
    description: str

class ContextResponse(Model):
    context: str

class AnalysisTask(Model):
    proposal_data_json: str
    context: str

class AnalysisReport(Model):
    report_json: str

class RecommendationTask(Model):
    analysis_report_json: str
    constitution: str

class RecommendationResult(Model):
    recommendation_json: str

class HttpAnalysisRequest(Model):
    proposal_data_json: str
    constitution: str

class HttpAnalysisResponse(Model):
    status: str
    data: Dict[str, Any]
    timestamp: int

class WorkflowState:
    def __init__(self, request_id: str, proposal_data_json: str, constitution: str, is_http: bool = False):
        self.request_id = request_id
        self.proposal_data_json = proposal_data_json
        self.constitution = constitution
        self.is_http = is_http
        self.context: Optional[str] = None
        self.analysis_report: Optional[Dict] = None
        self.final_result: Optional[Dict] = None
        self.http_future: Optional[asyncio.Future] = None
        self.protocol_sender: Optional[str] = None

_workflows: Dict[str, WorkflowState] = {}
_workflow_counter = 0

def _log_handshake(ctx: Context, event_type: str, proposal_id: str, source: str, target: str, payload: dict = None):
    try:
        ctx.logger.info(f"HCS LOG: {event_type} for proposal {proposal_id}")
        hcs_message = {"eventType": event_type, "proposalId": str(proposal_id), "sourceAgent": source, "targetAgent": target, "timestamp": int(time.time())}
        if payload: 
            hcs_message.update(payload)
        hedera_utils.log_to_hedera(hcs_message)
    except Exception as e:
        ctx.logger.warning(f"Failed to log to Hedera: {e}")

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Concierge Agent started")
    ctx.logger.info("Agent addresses configured:")
    ctx.logger.info("Agent ready for HTTP requests (/analyze) and protocol messages")

async def _start_workflow(ctx: Context, proposal_data_json: str, constitution: str, is_http: bool = False, sender: str = None) -> str:
    """Start a new analysis workflow and return the workflow ID"""
    global _workflow_counter
    _workflow_counter += 1
    
    workflow_id = f"workflow_{_workflow_counter}_{int(time.time())}"
    workflow = WorkflowState(workflow_id, proposal_data_json, constitution, is_http)
    
    if is_http:
        workflow.http_future = asyncio.Future()
    else:
        workflow.protocol_sender = sender
    
    _workflows[workflow_id] = workflow
    
    proposal_data = json.loads(proposal_data_json)
    proposal_id = proposal_data.get("id", "unknown_proposal")
    
    _log_handshake(ctx, "ANALYSIS_REQUESTED", proposal_id, 
                  source="HTTP_CLIENT" if is_http else sender, 
                  target=agent.address)
    
    ctx.logger.info(f"Starting workflow {workflow_id}: requesting context from Archivist")
    await ctx.send(ARCHIVIST_AGENT_ADDRESS, ContextRequest(description=proposal_data.get("description", "")))
    
    return workflow_id

@agent.on_rest_post("analyze", HttpAnalysisRequest, HttpAnalysisResponse)
async def handle_http_request(ctx: Context, request: HttpAnalysisRequest) -> HttpAnalysisResponse:
    """Handle HTTP POST requests from client_cli.py"""
    ctx.logger.info("HTTP POST request received at /analyze")
    
    try:
        workflow_id = await _start_workflow(ctx, request.proposal_data_json, request.constitution, is_http=True)
        workflow = _workflows[workflow_id]
        
        try:
            result = await asyncio.wait_for(workflow.http_future, timeout=300.0)
            
            del _workflows[workflow_id]
            
            return HttpAnalysisResponse(
                status="success",
                data=result,
                timestamp=int(time.time())
            )
            
        except asyncio.TimeoutError:
            del _workflows[workflow_id]     
            return HttpAnalysisResponse(
                status="error", 
                data={"error": "Analysis timeout", "details": "Request timed out after 300 seconds"},
                timestamp=int(time.time())
            )

    except Exception as e:
        ctx.logger.error(f"HTTP request failed: {e}", exc_info=True)
        return HttpAnalysisResponse(
            status="error", 
            data={"error": "Analysis failed", "details": str(e)},
            timestamp=int(time.time())
        )

@concierge_protocol.on_message(model=AnalysisRequest, replies=FinalResult)
async def handle_analysis_request(ctx: Context, sender: str, msg: AnalysisRequest):
    ctx.logger.info(f"Received protocol analysis request from {sender}")
    try:
        workflow_id = await _start_workflow(ctx, msg.proposal_data_json, msg.constitution, is_http=False, sender=sender)
        ctx.logger.info(f"Started workflow {workflow_id} for protocol request from {sender}")
    except Exception as e:
        ctx.logger.error(f"Failed to start workflow for protocol request: {e}", exc_info=True)
        error_response = {
            "error": "Failed to start analysis workflow",
            "details": str(e)
        }
        await ctx.send(sender, FinalResult(response_json=json.dumps(error_response)))

@agent.on_message(model=ContextResponse)
async def handle_context_response(ctx: Context, sender: str, msg: ContextResponse):
    ctx.logger.info(f"Received context response from {sender}")
    
    workflow = None
    for w in _workflows.values():
        if w.context is None:
            workflow = w
            break
    
    if not workflow:
        ctx.logger.warning("Received context response but no workflow is waiting for it")
        return
    
    workflow.context = msg.context
    proposal_data = json.loads(workflow.proposal_data_json)
    proposal_id = proposal_data.get("id", "unknown_proposal")
    
    _log_handshake(ctx, "CONTEXT_DELIVERED", proposal_id, source=sender, target=agent.address, 
                  payload={"responsePayloadHash": hedera_utils.hash_data(msg.context)})
    
    ctx.logger.info(f"Workflow {workflow.request_id}: requesting analysis from Analyst")
    await ctx.send(ANALYST_AGENT_ADDRESS, AnalysisTask(
        proposal_data_json=workflow.proposal_data_json,
        context=workflow.context
    ))

@agent.on_message(model=AnalysisReport)
async def handle_analysis_report(ctx: Context, sender: str, msg: AnalysisReport):
    ctx.logger.info(f"Received analysis report from {sender}")
    
    workflow = None
    for w in _workflows.values():
        if w.context is not None and w.analysis_report is None:
            workflow = w
            break
    
    if not workflow:
        ctx.logger.warning("Received analysis report but no workflow is waiting for it")
        return
    
    workflow.analysis_report = json.loads(msg.report_json)
    proposal_data = json.loads(workflow.proposal_data_json)
    proposal_id = proposal_data.get("id", "unknown_proposal")
    
    _log_handshake(ctx, "ANALYSIS_DELIVERED", proposal_id, source=sender, target=agent.address,
                  payload={"responsePayloadHash": hedera_utils.hash_data(msg.report_json)})
    
    ctx.logger.info(f"Workflow {workflow.request_id}: requesting recommendation from Strategist")
    await ctx.send(STRATEGIST_AGENT_ADDRESS, RecommendationTask(
        analysis_report_json=json.dumps(workflow.analysis_report),
        constitution=workflow.constitution
    ))

@agent.on_message(model=RecommendationResult)
async def handle_recommendation_result(ctx: Context, sender: str, msg: RecommendationResult):
    ctx.logger.info(f"Received recommendation result from {sender}")
    
    workflow = None
    for w in _workflows.values():
        if w.analysis_report is not None and w.final_result is None:
            workflow = w
            break
    
    if not workflow:
        ctx.logger.warning("Received recommendation result but no workflow is waiting for it")
        return
    
    final_recommendation = json.loads(msg.recommendation_json)
    proposal_data = json.loads(workflow.proposal_data_json)
    proposal_id = proposal_data.get("id", "unknown_proposal")
    
    _log_handshake(ctx, "RECOMMENDATION_GENERATED", proposal_id, source=sender, target=agent.address,
                  payload={"constitutionHash": hedera_utils.hash_data(workflow.constitution), 
                          "finalRecommendation": final_recommendation})
    
    workflow.final_result = {
        "proposal_id": proposal_id,
        "recommendation": final_recommendation,
        "neutral_analysis": workflow.analysis_report,
        "historical_context_hash": hedera_utils.hash_data(workflow.context),
        "audit_trail_topic_id": hedera_utils.get_topic_id()
    }
    
    if workflow.is_http:
        workflow.http_future.set_result(workflow.final_result)
    else:
        await ctx.send(workflow.protocol_sender, FinalResult(response_json=json.dumps(workflow.final_result)))
        del _workflows[workflow.request_id]
    
    ctx.logger.info(f"Workflow {workflow.request_id} completed successfully")

agent.include(concierge_protocol)