import { VotingCard } from './voting_card/VotingCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Session = () => {
    const objData = useSelector((state: any) => state.voting); // Get voting data from Redux

    useEffect(() => {

        console.log("Current Voting Data:", objData, objData.votingData.length);
    }, [objData]);

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
        <div className="mt-20">
            {objData && objData.votingData.length > 0 ? (
                <Slider {...settings}>
                    {objData.votingData.map((elem: any, index: number) => (
                        <div key={index}>
                            <VotingCard children={
                                <div className='flex h-80'>
                                    {elem.Title}
                                </div>
                            } className='px-20 mb-32 rounded-xl' />
                        </div>
                    ))}
                    <div>
                        <VotingCard children={
                            <div className='flex h-80'>
                                <h1>Find new sessions in the search bar, or create your own...</h1>
                            </div>
                        } className='w-full px-20 mb-32 rounded-xl' />
                    </div>
                </Slider>
            ) : (
                <div>
                    <VotingCard children={
                        <div className='flex h-80'>
                            <h1>Find new sessions in the search bar, or create your own...</h1>
                        </div>
                    } className='w-full px-20 mb-32 rounded-xl' />
                </div>
            )}
        </div>
    );
}

export default Session;
