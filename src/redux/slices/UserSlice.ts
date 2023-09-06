import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: {
    id: string;
    balance: number;
    avatar: string,
    lang: string,
    name: string
  };
  isUser: boolean,
  isLoading: boolean
}

const initialState: UserState = {
  user: {
    id: '0',
    avatar: './images/avatarPlaceholder.svg',
    balance: 0.00,
    lang: "en",
    name: ""
  },
  isUser: false,
  isLoading: true
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) =>{
        state.user = action.payload
    },
    setLanguage: (state, action) => {
      state.user.lang = action.payload;
    },
    setUserTrue: (state) =>{
        state.isUser = true
    },
    setLoadingFalse: (state) =>{
        state.isLoading = false
    },
    setLoadingTrue: (state) =>{
      state.isLoading = true
  }
  },
});

export const { setUser, setUserTrue, setLoadingFalse, setLoadingTrue, setLanguage } = UserSlice.actions;

export default UserSlice.reducer;