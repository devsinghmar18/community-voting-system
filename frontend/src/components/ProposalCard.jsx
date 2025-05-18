import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from './VoteButtons';

const ProposalCard = ({ proposal, currentUser, onVote, onRevoke }) => {
  const navigate = useNavigate();
  const isActive = proposal.status === 'active' && new Date(proposal.deadline) > new Date();
  
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    closed: 'bg-blue-100 text-blue-800',
    expired: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 
          className="text-xl font-semibold cursor-pointer hover:text-blue-600"
          onClick={() => navigate(`/proposals/${proposal.id}`)}
        >
          {proposal.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[proposal.status]}`}>
          {proposal.status.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 mt-2 line-clamp-2">{proposal.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">
            {isActive 
              ? `Ends in ${formatDistanceToNow(new Date(proposal.deadline))}`
              : `Ended ${formatDistanceToNow(new Date(proposal.deadline))} ago`}
          </span>
        </div>
        {isActive && (
          <VoteButtons 
            proposalId={proposal.id} 
            currentUser={currentUser} 
            onVote={onVote}
            onRevoke={onRevoke}
          />
        )}
      </div>
    </div>
  );
};

export default ProposalCard;