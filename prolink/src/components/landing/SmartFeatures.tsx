import { motion } from 'framer-motion';
import { IoPeople } from 'react-icons/io5';
import { MdRequestQuote, MdVerifiedUser } from 'react-icons/md';

const SmartFeatures = () => {
  return (
   <section className="w-full py-20 px-8 lg:px-8 bg-[var(--primary-bg)]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                From Quote to Connection
              </h2>
              <p className="text-xl text-gray-600">
                Because every project deserves the right connection, the right price, and the right outcome.
              </p>
            </div>

            <div className="grid gap-6">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MdRequestQuote className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart Quotations</h3>
                  <p className="text-muted-foreground">
                    Get transparent, competitive quotations from trusted service providers - all in one place.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <IoPeople className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Seamless Communication</h3>
                  <p className="text-muted-foreground">
                    Initiate chat, share details, and finalize tasks with ease once a bid is approved.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MdVerifiedUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2"> Verified Connections </h3>
                  <p className="text-muted-foreground">
                    Connect only with verified companies and clients to ensure trust and reliability in every project.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.img 
                src="https://media.istockphoto.com/id/952625346/photo/businessmen-shaking-hands-after-meeting-in-a-cafe.jpg?s=612x612&w=0&k=20&c=dpfUuBGPdTi4b4gbBg9kkpg8KauUSzGLpVByJsa5_KY=" 
                alt="Connection Image"
                className="w-120 h-auto drop-shadow-2xl rounded-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="absolute -bottom-8 -left-6 bg-white rounded-xl shadow-lg p-4 w-30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-bold text-[var(--primary-color)]">200+</div>
                <div className="text-sm text-gray-600"> Users Enrolled</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SmartFeatures
