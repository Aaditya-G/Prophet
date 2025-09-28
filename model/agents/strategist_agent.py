import json, os
from uagents import Agent, Context, Protocol, Model
from uagents.setup import fund_agent_if_low
from . import strategist_logic
from dotenv import load_dotenv

load_dotenv()

class RecommendationResult(Model):
    recommendation_json: str

STRATEGIST_SEED = os.getenv("STRATEGIST_SEED")
agent = Agent(name="StrategistAgent", port=8003, seed=STRATEGIST_SEED)
fund_agent_if_low(agent.wallet.address())

class RecommendationTask(Model):
    analysis_report_json: str
    constitution: str

class RecommendationResult(Model):
    recommendation_json: str

strategist_protocol = Protocol("DAOStrategist", version="1.0")

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Strategist Agent started with address: {agent.address}")

@strategist_protocol.on_message(model=RecommendationTask, replies=RecommendationResult)
async def handle_recommendation_task(ctx: Context, sender: str, msg: RecommendationTask):
    ctx.logger.info(f"Received recommendation task from {sender}")
    analysis_report = json.loads(msg.analysis_report_json)
    recommendation = strategist_logic.get_recommendation(analysis_report, msg.constitution)
    await ctx.send(sender, RecommendationResult(recommendation_json=json.dumps(recommendation)))

agent.include(strategist_protocol)