import os
from uagents import Agent, Context, Protocol, Model
from uagents.setup import fund_agent_if_low
from . import archivist_logic
from dotenv import load_dotenv

load_dotenv()

class ContextResponse(Model):
    context: str

ARCHIVIST_SEED = os.getenv("ARCHIVIST_SEED")
agent = Agent(name="ArchivistAgent", port=8001, seed=ARCHIVIST_SEED)
fund_agent_if_low(agent.wallet.address())

class ContextRequest(Model):
    description: str

class ContextResponse(Model):
    context: str

archivist_protocol = Protocol("DAOArchivist", version="1.0")

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Archivist Agent started")

@archivist_protocol.on_message(model=ContextRequest, replies=ContextResponse)
async def handle_context_request(ctx: Context, sender: str, msg: ContextRequest):
    ctx.logger.info(f"Received context request from {sender}")
    context = archivist_logic.get_context(msg.description)
    await ctx.send(sender, ContextResponse(context=context))

agent.include(archivist_protocol)