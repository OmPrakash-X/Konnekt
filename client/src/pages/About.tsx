import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';
import Card from '../components/common/Card';

const About: React.FC = () => {
  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of knowledge sharing within a supportive community.',
    },
    {
      icon: Target,
      title: 'Quality Learning',
      description: 'Every session is designed to provide maximum value and practical knowledge.',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'We celebrate achievements and growth with badges and certifications.',
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Connect with experts who are genuinely passionate about what they teach.',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Konnekt
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Empowering people to learn and grow through meaningful skill exchange
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card padding="lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              At Konnekt, we're building a global platform where anyone can learn any skill 
              from experts around the world. We believe that knowledge should be accessible, 
              and learning should be personalized and engaging.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our platform connects learners with skilled professionals through 1-on-1 sessions, 
              making skill development more effective and enjoyable than traditional methods.
            </p>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} padding="lg" hover>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#32b8c6]/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-[#32b8c6]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-[#32b8c6] to-[#2a9fac] rounded-2xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="text-lg opacity-90">Active Users</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-lg opacity-90">Skills Available</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50K+</p>
              <p className="text-lg opacity-90">Sessions Completed</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">4.8/5</p>
              <p className="text-lg opacity-90">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
