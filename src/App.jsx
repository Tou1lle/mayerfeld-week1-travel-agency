import Header from "./components/Header"
import Hero from "./components/Hero"
import Tours from "./components/Tours"
import Testimonials from "./components/Testimonials"

function App() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>

      <main className="bg-sand">
        <Tours></Tours>
        <Testimonials></Testimonials>
      </main>
    </>
  )
}

export default App;