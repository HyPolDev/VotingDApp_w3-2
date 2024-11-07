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
    account: string | null; // New field for account information
}

// Create the initial state
const initialState: VotingState = {
    votingData: [],
    account: null,
};

// Create a slice for managing voting data and account information
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
        setAccount: (state, action: PayloadAction<string>) => {
            state.account = action.payload; // Set the account
        },
        clearAccount: (state) => {
            state.account = null; // Clear the account
        },
    },
});

// Export actions and reducer
export const { setVotingData, addVotingData, clearVotingData, setAccount, clearAccount } = votingSlice.actions;
export default votingSlice.reducer;
