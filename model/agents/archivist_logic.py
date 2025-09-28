import os
import logging
from typing import List
from dotenv import load_dotenv

import chromadb
from google.genai import types

from llm_client import client, GEMINI_EMBED_MODEL

load_dotenv()

AGENT_ID = "archivist_logic"
CHROMA_PERSIST_DIR = os.getenv("CHROMA_DIR", "./chroma_db")
CHROMA_COLLECTION_NAME = os.getenv("CHROMA_COLLECTION", "proposals")
TOP_K = int(os.getenv("RETRIEVER_TOP_K", "4"))

chroma_client = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
collection = chroma_client.get_or_create_collection(CHROMA_COLLECTION_NAME)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info(f"[{AGENT_ID}] Initialized ChromaDB client from '{CHROMA_PERSIST_DIR}'.")

def _gemini_embed_texts(texts: List[str]) -> List[List[float]]:
    """Helper function to embed texts using the shared Gemini client."""
    if not isinstance(texts, list):
        texts = [texts]
    
    resp = client.models.embed_content(
        model=GEMINI_EMBED_MODEL,
        contents=texts,
        config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")
    )
    embeddings = []
    for emb in resp.embeddings:
        vals = getattr(emb, "values", None) or (emb.get("values") if isinstance(emb, dict) else None)
        if vals is None:
            vals = getattr(emb, "embedding", None)
        embeddings.append(list(vals))
    return embeddings

def get_context(description: str) -> str:
    """
    Retrieves relevant historical context for a proposal description from ChromaDB.
    """
    description = description or ""
    if not description:
        logger.warning(f"[{AGENT_ID}] Received empty description, returning no context.")
        return "No historical context could be retrieved due to an empty proposal description."

    logger.info(f"[{AGENT_ID}] Retrieving context for proposal...")
    try:
        query_embedding = _gemini_embed_texts([description])[0]
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=TOP_K,
            include=['documents', 'metadatas']
        )
        
        docs = results.get('documents', [[]])[0]
        metas = results.get('metadatas', [[]])[0]
        
        parts = []
        for i, doc in enumerate(docs):
            md = metas[i] if i < len(metas) else {}
            src = md.get("source", "unknown")
            parts.append(f"--- Similar proposal (source={src}) ---\n{doc}\n")
            
        if not parts:
            return "No similar historical proposals were found."
            
        logger.info(f"[{AGENT_ID}] Found {len(parts)} relevant documents.")
        return "\n\n".join(parts)

    except Exception as e:
        logger.error(f"[{AGENT_ID}] Failed to retrieve context from ChromaDB: {e}", exc_info=True)
        return f"An error occurred during context retrieval: {e}"