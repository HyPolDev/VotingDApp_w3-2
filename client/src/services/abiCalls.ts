import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const abi = contractABI;

declare global {
    interface Window {
        ethereum: any;
    }
}

export const handleSelectChange = (option: string | undefined, sessionId: string) => {
    console.log(option, sessionId)
    if (typeof (option) == "string") {
        localStorage.setItem(`Session number ${sessionId}`, option)
        console.log("Selected", option)
    }
    console.log("Stored", localStorage.getItem(`Session number ${sessionId}`))
    return null
}

export const getProvider = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
};

export const getVotingContract = async () => {
    const provider = await getProvider();
    const signer = await provider.getSigner(); // Only gets the signer when the user has connected
    return new ethers.Contract(contractAddress, abi, signer);
};

export const createVotingSession = async (
    title: string,
    candidateNames: string[],
    durationInMinutes: number
) => {
    try {
        const votingContract = await getVotingContract(); // Get contract instance only after connection
        const tx = await votingContract.createVotingSession(
            title,
            candidateNames,
            durationInMinutes
        );
        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Voting session created:", receipt);
        return receipt;
    } catch (error) {
        console.error("Error creating voting session:", error);
    }
};


export const castVote = async (sessionId: number, candidateIndex: number) => {
    try {
        const votingContract = await getVotingContract()
        const tx = await votingContract.vote(sessionId, candidateIndex);
        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Vote cast successfully:", receipt);
    } catch (error) {
        console.error("Error casting vote:", error);
    }
}

export const getResults = async (sessionId: number) => {
    try {
        const votingContract = await getVotingContract()
        const results = await votingContract.getResults(sessionId);
        return results;
    } catch (error) {
        console.error("Error fetching voting results:", error);
    }
}

export const isVotingActive = async (sessionId: number) => {
    try {
        const votingContract = await getVotingContract()
        const active = await votingContract.isVotingActive(sessionId);
        return active;
    } catch (error) {
        console.error("Error checking voting session status:", error);
    }
}

export const getRemainingTime = async (sessionId: number) => {
    try {
        const votingContract = await getVotingContract()
        const remainingTime = await votingContract.getRemainingTime(sessionId);
        return remainingTime;
    } catch (error) {
        console.error("Error fetching remaining time:", error);
    }
}

export const getTitle = async (sessionId: number) => {
    try {
        const votingContract = await getVotingContract()
        const sessionTitle = await votingContract.getVotingSessionTitle(sessionId)
        return sessionTitle
    } catch (error) {
        console.error("Unable to get session", error)
    }
}

export const hasVoted = async (sessionId: number, userAddress: string) => {
    try {
        const votingContract = await getVotingContract()
        const hasVoted = await votingContract.hasVoted(sessionId, userAddress);
        return hasVoted
    } catch (error) {
        console.error(error)
    }

}

