import React from 'react';

const VoteControls = ({ proposalId, currentUser, votes, onVote, onRevoke }) => {
  const userVote = votes.find(v => v.voter_name === currentUser);

  return (
    <div className="vote-controls">
      <h3>Cast Your Vote</h3>
      {userVote ? (
        <div>
          <p>Your current vote: <strong>{userVote.vote}</strong></p>
          <button 
            onClick={() => onRevoke(userVote.id)}
            className="btn-revoke"
          >
            Revoke Vote
          </button>
        </div>
      ) : (
        <div className="vote-buttons">
          {['yes', 'no', 'abstain'].map((voteType) => (
            <button
              key={voteType}
              onClick={() => onVote(voteType)}
              className={`btn-vote ${voteType}`}
            >
              {voteType}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoteControls;