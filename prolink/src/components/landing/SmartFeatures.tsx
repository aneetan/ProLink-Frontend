import { motion } from 'framer-motion';
import { IoPeople } from 'react-icons/io5';
import { MdRequestQuote, MdVerifiedUser } from 'react-icons/md';

const SmartFeatures = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--primary-bg)]/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                From Quote to <br className="hidden sm:block" /> Connection
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Because every project deserves the right connection, the right price, and the right outcome.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <motion.div 
                className="flex items-start space-x-3 sm:space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary-color)] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <MdRequestQuote className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Smart Quotations</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Get transparent, competitive quotations from trusted service providers - all in one place.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-3 sm:space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary-color)] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <IoPeople className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Seamless Communication</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Initiate chat, share details, and finalize tasks with ease once a bid is approved.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-3 sm:space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary-color)] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <MdVerifiedUser className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Verified Connections</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Connect only with verified companies and clients to ensure trust and reliability in every project.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative max-w-sm sm:max-w-md lg:max-w-lg">
              <motion.img 
                src="https://media.istockphoto.com/id/952625346/photo/businessmen-shaking-hands-after-meeting-in-a-cafe.jpg?s=612x612&w=0&k=20&c=dpfUuBGPdTi4b4gbBg9kkpg8KauUSzGLpVByJsa5_KY=" 
                alt="Connection Image"
                className="w-full h-auto drop-shadow-2xl rounded-xl sm:rounded-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Stats Badge */}
              <motion.div 
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 w-24 sm:w-28 md:w-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-xl sm:text-2xl font-bold text-[var(--primary-color)]">200+</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Users Enrolled</div>
              </motion.div>

              {/* Optional additional badge - uncomment if needed */}
              {/* <motion.div 
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 w-24 sm:w-28 md:w-32"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-xl sm:text-2xl font-bold text-[var(--primary-color)]">50+</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Providers</div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SmartFeatures