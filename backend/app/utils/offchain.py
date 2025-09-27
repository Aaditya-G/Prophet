import os
import requests
import google.generativeai as genai
from typing import List, Dict, Optional

class OffChainDataService:
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("Gemini API key is required.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-pro')

    def _extract_url_from_description(self, description: str) -> Optional[str]:
        prompt = f"""
        Extract the complete Uniswap governance forum URL from the following text.
        The URL starts with 'https://gov.uniswap.org/t/'.
        Return ONLY the clean, full URL and nothing else.

        Text:
        {description}
        """
        try:
            response = self.model.generate_content(prompt)
            url = response.text.strip()
            if url.startswith("https://gov.uniswap.org/t/"):
                return url
        except Exception:
            return None
        return None

    def _fetch_discussion_json(self, base_url: str) -> Optional[Dict]:
        json_url = f"{base_url.split('?')[0].rstrip('/')}.json"
        try:
            response = requests.get(json_url, timeout=15)
            response.raise_for_status()
            return response.json()
        except (requests.RequestException, ValueError):
            return None

    def _filter_discussion_posts(self, data: Dict) -> List[Dict]:
        posts = data.get("post_stream", {}).get("posts", [])
        filtered_posts = []
        for post in posts:
            if isinstance(post, dict):
                filtered_posts.append({
                    "cooked": post.get("cooked"),
                    "reply_count": post.get("reply_count"),
                    "reads": post.get("reads"),
                    "score": post.get("score"),
                    "trust_level": post.get("trust_level")
                })
        return filtered_posts

    def get_filtered_discussion(self, description: str) -> Optional[List[Dict]]:
        base_url = self._extract_url_from_description(description)
        if not base_url:
            return None

        json_data = self._fetch_discussion_json(base_url)
        if not json_data:
            return None

        filtered_posts = self._filter_discussion_posts(json_data)
        return filtered_posts

offchain_service = OffChainDataService(api_key=os.getenv('GEMINI_API_KEY'))
