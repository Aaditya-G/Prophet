from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Text, BigInteger, Numeric, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Proposal(db.Model):
    __tablename__ = 'proposal'
    id = Column(String(255), primary_key=True)
    description = Column(Text)
    proposer_id = Column(String(42), ForeignKey('proposer.id'))
    state = Column(String(255))
    creation_time = Column(BigInteger)
    for_delegate_votes = Column(Numeric)
    against_delegate_votes = Column(Numeric)
    abstain_delegate_votes = Column(Numeric)
    quorum_votes = Column(Numeric)
    proposer = relationship("Proposer", back_populates="proposals")
    votes = relationship("Vote", back_populates="proposal")

class Vote(db.Model):
    __tablename__ = 'vote'
    id = Column(String(255), primary_key=True)
    voter_id = Column(String(42), ForeignKey('voter.id'))
    proposal_id = Column(String(255), ForeignKey('proposal.id'))
    weight = Column(Numeric)
    choice = Column(String(255))
    reason = Column(Text)
    voter = relationship("Voter", back_populates="votes")
    proposal = relationship("Proposal", back_populates="votes")

class Proposer(db.Model):
    __tablename__ = 'proposer'
    id = Column(String(42), primary_key=True)
    delegated_votes_raw = Column(Numeric)
    proposals = relationship("Proposal", back_populates="proposer")

class Voter(db.Model):
    __tablename__ = 'voter'
    id = Column(String(42), primary_key=True)
    delegated_votes_raw = Column(Numeric)
    votes = relationship("Vote", back_populates="voter")