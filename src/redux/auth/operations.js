import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './../../firebase/sdk';
const auth = getAuth(app);

// const saveToken = token => {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// const removeToken = () => {
//   axios.defaults.headers.common['Authorization'] = '';
// };


export const registration = createAsyncThunk(
  'auth/registration',
  async (credantials, thunkAPI) => {
    const { email, password } = credantials;
    console.log(email, password)
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        return user.users.email;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return thunkAPI.rejectWithValue(error.message);
        // ..
      });

    // try {
    //   const response = await axios.post('/users/signup', credantials);
    //   console.log(credantials, thunkAPI)
    //   console.log(response);

    //   saveToken(response.data.token);
    //   return response.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credantials, thunkAPI) => {
    // try {
    //   const response = await axios.post('users/login', credantials);
    //   saveToken(response.data.token);
    //   return response.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  // try {
  //   const response = await axios.post('/users/logout');
  //   removeToken();
  //   return response.data;
  // } catch (error) {
  //   return thunkAPI.rejectWithValue(error.message);
  // }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistToken = state.auth.token;

    if (persistToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    // try {
    //   const response = await axios.get('/users/current');
    //   return response.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }
  }
);
