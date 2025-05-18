from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import models, schemas, services
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/proposals/", response_model=schemas.Proposal)
def create_proposal(proposal: schemas.ProposalCreate, db: Session = Depends(get_db)):
    db_proposal = models.Proposal(
        title=proposal.title,
        description=proposal.description,
        deadline=proposal.deadline
    )
    return services.create_proposal(db, db_proposal)

@app.get("/proposals/", response_model=List[schemas.Proposal])
def read_proposals(db: Session = Depends(get_db)):
    try:
        proposals = services.get_proposals(db)
        if not proposals:
            return []
        return proposals
    except Exception as e:
        print("this is the problem")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/proposals/{proposal_id}", response_model=schemas.Proposal)
def read_proposal(proposal_id: int, db: Session = Depends(get_db)):
    proposal = services.get_proposal(db, proposal_id)
    if proposal is None:
        raise HTTPException(status_code=404, detail="Proposal not found")
    return proposal

@app.patch("/proposals/{proposal_id}/close", response_model=schemas.Proposal)
def close_proposal(proposal_id: int, db: Session = Depends(get_db)):
    proposal = services.close_proposal(db, proposal_id)
    if proposal is None:
        raise HTTPException(status_code=404, detail="Proposal not found")
    return proposal

@app.delete("/proposals/{proposal_id}", response_model=schemas.Proposal)
def delete_proposal(proposal_id: int, db: Session = Depends(get_db)):
    proposal = services.delete_proposal(db, proposal_id)
    if proposal is None:
        raise HTTPException(status_code=404, detail="Proposal not found")
    return proposal


@app.post("/proposals/{proposal_id}/vote", response_model=schemas.Vote)
def create_vote(proposal_id: int, vote: schemas.VoteCreate, db: Session = Depends(get_db)):
    db_vote = models.Vote(
        proposal_id=proposal_id,
        voter_name=vote.voter_name,
        vote=vote.vote
    )
    created_vote = services.create_vote(db, db_vote)
    if created_vote is None:
        raise HTTPException(
            status_code=400,
            detail="Vote not allowed (proposal closed/expired or already voted)"
        )
    return created_vote

@app.delete("/votes/{vote_id}", response_model=schemas.Vote)
def delete_vote(vote_id: int, db: Session = Depends(get_db)):
    vote = services.delete_vote(db, vote_id)
    if vote is None:
        raise HTTPException(
            status_code=400,
            detail="Vote cannot be revoked (proposal closed/expired or vote not found)"
        )
    return vote

@app.get("/proposals/{proposal_id}/votes", response_model=List[schemas.Vote])
def get_votes(proposal_id: int, db: Session = Depends(get_db)):
    return services.get_votes_for_proposal(db, proposal_id)


if __name__ == "__main__":
    uvicorn.run()