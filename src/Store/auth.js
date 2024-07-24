import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { token: '', LoginStatus: false, user: null };

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialAuthState,
  reducers: {
    Login(state, action) {
      state.token = action.payload.idToken;
      state.LoginStatus = true;
      state.user = action.payload.email;
      localStorage.setItem('Token', state.token);
      localStorage.setItem('User', state.user);
    },
    Logout(state) {
      state.token = '';
      state.LoginStatus = false;
      state.user = null;
      localStorage.removeItem('Token');
      localStorage.removeItem('User');
    }
  }
});

export const Authaction = AuthSlice.actions;
export default AuthSlice;
