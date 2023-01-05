import axios from 'axios';
import User from '../models/user';
import UserLoginDto from '../models/user.login.dto';
import UserRegisterDto from '../models/user.register.dto';

export const registerUser = (data: UserRegisterDto) => {
  return axios.post<User>(`/User/register`, data);
};

export const login = (data: UserLoginDto) => {
  return axios.post<User>(`/User/login`, data);
};
