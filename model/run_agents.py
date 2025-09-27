from uagents import Bureau
from agents.concierge_agent import agent as concierge_agent
from agents.archivist_agent import agent as archivist_agent
from agents.analyst_agent import agent as analyst_agent
from agents.strategist_agent import agent as strategist_agent

if __name__ == "__main__":
    bureau = Bureau(endpoint="http://0.0.0.0:8000", port=8000)

    bureau.add(concierge_agent)
    bureau.add(archivist_agent)
    bureau.add(analyst_agent)
    bureau.add(strategist_agent)

    print("Agents are now reachable on PORT 8000")
    bureau.run()
