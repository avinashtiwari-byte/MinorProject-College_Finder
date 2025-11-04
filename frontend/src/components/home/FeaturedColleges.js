import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Star,
  MapPin,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

// Mock data for featured colleges
const mockFeaturedColleges = [
  {
    _id: '1',
    name: 'Indian Institute of Technology Bombay',
    type: 'government',
    location: 'Mumbai, Maharashtra',
    ranking: 1,
    rating: 4.9,
    fees: 250000,
    courses: ['Engineering', 'Science', 'Management'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    highlights: ['Best Engineering College', 'Excellent Placements', 'Research Excellence'],
  },
  {
    _id: '2',
    name: 'All India Institute of Medical Sciences',
    type: 'government',
    location: 'New Delhi',
    ranking: 2,
    rating: 4.8,
    fees: 180000,
    courses: ['Medical', 'Nursing', 'Paramedical'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    highlights: ['Top Medical College', 'Advanced Healthcare', 'World-class Facilities'],
  },
  {
    _id: '3',
    name: 'International Institute of Information Technology',
    type: 'private',
    location: 'Hyderabad, Telangana',
    ranking: 15,
    rating: 4.6,
    fees: 450000,
    courses: ['Computer Science', 'Electronics', 'Mechanical'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    highlights: ['IT Excellence', 'Industry Partnerships', 'Innovation Hub'],
  },
  {
    _id: '4',
    name: 'National Institute of Technology Karnataka',
    type: 'government',
    location: 'Surathkal, Karnataka',
    ranking: 12,
    rating: 4.7,
    fees: 280000,
    courses: ['Engineering', 'Architecture', 'Science'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    highlights: ['Beautifull Campus', 'Strong Alumni', 'Quality Education'],
  },
  {
    _id: '5',
    name: 'Christ University',
    type: 'private',
    location: 'Bangalore, Karnataka',
    ranking: 25,
    rating: 4.5,
    fees: 380000,
    courses: ['Commerce', 'Management', 'Humanities', 'Science'],
    image: 'https://images.unsplash.com/photo-1569074187119-c87815b686a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1569074187119-c87815b686a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    highlights: ['Diverse Programs', 'Global Exposure', 'Student Life'],
  },
  {
    _id: '6',
    name: 'Banaras Hindu University',
    type: 'government',
    location: 'Varanasi, Uttar Pradesh',
    ranking: 8,
    rating: 4.6,
    fees: 150000,
    courses: ['Arts', 'Science', 'Commerce', 'Medicine', 'Engineering'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    highlights: ['Historic Institution', 'Cultural Heritage', 'Research Focus'],
  },
];

const CollegeCard = ({ college, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const getTypeColor = (type) => {
    return type === 'government' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  const getTypeLabel = (type) => {
    return type === 'government' ? 'Government' : 'Private';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all duration-300 card-hover">
        {/* College Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* College Logo */}
          <div className="absolute top-4 left-4">
            <img
              src={college.logo}
              alt={college.name}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20"
            />
          </div>

          {/* Type Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(college.type)}`}>
            {getTypeLabel(college.type)}
          </div>

          {/* Ranking */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">#{college.ranking}</span>
            </div>
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleWishlist(college)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isInWishlist(college._id)
                  ? 'text-red-500 fill-red-500'
                  : 'text-white hover:text-red-500'
              }`}
            />
          </motion.button>
        </div>

        {/* College Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {college.name}
          </h3>

          <div className="flex items-center text-gray-400 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{college.location}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold">{college.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">2.5k Reviews</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">98% Placement</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {college.highlights.slice(0, 2).map((highlight, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
              >
                {highlight}
              </span>
            ))}
            {college.highlights.length > 2 && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                +{college.highlights.length - 2} more
              </span>
            )}
          </div>

          {/* Courses */}
          <div className="flex flex-wrap gap-1 mb-4">
            {college.courses.slice(0, 3).map((course, idx) => (
              <span
                key={idx}
                className="text-xs text-gray-400"
              >
                {course}
                {idx < Math.min(college.courses.length, 3) - 1 && ','}
              </span>
            ))}
          </div>

          {/* Fees and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Annual Fees</p>
              <p className="text-lg font-bold gradient-text">
                ₹{college.fees.toLocaleString('en-IN')}
              </p>
            </div>
            <Link
              to={`/college/${college._id}`}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 group"
            >
              <span className="text-sm font-semibold">View Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedColleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setColleges(mockFeaturedColleges);
    }, 1000);
  }, []);

  return (
    <section className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Featured Colleges</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore top-rated institutions across India. Find your perfect match from our curated selection of premier colleges.
          </p>
        </motion.div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.length > 0 ? (
            colleges.map((college, index) => (
              <CollegeCard key={college._id} college={college} index={index} />
            ))
          ) : (
            // Loading Skeletons
            [...Array(6)].map((_, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-700" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-700 rounded w-16" />
                    <div className="h-4 bg-gray-700 rounded w-20" />
                  </div>
                  <div className="h-10 bg-gray-700 rounded" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 px-8 py-4 glass rounded-2xl hover:bg-white/20 transition-all duration-300 group"
          >
            <span className="text-lg font-semibold text-white">View All Colleges</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedColleges;