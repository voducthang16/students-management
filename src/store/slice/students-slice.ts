import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPagination } from 'models';
import { IStudentList } from 'models/students.model';
import { studentsService } from 'services/features';
import { RootState } from 'store';

const initialState: IStudentList = {
    list: [],
    total: 0,
};

export const getListStudentsAsync = createAsyncThunk('students/getLists', async (filter: IPagination) => {
    let queryString = '';
    for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
            if (queryString.length > 0) {
                queryString += '&';
            }
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`;
        }
    }
    const response = await studentsService.getAll({
        url: `?${queryString}`,
    });
    return response.data;
});

export const getTotalStudentsAsync = createAsyncThunk('students/getTotal', async () => {
    const response = await studentsService.getAll({});
    return response.data;
});

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder.addCase(getListStudentsAsync.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(getTotalStudentsAsync.fulfilled, (state, action) => {
            state.total = action.payload.length;
        });
    },
});
export const listStudents = (state: RootState) => state.students.list;
export const totalStudents = (state: RootState) => state.students.total;
export default studentsSlice.reducer;
