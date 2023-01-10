import axios from 'axios';
import { baseURL } from '../config';
import { ITopic } from '../models/topic';

export const getTopics = () => {
  return axios.get(`${baseURL}/Topic/`);
};

export const getUserTopics = (userId: string) => {
  return axios.get(`/Topic/userTopics/${userId}`);
};

export const createTopic = (data: ITopic) => {
  return axios.post(`${baseURL}/Topic/`, data);
};
