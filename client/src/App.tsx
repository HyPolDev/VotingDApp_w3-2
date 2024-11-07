import { useSelector } from "react-redux"
import ElectoralRoom from "./components/ElectoralRoom.tsx"
import Hero from "./components/Hero"
import FloatingNav from "./components/ui/Navbar.tsx"
function App() {
  const objData = useSelector((state: any) => state.voting)
  return (
    <>
      <main className="relative bg-black flex justify-center items-center felx-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full ">
          <FloatingNav navItems={[{ name: objData.account ? objData.account : "", link: "#" }]} />
          <Hero />
          <ElectoralRoom />
        </div>
      </main>
    </>
  )
}

export default App
