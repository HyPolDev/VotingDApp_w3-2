import React, { useState } from "react";
import { ethers } from "ethers";
import Button from "./Button";
import { FaLocationArrow } from "react-icons/fa6";


const HOLESKY_CHAIN_ID = 17000n;

const ConnectWalletButton: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Function to request account access and connect to Holesky
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setError("MetaMask is not installed!");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Request account access

            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Get the current network
            const network = await provider.getNetwork();
            if (network.chainId !== HOLESKY_CHAIN_ID) {
                setError("Please switch to the Holesky network in MetaMask.");
                return;
            }

            setAccount(address);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error connecting wallet:", err);
            setError("Failed to connect wallet. Please try again.");
        }
    };

    return (
        <div>
            {account ? (
                <Button className="p-10 transform hover:-translate-y-1 transition duration-400" fill={`Connected as ${account}`} />
            ) : (
                <div onClick={connectWallet}>
                    <Button className="p-10 transform hover:-translate-y-1 transition duration-400" fill="Connect to your wallet to start" icon={<FaLocationArrow />} />
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ConnectWalletButton;
