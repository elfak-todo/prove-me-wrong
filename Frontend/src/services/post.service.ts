import axios from 'axios';
import { baseURL } from '../config';

export const getPosts = (topicId: string) => {
  return axios.get(`${baseURL}/Post/${topicId}`);
};
