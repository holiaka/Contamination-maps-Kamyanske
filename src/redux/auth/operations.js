import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const saveToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeToken = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const registration = createAsyncThunk(
  'auth/registration',
  async (credantials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credantials);
      console.log(response);
      saveToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credantials, thunkAPI) => {
    try {
      const response = await axios.post('users/login', credantials);
      saveToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    removeToken();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistToken = state.auth.token;

  if (persistToken === null) {
  return thunkAPI.rejectWithValue('Unable to fetch user');
}

  try {
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});