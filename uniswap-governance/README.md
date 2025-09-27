# Uniswap Governance Substream Sink

This project provides a high-performance Substream to track Uniswap Governance proposals and votes on the Ethereum blockchain. It is designed to be used with `substreams-sink-sql` to populate a PostgreSQL database in near real-time.

This provides a robust, self-hosted backend for applications, agents, or analytics that need to react to on-chain governance events.

## What It Does

-   **Extracts** `ProposalCreated` events from the Uniswap Governor Bravo contract.
-   **Extracts** `VoteCast` events, including the voter, weight, choice, and reason.
-   **Transforms** this data into a structured format.
-   **Sinks** the data into a PostgreSQL database, creating and updating `Proposal` and `Vote` tables.

## Prerequisites

Before you begin, you must have the following tools installed and configured on your system.

1.  **Substreams CLI**
    -   Follow the official installation guide: [https://substreams.streamingfast.io/getting-started/installing-the-cli](https://substreams.streamingfast.io/getting-started/installing-the-cli)

2.  **Substreams SQL Sink CLI**
    -   Follow the official installation guide (Homebrew is recommended): [https://github.com/streamingfast/substreams-sink-sql#prerequisites](https://github.com/streamingfast/substreams-sink-sql#prerequisites)

3.  **Rust Toolchain**
    -   Install the complete Rust development environment: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)
    -   Add the Wasm build target: `rustup target add wasm32-unknown-unknown`

4.  **StreamingFast API Key**
    -   Get an API key from the StreamingFast website: [https://app.streamingfast.io/](https://app.streamingfast.io/)
    -   Authenticate the Substreams CLI with your key: `substreams auth`

5.  **PostgreSQL Database**
    -   You need a running PostgreSQL instance. A project on [Supabase](https://supabase.com/) is an excellent and easy-to-use option.
    -   Obtain your database connection string (DSN URI). It will look like `postgres://user:password@host:port/database`.

## Setup and Run

Follow these steps from the root of the project directory.

### 1. Build the Substream

This command compiles the Rust code into a WebAssembly (`.wasm`) module. This only needs to be done once, or whenever you change the source code.

```bash
cargo build --release --target wasm32-unknown-unknown
```

### 2. Package the Substream

This command bundles the compiled `.wasm` module, the manifest, and all necessary Protobuf definitions into a single, portable `.spkg` file.

```bash
substreams pack
```

### 3. Configure the Database Connection

Set your PostgreSQL DSN as an environment variable. This is the most secure way to provide your credentials to the sink tool.

**Remember to replace the placeholder with your actual connection string.**

```bash
export PG_DSN="postgres://user:password@host:port/database"
```

### 4. Set Up the Database Schema

This command connects to your database and runs the `schema.sql` script to create the necessary tables (`proposal`, `vote`, `proposer`, `voter`).

```bash
substreams-sink-sql setup "$PG_DSN" ./uniswap-governance-v1.0.0.spkg
```

The tool will display the tables to be created and ask for confirmation.

### 5. Run the Sink

This is the final command. It will start the Substream, connect to the Ethereum data feed, and begin populating your PostgreSQL database in near real-time.

```bash
substreams-sink-sql run "$PG_DSN" ./uniswap-governance-v1.0.0.spkg
```

Your database will now be continuously updated with Uniswap Governance data. You can connect any application or agent to it using standard SQL clients.