import Header from './components/Header'
import Home from './sections/Home'
import OurWork from './sections/OurWork'
import OurServices from './sections/OurServices'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <Header />
      <div className="">
        <Home />
        <OurWork />
        <OurServices />
        <Contact />
      </div>
    </>
  )
}

export default App
