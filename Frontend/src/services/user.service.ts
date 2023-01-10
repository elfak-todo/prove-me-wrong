import axios from 'axios';
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

export const sendFriendRequest = (friendId: string) => {
  return axios.post(`/User/friendRequest/${friendId}`);
};

export const acceptFriendRequest = (friendId: string) => {
  return axios.patch(`/User/acceptFriendRequest/${friendId}`);
};
