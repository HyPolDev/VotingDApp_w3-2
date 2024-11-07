"use client";
import React, { useState } from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "../../../../lib/utils";
import { createVotingSession } from "../../../services/abiCalls";


export const VotingForm = () => {
    const [title, setTitle] = useState("")
    const [minutes, setMinutes] = useState("")
    const [candidates, setCandidates] = useState("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const candidateNames: string[] = candidates.split(",")
        console.log("Form submitted");
        await createVotingSession(title, candidateNames, parseInt(minutes))
    };

    return (
        <div>
            <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input blue-glassmorphism">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Create a Voting Session
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Fill the form to get your own votting session and remember, for now, you won't be able to add candidates later
                    </p>

                    <form className="my-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label>Session Name</Label>
                                <Input id="title" placeholder="Venezuela's elections" type="text" onChange={(e) => setTitle(e.target.value)} />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Open till...</Label>
                                <Input id="minutes" placeholder="In minutes" type="number" data-input-number data-options='{"minValue": 0, "maxValue": Infinity}' onChange={(e) => setMinutes(e.target.value)} />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Candidates</Label>
                            <Input id="email" placeholder="John, Alice, Bob, Pol" type="text" onChange={(e) => setCandidates(e.target.value)} />
                        </LabelInputContainer>
                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                        >
                            Submit &rarr;
                            <BottomGradient />
                        </button>

                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                        <div className="flex flex-col space-y-4">
                            <a href="https://github.com/hypoldev"
                                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                                type="submit"
                            >

                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    GitHub
                                </span>
                                <BottomGradient />
                            </a>
                            <a
                                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                                type="submit"
                            >

                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    Google
                                </span>
                                <BottomGradient />
                            </a>
                            <a
                                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                                type="submit"
                            >

                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    OnlyFans
                                </span>
                                <BottomGradient />
                            </a>
                        </div>
                    </form>
                </div>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">

                </div>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
