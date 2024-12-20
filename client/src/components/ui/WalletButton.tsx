import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Button from "./Button";
import { FaLocationArrow } from "react-icons/fa6";
import { setAccount } from "../../store/votingSlice";
import { useDispatch, useSelector } from "react-redux";


const HOLESKY_CHAIN_ID = 17000n;

const ConnectWalletButton: React.FC = () => {
    const [account, setAccountState] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch()
    const objData = useSelector((state: any) => state.voting)

    useEffect(() => {
        setAccountState(objData.account)
    }, [objData])



    // Function to request account access and connect to Holesky
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setError("MetaMask is not installed!");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Request account access once again, 

            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Get the current network
            const network = await provider.getNetwork();
            if (network.chainId !== HOLESKY_CHAIN_ID) {
                setError("Please switch to the Holesky network in MetaMask.");
                return;
            }

            setAccountState(address); // from a useState
            dispatch(setAccount(address)); //from redux
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
            {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
    );
};

export default ConnectWalletButton;
