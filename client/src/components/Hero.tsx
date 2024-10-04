import Button from './ui/Button'
import { GenerativeText } from './ui/GenerativeText'
import { GridBackground } from './ui/GridBackground'
import { Spotlight } from './ui/Spotlight'
import { FaLocationArrow } from 'react-icons/fa6'

const Hero = () => {
    return (
        <div className='pb-20 pt-36'>
            <div>
                <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
                <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' />
                <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />
            </div>
            <GridBackground />
            <div className='felx justify-center relative my-20 z-10'>
                <div className='felx flex-col items-center justify-center'>
                    <p className='uppercase tracking-widest text-xs text-center text-blue-100'>Pol's template description</p>
                    <GenerativeText words="Pol's template title" highlightedWords={[2]} className='text-center text-[40px] md:text-5xl lg:text-6xl' />
                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                        Pol's template subtitle
                    </p>
                    <a href="#" className='flex justify-center'>
                        <Button className="p-10" fill="Pol's template button" icon={<FaLocationArrow />} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero