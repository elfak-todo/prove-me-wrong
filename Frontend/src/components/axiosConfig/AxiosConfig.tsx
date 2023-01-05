import { useContext, useEffect } from 'react';
import axios from 'axios';

import { baseURL } from '../../config';
import UserContext from '../userManager/UserManager';

function AxiosConfig() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios.defaults.baseURL = baseURL;

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
  }, [setUser]);

  useEffect(() => {
    axios.defaults.headers['Authorization'] = user
      ? 'Bearer ' + user.accessToken
      : null;
  }, [user]);

  return null;
}

export default AxiosConfig;
