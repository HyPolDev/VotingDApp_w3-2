import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { VotingCard } from './voting_card/VotingCard';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Assuming you have a MultiStepLoader component
import { MultiStepLoader } from './Loader/multiStepLoader'

const loadingStates = [
    { text: "Connecting to the blockchain..." },
    { text: "Verifying voting session..." },
    { text: "Preparing your vote..." },
    { text: "Signing transaction with wallet..." },
    { text: "Broadcasting vote to the network..." },
    { text: "Waiting for transaction confirmation..." },
    { text: "Vote successfully submitted!" },
    { text: "Updating voting results..." },
]

export default function Session() {
    const objData = useSelector((state: any) => state.voting)
    const [loading, setLoading] = useState(false)
    const [castedVotes, setCastedVotes] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        console.log("Current Voting Data:", objData, objData.votingData.length)
    }, [objData])

    const handleVote = (selectedCandidate: string, sessionId: string) => {
        setCastedVotes(prevVotes => ({
            ...prevVotes,
            [sessionId]: selectedCandidate
        }))
        // Assuming handleSelectChange is imported from your services
        // handleSelectChange(selectedCandidate, sessionId)
    }

    const submitVote = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), (Math.random() * 10000) + 5000)
    }

    const CustomPrevArrow = (props: any) => (
        <button
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded-full"
            onClick={props.onClick}
        >
            <ChevronLeft className="h-6 w-6" />
        </button>
    )

    const CustomNextArrow = (props: any) => (
        <button
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded-full"
            onClick={props.onClick}
        >
            <ChevronRight className="h-6 w-6" />
        </button>
    )

    const settings = {
        className: "slider center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            }
        ]
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {objData && objData.votingData.length > 0 ? (
                <Slider {...settings}>
                    {objData.votingData.map((elem: any, index: number) => (
                        <div key={index} className="px-2">
                            <VotingCard className='px-20 mb-32 rounded-xl'>
                                <div className='inline-flex h-80 w-full justify-between relative z-20'>
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-white mb-2">{elem.Title}</h2>
                                        <div className="text-red-500 font-semibold mb-4">
                                            {elem.TimeLeft} seconds remaining
                                        </div>
                                        <div className="space-y-4 w-60">
                                            {elem.Results.map((candidate: any, i: number) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className="text-lg text-white w-96">{candidate.name}</span>
                                                    <div className="flex items-center gap-2 flex-1 mx-4">
                                                        <div className="bg-gray-700 rounded-full h-2.5  w-20">
                                                            <div
                                                                className="bg-blue-600 h-2.5 rounded-full"
                                                                style={{ width: `${(candidate.voteCount / elem.Results.reduce((sum: number, c: any) => sum + parseInt(c.voteCount), 0)) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm w-12 text-right text-gray-300">
                                                            {((candidate.voteCount / elem.Results.reduce((sum: number, c: any) => sum + parseInt(c.voteCount), 0)) * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                    <span className="text-lg font-semibold w-12 text-right text-white">
                                                        {parseInt(candidate.voteCount) + (castedVotes[elem.sessionId] === candidate.name ? 1 : 0)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {elem.TimeLeft > 0 ? (
                                        <div className="px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
                                            <select
                                                className="w-full sm:w-48 px-4 py-2 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => handleVote(e.target.value, elem.sessionId)}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select a candidate</option>
                                                {elem.Results.map((candidate: any) => (
                                                    <option key={candidate.name} value={candidate.name}>
                                                        {candidate.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={submitVote}
                                                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                                            >
                                                Cast Vote
                                            </button>
                                        </div>
                                    ) : ""}
                                </div>
                            </VotingCard>
                        </div>
                    ))}
                    <div className="px-2">
                        <VotingCard className='px-20 mb-32 rounded-xl'>
                            <div className='inline-flex h-80 w-full justify-between relative z-20'>
                                <div className=" rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-auto">
                                    <div className="flex items-center justify-center h-80 p-6">
                                        <p className="text-center text-lg text-white">
                                            Find new sessions in the search bar, or create your own...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </VotingCard>
                    </div>
                </Slider>
            ) : (
                <VotingCard className='px-20 mb-16 rounded-xl'>
                    <div className='inline-flex h-80 w-full justify-between relative z-20'>
                        <div className=" rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-auto">
                            <div className="flex items-center justify-center h-80 p-6">
                                <p className="text-center text-lg text-white">
                                    Find new sessions in the search bar, or create your own...
                                </p>
                            </div>
                        </div>
                    </div>
                </VotingCard>
            )}
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />
        </div>
    )
}