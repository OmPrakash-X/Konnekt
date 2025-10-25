import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award, TrendingUp, Sparkles, Zap, Target, Compass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppSelector } from '../redux/hooks';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Check authentication status
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const features = [
    {
      icon: Users,
      title: 'Connect with Experts',
      description: 'Find skilled professionals ready to share their knowledge',
      linear: 'from-cyan-500 to-blue-500',
    },
    {
      icon: BookOpen,
      title: 'Learn Any Skill',
      description: 'Access thousands of skills from coding to cooking',
      linear: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Earn Badges',
      description: 'Get recognized for your learning achievements',
      linear: 'from-amber-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics',
      linear: 'from-emerald-500 to-teal-500',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users', icon: Users },
    { value: '500+', label: 'Skills', icon: Target },
    { value: '50K+', label: 'Sessions', icon: Zap },
    { value: '4.8/5', label: 'Rating', icon: Sparkles },
  ];

  useGSAP(() => {
    const heroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.2
    });

    heroTimeline
      .from('#hero-title', {
        y: 80,
        opacity: 0,
        duration: 0.8,
      })
      .from('#hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from('.hero-btn', {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
      }, '-=0.3');

    gsap.to('.floating-orb', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 'random(4, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 2,
        from: 'random',
      },
    });

    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: {
        amount: 0.6,
        from: 'start',
      },
      ease: 'power2.out',
      clearProps: 'all',
    });

    if (!isAuthenticated) {
      gsap.from('#cta-section', {
        scrollTrigger: {
          trigger: '#cta-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    gsap.to('.parallax-slow', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: 150,
      ease: 'none',
    });

  }, { scope: containerRef, dependencies: [isAuthenticated] });

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute top-40 right-20 w-96 h-96 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute bottom-20 left-1/3 w-80 h-80 bg-linear-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="parallax-slow absolute -top-20 right-1/4 w-64 h-64 bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pb-20 lg:pb-32 lg:pt-12">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-linear-to-r from-[#32b8c6]/20 to-[#3dcad9]/20 rounded-full blur-3xl"></div>

            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#32b8c6]/10 to-[#2a9fac]/10 border border-[#32b8c6]/20 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-[#32b8c6]" />
              <span className="text-sm text-gray-300">The Future of Learning</span>
            </div>

            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight">
              {isAuthenticated ? (
                <>
                  <span className="block text-white">Welcome back,</span>
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#32b8c6] via-[#3dcad9] to-[#4de8ff]">
                    {user?.name || 'Learner'}!
                  </span>
                  <span className="block text-white mt-2">Continue Your Journey</span>
                </>
              ) : (
                <>
                  <span className="block text-white">Learn Skills.</span>
                  <span className="block text-white">Share Knowledge.</span>
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#32b8c6] via-[#3dcad9] to-[#4de8ff] animate-linear">
                    Grow Together.
                  </span>
                </>
              )}
            </h1>

            <p id="hero-subtitle" className="text-xl sm:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {isAuthenticated ? (
                "Explore new skills, connect with experts, and track your learning progress"
              ) : (
                <>
                  Connect with <span className="text-[#32b8c6] font-semibold">experts</span> and{' '}
                  <span className="text-[#32b8c6] font-semibold">learners</span> worldwide.
                  Exchange skills through personalized 1-on-1 sessions.
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {isAuthenticated ? (
                <>
                  <Link to="/skills/explore" className="hero-btn">
                    <button className="group px-10 py-5 bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:opacity-90 flex items-center gap-2">
                      <Compass className="w-6 h-6" />
                      Explore Skills
                    </button>
                  </Link>

                  <Link to="/dashboard" className="hero-btn">
                    <button className="group px-10 py-5 backdrop-blur-xl bg-white/5 border-2 border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                      Go to Dashboard
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="hero-btn">
                    <button className="group px-10 py-5 bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:opacity-90 flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <Link to="/skills" className="hero-btn">
                    <button className="group px-10 py-5 backdrop-blur-xl bg-white/5 border-2 border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                      Explore Skills
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-linear-to-r from-[#32b8c6]/20 to-[#3dcad9]/20 rounded-full blur-3xl"></div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-item text-center group cursor-pointer">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#32b8c6]/20 to-[#2a9fac]/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[#32b8c6]" />
                    </div>
                    <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#32b8c6] to-[#3dcad9] mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-linear-to-r from-[#32b8c6]/10 to-[#2a9fac]/10 border border-[#32b8c6]/20 backdrop-blur-xl">
              <span className="text-sm text-[#32b8c6] font-semibold">WHY KONNEKT?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to accelerate your learning journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card group relative backdrop-blur-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${feature.linear} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show if not authenticated */}
      {!isAuthenticated && (
        <section id="cta-section" className="py-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 sm:p-20 text-center">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to Start Your
                  <span className="block mt-2">Learning Journey?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                  Join <span className="text-[#32b8c6] font-semibold">10,000+</span> learners and experts transforming their skills
                </p>
                <Link to="/signup" className="inline-block">
                  <button className="group px-12 py-5 bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:opacity-90 flex items-center gap-3 mx-auto">
                    Create Free Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="h-20"></div>

      <style>{`
        @keyframes linear {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-linear {
          background-size: 200% 200%;
          animation: linear 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
