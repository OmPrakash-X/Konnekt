import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { bookSession } from '../../redux/features/sessionSlice';
import { Calendar, Clock, CreditCard, MapPin, Video } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Container from '../../components/layout/Container';

const BookSession: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  
  const expertId = searchParams.get('expertId') || '';
  const skillId = searchParams.get('skillId') || '';

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    duration: 60,
    mode: 'online' as 'online' | 'offline',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(bookSession({
        expertId,
        skillId,
        ...formData,
      })).unwrap();

      alert('Session booked successfully!');
      navigate('/sessions/my-sessions');
    } catch (error: any) {
      alert(error || 'Failed to book session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Book a Session
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Schedule a learning session with your expert
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Session Date *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Start Time *
              </label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration *
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]"
                required
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Session Mode *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'online' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.mode === 'online'
                      ? 'border-[#32b8c6] bg-[#32b8c6]/10'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Video className="w-6 h-6 mx-auto mb-2 text-[#32b8c6]" />
                  <p className="font-medium text-gray-900 dark:text-white">Online</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'offline' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.mode === 'offline'
                      ? 'border-[#32b8c6] bg-[#32b8c6]/10'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-[#32b8c6]" />
                  <p className="font-medium text-gray-900 dark:text-white">In-Person</p>
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                placeholder="Any specific topics or questions you'd like to cover..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" fullWidth isLoading={isLoading}>
                <CreditCard className="w-4 h-4" />
                Book Session
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
};

export default BookSession;
