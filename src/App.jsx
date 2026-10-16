import Header from "./components/Header"
import Hero from "./components/Hero"
import Tours from "./components/Tours"

function App() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>

      <main className="bg-sand">
        <Tours></Tours>
      </main>
    </>
  )
}

export default App;