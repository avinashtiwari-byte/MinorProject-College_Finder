import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('collegefinder-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        localStorage.removeItem('collegefinder-wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('collegefinder-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add college to wishlist
  const addToWishlist = (college) => {
    setWishlist(prev => {
      // Check if college already exists in wishlist
      const exists = prev.some(item => item._id === college._id || item.id === college.id);
      if (exists) {
        toast.error('College already in wishlist!');
        return prev;
      }

      toast.success('College added to wishlist!');
      return [...prev, {
        ...college,
        addedAt: new Date().toISOString()
      }];
    });
  };

  // Remove college from wishlist
  const removeFromWishlist = (collegeId) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(item =>
        item._id !== collegeId && item.id !== collegeId
      );
      if (newWishlist.length < prev.length) {
        toast.success('College removed from wishlist!');
      }
      return newWishlist;
    });
  };

  // Check if college is in wishlist
  const isInWishlist = (collegeId) => {
    return wishlist.some(item => item._id === collegeId || item.id === collegeId);
  };

  // Toggle college in wishlist
  const toggleWishlist = (college) => {
    const collegeId = college._id || college.id;
    if (isInWishlist(collegeId)) {
      removeFromWishlist(collegeId);
    } else {
      addToWishlist(college);
    }
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared!');
  };

  // Get wishlist count
  const getWishlistCount = () => wishlist.length;

  // Get colleges for comparison (max 3)
  const getComparisonColleges = () => wishlist.slice(0, 3);

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    getWishlistCount,
    getComparisonColleges,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;