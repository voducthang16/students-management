import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState = {
    status: true,
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
    },
});

export const { turnOff, turnOn } = loadingSlice.actions;
export const status = (state: RootState) => state.loading.status;
export default loadingSlice.reducer;
