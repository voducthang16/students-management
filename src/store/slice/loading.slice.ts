import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState = {
    status: true,
};

export const loadingSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        toggle: (state) => {
            state.status = !state.status;
        },
    },
});

export const { toggle } = loadingSlice.actions;
export const status = (state: RootState) => state.loading.status;
export default loadingSlice.reducer;
