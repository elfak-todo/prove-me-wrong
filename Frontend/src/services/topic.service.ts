import axios from 'axios';
import { ITopic } from '../models/topic';

export const getTopics = () => {
  return axios.get(`/Topic/`);
};

export const getTopicsByUserInterests = () => {
  return axios.get(`/Topic/byUserInterests`);
};

export const getTopicsByTag = (tagId: string) => {
  return axios.get(`/Topic/byTag/${tagId}`);
};

export const getUserTopics = (userId: string) => {
  return axios.get(`/Topic/userTopics/${userId}`);
};

export const createTopic = (data: ITopic) => {
  return axios.post(`/Topic/`, data);
};
