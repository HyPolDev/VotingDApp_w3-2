import Hero from "./components/Hero"
import FloatingNav from "./components/ui/Navbar.tsx"
function App() {
  return (
    <>
      <main className="relative bg-black flex justify-center items-center felx-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full ">
          <FloatingNav navItems={[{ name: "pol", link: "#" }]} />
          <Hero />
        </div>
      </main>
    </>
  )
}

export default App
