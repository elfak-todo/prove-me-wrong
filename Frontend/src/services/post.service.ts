import axios from 'axios';
import { baseURL } from '../config';
import Post from '../models/post';

export const getPosts = (topicId: string) => {
  return axios.get(`${baseURL}/Post/${topicId}`);
};

export const createPost = (data: Post, topicId: string) => {
  return axios.post(`${baseURL}/Post/${topicId}`, data);
};
