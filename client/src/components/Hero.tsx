import { GenerativeText } from './ui/GenerativeText'
import { GridBackground } from './ui/GridBackground'
import { Spotlight } from './ui/Spotlight'
import ConnectWalletButton from './ui/WalletButton'

const Hero = () => {

    const scrollToElectoralRoom = () => {
        let e = document.getElementById("electoral-room");
        e?.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'center'
        });
    }

    return (
        <div className='pb-20 pt-36 h-full'>
            <div>
                <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
                <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' />
                <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />
            </div>
            <GridBackground />
            <div className='felx justify-center relative my-20 z-10'>
                <div className='felx flex-col items-center justify-center'>
                    <p className='uppercase tracking-widest text-xs text-center text-blue-100'>Democracy whas never this secure</p>
                    <GenerativeText words="Wellcome to OpenPoll" highlightedWords={[2]} className='text-center text-[40px] md:text-5xl lg:text-6xl' />
                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                        A decentralized solution for voting protocols
                    </p>
                    <a onClick={() => scrollToElectoralRoom()} className='flex justify-center'>
                        <ConnectWalletButton />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero