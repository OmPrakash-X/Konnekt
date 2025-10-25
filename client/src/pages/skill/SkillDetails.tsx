import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSkillById, getSkillExperts } from '../../redux/features/skillSlice';
import { BookOpen, Users, Clock, DollarSign } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import UserCard from '../../components/user/UserCard';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const SkillDetails: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentSkill: skill, loading } = useAppSelector((state) => state.skill);
  const [experts, setExperts] = React.useState<any[]>([]);

  useEffect(() => {
    if (skillId) {
      dispatch(getSkillById(skillId));
      loadExperts();
    }
  }, [dispatch, skillId]);

  const loadExperts = async () => {
    try {
      const response = await dispatch(getSkillExperts(skillId!)).unwrap();
      setExperts(response);
    } catch (error) {
      console.error('Failed to load experts:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!skill) {
    return (
      <Container>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Skill not found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="info">{skill.category}</Badge>
            <Badge variant="default">{skill.level}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {skill.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {skill.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card padding="md">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.level}
                </p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Experts</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {experts.length}
                </p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  1-2 hours
                </p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-[#32b8c6]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Credits/Hour</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.creditsPerHour}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Experts Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Learn from these experts
          </h2>
          {experts.length === 0 ? (
            <Card padding="lg">
              <p className="text-center text-gray-600 dark:text-gray-400">
                No experts available for this skill yet
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <UserCard key={expert.id} user={expert} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SkillDetails;
