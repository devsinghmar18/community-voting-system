import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { deleteProposal } from '../api';

const ProposalList = ({ proposals, refresh }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'expired': return 'orange';
      case 'closed': return 'red';
      default: return 'gray';
    }
  };

  const handleDelete = async (proposalId) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      try {
        await deleteProposal(proposalId);
        refresh(); // Refresh the list after deletion
      } catch (error) {
        alert('Failed to delete proposal');
      }
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Current Proposals</h2>
        <Link to="/create" className="btn">Create New Proposal</Link>
      </div>

      <div className="proposal-grid">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="proposal-card">
            <div className="proposal-header">
                <Link to={`/proposals/${proposal.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className='proposal-title'>{proposal.title}</h3>
                </Link>
                <button 
                onClick={() => handleDelete(proposal.id)}
                className="btn-delete"
                >
                Delete
                </button>
            </div>
            <p>{proposal.description}</p>
            <div className="proposal-footer">
              <span className={`status-${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
              <span className="deadline">
                {formatDistanceToNow(new Date(proposal.deadline))} remaining
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalList;