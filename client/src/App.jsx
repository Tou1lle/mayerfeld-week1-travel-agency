import Header from "./components/Header"
import Hero from "./components/Hero"
import Tours from "./components/Tours"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>

      <main className="bg-sand">
        <Tours></Tours>
        <Testimonials></Testimonials>
      </main>

      <Footer></Footer>
    </>
  )
}

export default App;