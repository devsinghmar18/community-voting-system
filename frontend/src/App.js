import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProposalList from './components/ProposalList';
import ProposalDetail from './components/ProposalDetail';
import CreateProposal from './components/CreateProposal';
import { getProposals } from './api';

function App() {
  const [proposals, setProposals] = useState([]);

  const refreshProposals = async () => {
    const data = await getProposals();
    setProposals(data);
  };

  useEffect(() => {
    refreshProposals();
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>Community Voting System</h1>
        <Routes>
          <Route path="/" element={<ProposalList proposals={proposals} refresh={refreshProposals} />} />
          <Route path="/proposals/:id" element={<ProposalDetail refresh={refreshProposals} />} />
          <Route path="/create" element={<CreateProposal refresh={refreshProposals} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;