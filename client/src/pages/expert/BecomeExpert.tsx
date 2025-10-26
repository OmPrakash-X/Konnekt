// pages/BecomeExpert.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { becomeExpert } from '../../redux/features/userSlice';
import { Award, BookOpen, Users, TrendingUp, X, Plus, Sparkles } from 'lucide-react';
import Container from '../../components/layout/Container';
import { toast } from 'sonner';

const BecomeExpert: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skills: [''],
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(becomeExpert({
        skills: formData.skills.filter(s => s.trim() !== ''),
        bio: formData.bio,
      })).unwrap();
      
      toast.success('Application submitted successfully!');
      navigate('/expert/dashboard');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Award,
      title: 'Earn Recognition',
      description: 'Get recognized as an expert in your field',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-500/10 to-orange-500/10',
    },
    {
      icon: BookOpen,
      title: 'Share Knowledge',
      description: 'Help others learn and grow',
      color: 'from-[#32b8c6] to-[#2a9fac]',
      bgColor: 'from-[#32b8c6]/10 to-[#2a9fac]/10',
    },
    {
      icon: Users,
      title: 'Build Network',
      description: 'Connect with learners worldwide',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Earn Credits',
      description: 'Get rewarded for your expertise',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-500/10 to-teal-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Container>
        <div className="py-12 space-y-12">
          {/* Header with Glow Effect */}
          <div className="relative overflow-hidden backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-linear-to-r from-[#32b8c6]/20 to-[#3dcad9]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#32b8c6]/10 to-[#2a9fac]/10 border border-[#32b8c6]/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#32b8c6]" />
                <span className="text-sm text-gray-300">Join Our Expert Community</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Become an <span className="text-transparent bg-clip-text bg-linear-to-r from-[#32b8c6] to-[#3dcad9]">Expert</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Share your knowledge and help others learn while earning recognition
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group relative backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${benefit.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${benefit.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              );
            })}
          </div>

          {/* Application Form */}
          <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-linear-to-br from-[#32b8c6] to-[#2a9fac]">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Expert Application
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skills Section */}
              <div>
                <label className="block text-sm font-semibold text-white mb-4">
                  Your Skills *
                </label>
                <div className="space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1 relative group">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          placeholder="Enter skill (e.g., React Development)"
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32b8c6] focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="px-4 py-3 rounded-xl backdrop-blur-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Skill
                </button>
              </div>

              {/* Bio Section */}
              <div>
                <label className="block text-sm font-semibold text-white mb-4">
                  About You *
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={8}
                  placeholder="Tell us about your experience, expertise, and what you can teach... Share your journey, achievements, and what makes you unique as an expert."
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32b8c6] focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
                <p className="text-gray-500 text-sm mt-2">
                  Minimum 100 characters. Be descriptive and highlight your strengths.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full px-8 py-4 rounded-xl bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white font-bold text-lg shadow-lg shadow-[#32b8c6]/30 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#3dcad9] to-[#32b8c6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </span>
              </button>

              <p className="text-center text-gray-500 text-sm">
                Your application will be reviewed by our team within 48 hours
              </p>
            </form>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-[#32b8c6] font-bold text-3xl mb-2">Step 1</div>
              <h3 className="text-white font-semibold mb-2">Submit Application</h3>
              <p className="text-gray-400 text-sm">Fill out the form with your skills and experience</p>
            </div>
            
            <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-purple-400 font-bold text-3xl mb-2">Step 2</div>
              <h3 className="text-white font-semibold mb-2">Review Process</h3>
              <p className="text-gray-400 text-sm">Our team reviews your qualifications</p>
            </div>
            
            <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-emerald-400 font-bold text-3xl mb-2">Step 3</div>
              <h3 className="text-white font-semibold mb-2">Start Teaching</h3>
              <p className="text-gray-400 text-sm">Get approved and begin sharing knowledge</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BecomeExpert;
