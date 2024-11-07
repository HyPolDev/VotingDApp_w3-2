"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../../lib/utils.ts";
import { setAccount } from "../../store/votingSlice";

const HOLESKY_CHAIN_ID = 17000n; // Replace this with the actual Holesky network chain ID

const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const dispatch = useDispatch();
  const { scrollYProgress } = useScroll();
  const [accountState, setAccountState] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      setVisible(scrollYProgress.get() >= 0.05 && direction < 0);
    }
  });

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

      setAccountState(address);
      dispatch(setAccount(address));
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    setAccountState(null);
    dispatch(setAccount("")); // Clear account from Redux
    console.log("Wallet disconnected");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name || "Account not found"}</span>
          </a>
        ))}
        <button
          onClick={accountState ? disconnectWallet : connectWallet}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
        >
          <span>{accountState ? "Log out" : "Connect"}</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
