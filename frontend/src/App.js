import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import WishlistPage from './pages/WishlistPage';
import ChatAssistant from './components/chat/ChatAssistant';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import { ToastProvider } from './components/ui/Toast';
import './App.css';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Page transition wrapper
const PageWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// App Content Component
const AppContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          } />
          <Route path="/search" element={
            <PageWrapper>
              <SearchResultsPage />
            </PageWrapper>
          } />
          <Route path="/college/:id" element={
            <PageWrapper>
              <CollegeDetailPage />
            </PageWrapper>
          } />
          <Route path="/wishlist" element={
            <PageWrapper>
              <WishlistPage />
            </PageWrapper>
          } />
        </Routes>
      </main>
      <Footer />
      <ChatAssistant />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            style: {
              background: 'rgba(16, 185, 129, 0.9)',
            },
          },
          error: {
            style: {
              background: 'rgba(239, 68, 68, 0.9)',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <SearchProvider>
          <Router>
            <AppContent />
          </Router>
        </SearchProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
