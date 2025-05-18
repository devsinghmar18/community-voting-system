import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProposal } from '../api';

const CreateProposal = ({ refresh }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProposal(formData);
      refresh();
      navigate('/');
    } catch (error) {
      alert('Failed to create proposal');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-form">
      <h2>Create New Proposal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Deadline (optional)</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-submit">Submit Proposal</button>
      </form>
    </div>
  );
};

export default CreateProposal;