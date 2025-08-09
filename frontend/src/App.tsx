import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Medicines from './pages/Medicines/Medicines';
import CategoriesPage from './pages/Categories/Categories';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import Prescription from './pages/Prescription/Prescription';
import Cart from './pages/Cart/Cart';
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';
import { useCart } from './contexts/CartContext';
import './index.css';

// Wrapper component to access cart context
const AppContent: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header cartItemsCount={cartCount} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;