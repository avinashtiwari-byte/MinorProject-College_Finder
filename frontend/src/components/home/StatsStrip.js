import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GraduationCap,
  TrendingUp,
  Users,
  Award,
  MapPin,
  Star,
  BookOpen,
  Building
} from 'lucide-react';

// Counter component for animated numbers
const Counter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      let startValue = 0;
      const endValue = parseInt(end.toString().replace(/[^0-9]/g, ''));

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * (endValue - startValue) + startValue);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsStrip = () => {
  const stats = [
    {
      value: '2000+',
      label: 'Colleges Listed',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      description: 'Across all states and territories',
    },
    {
      value: '50000+',
      label: 'Courses Available',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      description: 'In diverse streams and specializations',
    },
    {
      value: '1M+',
      label: 'Students Helped',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: 'Making informed career choices',
    },
    {
      value: '100+',
      label: 'Top Universities',
      icon: GraduationCap,
      color: 'from-orange-500 to-red-500',
      description: 'Premier institutions of India',
    },
    {
      value: '95%',
      label: 'Success Rate',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
      description: 'Students placed in dream colleges',
    },
    {
      value: '4.8',
      label: 'Average Rating',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      description: 'From thousands of verified reviews',
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-violet-900/50 backdrop-blur-xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
              animate={{
                x: [0, 200, 0],
                y: [0, -100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Trusted by Millions of Students
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the largest community of students making informed decisions about their higher education. Our platform provides comprehensive information to help you choose the right path.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-400/30">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    <Counter
                      end={stat.value}
                      duration={2}
                      suffix={stat.value.includes('+') ? '+' : ''}
                      prefix={stat.value.includes('M') ? '' : ''}
                    />
                    {stat.value.includes('M') && 'M+'}
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Find Your Dream College?
            </h3>
            <p className="text-gray-300 mb-6">
              Start your journey today. Explore thousands of colleges and make the best choice for your future.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-500/20 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl" />
    </section>
  );
};

export default StatsStrip;