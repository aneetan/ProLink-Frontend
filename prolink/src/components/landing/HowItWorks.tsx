import { FcApproval, FcBullish, FcCollaboration, FcFlowChart, FcMultipleInputs } from "react-icons/fc";

const steps = [
  {
    icon: FcMultipleInputs,
    title: "Request for Quote",
    description: "Submit your project requirements and get started in minutes",
    color: "step-1"
  },
  {
    icon: FcFlowChart,
    title: "Review Bids",
    description: "Receive and compare competitive bids from qualified professionals",
    color: "step-2"
  },
  {
    icon: FcApproval,
    title: "Select & Approve",
    description: "Choose the best fit and approve to start collaboration",
    color: "step-3"
  },
  {
    icon: FcCollaboration,
    title: "Collaborate",
    description: "Work together through integrated chat and secure milestone payments",
    color: "step-4"
  },
  {
    icon: FcBullish,
    title: "Track Progress",
    description: "Monitor all your projects and manage workflows from your dashboard",
    color: "step-5"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16 text-foreground">
          How it works?
        </h2>
        
        {/* Steps Container */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-10 left-4 right-4 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 z-0"></div>
          
          {/* Connection line for tablet */}
          <div className="hidden md:block lg:hidden absolute top-10 left-8 right-8 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 z-0"></div>
          
          {/* Mobile vertical connection lines */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 -translate-x-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-6 xl:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center text-center group"
                  style={{
                    animation: `fade-in 0.6s ease-out ${index * 100}ms both`
                  }}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md z-20">
                    {index + 1}
                  </div>  
                  
                  {/* Step content */}
                  <div className="relative mb-4 sm:mb-6 w-full">
                    <div 
                      className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg relative z-10 border border-gray-200 bg-white group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 mx-auto"
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                    
                    {/* Tablet decorative dots */}
                    {index < steps.length - 1 && index % 2 === 0 && (
                      <div className="hidden md:flex lg:hidden absolute top-8 -right-6 sm:-right-8 items-center gap-1 z-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Text content */}
                  <div className="px-2 sm:px-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground leading-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed sm:leading-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile step indicators */}
        <div className="md:hidden flex justify-center gap-2 mt-8">
          {steps.map((_, index) => (
            <div 
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;