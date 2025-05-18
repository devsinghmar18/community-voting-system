import pytest
from datetime import datetime, timedelta
from app.main import app
from fastapi.testclient import TestClient
from app.database import Base, engine, SessionLocal

client = TestClient(app)

@pytest.fixture
def test_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

def test_create_proposal(test_db):
    response = client.post("/proposals/", json={
        "title": "Test Proposal",
        "description": "Test Description",
        "deadline": (datetime.now() + timedelta(days=1)).isoformat()
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Test Proposal"

def test_duplicate_vote(test_db):
    # First create a proposal
    proposal = client.post("/proposals/", json={...}).json()
    
    # First vote should succeed
    vote1 = client.post(f"/proposals/{proposal['id']}/vote", json={
        "voter_name": "user1",
        "vote": "yes"
    })
    assert vote1.status_code == 200
    
    # Second vote should fail
    vote2 = client.post(f"/proposals/{proposal['id']}/vote", json={
        "voter_name": "user1",
        "vote": "no"
    })
    assert vote2.status_code == 400