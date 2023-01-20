import axios from 'axios';
import { CommentCreateDto } from '../models/comment.create.dto';
import { CommentDto } from '../models/comment.dto';
import { CommentUpdateDto } from '../models/comment.update.dto';

export const getPostComments = (
  postId: string,
  page: number,
  sortType: 'newest' | 'most-liked'
) => {
  return axios.get<CommentDto[]>(`/Comment/${postId}/${page}/${sortType}`);
};

export const createComment = (comment: CommentCreateDto) => {
  return axios.post<CommentDto>(`/Comment`, comment);
};

export const deleteComment = (postID: string, commentId: string) => {
  return axios.delete(`/Comment/${postID}/${commentId}`);
};

export const editComment = (comment: CommentUpdateDto) => {
  return axios.put<CommentDto>(`/Comment`, comment);
};

export const setLiked = (postId: string, commentId: string, liked: boolean) => {
  return axios.put<boolean>(
    `/Comment/${postId}/${commentId}/set-liked/${liked}`
  );
};
