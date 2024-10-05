import SearchBar from './ui/SearchBar'
import { VotingCard } from './ui/voting_card/VotingCard'

const ElectoralRoom = () => {
    return (
        <section className='mt-32 flex flex-col'>
            <SearchBar />
            <div className="relative flex w-full mt-20">
                <VotingCard children={<></>} className='w-full px-20 mb-32  rounded-xl' />
            </div>
        </section>
    )
}

export default ElectoralRoom