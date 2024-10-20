// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import votingReducer from './votingSlice.ts'; // Import the voting slice

const store = configureStore({
    reducer: {
        voting: votingReducer, // Add the voting slice to the store
    },
});

export default store;
