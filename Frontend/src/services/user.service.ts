import axios from 'axios';
import Tag from '../models/tag';
import User from '../models/user';
import UserLoginDto from '../models/user.login.dto';
import UserProfileData from '../models/user.profile.dto';
import UserRegisterDto from '../models/user.register.dto';

export const registerUser = (data: UserRegisterDto) => {
  return axios.post<User>(`/User/register`, data);
};

export const login = (data: UserLoginDto) => {
  return axios.post<User>(`/User/login`, data);
};

export const getProfileData = (id: string) => {
  return axios.get<UserProfileData>(`/User/profile/${id}`);
};

export const getFriendRequests = () => {
  return axios.get<User[]>(`/User/friendRequest/getAll`);
};

export const searchUsers = (input: string) => {
  return axios.get<User[]>(`/User/search?input=${input}`);
};

export const sendFriendRequest = (friendId: string) => {
  return axios.post(`/User/friendRequest/send/${friendId}`);
};

export const respondToFriendRequest = (friendId: string, accept: boolean) => {
  return axios.put(`/User/friendRequest/respond/${friendId}`, accept, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const editInterests = (tags: Tag[]) => {
  return axios.post(`/User/interests/`, tags);
};
