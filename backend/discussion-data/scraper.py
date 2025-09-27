import json
import requests
import time
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import os
from typing import List, Dict, Optional

class SimpleUniswapScraper:
    def __init__(self):
        self.base_url = "https://gov.uniswap.org"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
    def load_active_proposals(self, file_path: str) -> List[Dict]:
        # Load active proposals from JSON file
        with open(file_path, 'r', encoding='utf-8') as f:
            proposals = json.load(f)
        print(f"Loaded {len(proposals)} active proposals")
        return proposals
    
    def extract_title_from_description(self, description: str) -> str:
        # Extract the main title from proposal description
        lines = description.split('\n')
        for line in lines:
            line = line.strip()
            if line and not line.startswith('[') and not line.startswith('<'):
                title = re.sub(r'^#+\s*', '', line)
                title = re.sub(r'\[.*?\]\(.*?\)', '', title)
                title = re.sub(r'<[^>]+>', '', title)
                title = title.strip()
                if title and len(title) > 10:
                    return title
        return ""
    
    def search_forum_for_proposal(self, proposal_title: str) -> Optional[Dict]:
        # Search forum for a specific proposal title
        print(f"Searching forum for: {proposal_title}")
        
        # Known correct matches for specific proposals
        known_matches = {
            "Unichain Co-Incentives Growth Management Plan": {
                'title': "Unichain Co-Incentives Growth Management Plan [Governance Proposal]",
                'href': "/t/unichain-co-incentives-growth-management-plan-governance-proposal/25814",
                'topic_id': "25814",
                'full_url': "https://gov.uniswap.org/t/unichain-co-incentives-growth-management-plan-governance-proposal/25814"
            }
        }
        
        if proposal_title in known_matches:
            print(f"✓ Using known match: {known_matches[proposal_title]['title']}")
            return known_matches[proposal_title]
        
        page = 1
        while page <= 50:  # Search first 50 pages (when number of active will be high, ye increase krna hoga)
            try:
                url = f"{self.base_url}/latest?page={page}"
                response = self.session.get(url, timeout=30)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.content, 'html.parser')
                topic_links = soup.find_all('a', class_='title raw-link raw-topic-link')
                
                if not topic_links:
                    break
                
                for link in topic_links:
                    href = link.get('href')
                    title = link.get_text(strip=True)
                    
                    if href and title:
                        # Extract topic ID
                        match = re.search(r'/t/[^/]+/(\d+)', href)
                        topic_id = match.group(1) if match else None
                        
                        # Check for exact match (ignoring brackets)
                        title_clean = re.sub(r'\s*\[.*?\]\s*$', '', title).strip()
                        
                        # Also check if proposal title is contained in forum title
                        if title_clean == proposal_title or proposal_title in title:
                            print(f"✓ Found exact match: {title}")
                            return {
                                'title': title,
                                'href': href,
                                'topic_id': topic_id,
                                'full_url': urljoin(self.base_url, href)
                            }
                
                page += 1
                time.sleep(0.5)  # Be respectful
                
            except Exception as e:
                print(f"Error on page {page}: {e}")
                break
        
        print(f"✗ No exact match found for: {proposal_title}")
        return None
    
    def fetch_discussion_data(self, topic_url: str) -> Optional[Dict]:
        # Fetch discussion data from the .json endpoint
        try:
            json_url = topic_url + '.json'
            print(f"Fetching: {json_url}")
            
            response = self.session.get(json_url, timeout=30)
            response.raise_for_status()
            
            return response.json()
            
        except Exception as e:
            print(f"Error fetching discussion data: {e}")
            return None
    
    def extract_discussion_summary(self, discussion_data: Dict) -> Dict:
        # Extract relevant discussion information
        if not discussion_data or 'post_stream' not in discussion_data:
            return {}
        
        posts = discussion_data['post_stream'].get('posts', [])
        
        discussions = []
        user_stats = {}
        
        for post in posts:
            # Basic post info
            post_data = {
                'id': post.get('id'),
                'username': post.get('username'),
                'display_username': post.get('display_username'),
                'created_at': post.get('created_at'),
                'cooked': post.get('cooked', ''),
                'raw': post.get('raw', ''),
                'like_count': post.get('like_count', 0),
                'reads': post.get('reads', 0),
                'reply_count': post.get('reply_count', 0),
                'trust_level': post.get('trust_level'),
                'moderator': post.get('moderator', False),
                'admin': post.get('admin', False),
                'staff': post.get('staff', False),
            }
            
            discussions.append(post_data)
            
            # Track user stats
            username = post.get('username')
            if username:
                if username not in user_stats:
                    user_stats[username] = {
                        'post_count': 0,
                        'total_likes': 0,
                        'total_reads': 0,
                        'trust_level': post.get('trust_level'),
                        'is_moderator': post.get('moderator', False),
                    }
                
                user_stats[username]['post_count'] += 1
                user_stats[username]['total_likes'] += post.get('like_count', 0)
                user_stats[username]['total_reads'] += post.get('reads', 0)
        
        return {
            'topic_info': {
                'id': discussion_data.get('id'),
                'title': discussion_data.get('title'),
                'created_at': discussion_data.get('created_at'),
                'posts_count': discussion_data.get('posts_count'),
                'like_count': discussion_data.get('like_count'),
                'views': discussion_data.get('views'),
            },
            'discussions': discussions,
            'user_statistics': user_stats,
            'total_posts': len(discussions),
            'unique_participants': len(user_stats),
            'engagement_metrics': {
                'total_likes': sum(post.get('like_count', 0) for post in discussions),
                'total_reads': sum(post.get('reads', 0) for post in discussions),
            }
        }
    
    def save_discussion_data(self, proposal_id: str, proposal_title: str, forum_data: Dict, discussion_summary: Dict):
        # Save discussion data to file in discussion-data directory
        safe_title = re.sub(r'[^\w\s-]', '', proposal_title).strip()
        safe_title = re.sub(r'[-\s]+', '-', safe_title)
        filename = f"{proposal_id}_{safe_title}_discussion.json"
        
        # Ensure discussion-data directory exists
        os.makedirs('discussion-data', exist_ok=True)
        filepath = os.path.join('discussion-data', filename)
        
        # Combine all data
        complete_data = {
            'proposal_info': {
                'id': proposal_id,
                'title': proposal_title,
                'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S')
            },
            'forum_match': forum_data,
            'discussion_data': discussion_summary
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(complete_data, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Saved: {filepath}")
        return filepath
    
    def scrape_all_proposals(self, active_proposals_file: str):
        # Scrape discussions for all active proposals
        print("=== Starting Simple Uniswap Discussion Scraper ===")
        
        # Load active proposals
        active_proposals = self.load_active_proposals(active_proposals_file)
        
        results = []
        
        for proposal in active_proposals:
            proposal_id = proposal.get('id')
            proposal_title = self.extract_title_from_description(proposal.get('description', ''))
            
            if not proposal_title:
                print(f"Skipping proposal {proposal_id} - no title found")
                continue
            
            print(f"\n--- Processing Proposal {proposal_id}: {proposal_title} ---")
            
            # Search forum for this proposal
            forum_data = self.search_forum_for_proposal(proposal_title)
            
            if forum_data:
                # Fetch discussion data
                discussion_data = self.fetch_discussion_data(forum_data['full_url'])
                
                if discussion_data:
                    # Extract summary
                    discussion_summary = self.extract_discussion_summary(discussion_data)
                    
                    # Save data
                    filename = self.save_discussion_data(proposal_id, proposal_title, forum_data, discussion_summary)
                    
                    results.append({
                        'proposal_id': proposal_id,
                        'proposal_title': proposal_title,
                        'forum_title': forum_data['title'],
                        'topic_id': forum_data['topic_id'],
                        'filename': filename,
                        'posts': discussion_summary['total_posts'],
                        'participants': discussion_summary['unique_participants']
                    })
                    
                    time.sleep(2)
                else:
                    print(f"Failed to fetch discussion data for proposal {proposal_id}")
            else:
                print(f"No forum match found for proposal {proposal_id}")
        
        # Save summary
        summary = {
            'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S'),
            'total_proposals': len(active_proposals),
            'successful_scrapes': len(results),
            'results': results
        }
        
        # Ensure discussion-data directory exists
        os.makedirs('discussion-data', exist_ok=True)
        
        with open('discussion-data/scraping_summary.json', 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        
        print(f"\n=== Scraping Complete ===")
        print(f"Total proposals: {len(active_proposals)}")
        print(f"Successfully scraped: {len(results)}")
        
        for result in results:
            print(f"- {result['proposal_title']}: {result['posts']} posts, {result['participants']} participants")


def main():
    # Main function
    scraper = SimpleUniswapScraper()
    
    active_proposals_file = "../data/7WXaWRE2GbBpmokFAnQfugpVsC61D9dfR6fHgjQFqpq5_active_proposals.json"
    
    scraper.scrape_all_proposals(active_proposals_file)


if __name__ == "__main__":
    main()
