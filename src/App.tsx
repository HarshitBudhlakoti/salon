import Header from './sections/Header'

function App() {

  return (
    <>
      <Header />
      <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-100">
        <h1 className="text-4xl font-bold mb-4">HOME</h1>
        <p className="text-lg">Welcome to our homepage!</p>
      </section>
      <section id="our-work" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200">
        <h1 className="text-4xl font-bold mb-4">Our Work</h1>
        <p className="text-lg">Showcase of our projects and achievements.</p>
      </section>
      <section id="our-services" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-200 to-gray-300">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg">Details about the services we offer.</p>
      </section>
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-300 to-gray-400">
        <h1 className="text-4xl font-bold mb-4">Connect / Contact</h1>
        <p className="text-lg">Get in touch with us!</p>
      </section>
    </>
  )
}

export default App
