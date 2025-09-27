import os
import time
import json
import hashlib
from dotenv import load_dotenv
from hedera import (
    AccountId,
    PrivateKey,
    Client,
    TopicId,
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
)


load_dotenv()

HEDERA_ACCOUNT_ID = os.getenv("HEDERA_ACCOUNT_ID")
HEDERA_PRIVATE_KEY = os.getenv("HEDERA_PRIVATE_KEY")

if not HEDERA_ACCOUNT_ID or not HEDERA_PRIVATE_KEY:
    raise Exception("HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY must be set in .env")

client = Client.forTestnet()
client.setOperator(AccountId.fromString(HEDERA_ACCOUNT_ID), PrivateKey.fromString(HEDERA_PRIVATE_KEY))


TOPIC_ID = os.getenv("HEDERA_TOPIC_ID")

def create_hedera_topic():      # Runs when environment doesn't have a Hedera Topic ID
    """Creates a new HCS topic and returns its ID."""
    tx = TopicCreateTransaction()
    receipt = tx.execute(client).getReceipt(client)
    new_topic_id = receipt.topicId
    print(f"Successfully created topic with ID: {new_topic_id}")
    return str(new_topic_id)

def get_topic_id():
    """Returns the existing topic ID or creates a new one."""
    global TOPIC_ID
    if TOPIC_ID is None:
        TOPIC_ID = create_hedera_topic()
    return TOPIC_ID

def log_to_hedera(payload: dict):
    """Submits a JSON payload to the configured Hedera Consensus Service topic."""
    topic_id = get_topic_id()
    if not topic_id:
        print("Error: Hedera Topic ID is not set. Cannot log message.")
        return None

    try:
        topic_id = TopicId.fromString(topic_id)
        message_str = json.dumps(payload, separators=(',', ':'))
        tx = TopicMessageSubmitTransaction().setTopicId(topic_id).setMessage(message_str)
        receipt = tx.execute(client).getReceipt(client)
        sequence_number = receipt.topicSequenceNumber
        
        print(f"Successfully submitted message to HCS Topic {topic_id}.")
        print(f"  - Sequence Number: {sequence_number}")
        print(f"  - Payload: {message_str}")
        return sequence_number
        
    except Exception as e:
        print(f"Error submitting message to Hedera: {e}")
        return None

def hash_data(data: str) -> str:
    """Computes the SHA-256 hash of a string."""
    return hashlib.sha256(data.encode('utf-8')).hexdigest()
