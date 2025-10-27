const models = [
  {
    name: "PORSCHE 911 GT3",
    tagline: "Race-Bred Engine with Motorsport DNA",
    image: "/porsche-home.jpg",
    specs: ["Revs up to 9000 RPM ", "0-60mph: 3.2s", "502 HP"],
    cta: "BUY FOR $250,000"
  },
  {
    name: "AUDI A8",
    tagline: "Executive Luxury",
    image: "/audi-home.jpg",
    specs: ["V8 TwinPower", "Rear Comfort Seats", "Laser Headlights"],
    cta: "BUY FOR $94,000"
  },
  {
    name: "LEXUS IS 250",
    tagline: "The F-Sport That Out-Handled German Rivals",
    image: "/lexus-home.jpg", 
    specs: ["Up to 6,400 RPM", "Heated and Ventilated Seats ", "Carbon Fiber Body"],
    cta: "BUY FOR $44,000"
  }
];

const ModelsSection = () => {
  return (
    <section className="py-16 bg-gray-900"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide">
            FEATURED THIS MONTH
          </h2>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">
            Engineering excellence meets timeless design. Experience the pinnacle of automotive craftsmanship.
          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"> 
          {models.map((model, index) => (
            <div 
              key={index}
              className="bg-linear-to-b from-gray-800/30 to-gray-900 overflow-hidden border border-gray-700 hover:border-amber-500 transition-all duration-500 rounded-lg"
            >

              <div className="h-56 overflow-hidden">
                <img 
                  src={model.image} 
                  alt={model.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5"> 
                <h3 className="text-xl font-light text-white">{model.name}</h3> 
                <p className="mt-1.5 text-amber-400 text-sm">{model.tagline}</p>
                <ul className="mt-3 space-y-1.5"> 
                  {model.specs.map((spec, i) => (
                    <li key={i} className="text-gray-300 text-xs flex items-start"> 
                      <svg className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {spec}
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full py-2.5 text-xs sm:text-sm border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 font-light tracking-wider rounded">
                  {model.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;