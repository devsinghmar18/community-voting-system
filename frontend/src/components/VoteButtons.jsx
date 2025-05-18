import React, { useState, useEffect } from 'react';
import { createVote, deleteVote, getVotes } from '../api';

const VoteButtons = ({ proposalId, currentUser, onVote, onRevoke }) => {
  const [userVote, setUserVote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      const votes = await getVotes(proposalId);
      const vote = votes.find(v => v.voter_name === currentUser);
      setUserVote(vote);
      setIsLoading(false);
    };
    fetchVotes();
  }, [proposalId, currentUser]);

  const handleVote = async (voteType) => {
    try {
      if (userVote) {
        await deleteVote(userVote.id);
        setUserVote(null);
        onRevoke && onRevoke();
      }
      const newVote = await createVote(proposalId, {
        voter_name: currentUser,
        vote: voteType
      });
      setUserVote(newVote);
      onVote && onVote();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex space-x-2">
      {['yes', 'no', 'abstain'].map((voteType) => (
        <button
          key={voteType}
          onClick={() => handleVote(voteType)}
          className={`px-3 py-1 rounded text-sm ${
            userVote?.vote === voteType
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {voteType.charAt(0).toUpperCase() + voteType.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default VoteButtons;