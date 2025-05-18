import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const getProposals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/proposals/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return [];
  }
};

export const createProposal = async (proposal) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/proposals/`, proposal);
    return response.data;
  } catch (error) {
    console.error('Error creating proposal:', error);
    throw error;
  }
};

export const getProposal = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/proposals/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return null;
  }
};

export const createVote = async (proposalId, voteData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/proposals/${proposalId}/vote`,
      voteData
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

export const deleteVote = async (voteId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/votes/${voteId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting vote:', error);
    throw error;
  }
};

export const getVotes = async (proposalId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/proposals/${proposalId}/votes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching votes:', error);
    return [];
  }
};

export const deleteProposal = async (proposalId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/proposals/${proposalId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting proposal:', error);
    throw error;
  }
};