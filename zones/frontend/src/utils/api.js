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

export const editZone = (id, data) => {
  return axios.put(`${API_URL}/zones/${id}`, data);
};

export const createZone = (data) => {
  return axios.post(`${API_URL}/zones/`, data);
};
