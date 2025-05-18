import React, { useState, useEffect } from 'react';
import { getProposals } from '../api';
import ProposalCard from '../components/ProposalCard';
import ProposalForm from '../components/ProposalForm';

const Home = () => {
  const [proposals, setProposals] = useState([]);
  const [currentUser] = useState('user1'); // In a real app, this would come from auth

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getProposals();
      setProposals(data);
    };
    fetchProposals();
  }, []);

  const handleNewProposal = (proposal) => {
    setProposals([proposal, ...proposals]);
  };

  const handleVote = () => {
    // Refresh proposals to show updated vote counts
    getProposals().then(data => setProposals(data));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Community Voting System</h1>
      
      <ProposalForm onSubmit={handleNewProposal} />
      
      <div className="space-y-4">
        {proposals.map(proposal => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            currentUser={currentUser}
            onVote={handleVote}
            onRevoke={handleVote}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;