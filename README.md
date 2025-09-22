# Factory Hub 🏭

A modern web application connecting businesses with verified manufacturing partners worldwide. Factory Hub streamlines the process of finding, evaluating, and connecting with reliable factories for your production needs.

## ✨ Features

### 🔍 **Smart Search & Discovery(Working on)**
- Advanced search functionality for factories and products
- Filter by location, certifications, and specializations
- Real-time search results with comprehensive factory profiles

### 🏭 **Factory Profiles**
- Detailed factory information including location, establishment year, and certifications
- Product catalogs with specifications and capabilities
- Media galleries showcasing facilities and products
- Verified business credentials and quality certifications

### 👥 **Multi-Role Authentication**
- **Factory**: Manage profiles, showcase products, and connect with businesses
- **Business**: Search factories, compare options, and initiate partnerships
- **Bank**: Financial services and trade financing support
- **Admin**: Platform management and oversight

### 📱 **Modern User Experience**
- Responsive design optimized for all devices
- Dark/light mode support
- Intuitive navigation and user-friendly interface
- Real-time form validation with visual feedback

### 🔐 **Secure Authentication(future)**
- Role-based access control
- JWT token authentication (ready for backend integration)
- Comprehensive form validation with security best practices

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.1
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Development**: ESLint + TypeScript ESLint

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd factory-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FactoryCard.tsx  # Factory display card component
│   ├── Footer.tsx       # Application footer
│   └── Navbar.tsx       # Navigation bar
├── pages/               # Application pages
│   ├── Home.tsx         # Landing page with featured factories
│   ├── Login.tsx        # User authentication
│   ├── SignUp.tsx       # User registration
│   ├── Contact.tsx      # Contact form
│   ├── Factories.tsx    # Factory listings
│   ├── Products.tsx     # Product catalog
│   └── About.tsx        # About page
├── store/               # Redux state management
│   ├── slices/          # Redux slices
│   └── index.ts         # Store configuration
├── data/                # Mock data and configurations
│   ├── factories.json   # Sample factory data
│   ├── products.json    # Sample product data
│   └── business.json    # Sample business data
├── constants/           # Application constants
└── routes/              # Routing configuration
```

## 🎯 Key Features in Detail

### Authentication System
- **Validation Rules**:
  - Name: Minimum 4 characters
  - Email: Valid email format required
  - Password: 8-16 characters with uppercase, lowercase, and numbers
- **Visual Feedback**: Real-time validation with color-coded buttons and error messages
- **Role Selection**: Support for Factory, Business, Bank, and Admin roles

### Factory Discovery
- **Search Functionality**: Find factories by name, location, or product type
- **Detailed Profiles**: Comprehensive factory information including:
  - Location and contact details
  - Establishment year and company history
  - Product specializations and capabilities
  - Quality certifications and compliance
  - Media galleries and facility photos

### Responsive Design
- **Mobile-First**: Optimized for mobile devices with responsive breakpoints
- **Dark Mode**: Full dark/light theme support
- **Modern UI**: Clean, professional interface with smooth animations

## 🔧 Configuration

### Environment Setup
The application uses Vite for development and building. Configuration files:
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules and settings

### Customization
- **Themes**: Modify Tailwind configuration for custom color schemes
- **Components**: All components are modular and easily customizable
- **Data**: Update JSON files in `/src/data/` for different content

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: support@factoryhub.com
- Phone: +1 (555) 123-4567

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Real-time messaging system
- [ ] Advanced filtering and sorting
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] AI-powered factory matching

---

**Factory Hub** - Connecting businesses with manufacturing excellence worldwide. 🌍
