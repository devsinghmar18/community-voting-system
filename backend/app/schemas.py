from pydantic import BaseModel, validator
from datetime import datetime, timedelta
from typing import Optional

class ProposalBase(BaseModel):
    title: str
    description: str
    deadline: Optional[datetime] = None

    @validator('deadline', pre=True, always=True)
    def set_default_deadline(cls, v):
        return v or datetime.now() + timedelta(days=2)

class ProposalCreate(ProposalBase):
    pass

class Proposal(BaseModel):
    id: int
    title: str
    description: str
    created_at: datetime
    deadline: datetime
    status: str

    class Config:
        orm_mode = True

class VoteBase(BaseModel):
    voter_name: str
    vote: str

    @validator('vote')
    def validate_vote(cls, v):
        if v.lower() not in ['yes', 'no', 'abstain']:
            raise ValueError('Vote must be either "yes", "no", or "abstain"')
        return v.lower()

class VoteCreate(VoteBase):
    pass


class Vote(BaseModel):
    id: int
    proposal_id: int
    voter_name: str
    vote: str  # 'yes', 'no', or 'abstain'
    voted_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True  # For SQLAlchemy compatibility

class VoteUpdate(BaseModel):
    vote: str

    @validator('vote')
    def validate_vote(cls, v):
        if v.lower() not in ['yes', 'no', 'abstain']:
            raise ValueError('Vote must be either "yes", "no", or "abstain"')
        return v.lower()