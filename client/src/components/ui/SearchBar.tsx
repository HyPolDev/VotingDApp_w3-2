import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from './Button'
import { useState } from "react";
import { getRemainingTime, getResults, isVotingActive } from "../../services/abiCalls";

const SearchBar = () => {
    const [sessionId, setSessionId] = useState("")

    const searchSession = async () => {
        let id = parseInt(sessionId)
        console.log("Looking for the session...")
        const voteTimeLeft = await getRemainingTime(id)
        const voteResult = await getResults(id)
        const voteStatus = await isVotingActive(id)

        console.log("voteTimeLeft" + voteTimeLeft)
        console.log("getResults" + voteResult)
        console.log("isVotingActive" + voteStatus)
    }

    return (
        <div className='relative flex justify-center items-center mx-32 border-4 border-gray-300 bg-black-100 rounded-full'>
            <input onChange={(e) => setSessionId(e.target.value)} placeholder="Insert a Voting Address..." type="text" name="searchBar" id="searchBar" className="h-12 w-full bg-transparent px-10 focus:outline-none" />
            <div onClick={() => searchSession()}>
                <Button className={'h-12 w-20 z-10 -mt-2 -mb-2'} icon={<FaMagnifyingGlass />} />
            </div>
        </div>
    )
}

export default SearchBar