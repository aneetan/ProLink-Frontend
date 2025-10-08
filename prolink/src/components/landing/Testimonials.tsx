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
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`w-4 h-4 ${
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
    <article className="group relative bg-gradient-to-br from-white to-gray-50/80 border border-gray-200 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200 hover:-translate-y-2 backdrop-blur-sm">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-bl-full" />
      
      {/* Quote icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-light)] rounded-2xl flex items-center justify-center shadow-lg">
        <FaQuoteLeft className="w-5 h-5 text-white" />
      </div>

      <div className="flex items-start gap-5 mb-6 pt-2">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={`${testimonial.name} avatar`}
            className="w-16 h-16 rounded-2xl object-cover ring-3 ring-white shadow-lg group-hover:ring-[var(--primary-color)] group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {testimonial.name}
          </h3>
          {(testimonial.role || testimonial.company) && (
            <p className="text-sm text-gray-600 mb-2">
              {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
            </p>
          )}
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      
      <blockquote className="text-gray-700 leading-relaxed text-lg relative z-10">
        "{testimonial.quote}"
      </blockquote>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 opacity-0 group-hover:opacity-100" />
    </article>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full  bg-[var(--primary-lighter)]/50 border border-[var(--secondary-color)]  text-[var(--secondary-color)]  text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[var(--secondary-color)] rounded-full animate-pulse" />
            Trusted by Industry Leaders
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Clients Say
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear from some of our amazing clients 
            who have transformed their business with our platform.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">          
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
      </div>
    </section>
  );
};

export default Testimonials;