import SearchBar from './ui/SearchBar'
import Session from './ui/Session'
import { VotingForm } from './ui/voting_form/Form'

const ElectoralRoom = () => {
    return (
        <section className='mt-32 flex flex-col'>
            <SearchBar />
            <Session />
            <VotingForm />
        </section>
    )
}

export default ElectoralRoom