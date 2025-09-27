# **Prophet Flask API Backend**

This is a production-ready Flask backend designed to serve data related to governance proposals. It uses a PostgreSQL database, SQLAlchemy for ORM, and Pydantic for data validation and serialization. Ideally, you should use the same database where sink data has been sent.

## **Features**

-   **Flask Framework**: A robust and lightweight web framework for Python.
-   **SQLAlchemy ORM**: For elegant and powerful database interactions.
-   **PostgreSQL Ready**: Configured for a production-grade PostgreSQL database.
-   **Pydantic Schemas**: Ensures strong data validation and clear API contracts.
-   **Environment-based Configuration**: Separate configurations for development and production environments.
-   **Blueprints**: Scalable project structure using Flask Blueprints.

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:
-   Python 3.8+
-   `pip` and `venv`
-   PostgreSQL Server

---

## **Setup and Installation Guide**

Follow these steps to get your local development environment set up and running.

### **1. Clone the Repository**

```bash
git clone <your-repository-url>
cd prophet_backend
```

### **2. Create and Activate a Virtual Environment**

It is highly recommended to use a virtual environment to manage project dependencies.

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

### **3. Install Dependencies**

Install all the required Python packages from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### **4. Configure Environment Variables**

The application uses a `.env` file to manage environment variables.

1.  Create a `.env` file in the root directory of the project.
2.  Add your database connection URL to it. The format is `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`.

```env
# .env

# Database Configuration
DATABASE_URL="postgresql://prophet_user:secure_password@localhost:5432/prophet_db"
```

## **Running the Application**

To start the Flask development server, run the following command from the project's root directory:

```bash
flask run
```

You should see output indicating that the server is running, typically on `http://127.0.0.1:5000`.

```
 * Serving Flask app 'run.py'
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

## **API Endpoints**

### **Fetch All Proposals**

Fetches a list of all governance proposals from the database.

-   **URL**: `/api/proposals`
-   **Method**: `GET`
-   **Success Response**:
    -   **Code**: 200 OK
    -   **Content Example**:
        ```json
        [
            {
                "id": "0x123abc...",
                "description": "A proposal to fund a new initiative.",
                "proposer": {
                    "id": "0xabc123...",
                    "delegatedVotesRaw": 1000000,
                    "numberVotes": 5,
                    "tokenHoldersRepresentedAmount": 50
                },
                "state": "EXECUTED",
                "creationTime": 1672531200,
                "votes": [
                    {
                        "id": "vote_001",
                        "weight": 50000,
                        "choice": "FOR",
                        "reason": "This is a great idea."
                    }
                ],
                "abstainDelegateVotes": 10000,
                "againstDelegateVotes": 50000,
                "forDelegateVotes": 940000,
                "quorumVotes": 400000,
                "totalDelegateVotes": 1000000
            }
        ]
        ```