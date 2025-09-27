// src/lib.rs

// External crate dependencies for interacting with Substreams, Ethereum data, and ABI decoding.
use hex_literal::hex;
use substreams::scalar::BigInt;
use substreams::Hex;
use substreams_ethereum::{pb::eth::v2 as eth};
use substreams_entity_change::pb::entity::EntityChanges;
use substreams_entity_change::tables::Tables;

// Local crate dependencies for ABI decoding.
use ethabi::decode;
use ethabi::ParamType;

// Auto-generated module for our custom Protobuf definitions.
mod pb;
use pb::uniswap::{Proposal, Proposals, Vote, Votes};

// --- Contract Constants ---

/// Uniswap Governor Bravo contract address on Ethereum Mainnet.
const GOVERNOR_BRAVO_ADDRESS: [u8; 20] = hex!("408ED6354d4973f66138C91495F2f2FCbd8724C3");
/// Keccak256 hash of the 'ProposalCreated' event signature.
static PROPOSAL_CREATED_SIG: [u8; 32] = hex!("7d802b724e76878b17b243818a7a8d57833a693a7e583769c27936a8335f60f6");
/// Keccak256 hash of the 'VoteCast' event signature.
static VOTE_CAST_SIG: [u8; 32] = hex!("dec422f2a7ed85489d815e3b723f37b120c8e0303b7b83c5096a848c9735c03c");

// --- Map Modules ---

/// Map module to extract `ProposalCreated` events from each block.
#[substreams::handlers::map]
fn map_proposals(blk: eth::Block) -> Result<Proposals, substreams::errors::Error> {
    Ok(Proposals {
        proposals: blk.logs()
            .filter_map(|log| {
                // Filter for logs from the target contract and with the correct event signature.
                if log.address() == GOVERNOR_BRAVO_ADDRESS && log.topics()[0] == PROPOSAL_CREATED_SIG {
                    let proposal_id = BigInt::from_unsigned_bytes_be(&log.topics()[1]);
                    let data = log.data();
                    let proposer_bytes = &data[12..32];
                    
                    // Decode the non-indexed 'description' field from the log data.
                    let description_raw = decode(&[ParamType::String], &data[256..]).ok()?.pop()?;
                    let description = description_raw.into_string().unwrap_or_default();

                    Some(Proposal {
                        id: proposal_id.to_string(),
                        proposer: Hex(proposer_bytes).to_string(),
                        description,
                        creation_time: blk.header.as_ref()?.timestamp.as_ref()?.seconds as u64,
                        values: vec![], // This field is populated from a different event if needed.
                    })
                } else {
                    None
                }
            })
            .collect(),
    })
}

/// Map module to extract `VoteCast` events from each block.
#[substreams::handlers::map]
fn map_votes(blk: eth::Block) -> Result<Votes, substreams::errors::Error> {
    Ok(Votes {
        votes: blk.logs()
            .filter_map(|log| {
                // Filter for logs from the target contract and with the correct event signature.
                if log.address() == GOVERNOR_BRAVO_ADDRESS && log.topics()[0] == VOTE_CAST_SIG {
                    let voter_bytes = &log.topics()[1][12..];
                    let proposal_id = BigInt::from_unsigned_bytes_be(&log.topics()[2]);
                    let data = log.data();
                    let choice_raw = data[31];
                    let weight = BigInt::from_unsigned_bytes_be(&data[32..64]);
                    
                    // Decode the non-indexed 'reason' field from the log data.
                    let reason_raw = decode(&[ParamType::String], &data[96..]).ok()?.pop()?;
                    let reason = reason_raw.into_string().unwrap_or_default();

                    Some(Vote {
                        // A unique vote ID is generated from the transaction hash and log index.
                        id: format!("{}-{}", Hex(&log.receipt.transaction.hash).to_string(), log.index()),
                        voter: Hex(voter_bytes).to_string(),
                        proposal_id: proposal_id.to_string(),
                        weight: weight.to_string(),
                        choice: choice_raw as i32,
                        reason,
                    })
                } else {
                    None
                }
            })
            .collect(),
    })
}

/// Final map module that consumes data from `map_proposals` and `map_votes`
/// and transforms it into `EntityChanges` for a database sink.
#[substreams::handlers::map]
fn db_out(proposals: Proposals, votes: Votes) -> Result<EntityChanges, substreams::errors::Error> {
    let mut tables = Tables::new();

    for proposal in proposals.proposals {
        tables
            .create_row("Proposal", &proposal.id)
            .set("description", &proposal.description)
            .set("proposer", &proposal.proposer)
            .set("creationTime", &BigInt::from(proposal.creation_time))
            .set("values", &proposal.values)
            .set("state", "Pending")
            .set("forDelegateVotes", &BigInt::from(0))
            .set("againstDelegateVotes", &BigInt::from(0))
            .set("abstainDelegateVotes", &BigInt::from(0))
            .set("quorumVotes", &BigInt::from(0));

        // Create or update the proposer entity.
        tables
            .update_row("Proposer", &proposal.proposer)
            .set("id", &proposal.proposer)
            .set("delegatedVotesRaw", &BigInt::from(0));
    }

    for vote in votes.votes {
        let choice_string = match vote.choice {
            0 => "AGAINST",
            1 => "FOR",
            2 => "ABSTAIN",
            _ => "UNKNOWN",
        };

        tables
            .create_row("Vote", &vote.id)
            .set("voter", &vote.voter)
            .set("proposal", &vote.proposal_id)
            .set("weight", &BigInt::from_signed_bytes_be(&vote.weight.as_bytes()))
            .set("choice", choice_string)
            .set("reason", &vote.reason);

        // Create or update the voter entity.
        tables
            .update_row("Voter", &vote.voter)
            .set("id", &vote.voter)
            .set("delegatedVotesRaw", &BigInt::from(0));
    }

    Ok(tables.to_entity_changes())
}