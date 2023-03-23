import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState = {
    status: true,
    sidebar: true,
};

export const loadingSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        turnOff: (state) => {
            state.status = false;
        },
        turnOn: (state) => {
            state.status = true;
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
    },
});

export const { turnOff, turnOn, toggleSidebar } = loadingSlice.actions;
export const status = (state: RootState) => state.loading.status;
export const sidebar = (state: RootState) => state.loading.sidebar;
export default loadingSlice.reducer;
