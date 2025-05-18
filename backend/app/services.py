from datetime import datetime
from sqlalchemy.orm import Session
from . import models

def create_proposal(db: Session, proposal: models.Proposal):
    db.add(proposal)
    db.commit()
    db.refresh(proposal)
    return proposal

def get_proposals(db: Session):
    # Update status of proposals based on deadline
    proposals = db.query(models.Proposal).all()
    for proposal in proposals:
        if proposal.status == "active" and datetime.now() >= proposal.deadline:
            proposal.status = "expired"
            db.commit()
    return proposals

def get_proposal(db: Session, proposal_id: int):
    proposal = db.query(models.Proposal).filter(models.Proposal.id == proposal_id).first()
    if proposal and proposal.status == "active" and datetime.now() >= proposal.deadline:
        proposal.status = "expired"
        db.commit()
    return proposal

def close_proposal(db: Session, proposal_id: int):
    proposal = db.query(models.Proposal).filter(models.Proposal.id == proposal_id).first()
    if not proposal:
        return None
    if proposal.status == "active":
        proposal.status = "closed"
        db.commit()
        db.refresh(proposal)
    return proposal

def delete_proposal(db: Session, proposal_id: int):
    proposal = db.query(models.Proposal).filter(models.Proposal.id == proposal_id).first()
    if proposal:
        db.delete(proposal)
        db.commit()
        return proposal
    return None

def create_vote(db: Session, vote: models.Vote):
    proposal = get_proposal(db, vote.proposal_id)
    print(proposal.status)
    print(proposal)
    if not proposal or not proposal.status == "active":
        return None
    
    existing_vote = db.query(models.Vote).filter(
        models.Vote.proposal_id == vote.proposal_id,
        models.Vote.voter_name == vote.voter_name
    ).first()

    if existing_vote:
        return None  # User already voted
    
    db.add(vote)
    db.commit()
    db.refresh(vote)
    return vote

def update_vote(db: Session, vote_id: int, new_vote: str):
    vote = db.query(models.Vote).filter(models.Vote.id == vote_id).first()
    if not vote:
        return None
    
    proposal = get_proposal(db, vote.proposal_id)
    if not proposal or not proposal.status == "active":
        return None
    
    vote.vote = new_vote
    db.commit()
    db.refresh(vote)
    return vote

def delete_vote(db: Session, vote_id: int):
    vote = db.query(models.Vote).filter(models.Vote.id == vote_id).first()
    if not vote:
        return None
    
    proposal = get_proposal(db, vote.proposal_id)
    if not proposal or not proposal.status == "active":
        return None
    
    db.delete(vote)
    db.commit()
    return vote

def get_votes_for_proposal(db: Session, proposal_id: int):
    votes = db.query(models.Vote).filter(models.Vote.proposal_id == proposal_id).all()
    return votes