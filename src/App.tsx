import Header from './components/Header'
import Home from './sections/Home'
import OurWork from './sections/OurWork'
import OurServices from './sections/OurServices'
import Contact from './sections/Contact'

function App() {
  return (
    <div className="min-h-screen metallic-green-gradient">
      <Header />
      <main className="relative">
        <Home />
        <OurServices />
        <OurWork />
        <Contact />
      </main>
    </div>
  )
}

export default App
