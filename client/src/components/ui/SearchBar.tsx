import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from './Button'

const SearchBar = () => {
    return (
        <div className='relative flex justify-center items-center mx-32 border-4 border-gray-300 bg-black-100 rounded-full'>
            <input placeholder="Insert a Voting Address to Participate" type="text" name="searchBar" id="searchBar" className="h-12 w-full bg-transparent px-10 focus:outline-none" />
            <Button className={'h-12 w-14 z-10'} icon={<FaMagnifyingGlass />} />
        </div>
    )
}

export default SearchBar