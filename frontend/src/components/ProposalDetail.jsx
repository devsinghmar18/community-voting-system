import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProposal, createVote, getVotes, deleteVote } from '../api';
import VoteControls from './VoteControls';

const ProposalDetail = ({ refresh }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [votes, setVotes] = useState([]);
  const [currentUser] = useState('user1'); // Hardcoded for demo

  useEffect(() => {
    const fetchData = async () => {
      const proposalData = await getProposal(id);
      const votesData = await getVotes(id);
      setProposal(proposalData);
      setVotes(votesData);
    };
    fetchData();
  }, [id, refresh]);

  const handleVote = async (voteType) => {
    try {
      await createVote(id, { voter_name: currentUser, vote: voteType });
      const updatedVotes = await getVotes(id);
      setVotes(updatedVotes);
      refresh();
    } catch (error) {
      alert(error.response?.data?.detail || 'Voting failed');
    }
  };

  const handleRevokeVote = async (voteId) => {
    try {
      await deleteVote(voteId);
      const updatedVotes = await getVotes(id);
      setVotes(updatedVotes);
      refresh();
    } catch (error) {
      alert(error.response?.data?.detail || 'Failed to revoke vote');
    }
  };

  if (!proposal) return <div>Loading...</div>;

  return (
    <div>
      <div className="proposal-header">
        <h2>{proposal.title}</h2>
        <p>{proposal.description}</p>
      </div>

      <div className="vote-section">
        <h3>Vote Results</h3>
        <div className="vote-results">
          {['yes', 'no', 'abstain'].map((type) => (
            <div key={type} className="vote-bar">
              <span>{type}: {votes.filter(v => v.vote === type).length}</span>
              <div className="bar-container">
                <div 
                  className="bar" 
                  style={{ width: `${(votes.filter(v => v.vote === type).length / (votes.length || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {proposal.status === 'active' && (
        <VoteControls 
          proposalId={id}
          currentUser={currentUser}
          votes={votes}
          onVote={handleVote}
          onRevoke={handleRevokeVote}
        />
      )}
    </div>
  );
};

export default ProposalDetail;