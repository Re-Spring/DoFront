import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        getStory: (state, action) => {
            return action.payload;
        },
    },
});

export const { getStory } = storySlice.actions;

export default storySlice.reducer;
