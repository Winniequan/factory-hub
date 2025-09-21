import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-10 px-6 h-full">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
         <h1>Factory Hub</h1> 
         <h2 className="text-xl font-bold text-black ">Connect with trusted factories across the world!</h2>
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            }
          >
            Sign Up
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
