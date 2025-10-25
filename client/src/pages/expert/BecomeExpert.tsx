import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { becomeExpert } from '../../redux/features/userSlice';
import { Award, BookOpen, Users, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Container from '../../components/layout/Container';

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
      
      alert('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Award,
      title: 'Earn Recognition',
      description: 'Get recognized as an expert in your field',
    },
    {
      icon: BookOpen,
      title: 'Share Knowledge',
      description: 'Help others learn and grow',
    },
    {
      icon: Users,
      title: 'Build Network',
      description: 'Connect with learners worldwide',
    },
    {
      icon: TrendingUp,
      title: 'Earn Credits',
      description: 'Get rewarded for your expertise',
    },
  ];

  return (
    <Container>
      <div className="py-12 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Become an Expert
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share your knowledge and help others learn
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} padding="lg" hover>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#32b8c6]/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#32b8c6]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Application Form */}
        <Card padding="lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Expert Application
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Your Skills *
              </label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <Input
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder="Enter skill (e.g., React Development)"
                    required
                  />
                  {formData.skills.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={handleAddSkill}>
                + Add Another Skill
              </Button>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                About You *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={6}
                placeholder="Tell us about your experience, expertise, and what you can teach..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]"
                required
              />
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Submit Application
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
};

export default BecomeExpert;
