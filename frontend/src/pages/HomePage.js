import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import FeaturedColleges from "../components/home/FeaturedColleges";
import StatsStrip from "../components/home/StatsStrip";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Enhanced Search Section */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Find Your Perfect College
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Search from thousands of colleges across India. Use filters to narrow down your choices and find the best fit for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <FeaturedColleges />

      {/* Stats Section */}
      <StatsStrip />

      {/* Additional Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Why Choose CollegeFinder?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive information and tools to help you make the best decision for your higher education journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Comprehensive Database",
                description: "Access detailed information about thousands of colleges across all states and streams.",
                icon: "📚",
              },
              {
                title: "Verified Reviews",
                description: "Read authentic reviews from students and alumni to make informed decisions.",
                icon: "⭐",
              },
              {
                title: "Advanced Search",
                description: "Use powerful filters to find colleges that match your exact requirements.",
                icon: "🔍",
              },
              {
                title: "Compare Colleges",
                description: "Side-by-side comparison of colleges to evaluate your options effectively.",
                icon: "⚖️",
              },
              {
                title: "Career Guidance",
                description: "Get expert advice on career paths and course selections based on your interests.",
                icon: "🎯",
              },
              {
                title: "Latest Updates",
                description: "Stay informed about admission deadlines, exam dates, and college news.",
                icon: "📰",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from students who found their dream colleges through CollegeFinder
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                college: "IIT Delhi",
                review: "CollegeFinder helped me find the perfect engineering college. The detailed information and reviews were invaluable!",
                rating: 5,
              },
              {
                name: "Rahul Kumar",
                college: "AIIMS Delhi",
                review: "Thanks to CollegeFinder, I could compare different medical colleges and make an informed choice for my career.",
                rating: 5,
              },
              {
                name: "Anjali Patel",
                college: "IIM Bangalore",
                review: "The platform's comprehensive database and user-friendly interface made my college search journey smooth and successful.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.review}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.college}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
