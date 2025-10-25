import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { searchUsers } from '../../redux/features/userSlice';
import { Search } from 'lucide-react';
import UserCard from '../../components/user/UserCard';
import SearchBar from '../../components/common/SearchBar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const ExpertsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadExperts();
  }, []);

  const loadExperts = async () => {
    setLoading(true);
    try {
      const response = await dispatch(searchUsers('expert')).unwrap();
      setExperts(response);
    } catch (error) {
      console.error('Failed to load experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setLoading(true);
      try {
        const response = await dispatch(searchUsers(query)).unwrap();
        setExperts(response.filter((user: any) => user.role === 'expert'));
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      loadExperts();
    }
  };

  return (
    <Container>
      <div className="py-12 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Experts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Connect with skilled professionals ready to teach
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar
              placeholder="Search experts by name or skill..."
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* Experts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : experts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No experts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'No experts available yet'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <UserCard key={expert.id} user={expert} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ExpertsList;
