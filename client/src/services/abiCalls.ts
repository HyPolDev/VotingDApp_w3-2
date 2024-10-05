import { ethers } from "ethers"
import { contractABI, contractAddress } from "../utils/constants"

declare global {
    interface Window {
        ethereum: any;
    }
}

const abi = contractABI
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []); // Request user to connect MetaMask
const signer = await provider.getSigner();
const votingContract = new ethers.Contract(contractAddress, abi, signer);

async function createVotingSession(
    title: string,
    candidateNames: string[],
    durationInMinutes: number
) {
    try {
        const tx = await votingContract.createVotingSession(
            title,
            candidateNames,
            durationInMinutes
        );
        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Voting session created:", receipt);
    } catch (error) {
        console.error("Error creating voting session:", error);
    }
}

async function castVote(sessionId: number, candidateIndex: number) {
    try {
        const tx = await votingContract.vote(sessionId, candidateIndex);
        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Vote cast successfully:", receipt);
    } catch (error) {
        console.error("Error casting vote:", error);
    }
}

async function getResults(sessionId: number) {
    try {
        const results = await votingContract.getResults(sessionId);
        console.log("Voting Results:", results);
        return results;
    } catch (error) {
        console.error("Error fetching voting results:", error);
    }
}

async function isVotingActive(sessionId: number) {
    try {
        const active = await votingContract.isVotingActive(sessionId);
        console.log("Is voting active:", active);
        return active;
    } catch (error) {
        console.error("Error checking voting session status:", error);
    }
}

async function getRemainingTime(sessionId: number) {
    try {
        const remainingTime = await votingContract.getRemainingTime(sessionId);
        console.log("Remaining time:", remainingTime);
        return remainingTime;
    } catch (error) {
        console.error("Error fetching remaining time:", error);
    }
}

// Listening to VotingSessionCreated events
votingContract.on("VotingSessionCreated", (sessionId, title, creator, votingEnd) => {
    console.log(`New Voting Session Created - ID: ${sessionId}, Title: ${title}, Creator: ${creator}, Ends At: ${votingEnd}`);
});

// Listening to VoteCast events
votingContract.on("VoteCast", (sessionId, candidateIndex, voter) => {
    console.log(`Vote Cast - Session ID: ${sessionId}, Candidate Index: ${candidateIndex}, Voter: ${voter}`);
});
