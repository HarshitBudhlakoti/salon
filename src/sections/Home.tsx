const Home = () => (
  <section id="home" className="h-screen flex flex-col  pt-12 px-5">
    <div className=" h-1/2 flex justify-center items-center">
      <img src="src/assets/image.png" alt="" className="rounded-3xl object-cover w-full h-3/4" />
    </div>
    <div className=" h-1/2 flex pb-5 gap-5 w-full">
      <div className="w-1/2">
        <img src="src/assets/image.png" alt="" className="h-full object-cover rounded-3xl" />
      </div>
      <div className="w-1/2">
        <img src="src/assets/image.png" alt="" className="h-full object-cover rounded-3xl" />
      </div>
    </div>
  </section>
);

export default Home; 