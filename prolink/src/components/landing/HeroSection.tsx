import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import HeroImage from '../../assets/image/hero-services.png'

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="w-full min-h-md py-10 px-3 sm:px-6 bg-gradient-to-b from-gray-50 to-white mt-18">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Turning Client
                <span className='text-[var(--primary-color)]'> Needs </span>
                <br/>
                into Company
                <span className='text-[var(--primary-color)]'> Opportunities!</span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                From quotation to completion,
                connect only with vetted service providers who deliver on their promise.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                <button
                  onClick={() => navigate('/chatbot')}
                  className="bg-[var(--primary-color)] px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base
                  hover:bg-[var(--primary-dark)] shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  Find Trusted Providers
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative max-w-md lg:max-w-none">
              <motion.img 
                src={HeroImage}
                alt="Professional Hero Image"
                className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative z-10 drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Floating Element */}
              <motion.div 
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full shadow-lg p-2 sm:p-3 md:p-4 z-20"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <img 
                  src="https://img.freepik.com/free-vector/people-connecting-web-network-diagram-background_1017-53236.jpg?semt=ais_hybrid&w=740&q=80" 
                  alt="Network Diagram"
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>

              {/* Optional 24/7 Support Badge - Uncomment if needed */}
              {/* <motion.div 
                className="absolute -top-2 left-4 sm:left-8 md:left-12 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[var(--primary-color)] rounded-full shadow-lg flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <div className="text-lg sm:text-xl md:text-2xl text-white font-bold">24/7</div>
                <div className="text-xs sm:text-sm text-white opacity-90">Support</div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection