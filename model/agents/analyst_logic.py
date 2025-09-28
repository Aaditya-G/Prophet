import os, re, json
import logging
from typing import Dict, Any
from dotenv import load_dotenv

from google.genai import types

from llm_client import client, GEMINI_TEXT_MODEL

load_dotenv()

AGENT_ID = "analyst_agent"
THINKING_BUDGET = int(os.getenv("THINKING_BUDGET", "0"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


SUMMARIZE_PROMPT = """
You are a concise DAO governance analyst.
Summarize the following proposal text and its community discussion into 2-3 short bullets (<= 40 words total).
Focus on the core action of the proposal. If the proposal lists explicit KPIs, budgets, or durations, extract them:
KPI: <text>; Budget: <USD or token amount>; Duration: <text>

Proposal text and discussion:
{proposal_text}

Similar past proposals/context (if any):
{context}
"""


RISK_PROMPT = """
You are a conservative governance risk analyst. Given the full proposal context and current DAO health metrics, list up to 5 specific risks.
For each risk, provide a severity (low/medium/high) and a one-line justification.
**Crucially, consider the provided DAO health metrics (e.g., treasury runway, governance concentration, TVL trends) when assessing the proposal's financial and strategic risks.**

Summary:
{summary}

Full Proposal Context (including discussion and DAO metrics):
{full_text}

Historical Context:
{context}
"""

def _clean_html(raw_html: str) -> str:
    """A simple helper function to remove HTML tags from a string."""
    if not raw_html:
        return ""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext.strip().replace('\n', ' ')

def _gemini_generate_text(prompt: str) -> str:
    """Helper function to generate text using the shared Gemini client."""
    cfg = types.GenerateContentConfig(
        temperature=0.0, 
        thinking_config=types.ThinkingConfig(thinking_budget=THINKING_BUDGET)
    )
    try:
        resp = client.models.generate_content(
            model=GEMINI_TEXT_MODEL,
            contents=[prompt],
            config=cfg
        )
        return resp.text
    except Exception:
        try:
            return resp.candidates[0].content.parts[0].text
        except Exception as e:
            logger.error(f"[{AGENT_ID}] Error generating text with Gemini: {e}")
            return f"Error during generation: {e}"

def analyze(proposal_data: Dict[str, Any], context: str) -> Dict[str, str]:
    """
    Generates a neutral summary and risk analysis for a proposal, incorporating
    off-chain discussion and DAO-wide health metrics.
    """
    logger.info(f"[{AGENT_ID}] Starting neutral analysis...")

    description = proposal_data.get("description", "")
    off_chain_discussion = proposal_data.get("off_chain_discussion", [])
    dao_health_metrics = proposal_data.get("dao_health_metrics") 


    full_text_parts = [f"### Main Proposal Description:\n{description}"]


    if off_chain_discussion:
        discussion_points = [_clean_html(p.get("cooked", "")) for p in off_chain_discussion if _clean_html(p.get("cooked", ""))]
        if discussion_points:
            full_text_parts.append("\n### Community Discussion Highlights:\n" + "\n".join(f"- {point}" for point in discussion_points))


    if dao_health_metrics:

        metrics_str = json.dumps(dao_health_metrics, indent=2)
        full_text_parts.append(f"\n### Current DAO Health Metrics Snapshot:\n```json\n{metrics_str}\n```")

    full_proposal_text = "\n\n".join(full_text_parts)


    summary_text = f"### Main Proposal Description:\n{description}"
    if 'Community Discussion Highlights' in full_proposal_text:
        summary_text += "\n" + full_proposal_text.split('### Community Discussion Highlights:')[1].split('### Current DAO Health Metrics')[0]

    summary_prompt = SUMMARIZE_PROMPT.format(proposal_text=summary_text, context=context or "No context")
    summary = _gemini_generate_text(summary_prompt).strip()
    logger.info(f"[{AGENT_ID}] Generated summary.")


    risk_prompt = RISK_PROMPT.format(summary=summary, full_text=full_proposal_text, context=context or "No context")
    risks = _gemini_generate_text(risk_prompt).strip()
    logger.info(f"[{AGENT_ID}] Generated risk analysis using DAO health metrics.")

    return { "summary": summary, "risks": risks }