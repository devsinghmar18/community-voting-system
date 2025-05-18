import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProposal, getVotes } from '../api';
import VoteButtons from '../components/VoteButtons';

const ProposalDetail = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const [votes, setVotes] = useState([]);
  const [currentUser] = useState('user1'); // In a real app, this would come from auth

  useEffect(() => {
    const fetchData = async () => {
      const proposalData = await getProposal(id);
      const votesData = await getVotes(id);
      setProposal(proposalData);
      setVotes(votesData);
    };
    fetchData();
  }, [id]);

  if (!proposal) return <div>Loading...</div>;

  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote.vote] = (acc[vote.vote] || 0) + 1;
    return acc;
  }, {});

  const isActive = proposal.status === 'active' && new Date(proposal.deadline) > new Date();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
      <div className="mb-6">
        <span className={`px-3 py-1 rounded-full ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isActive ? 'Active' : 'Closed'}
        </span>
        <span className="ml-2 text-gray-500">
          {isActive 
            ? `Ends in ${new Date(proposal.deadline).toLocaleString()}`
            : `Ended on ${new Date(proposal.deadline).toLocaleString()}`}
        </span>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <p className="text-gray-700 whitespace-pre-line">{proposal.description}</p>
      </div>
      
      {isActive && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>
          <VoteButtons 
            proposalId={proposal.id} 
            currentUser={currentUser}
            onVote={() => getVotes(id).then(setVotes)}
            onRevoke={() => getVotes(id).then(setVotes)}
          />
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Vote Results</h2>
        <div className="grid grid-cols-3 gap-4">
          {['yes', 'no', 'abstain'].map((voteType) => (
            <div key={voteType} className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium capitalize">{voteType}</h3>
              <p className="text-2xl font-bold">{voteCounts[voteType] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;