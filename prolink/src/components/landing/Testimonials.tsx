import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  quote: string;
  image: string;
  role?: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    rating: 4,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    quote: "This platform has completely transformed how we handle our marketing campaigns. The intuitive interface and powerful features have saved us countless hours.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLabs",
    rating: 5,
    image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    quote: "Outstanding service and exceptional results. The team went above and beyond to ensure our success. Highly recommend to anyone looking for quality.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "CTO",
    company: "StartUp Ventures",
    rating: 5,
    image: "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
    quote: "A game-changer for our team! The seamless integration and robust functionality have made our workflow so much more efficient. Couldn't be happier.",
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5 sm:gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`w-3 h-3 sm:w-4 sm:h-4 ${
            index < rating
              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <article className="group relative bg-gradient-to-br from-white to-gray-50/80 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-lg sm:hover:shadow-2xl sm:hover:shadow-blue-500/5 hover:border-blue-200 hover:-translate-y-1 sm:hover:-translate-y-2 backdrop-blur-sm">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-bl-full" />
      
      {/* Quote icon */}
      <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-light)] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
        <FaQuoteLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
      </div>

      <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6 pt-1 sm:pt-2">
        <div className="relative flex-shrink-0">
          <img
            src={testimonial.image}
            alt={`${testimonial.name} avatar`}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl object-cover ring-2 sm:ring-3 ring-white shadow-md sm:shadow-lg group-hover:ring-[var(--primary-color)] group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg md:text-lg mb-0.5 sm:mb-1 truncate">
            {testimonial.name}
          </h3>
          {(testimonial.role || testimonial.company) && (
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-1">
              {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
            </p>
          )}
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      
      <blockquote className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-base relative z-10 line-clamp-4 sm:line-clamp-none">
        "{testimonial.quote}"
      </blockquote>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 opacity-0 group-hover:opacity-100" />
    </article>
  );
};

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--primary-bg)]/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 md:h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 sm:h-24 md:h-32 bg-gradient-to-t from-white to-transparent" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative">
        <header className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--primary-lighter)]/50 border border-[var(--secondary-color)] text-[var(--secondary-color)] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--secondary-color)] rounded-full animate-pulse" />
            Trusted by Industry Leaders
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-4">
            What Our Clients Say
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
            Don't just take our word for it. Hear from some of our amazing clients 
            who have transformed their business with our platform.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">          
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="relative"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Mobile indicator dots */}
        <div className="sm:hidden flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
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

export default Testimonials;