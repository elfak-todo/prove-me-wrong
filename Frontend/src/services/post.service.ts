import axios from 'axios';
import { baseURL } from '../config';
import Post from '../models/post';

export const getPosts = (topicId: string) => {
  return axios.get(`${baseURL}/Post/${topicId}`);
};

export const getUserPosts = (userId: string) => {
  return axios.get(`/Post/profileFeed/${userId}`);
};

export const createPost = (data: Post, topicId: string) => {
  return axios.post(`${baseURL}/Post/${topicId}`, data);
};

export const deletePost = (postId: string) => {
  return axios.delete(`${baseURL}/Post/${postId}`);
};
