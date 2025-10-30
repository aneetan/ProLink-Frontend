import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../Logo";

const AppRoutes = {
  HOME: "/",
  HOW_IT_WORKS: "/how-it-works",
  ABOUT_US: "/about-us",
  TESTIMONIALS: "/testimonials",
  COMPANIES: "/companies",
} as const;

interface NavItem {
  key: NavRoutes;
  label: string;
  path: string;
}

type NavRoutes = keyof typeof AppRoutes;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<NavRoutes>("HOME");
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navItems: NavItem[] = [
    { key: "HOME", label: "Home", path: AppRoutes.HOME },
    { key: "HOW_IT_WORKS", label: "How it works", path: AppRoutes.HOW_IT_WORKS },
    { key: "ABOUT_US", label: "About Us", path: AppRoutes.ABOUT_US },
    { key: "COMPANIES", label: "Companies", path: AppRoutes.COMPANIES},
    { key: "TESTIMONIALS", label: "Testimonials", path: AppRoutes.TESTIMONIALS },
  ];

  const handleActiveState = (itemName: NavRoutes): void => {
    setIsActive(itemName);
  }

  const handleNavigate = (path: string): void => {
    const element = document.getElementById(path.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate('/');
    setIsOpen(false);
  }

  // Set active route based on current location
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;

    if (path === AppRoutes.HOME && !hash) {
      setIsActive("HOME");
    } else if (hash === AppRoutes.HOW_IT_WORKS) {
      setIsActive("HOW_IT_WORKS");
    } else if (hash === AppRoutes.ABOUT_US) {
      setIsActive("ABOUT_US");
    } else if (hash === AppRoutes.TESTIMONIALS) {
      setIsActive("TESTIMONIALS");
    } else if (hash === AppRoutes.COMPANIES) {
      setIsActive("COMPANIES");
    } 
  }, [location]);

  // Scroll behavior for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Scroll event listener for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav') && !target.closest('button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "bg-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center py-3 sm:py-4 md:py-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-bold text-xl sm:text-2xl">
              <Logo isName={true} />
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center items-center flex-1 max-w-2xl">
            <ul className="flex space-x-4 xl:space-x-8 text-sm">
              {navItems.map((item) => ( 
                <li key={item.key}>
                  <NavLink 
                    to={item.path} 
                    end
                    onClick={() => {
                      handleActiveState(item.key);
                      handleNavigate(item.path);
                    }}
                    className={`px-2 py-1 rounded-lg transition-all duration-200 text-sm xl:text-base ${
                      isActive === item.key 
                        ? 'text-[var(--primary-color)] font-semibold' 
                        : 'text-gray-700 hover:text-[var(--primary-color)] hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}   
            </ul> 
          </div> 

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {(isLoggedIn === "true") ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:text-[var(--primary-color)] transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="border border-[var(--primary-color)] px-4 py-2 rounded-lg text-[var(--primary-color)]
                  font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 text-sm"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
                <button
                  className="bg-[var(--primary-color)] px-4 py-2 rounded-lg text-white font-medium
                  hover:bg-[var(--primary-dark)] transition-all duration-300 text-sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-lg text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg rounded-b-2xl">
            <ul className="flex flex-col space-y-1 py-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      handleActiveState(item.key);
                      handleNavigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-lg mx-2 transition-all duration-200 ${
                      isActive === item.key
                        ? 'text-[var(--primary-color)] font-semibold bg-[var(--primary-color)]/10'
                        : 'text-gray-700 hover:text-[var(--primary-color)] hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              
              {/* Mobile Auth Buttons */}
              <li className="border-t border-gray-200 mt-2 pt-3">
                <div className="flex flex-col space-y-2 px-4">
                  {(isLoggedIn === "true") ? (
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        className="w-full text-center border border-[var(--primary-color)] px-4 py-3 rounded-lg text-[var(--primary-color)]
                        font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300"
                        onClick={() => {
                          navigate('/register');
                          setIsOpen(false);
                        }}
                      >
                        Sign Up
                      </button>
                      <button
                        className="w-full text-center bg-[var(--primary-color)] px-4 py-3 rounded-lg text-white font-medium
                        hover:bg-[var(--primary-dark)] transition-all duration-300"
                        onClick={() => {
                          navigate('/login');
                          setIsOpen(false);
                        }}
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;