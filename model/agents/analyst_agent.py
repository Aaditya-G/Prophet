import json, os
from uagents import Agent, Context, Protocol, Model
from uagents.setup import fund_agent_if_low
from . import analyst_logic
from dotenv import load_dotenv

load_dotenv()

class AnalysisReport(Model):
    report_json: str

ANALYST_SEED = os.getenv("ANALYST_SEED")
agent = Agent(name="AnalystAgent", port=8002, seed=ANALYST_SEED)
fund_agent_if_low(agent.wallet.address())

class AnalysisTask(Model):
    proposal_data_json: str
    context: str

class AnalysisReport(Model):
    report_json: str

analyst_protocol = Protocol("DAOAnalyst", version="1.0")

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Analyst Agent started")

@analyst_protocol.on_message(model=AnalysisTask, replies=AnalysisReport)
async def handle_analysis_task(ctx: Context, sender: str, msg: AnalysisTask):
    ctx.logger.info(f"Received analysis task from {sender}")
    proposal_data = json.loads(msg.proposal_data_json)
    report_dict = analyst_logic.analyze(proposal_data, msg.context)
    await ctx.send(sender, AnalysisReport(report_json=json.dumps(report_dict)))

agent.include(analyst_protocol)