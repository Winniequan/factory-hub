
import { NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white-800 p-4 text-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Factory Hub</div>
        <div className='gap-4'>
         <NavLink to="/" className="mr-4 hover:underline">Home</NavLink>
        <NavLink to="/contact" className="ml-4 hover:underline">Contact</NavLink>
        <NavLink to="/signup" className="ml-4 hover:underline">SignUp</NavLink>
        <NavLink to="/login" className="ml-4 hover:underline">Login</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar