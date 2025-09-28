import os
import re
import json
import logging
from typing import Dict, Any, Optional
from dotenv import load_dotenv

from google import genai
from llm_client import client, GEMINI_TEXT_MODEL

load_dotenv()

AGENT_ID = "strategist_agent"
THINKING_BUDGET = int(os.getenv("THINKING_BUDGET", "0"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


RECOMMEND_PROMPT = """
You are an objective DAO governance assistant. Given:
- Proposal summary: {summary}
- Identified risks: {risks}
- User constitution rules (short text): {constitution}

Produce ONLY a JSON object with keys:
{{
  "recommendation": "FOR" | "AGAINST" | "ABSTAIN",
  "rationale": "<short rationale 1-2 lines>",
  "confidence": 0.00-1.00,
  "reasoning_steps": ["step1","step2", "..."]
}}

Return strictly parseable JSON only.
"""

def _gemini_generate_text(prompt: str) -> str:
    """Helper function to generate text using Gemini."""
    cfg = genai.types.GenerateContentConfig(
        temperature=0.0, 
        thinking_config=genai.types.ThinkingConfig(thinking_budget=THINKING_BUDGET)
    )
    try:
        response = client.models.generate_content(
            model=GEMINI_TEXT_MODEL,
            contents=[prompt],
            config=cfg
        )
        return response.text
    except Exception as e:
        logger.error(f"[{AGENT_ID}] Error generating text with Gemini: {e}")
        return f"Error during generation: {e}"

def _safe_json_parse(text: str) -> Optional[Dict[str, Any]]:
    """Extract first JSON object from text and parse it robustly."""
    if not text: return None
    match = re.search(r'\{[\s\S]*\}', text)
    if not match: return None
    json_str = match.group(0)
    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        logger.warning(f"[{AGENT_ID}] Failed to parse JSON, attempting to fix common errors.")
        fixed_str = re.sub(r',\s*([}\]])', r'\1', json_str)
        try:
            return json.loads(fixed_str)
        except json.JSONDecodeError:
            logger.error(f"[{AGENT_ID}] Could not parse JSON even after fixing: {fixed_str}")
            return None

def get_recommendation(analysis_report: Dict[str, str], constitution: str) -> Dict[str, Any]:
    """
    Generates a final recommendation based on analysis and a user constitution.
    This is the primary public function for this agent.
    """
    logger.info(f"[{AGENT_ID}] Generating final recommendation...")
    
    prompt = RECOMMEND_PROMPT.format(
        summary=analysis_report.get("summary", "N/A"),
        risks=analysis_report.get("risks", "N/A"),
        constitution=constitution or "No constitution provided."
    )
    
    raw_output = _gemini_generate_text(prompt)
    parsed_json = _safe_json_parse(raw_output)
    
    if parsed_json:
        logger.info(f"[{AGENT_ID}] Successfully generated and parsed recommendation.")
        return parsed_json
    else:
        logger.warning(f"[{AGENT_ID}] Failed to parse recommendation JSON. Returning a fallback.")
        return {
            "recommendation": "ABSTAIN",
            "rationale": "Failed to generate a structured recommendation. Please review the raw analysis.",
            "confidence": 0.1,
            "reasoning_steps": ["LLM failed to produce valid JSON output."],
            # "raw_output": raw_output
        }