import axios from 'axios';
import { CommentCreateDto } from '../models/comment.create.dto';
import { CommentDto } from '../models/comment.dto';

export const getPostComments = (postId: string, page: number) => {
  return axios.get<CommentDto[]>(`/Comment/${postId}/${page}`);
};

export const createComment = (comment: CommentCreateDto) => {
  return axios.post<CommentDto>(`/Comment`, comment);
};
