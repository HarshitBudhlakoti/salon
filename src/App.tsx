import { useEffect } from 'react'
import Header from './components/Header'
import Home from './sections/Home'
import OurWork from './sections/OurWork'
import OurServices from './sections/OurServices'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  // Scroll to top when the component mounts (on page reload)
  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Multiple methods to ensure scrolling to top works
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    
    // Immediate scroll
    scrollToTop()
    
    // Scroll multiple times to prevent browser from restoring position
    setTimeout(scrollToTop, 100)
    setTimeout(scrollToTop, 500)
    setTimeout(scrollToTop, 1000)
    
    // Prevent scroll restoration on page load
    const handleBeforeUnload = () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <main className="relative overflow-x-hidden">
        <Home />
        <OurServices />
        <OurWork />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
