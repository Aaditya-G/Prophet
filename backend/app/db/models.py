from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Text, BigInteger, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property

db = SQLAlchemy()

class Proposal(db.Model):
    __tablename__ = 'proposal'
    id = Column(String(255), primary_key=True)
    description = Column(Text)
    proposer_id = Column('proposer', String(42), ForeignKey('proposer.id'))
    state = Column(String(255))
    creation_time = Column(BigInteger)
    for_delegate_votes = Column(Numeric)
    against_delegate_votes = Column(Numeric)
    abstain_delegate_votes = Column(Numeric)
    quorum_votes = Column(Numeric)

    proposer = relationship("Proposer", foreign_keys=[proposer_id], back_populates="proposals")
    votes = relationship("Vote", back_populates="proposal")

    @hybrid_property
    def total_delegate_votes(self):
        return (self.for_delegate_votes or 0) + \
               (self.against_delegate_votes or 0) + \
               (self.abstain_delegate_votes or 0)

class Vote(db.Model):
    __tablename__ = 'vote'
    id = Column(String(255), primary_key=True)
    voter_id = Column('voter', String(42), ForeignKey('voter.id'))
    proposal_id = Column('proposal', String(255), ForeignKey('proposal.id'))
    weight = Column(Numeric)
    choice = Column(String(255))
    reason = Column(Text)

    voter = relationship("Voter", foreign_keys=[voter_id], back_populates="votes")
    proposal = relationship("Proposal", foreign_keys=[proposal_id], back_populates="votes")

class Proposer(db.Model):
    __tablename__ = 'proposer'
    id = Column(String(42), primary_key=True)
    delegated_votes_raw = Column(Numeric)
    proposals = relationship("Proposal", back_populates="proposer")

    @hybrid_property
    def number_votes(self):
        return len(self.proposals)

    @hybrid_property
    def token_holders_represented_amount(self):
        return 0

class Voter(db.Model):
    __tablename__ = 'voter'
    id = Column(String(42), primary_key=True)
    delegated_votes_raw = Column(Numeric)
    votes = relationship("Vote", back_populates="voter")