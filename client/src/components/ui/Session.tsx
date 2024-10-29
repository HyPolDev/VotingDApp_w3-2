import { VotingCard } from './voting_card/VotingCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { handleSelectChange } from '../../services/abiCalls';
import { MultiStepLoader } from './Loader/multiStepLoader';
import Button from './Button';

const loadingStates = [
    {
        text: "Connecting to the blockchain...",
    },
    {
        text: "Verifying voting session...",
    },
    {
        text: "Preparing your vote...",
    },
    {
        text: "Signing transaction with wallet...",
    },
    {
        text: "Broadcasting vote to the network...",
    },
    {
        text: "Waiting for transaction confirmation...",
    },
    {
        text: "Vote successfully submitted!",
    },
    {
        text: "Updating voting results...",
    },
];

const Session = () => {
    const objData = useSelector((state: any) => state.voting); // Get voting data from Redux

    const [loading, setLoading] = useState(false);

    const [castedVotes, setCastedVotes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        console.log("Current Voting Data:", objData, objData.votingData.length);
    }, [objData]);

    const handleVote = (selectedCandidate: string, sessionId: string) => {
        // Store the selected candidate for the specific session
        setCastedVotes(prevVotes => ({
            ...prevVotes,
            [sessionId]: selectedCandidate
        }));
        handleSelectChange(selectedCandidate, sessionId);
    };

    const submitVote = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), (Math.random() * 10000) + 5000)
    }

    var settings = {
        className: "slider center",
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="mt-20" >
            {objData && objData.votingData.length > 0 ? (
                <Slider {...settings}>
                    {objData.votingData.map((elem: any, index: number) => {
                        const options = elem.Results.map((candidate: any) => ({
                            value: candidate.name,
                            label: candidate.name,
                        }));

                        return (
                            <div key={index * 2 - 1}>
                                <VotingCard className='px-20 mb-32 rounded-xl'>
                                    <div className='flex h-80 w-full space-x-36 relative z-20'>
                                        <div>
                                            <h1 className='font-extrabold text-4xl pb-12'>{elem.Title}</h1>
                                            {elem.Results.map((e: any, i: number) => (
                                                <div key={i}>
                                                    <h1>{e.name}</h1>
                                                    {/* Display vote count, adding 1 if the candidate was selected */}
                                                    <p>{parseInt(e.voteCount) + (castedVotes[elem.sessionId] === e.name ? 1 : 0)}</p>
                                                    <br />
                                                </div>
                                            ))}
                                            <Select
                                                options={options}
                                                placeholder="Select a candidate"
                                                onChange={(selectedOption: { value: string; label: string } | null) => {
                                                    if (selectedOption?.value) {
                                                        handleVote(selectedOption.value, elem.sessionId); // IMPROTANT CHANGE IN THE FUTURE TO SUBMISION
                                                    }
                                                }}
                                            />
                                        </div>
                                        <h1 className='text-red-700 font-bold top-4'>{elem.TimeLeft} seconds remaining</h1>
                                        <div className='h-12 w-20 z-10 -mt-2 -mb-2' onClick={submitVote}>
                                            <Button className='' fill='Cast vote' />
                                        </div>
                                    </div>
                                </VotingCard>
                            </div>
                        );
                    })}
                    <div>
                        <VotingCard children={
                            <div className='flex h-80 relative z-20'>
                                <h1>Find new sessions in the search bar, or create your own...</h1>
                            </div>
                        } className='w-full px-20 mb-32 rounded-xl' />
                    </div>
                </Slider>
            ) : (
                <div>
                    <VotingCard children={
                        <div className='flex h-80 relative z-20'>
                            <h1>Find new sessions in the search bar, or create your own...</h1>
                        </div>
                    } className='w-full px-20 mb-32 rounded-xl' />
                </div>
            )}
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />
        </div>
    );
}

export default Session;
