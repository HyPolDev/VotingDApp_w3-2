// store/votingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the voting data
interface VotingData {
    sessionId: string; // Unique identifier for the session
    Title: string; // Title of the voting session
    // Add any other relevant properties you need for the voting data
}

// Define a type for the initial state
interface VotingState {
    votingData: VotingData[];
}

// Create the initial state
const initialState: VotingState = {
    votingData: [],
};

// Create a slice for managing voting data
const votingSlice = createSlice({
    name: 'voting',
    initialState,
    reducers: {
        setVotingData: (state, action: PayloadAction<VotingData[]>) => {
            state.votingData = action.payload; // Set the voting data
        },
        addVotingData: (state, action: PayloadAction<VotingData>) => {
            state.votingData.push(action.payload); // Add a new voting data object
        },
        clearVotingData: (state) => {
            state.votingData = []; // Clear the voting data
        },
    },
});

// Export actions and reducer
export const { setVotingData, addVotingData, clearVotingData } = votingSlice.actions;
export default votingSlice.reducer;
