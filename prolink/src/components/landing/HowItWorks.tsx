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
    <section className="py-20 px-4 bg-background">
      <div className="container md:mx-12 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
          How it works?
        </h2>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-10 left-20 right-20 h-0.5 bg-gradient-to-r from-gray-400 via-border to-gray-200"></div>
          
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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--primary-light)] text-gray-100 flex items-center justify-center text-sm font-bold shadow-md z-10">
                  {index + 1}
                </div>  
                
                <div 
                  className="relative mb-6"
                >
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg relative z-0 border-1 border-[var(--primary-light)]
                     bg-gray-50 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  
                  {/* Decorative dots between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-9 -right-8 items-center gap-1.5 z-0">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
