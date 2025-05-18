import React, { useState } from 'react';
import { createVote, deleteVote, getVotes } from '../api';

const VoteForm = ({ proposalId, currentUser, onVote }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [userVote, setUserVote] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVote) return;
    
    try {
      await onVote(selectedVote);
      setSelectedVote(null);
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Cast Your Vote</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          {['yes', 'no', 'abstain'].map((voteType) => (
            <button
              key={voteType}
              type="button"
              onClick={() => setSelectedVote(voteType)}
              className={`px-4 py-2 rounded capitalize ${
                selectedVote === voteType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {voteType}
            </button>
          ))}
        </div>
        {selectedVote && (
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Vote
          </button>
        )}
      </form>
    </div>
  );
};

export default VoteForm;