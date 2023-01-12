import axios from 'axios';
import Post from '../models/post';

export const getPosts = (topicId: string) => {
  return axios.get(`/Post/${topicId}`);
};

export const getUserPosts = (userId: string) => {
  return axios.get(`/Post/profileFeed/${userId}`);
};

export const createPost = (data: Post, topicId: string) => {
  return axios.post(`/Post/${topicId}`, data);
};

export const deletePost = (postId: string) => {
  return axios.delete(`/Post/${postId}`);
};

export const likeUnlinkePost = (postId: string, liked: boolean) => {
  return axios.put<boolean>(`/Post/setLiked/${postId}`, liked, {
    headers: { 'Content-Type': 'application/json' },
  });
};
