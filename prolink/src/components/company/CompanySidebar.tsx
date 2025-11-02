import type { Dispatch, SetStateAction } from "react";
import { FaNetworkWired } from "react-icons/fa";
import { FiHome, FiUsers, FiFileText, FiX, FiLogOut, FiMessageCircle} from 'react-icons/fi';
import { MdOutlinePerson, MdOutlineReviews } from "react-icons/md";
import Logo from "../Logo";

interface SidebarProps {
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const CompanySidebar:React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiUsers, label: 'Quote Requests', path: '/users' },
    { icon: FiFileText, label: 'My Quotes', path: '/analytics' },
    { icon: FaNetworkWired, label: 'Projects', path: '/projects' },
    { icon: FiMessageCircle, label: 'Inbox', path: '/inbox' },
    { icon: MdOutlinePerson, label: 'Profile Setup', path: '/company/setup' },
    { icon: MdOutlineReviews, label: 'Reviews', path: '/setup' },

  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Logo isName={true}/>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.path === '/dashboard'; // Static active state for demo

            return (
              <a
                key={index}
                href={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-[var(--primary-color)] text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-5 bg-gray-100 rounded-full flex items-center justify-center">
              <FiLogOut className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm font-medium text-red-600 truncate">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySidebar;