import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const getCandidates = () => {
  return axios.get(`${API_URL}/candidates`);
};

export const getCandidateById = (id) => {
  return axios.get(`${API_URL}/candidates/${id}`);
};

export const getZones = (isMobility, isResidency) => {
  return axios.get(`${API_URL}/zones?isMobility=${isMobility}&isResidency=${isResidency}`);
};
