import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from './Button'
import { useRef, useState } from "react";
import { getRemainingTime, getResults, getTitle, isVotingActive } from "../../services/abiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addVotingData } from '../../store/votingSlice.ts'

const SearchBar = () => {
    const [sessionId, setSessionId] = useState("")
    const [errorState, setErrorState] = useState("")
    const data = useSelector((state: any) => state.voting)
    const dispatch = useDispatch();
    const saveVotingData = (sessionId: string, data: any) => {
        dispatch(addVotingData({ sessionId, ...data })); // Dispatch the action to add voting data
    }
    const inputRef: any = useRef(null)

    const searchSession = async () => {
        let id = parseInt(sessionId)
        console.log("Looking for the session...")

        try {
            const voteTimeLeft = Number(await getRemainingTime(id));  // Convert BigInt to Number
            const voteResult = await getResults(id);
            const voteStatus = await isVotingActive(id);
            const votingTitle = await getTitle(id);
            const VotingData = {
                "TimeLeft": voteTimeLeft, // This is now a number, not BigInt
                "Results": voteResult.map((result: any, index: any) => ({
                    name: result.name,
                    index: Number(index), // Convert index to number
                    voteCount: result.voteCount.toString()  // Convert BigInt to string
                })),
                "Status": voteStatus,
                "Title": votingTitle,
                "id": sessionId
            };

            console.log(data);

            saveVotingData(sessionId, VotingData)
            inputRef.current.value = "";
        } catch (error) {
            setErrorState(`Could not find the session ${sessionId}`)
            setTimeout(() => setErrorState(""), 2000)
        }

    }

    return (

        <div className='relative flex justify-center items-center mx-32 border-4 border-gray-300 bg-black-100 rounded-full'>
            <h4 className="absolute text-red-600">{errorState}</h4>
            <input ref={inputRef} onChange={(e) => setSessionId(e.target.value)} placeholder="Insert a Voting Address..." type="text" name="searchBar" id="searchBar" className="h-12 w-full bg-transparent px-10 focus:outline-none" />
            <div onClick={() => searchSession()}>
                <Button className={'h-12 w-20 z-10 -mt-2 -mb-2'} icon={<FaMagnifyingGlass />} />
            </div>
        </div>
    )
}

export default SearchBar