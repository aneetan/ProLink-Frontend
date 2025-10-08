import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import HeroImage from '../../assets/image/hero-services.png'

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="w-full min-h-screen py-10 px-8 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <motion.h1 
              className="text-3xl lg:text-5xl font-bold text-foreground leading-tight"
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
              className="text-xl text-gray-600 leading-relaxed"
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
            <div className='flex flex-col md:flex-row gap-2'>
              <button
                onClick={() => navigate('/chatbot')}
                className="bg-[var(--primary-color)] px-5 md:px-6 py-4 rounded-xl text-white font-semibold
                hover:bg-[var(--primary-dark)] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Find Trusted Providers
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <motion.img 
              src={HeroImage}
              alt="Professional Hero Image"
              className="w-200 h-auto relative z-10 drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute -bottom-6 -right-0  w-32 h-32 bg-white rounded-full shadow-lg p-4 z-20"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <img 
                src="https://img.freepik.com/free-vector/people-connecting-web-network-diagram-background_1017-53236.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="Rural Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.div 
              className="absolute -top-2 left-20 w-24 h-24 bg-[var(--primary-color)] rounded-full shadow-lg flex flex-col items-center justify-center z-20"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="text-2xl text-white font-bold text-health-primary">24/7</div>
              <div className="text-sm text-white text-muted-foreground"> Support </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </div>
  )
}

export default HeroSection
