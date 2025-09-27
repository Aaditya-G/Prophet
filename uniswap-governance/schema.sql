DROP TABLE IF EXISTS vote;
DROP TABLE IF EXISTS proposal;
DROP TABLE IF EXISTS voter;
DROP TABLE IF EXISTS proposer;

CREATE TABLE IF NOT EXISTS proposal (
    id VARCHAR(255) PRIMARY KEY,
    description TEXT,
    proposer VARCHAR(42),
    state VARCHAR(255),
    creation_time BIGINT,
    for_delegate_votes NUMERIC,
    against_delegate_votes NUMERIC,
    abstain_delegate_votes NUMERIC,
    quorum_votes NUMERIC
);

CREATE TABLE IF NOT EXISTS vote (
    id VARCHAR(255) PRIMARY KEY,
    voter VARCHAR(42),
    proposal VARCHAR(255) REFERENCES proposal(id),
    weight NUMERIC,
    choice VARCHAR(255),
    reason TEXT
);

CREATE TABLE IF NOT EXISTS proposer (
    id VARCHAR(42) PRIMARY KEY,
    delegated_votes_raw NUMERIC
);

CREATE TABLE IF NOT EXISTS voter (
    id VARCHAR(42) PRIMARY KEY,
    delegated_votes_raw NUMERIC
);