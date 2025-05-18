from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func, UniqueConstraint  # Changed import
from datetime import datetime
from .database import Base

class Proposal(Base):
    __tablename__ = "proposals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    deadline = Column(DateTime, nullable=False)
    status = Column(String(10), server_default="active", nullable=False)

class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, index=True)
    proposal_id = Column(Integer, ForeignKey("proposals.id", ondelete="CASCADE"), nullable=False)
    voter_name = Column(String(50), nullable=False)
    vote = Column(String(10), nullable=False)
    voted_at = Column(DateTime, server_default=func.now())

    __table_args__ = (
        UniqueConstraint('proposal_id', 'voter_name', name='_proposal_voter_uc'),  # Fixed this line
    )