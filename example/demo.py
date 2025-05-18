from voting_sdk import ApiClient, ProposalsApi, VotesApi
from datetime import datetime, timedelta

# Initialize
client = ApiClient(base_url="http://localhost:8000")
proposals_api = ProposalsApi(client)
votes_api = VotesApi(client)

# Create proposal
new_proposal = proposals_api.create_proposal({
    "title": "SDK Example",
    "description": "Created via SDK",
    "deadline": (datetime.now() + timedelta(days=2)).isoformat()
})

# Vote on it
votes_api.create_vote(new_proposal.id, {
    "voter_name": "sdk_user",
    "vote": "yes"
})

# Get results
proposal = proposals_api.get_proposal(new_proposal.id)
print(f"Proposal: {proposal.title}")
print(f"Status: {proposal.status}")