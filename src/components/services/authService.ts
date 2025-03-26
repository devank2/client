import axios from 'axios';

type Credentials = {
  email: string;
  password: string;
};

export const login = async (credentials: Credentials) => {
  const response = await axios.post('api/auth/login', credentials);
  return response.data;
};