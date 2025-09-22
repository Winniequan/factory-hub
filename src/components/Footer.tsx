
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-auto ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Factory Hub</h3>
          <p className="text-sm">Connecting businesses with trusted factories across China.</p>
          <p className="text-xs mt-2">© 2025 Factory Hub. All rights reserved.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p className="text-sm">Email: support@factoryhub.com</p>
          <p className="text-sm">Phone: +86-755-12345678</p>
        </div>

        {/* Optional: Social or Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="hover:text-blue-500">LinkedIn</a>
            <a href="#" className="hover:text-green-500">WeChat</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
