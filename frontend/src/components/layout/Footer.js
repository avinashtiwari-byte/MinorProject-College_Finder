import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '/' },
      { name: 'Search Colleges', href: '/search' },
      { name: 'Top Colleges', href: '/top-colleges' },
      { name: 'Compare Colleges', href: '/compare' },
      { name: 'Career Guidance', href: '/career' },
    ],
    'Resources': [
      { name: 'Blog', href: '/blog' },
      { name: 'Exam Dates', href: '/exams' },
      { name: 'Scholarships', href: '/scholarships' },
      { name: 'Study Abroad', href: '/study-abroad' },
      { name: 'FAQs', href: '/faqs' },
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    'Categories': [
      { name: 'Engineering', href: '/engineering' },
      { name: 'Medical', href: '/medical' },
      { name: 'Management', href: '/management' },
      { name: 'Arts & Science', href: '/arts' },
      { name: 'Law', href: '/law' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                >
                  <GraduationCap className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">CollegeFinder</h3>
                  <p className="text-gray-400 text-sm">Your Gateway to Higher Education</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover the perfect college with our comprehensive database of institutions across India.
                Make informed decisions about your educational journey.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">info@collegefinder.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Bangalore, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg glass hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-4 gradient-text">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span className="w-0 h-0 border-t-2 border-transparent group-hover:border-purple-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest updates on college admissions, exams, and career guidance delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-purple-400 transition-colors"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CollegeFinder. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Empowering students to make informed educational choices
              </p>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
    </footer>
  );
};

export default Footer;