import pytest
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base
from app.models import Proposal, Vote
from fastapi.testclient import TestClient

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture()
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture()
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    del app.dependency_overrides[get_db]

def test_create_proposal(client):
    response = client.post(
        "/proposals/",
        json={
            "title": "Test Proposal",
            "description": "Test Description",
            "deadline": (datetime.now() + timedelta(days=1)).isoformat()
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Proposal"
    assert data["status"] == "active"

def test_vote_on_proposal(client):
    # Create a proposal
    proposal_res = client.post(
        "/proposals/",
        json={
            "title": "Voting Test",
            "description": "Voting Test Desc",
            "deadline": (datetime.now() + timedelta(days=1)).isoformat()
        }
    )
    proposal_id = proposal_res.json()["id"]
    
    # Vote on the proposal
    vote_res = client.post(
        f"/proposals/{proposal_id}/vote",
        json={
            "voter_name": "test_user",
            "vote": "yes"
        }
    )
    assert vote_res.status_code == 200
    
    # Try to vote again (should fail)
    duplicate_vote = client.post(
        f"/proposals/{proposal_id}/vote",
        json={
            "voter_name": "test_user",
            "vote": "no"
        }
    )
    assert duplicate_vote.status_code == 400

def test_revoke_vote(client):
    # Create a proposal and vote
    proposal_res = client.post(
        "/proposals/",
        json={
            "title": "Revoke Test",
            "description": "Revoke Test Desc",
            "deadline": (datetime.now() + timedelta(days=1)).isoformat()
        }
    )
    proposal_id = proposal_res.json()["id"]
    
    vote_res = client.post(
        f"/proposals/{proposal_id}/vote",
        json={
            "voter_name": "test_user",
            "vote": "yes"
        }
    )
    vote_id = vote_res.json()["id"]
    
    # Revoke the vote
    revoke_res = client.delete(f"/votes/{vote_id}")
    assert revoke_res.status_code == 200
    
    # Try to revoke again (should fail)
    revoke_again = client.delete(f"/votes/{vote_id}")
    assert revoke_again.status_code == 400